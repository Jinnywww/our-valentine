
import React from 'react';

interface ScrollCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
}

const ScrollCard: React.FC<ScrollCardProps> = ({ title, content, children }) => {
  return (
    <div className="relative w-full group transition-all duration-300 hover:-translate-y-1">
      {/* Scroll Top Roll */}
      <div className="absolute -top-2 left-0 right-0 h-5 bg-[#fff8e1] border border-[#f5e1a4] rounded-full shadow-md z-20 flex items-center justify-center overflow-hidden">
         <div className="w-full h-[1px] bg-[#f5e1a4]/50"></div>
      </div>
      
      {/* Scroll Main Body */}
      <div className="bg-[#fffdf7] min-h-[160px] w-full p-6 pt-10 pb-10 border-x border-[#f5e1a4]/60 shadow-lg rounded-sm overflow-hidden relative">
        {/* Paper texture subtle overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none"></div>
        
        <h4 className="relative z-10 text-[11px] font-serif font-black text-[#7c2d12] border-b border-[#f5e1a4]/40 pb-2 mb-3 text-center uppercase tracking-widest">
          {title}
        </h4>
        
        {content && (
          <p className="relative z-10 text-[10px] text-[#9a3412]/80 leading-relaxed font-serif italic text-center">
            {content}
          </p>
        )}
        
        <div className="relative z-10 flex flex-col items-center">
          {children}
        </div>
      </div>

      {/* Scroll Bottom Roll */}
      <div className="absolute -bottom-2 left-0 right-0 h-5 bg-[#fff8e1] border border-[#f5e1a4] rounded-full shadow-md z-20 flex items-center justify-center overflow-hidden">
         <div className="w-full h-[1px] bg-[#f5e1a4]/50"></div>
      </div>
    </div>
  );
};

export default ScrollCard;
