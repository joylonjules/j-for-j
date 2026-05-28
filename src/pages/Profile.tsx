import React from 'react';
import { useApp } from '../context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { 
  Settings, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  ChevronRight,
  LogOut,
  Gem,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center py-8">
        <div className="relative">
          <Avatar className="w-32 h-32 ring-4 ring-rose-500 ring-offset-4">
            <AvatarImage src={user.profile.images[0]} />
            <AvatarFallback>{user.profile.name[0]}</AvatarFallback>
          </Avatar>
          {user.isPremium && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white uppercase tracking-wider">
              GOLD
            </div>
          )}
        </div>
        <h2 className="mt-6 text-2xl font-bold text-slate-900">{user.profile.name}, {user.profile.age}</h2>
        <p className="text-slate-500 text-sm">{user.profile.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-rose-50 p-4 rounded-3xl flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-rose-600">{user.credits}</span>
          <span className="text-xs text-rose-500 font-medium">Credits</span>
          <Button variant="ghost" size="sm" className="mt-2 text-[10px] h-6" onClick={() => navigate('/premium')}>Buy More</Button>
        </div>
        <div className="bg-amber-50 p-4 rounded-3xl flex flex-col items-center text-center">
          <Award className={`w-8 h-8 mb-1 ${user.isPremium ? 'text-amber-600' : 'text-slate-300'}`} />
          <span className="text-xs text-amber-600 font-bold uppercase tracking-tight">
            {user.isPremium ? 'Premium Active' : 'Go Premium'}
          </span>
          {!user.isPremium && <Button variant="ghost" size="sm" className="mt-2 text-[10px] h-6" onClick={() => navigate('/premium')}>Upgrade</Button>}
        </div>
      </div>

      <div className="space-y-2">
        <ProfileMenuItem icon={<Settings size={18} />} label="Settings" />
        <ProfileMenuItem icon={<CreditCard size={18} />} label="Payments & Subscription" onClick={() => navigate('/premium')} />
        <ProfileMenuItem icon={<Shield size={18} />} label="Privacy & Safety" />
        <ProfileMenuItem icon={<HelpCircle size={18} />} label="Help Center" />
        <ProfileMenuItem icon={<LogOut size={18} />} label="Log Out" color="text-rose-500" />
      </div>

      <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Gem size={20} className="text-sky-400" />
            Join the Club
          </h3>
          <p className="text-slate-400 text-xs mb-4">Earn rewards for inviting your friends and get free credits.</p>
          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">Share Referral Link</Button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Flame size={120} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const ProfileMenuItem = ({ 
  icon, 
  label, 
  color = "text-slate-700", 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color?: string;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-slate-50 transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className={`${color} bg-slate-50 p-2 rounded-xl group-hover:bg-white transition-colors`}>
        {icon}
      </div>
      <span className={`font-semibold ${color}`}>{label}</span>
    </div>
    <ChevronRight size={18} className="text-slate-300" />
  </button>
);

const Flame = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);