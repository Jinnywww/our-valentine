
import React, { useMemo } from 'react';

const FallingPetals: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${15 + Math.random() * 20}px`,
      color: Math.random() > 0.5 ? '#fbcfe8' : '#f9a8d4'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '50% 0 50% 50%',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        />
      ))}
    </div>
  );
};

export default FallingPetals;
