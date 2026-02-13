
import React, { useState } from 'react';
import { Settings, Heart } from 'lucide-react';
import FallingPetals from './components/FallingPetals';
import LoveCounter from './components/LoveCounter';
import DistanceTracker from './components/DistanceTracker';
import MomentTimeline from './components/MomentTimeline';
import WishList from './components/WishList';
import EditModal from './components/EditModal';
import BottomBar from './components/BottomBar';

const App: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Universal App State
  const [config, setConfig] = useState({
    partnerA: 'Kevin',
    partnerB: 'Peri',
    partnerAImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&h=300&auto=format&fit=crop',
    partnerBImg: 'https://images.unsplash.com/photo-1573865526739-10659fef73a5?q=80&w=300&h=300&auto=format&fit=crop',
    startDate: '2024-06-15',
    theme: 'bg-gradient-to-br from-[#f8d7da] via-[#f3e5f5] to-[#e1f5fe]'
  });

  const [moments, setMoments] = useState([
    { id: 1, title: 'Our First Date', date: '2024-06-15', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400' },
    { id: 2, title: 'Summer Trip', date: '2024-07-20', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' }
  ]);

  const [wishes, setWishes] = useState({
    a: ['Weekend getaway', 'Cook dinner together'],
    b: ['Sunrise walk', 'Movie marathon night']
  });

  const handleEditMoment = (id: number, updatedMoment: { title: string; date: string; image: string }) => {
    setMoments(moments.map(m => m.id === id ? { ...m, ...updatedMoment } : m));
  };

  const handleEditWish = (side: 'a' | 'b', index: number, newValue: string) => {
    const updated = [...wishes[side]];
    updated[index] = newValue;
    setWishes({ ...wishes, [side]: updated });
  };

  return (
    <div className={`min-h-screen relative ${config.theme} font-sans selection:bg-rose-200 overflow-x-hidden flex flex-col items-center transition-colors duration-700`}>
      <FallingPetals />
      
      {/* Universal Header */}
      <header className="relative z-20 w-full max-w-7xl px-8 pt-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="text-rose-500 fill-rose-500 w-6 h-6 animate-pulse" />
          <h1 className="text-3xl font-romantic font-bold text-rose-900">Our Shared Story</h1>
        </div>
        <button 
          onClick={() => setIsEditOpen(true)}
          className="flex items-center space-x-2 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-white/80 rounded-full text-sm font-bold text-rose-900 hover:bg-white/90 transition-all shadow-lg active:scale-95"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Dashboard</span>
        </button>
      </header>

      {/* 3-Column SaaS Style Dashboard */}
      <main className="relative z-10 w-full max-w-[1440px] px-4 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-40">
        
        {/* LEFT COLUMN: Connection & Stats */}
        <div className="lg:col-span-3 flex flex-col space-y-8 h-full">
          <section className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 shadow-xl flex flex-col h-full">
             <div className="flex flex-col items-center mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-rose-900/40 mb-8">Relationship Clock</h3>
                <LoveCounter startDate={new Date(config.startDate)} />
             </div>
             <div className="mt-auto">
                <DistanceTracker />
             </div>
          </section>
        </div>

        {/* CENTER COLUMN: The Moment Timeline */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <section className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3.5rem] p-10 shadow-2xl relative">
            {/* Profile Sync */}
            <div className="flex items-center justify-around mb-16 relative">
              <div className="flex flex-col items-center space-y-4 group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[8px] border-white shadow-2xl overflow-hidden ring-4 ring-rose-50/50 group-hover:scale-105 transition-transform duration-500">
                  <img src={config.partnerAImg} alt={config.partnerA} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-4xl font-romantic font-bold text-rose-900">{config.partnerA}</h2>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className="w-14 h-14 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-rose-100 animate-bounce">
                    <Heart className="text-rose-500 fill-rose-500 w-8 h-8" />
                 </div>
              </div>

              <div className="flex flex-col items-center space-y-4 group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[8px] border-white shadow-2xl overflow-hidden ring-4 ring-rose-50/50 group-hover:scale-105 transition-transform duration-500">
                  <img src={config.partnerBImg} alt={config.partnerB} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-4xl font-romantic font-bold text-rose-900">{config.partnerB}</h2>
              </div>
            </div>

            <MomentTimeline 
              moments={moments} 
              onAdd={(m) => setMoments([...moments, { ...m, id: Date.now() }])}
              onRemove={(id) => setMoments(moments.filter(m => m.id !== id))}
              onEdit={handleEditMoment}
            />
          </section>
        </div>

        {/* RIGHT COLUMN: Interactive Wish List */}
        <div className="lg:col-span-3 flex flex-col space-y-8">
           <WishList 
             partnerAName={config.partnerA} 
             partnerBName={config.partnerB} 
             wishesA={wishes.a} 
             wishesB={wishes.b}
             onAddA={(w) => setWishes({...wishes, a: [...wishes.a, w]})}
             onAddB={(w) => setWishes({...wishes, b: [...wishes.b, w]})}
             onRemoveA={(idx) => setWishes({...wishes, a: wishes.a.filter((_, i) => i !== idx)})}
             onRemoveB={(idx) => setWishes({...wishes, b: wishes.b.filter((_, i) => i !== idx)})}
             onEditA={(idx, val) => handleEditWish('a', idx, val)}
             onEditB={(idx, val) => handleEditWish('b', idx, val)}
           />
        </div>
      </main>

      <BottomBar partnerA={config.partnerA} partnerB={config.partnerB} />

      <EditModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        config={config} 
        onSave={(newConfig) => {
          setConfig(newConfig);
          setIsEditOpen(false);
        }}
      />
    </div>
  );
};

export default App;
