import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Star, Gem, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export const Premium: React.FC = () => {
  const { user, upgradeToPremium, buyCredits } = useApp();

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="text-center py-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Upgrade your Dating</h1>
        <p className="text-slate-500">Get more matches and special features</p>
      </div>

      {!user.isPremium && (
        <Card className="p-6 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white rounded-[32px] border-none shadow-xl shadow-amber-200 mb-8 overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="fill-white" size={24} />
              <span className="text-xl font-black tracking-widest uppercase">GOLD</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <PremiumFeature text="See Who Likes You" />
              <PremiumFeature text="Unlimited Swipes" />
              <PremiumFeature text="5 Super Likes a day" />
              <PremiumFeature text="Rewind last swipe" />
            </ul>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={upgradeToPremium}
                className="w-full bg-white text-amber-600 hover:bg-slate-50 font-black h-14 text-lg rounded-2xl shadow-lg"
              >
                Go Gold for $9.99/mo
              </Button>
              <p className="text-[10px] text-white/70 text-center">Auto-renews. Cancel anytime.</p>
            </div>
          </div>
          
          <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
        </Card>
      )}

      {user.isPremium && (
        <Card className="p-6 bg-emerald-500 text-white rounded-[32px] border-none shadow-xl shadow-emerald-100 mb-8 text-center">
          <Check className="mx-auto mb-4 w-12 h-12 bg-white/20 rounded-full p-2" />
          <h2 className="text-2xl font-bold mb-2">Gold Member Active</h2>
          <p className="text-emerald-50 text-sm">You are currently enjoying all premium benefits.</p>
        </Card>
      )}

      <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">Boost your Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <CreditPackage 
          icon={<Zap className="text-amber-500" />}
          amount="10 Credits"
          price="$4.99"
          onClick={() => buyCredits(10)}
        />
        <CreditPackage 
          icon={<Gem className="text-sky-500" />}
          amount="50 Credits"
          price="$14.99"
          bestValue
          onClick={() => buyCredits(50)}
        />
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-2">Why upgrade?</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Premium members are 3x more likely to find a match within the first 48 hours. 
          Use your credits to Super Like people you really connect with or Boost your profile to be seen by more people in your area.
        </p>
      </div>
    </div>
  );
};

const PremiumFeature = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3">
    <div className="bg-white/20 rounded-full p-1">
      <Check size={14} className="text-white" />
    </div>
    <span className="font-bold text-sm">{text}</span>
  </li>
);

const CreditPackage = ({ 
  icon, 
  amount, 
  price, 
  bestValue,
  onClick
}: { 
  icon: React.ReactNode; 
  amount: string; 
  price: string; 
  bestValue?: boolean;
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-[32px] bg-white border-2 flex flex-col items-center text-center transition-all active:scale-95 ${bestValue ? 'border-sky-500 shadow-lg shadow-sky-50' : 'border-slate-100'}`}
  >
    {bestValue && <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 -mt-9">BEST VALUE</span>}
    <div className="mb-2 text-2xl">{icon}</div>
    <div className="font-bold text-slate-900">{amount}</div>
    <div className="text-slate-400 text-xs mb-4">{price}</div>
    <div className="text-sky-600 text-[10px] font-bold uppercase">Buy Now</div>
  </button>
);