
import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, Heart } from 'lucide-react';

const QUOTES = [
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
  "Meeting you was like listening to a song for the first time and knowing it would be my favorite.",
  "I love you not because of who you are, but because of who I am when I am with you.",
  "Home is not a place, it's a person."
];

interface Props {
  partnerA: string;
  partnerB: string;
}

const BottomBar: React.FC<Props> = ({ partnerA, partnerB }) => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.map(q => q).length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 z-[60] w-full flex justify-center px-6">
      <div className="bg-white/90 backdrop-blur-2xl rounded-full px-10 py-6 shadow-[0_20px_50px_rgba(244,63,94,0.15)] flex items-center w-full max-w-[1000px] border border-white/60">
        
        {/* Quote Section */}
        <div className="flex-1 flex items-center space-x-6">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 border border-rose-100">
            <Quote className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-rose-900/80 font-medium italic text-sm tracking-tight leading-relaxed animate-in fade-in slide-in-from-left-4 duration-1000">
            "{QUOTES[quoteIdx]}"
          </p>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-rose-100 mx-10"></div>

        {/* Status / Milestone Bar */}
        <div className="flex items-center space-x-8 flex-shrink-0">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">Milestone</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <p className="text-sm font-bold text-rose-900">{partnerA} & {partnerB}'s Journey</p>
          </div>
          
          <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-rose-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white group cursor-pointer hover:scale-110 transition-transform">
             <Heart className="w-6 h-6 text-white fill-white group-hover:animate-ping" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BottomBar;
