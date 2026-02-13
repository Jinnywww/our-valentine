
import React, { useState, useEffect } from 'react';

interface LoveCounterProps {
  startDate: Date;
  variant?: 'compact' | 'minimal' | 'full';
}

const LoveCounter: React.FC<LoveCounterProps> = ({ startDate, variant = 'full' }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTime({ days, hours, minutes });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000); // Update every second for better feel
    return () => clearInterval(timer);
  }, [startDate]);

  const formattedDate = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (variant === 'minimal') {
    return (
      <p className="text-[10px] text-rose-800/60 font-medium tracking-tight">
        We have been in love for {time.days} Days, {time.hours} Hours, and {time.minutes} Minutes
      </p>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="text-center">
        <p className="text-[8px] uppercase tracking-widest text-rose-900/40 font-bold mb-1">Inseparable Since</p>
        <p className="text-[10px] font-serif italic text-rose-800">{formattedDate}</p>
        <p className="text-[10px] font-serif italic text-rose-800 mt-1">{time.days} Days, {time.hours} Hours</p>
      </div>
    );
  }

  return (
    <div className="text-center w-full">
      <div className="mb-4">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-rose-900/40 font-black mb-1">Inseparable Since</p>
        <p className="text-sm font-serif italic text-rose-800/60">{formattedDate}</p>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-end justify-between border-b border-rose-100 pb-2">
          <span className="text-3xl font-serif font-black text-rose-900">{time.days}</span>
          <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest mb-1">Days</span>
        </div>
        <div className="flex items-end justify-between border-b border-rose-100 pb-2">
          <span className="text-3xl font-serif font-black text-rose-900">{time.hours}</span>
          <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest mb-1">Hours</span>
        </div>
        <div className="flex items-end justify-between border-b border-rose-100 pb-2">
          <span className="text-3xl font-serif font-black text-rose-900">{time.minutes}</span>
          <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest mb-1">Minutes</span>
        </div>
      </div>
    </div>
  );
};

export default LoveCounter;
