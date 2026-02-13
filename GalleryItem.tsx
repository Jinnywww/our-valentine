
import React from 'react';

interface GalleryItemProps {
  label: string;
  color: string;
  hasHeart?: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ label, color, hasHeart }) => {
  return (
    <div className="flex flex-col items-center space-y-3 group w-full">
      <div className={`w-full aspect-square ${color} rounded-[2rem] flex items-center justify-center shadow-sm border border-white/60 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-rose-200/10"></div>
        {hasHeart && (
           <span className="text-white text-2xl opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all drop-shadow-md">❤️</span>
        )}
        {!hasHeart && (
           <div className="text-rose-200/60 group-hover:text-rose-400 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
           </div>
        )}
      </div>
      <span className="text-[11px] text-[#7c2d12]/80 font-bold text-center leading-tight uppercase tracking-tight group-hover:text-[#7c2d12] transition-colors">
        {label}
      </span>
    </div>
  );
};

export default GalleryItem;
