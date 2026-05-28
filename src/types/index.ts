export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  distance: string;
  interests: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface UserState {
  profile: Profile;
  isPremium: boolean;
  credits: number;
  likesSent: string[];
  likesReceived: string[];
  matches: string[];
  dislikesSent: string[];
}