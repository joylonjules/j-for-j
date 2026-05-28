import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Lock, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Matches: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const matchedProfiles = MOCK_PROFILES.filter(p => user.matches.includes(p.id));
  const likedByProfiles = MOCK_PROFILES.filter(p => user.likesReceived.includes(p.id) && !user.matches.includes(p.id));

  return (
    <div className="p-4 pb-24 space-y-8 max-w-lg mx-auto">
      {/* Likes Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Likes Received
            <Badge variant="secondary" className="bg-rose-100 text-rose-600 border-none">
              {likedByProfiles.length}
            </Badge>
          </h2>
          {!user.isPremium && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-amber-600 font-bold"
              onClick={() => navigate('/premium')}
            >
              See All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {likedByProfiles.map(profile => (
            <Card key={profile.id} className="relative overflow-hidden aspect-[3/4] group border-none">
              <img 
                src={profile.images[0]} 
                alt="Profile" 
                className={`w-full h-full object-cover transition-all ${!user.isPremium ? 'blur-xl grayscale' : ''}`}
              />
              <div className="absolute inset-0 bg-black/20" />
              {!user.isPremium && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                    <Lock size={18} />
                  </div>
                  <p className="text-white text-xs font-bold shadow-sm">Upgrade to see who liked you</p>
                </div>
              )}
              {user.isPremium && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-bold">{profile.name}, {profile.age}</p>
                </div>
              )}
            </Card>
          ))}
          {likedByProfiles.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <Heart className="mx-auto mb-2 opacity-20" size={40} />
              <p>No likes yet. Keep swiping!</p>
            </div>
          )}
        </div>
      </section>

      {/* Matches Section */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Matches</h2>
        <div className="space-y-3">
          {matchedProfiles.map(profile => (
            <div 
              key={profile.id} 
              className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow-sm border border-slate-50 cursor-pointer active:scale-[0.98] transition-all"
              onClick={() => navigate(`/chat/${profile.id}`)}
            >
              <Avatar className="w-16 h-16 ring-2 ring-rose-50 ring-offset-2">
                <AvatarImage src={profile.images[0]} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{profile.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-1">Matched! Say something nice...</p>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Just now
              </div>
            </div>
          ))}
          {matchedProfiles.length === 0 && (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p>No matches yet. Swipe right on someone!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};