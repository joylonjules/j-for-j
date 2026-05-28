import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChevronLeft, Send, Phone, Video, Info } from 'lucide-react';

export const Chat: React.FC = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { messages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const profile = MOCK_PROFILES.find(p => p.id === profileId);
  const chatMessages = messages[profileId || ''] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (!profile) return null;

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(profile.id, inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <Avatar className="w-10 h-10">
          <AvatarImage src={profile.images[0]} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-bold text-slate-900 leading-none">{profile.name}</h2>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button className="hover:text-rose-500 transition-colors"><Phone size={20} /></button>
          <button className="hover:text-rose-500 transition-colors"><Video size={20} /></button>
          <button className="hover:text-rose-500 transition-colors"><Info size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <div className="text-center py-6">
          <p className="text-xs text-slate-400 font-medium bg-slate-100 inline-block px-3 py-1 rounded-full">
            You matched with {profile.name} today
          </p>
        </div>

        {chatMessages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.senderId === 'me' 
                ? 'bg-rose-500 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1 opacity-60 ${msg.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {chatMessages.length === 0 && (
          <div className="text-center py-12 text-slate-400 italic">
            Be the first to say hello!
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-slate-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="rounded-full bg-slate-50 border-none px-6 h-12 focus-visible:ring-rose-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full w-12 h-12 bg-rose-500 hover:bg-rose-600 transition-colors shrink-0"
            disabled={!inputText.trim()}
          >
            <Send size={20} className="mr-0.5" />
          </Button>
        </form>
      </div>
    </div>
  );
};