import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, Info, MapPin, Flame } from 'lucide-react';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const Discovery: React.FC = () => {
  const { user, likeProfile, dislikeProfile } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const availableProfiles = MOCK_PROFILES.filter(
    p => !user.likesSent.includes(p.id) && !user.dislikesSent.includes(p.id)
  );

  const handleSwipe = (direction: 'left' | 'right') => {
    const profile = availableProfiles[currentIndex];
    if (!profile) return;

    if (direction === 'right') {
      likeProfile(profile.id);
    } else {
      dislikeProfile(profile.id);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const currentProfile = availableProfiles[currentIndex];

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6 text-center">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <Flame className="text-rose-500 w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No more profiles!</h2>
        <p className="text-slate-500">You've seen everyone in your area. Check back later or expand your search.</p>
        <Button 
          variant="outline" 
          className="mt-6 border-rose-500 text-rose-500 hover:bg-rose-50"
          onClick={() => window.location.reload()}
        >
          Reset Swipes
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden pt-4 px-4 pb-20">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentProfile.id}
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) handleSwipe('right');
            else if (info.offset.x < -100) handleSwipe('left');
          }}
          className="absolute inset-x-4 top-4 bottom-24 bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-100"
        >
          <div className="relative h-full w-full">
            <img 
              src={currentProfile.images[0]} 
              alt={currentProfile.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Swipe Indicators */}
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-emerald-500 rounded-lg px-4 py-1 -rotate-12">
              <span className="text-emerald-500 text-4xl font-black uppercase">LIKE</span>
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-rose-500 rounded-lg px-4 py-1 rotate-12">
              <span className="text-rose-500 text-4xl font-black uppercase">NOPE</span>
            </motion.div>

            {/* Profile Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-end gap-2 mb-1">
                <h1 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h1>
                <Badge variant="secondary" className="bg-white/20 text-white border-none mb-1">
                  <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                  Popular
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-sm mb-3">
                <MapPin size={14} />
                <span>{currentProfile.distance}</span>
              </div>
              <p className="text-white/90 text-sm line-clamp-2 mb-4">{currentProfile.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map(interest => (
                  <span key={interest} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-6">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:scale-110 transition-transform border border-slate-100"
        >
          <X size={28} />
        </button>
        <button 
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-500 hover:scale-110 transition-transform border border-slate-100"
        >
          <Star size={24} fill="currentColor" />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-500 hover:scale-110 transition-transform border border-slate-100"
        >
          <Heart size={28} fill="currentColor" />
        </button>
        <button 
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-sky-500 hover:scale-110 transition-transform border border-slate-100"
        >
          <Info size={24} />
        </button>
      </div>
    </div>
  );
};