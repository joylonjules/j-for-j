import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, MessageCircle, User, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { user } = useApp();
  const matchCount = user.matches.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-rose-500' : 'text-slate-400'}`}
      >
        <Flame size={24} />
        <span className="text-[10px] font-medium">Discover</span>
      </NavLink>
      
      <NavLink 
        to="/premium" 
        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-amber-500' : 'text-slate-400'}`}
      >
        <Star size={24} />
        <span className="text-[10px] font-medium">Premium</span>
      </NavLink>

      <NavLink 
        to="/matches" 
        className={({ isActive }) => `flex flex-col items-center gap-1 relative ${isActive ? 'text-rose-500' : 'text-slate-400'}`}
      >
        <MessageCircle size={24} />
        {matchCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {matchCount}
          </span>
        )}
        <span className="text-[10px] font-medium">Matches</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-rose-500' : 'text-slate-400'}`}
      >
        <User size={24} />
        <span className="text-[10px] font-medium">Profile</span>
      </NavLink>
    </nav>
  );
};