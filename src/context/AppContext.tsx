import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState, Profile } from '../types';
import { toast } from 'sonner';

interface AppContextType {
  user: UserState;
  likeProfile: (id: string) => void;
  dislikeProfile: (id: string) => void;
  upgradeToPremium: () => void;
  buyCredits: (amount: number) => void;
  messages: Record<string, { senderId: string; text: string; timestamp: number }[]>;
  sendMessage: (profileId: string, text: string) => void;
}

const STORAGE_KEY = 'dating_app_state';

const INITIAL_STATE: UserState = {
  profile: {
    id: 'me',
    name: 'Alex',
    age: 26,
    bio: 'Just looking for someone to share good vibes with!',
    images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60'],
    distance: '0 miles away',
    interests: ['Music', 'Tech', 'Food']
  },
  isPremium: false,
  credits: 10,
  likesSent: [],
  likesReceived: ['1', '3', '5'], // Pre-populated likes for monetization demo
  matches: [],
  dislikesSent: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [messages, setMessages] = useState<Record<string, { senderId: string; text: string; timestamp: number }[]>>(() => {
    const saved = localStorage.getItem('dating_app_messages');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dating_app_messages', JSON.stringify(messages));
  }, [messages]);

  const likeProfile = (id: string) => {
    if (user.likesSent.includes(id)) return;

    const isMatch = user.likesReceived.includes(id);
    
    setUser(prev => ({
      ...prev,
      likesSent: [...prev.likesSent, id],
      matches: isMatch ? [...prev.matches, id] : prev.matches
    }));

    if (isMatch) {
      toast.success("It's a Match! 🎉 Check your messages.");
    }
  };

  const dislikeProfile = (id: string) => {
    setUser(prev => ({
      ...prev,
      dislikesSent: [...prev.dislikesSent, id]
    }));
  };

  const upgradeToPremium = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
    toast.success("Welcome to Gold! 🏆 All features unlocked.");
  };

  const buyCredits = (amount: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits + amount }));
    toast.success(`Purchased ${amount} Credits! 💎`);
  };

  const sendMessage = (profileId: string, text: string) => {
    const newMessage = {
      senderId: 'me',
      text,
      timestamp: Date.now()
    };
    setMessages(prev => ({
      ...prev,
      [profileId]: [...(prev[profileId] || []), newMessage]
    }));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      likeProfile, 
      dislikeProfile, 
      upgradeToPremium, 
      buyCredits,
      messages,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};