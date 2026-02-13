
import React, { useState } from 'react';
import { Plus, Check, Heart, User, Pencil, X as XIcon } from 'lucide-react';

interface Props {
  partnerAName: string;
  partnerBName: string;
  wishesA: string[];
  wishesB: string[];
  onAddA: (w: string) => void;
  onAddB: (w: string) => void;
  onRemoveA: (idx: number) => void;
  onRemoveB: (idx: number) => void;
  onEditA: (idx: number, val: string) => void;
  onEditB: (idx: number, val: string) => void;
}

const WishList: React.FC<Props> = ({ 
  partnerAName, partnerBName, wishesA, wishesB, 
  onAddA, onAddB, onRemoveA, onRemoveB, onEditA, onEditB
}) => {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  
  const [editingA, setEditingA] = useState<number | null>(null);
  const [editingB, setEditingB] = useState<number | null>(null);
  const [editVal, setEditVal] = useState('');

  const startEdit = (side: 'a' | 'b', idx: number, val: string) => {
    if (side === 'a') {
      setEditingA(idx);
      setEditingB(null);
    } else {
      setEditingB(idx);
      setEditingA(null);
    }
    setEditVal(val);
  };

  const saveEdit = (side: 'a' | 'b') => {
    if (side === 'a' && editingA !== null) {
      onEditA(editingA, editVal);
      setEditingA(null);
    } else if (side === 'b' && editingB !== null) {
      onEditB(editingB, editVal);
      setEditingB(null);
    }
  };

  return (
    <section className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-xl flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-rose-100/50">
        <div className="p-2 bg-rose-500 rounded-lg shadow-sm">
          <Heart className="w-4 h-4 text-white fill-white" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-900/60">Our Wish List</h3>
      </div>

      <div className="space-y-12 flex-1">
        {/* Partner A Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-black text-rose-900/80">{partnerAName}'s Wants</h4>
            <div className="h-[1px] flex-1 mx-4 bg-rose-100"></div>
          </div>
          
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Post a wish..."
              className="flex-1 bg-white/60 border-none rounded-xl px-4 py-2 text-xs font-semibold text-rose-900 focus:ring-1 focus:ring-rose-200 outline-none"
            />
            <button 
              onClick={() => { if(inputA){ onAddA(inputA); setInputA(''); } }}
              className="p-2 bg-rose-200 text-rose-600 rounded-xl hover:bg-rose-300 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {wishesA.map((wish, idx) => (
              <div key={idx} className="group flex items-center justify-between bg-white/40 p-3 rounded-xl border border-white/60 hover:bg-white/70 transition-all animate-in fade-in">
                {editingA === idx ? (
                  <div className="flex items-center space-x-2 w-full">
                    <input 
                      autoFocus
                      className="flex-1 bg-white text-[11px] px-2 py-1 rounded" 
                      value={editVal} 
                      onChange={(e) => setEditVal(e.target.value)}
                    />
                    <button onClick={() => saveEdit('a')}><Check className="w-3 h-3 text-green-500"/></button>
                    <button onClick={() => setEditingA(null)}><XIcon className="w-3 h-3 text-gray-400"/></button>
                  </div>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-rose-800">{wish}</span>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => startEdit('a', idx, wish)} className="p-1 text-rose-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => onRemoveA(idx)} className="p-1 text-rose-200 hover:text-green-500 transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partner B Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-black text-rose-900/80">{partnerBName}'s Wants</h4>
            <div className="h-[1px] flex-1 mx-4 bg-rose-100"></div>
          </div>
          
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Post a wish..."
              className="flex-1 bg-white/60 border-none rounded-xl px-4 py-2 text-xs font-semibold text-rose-900 focus:ring-1 focus:ring-rose-200 outline-none"
            />
            <button 
              onClick={() => { if(inputB){ onAddB(inputB); setInputB(''); } }}
              className="p-2 bg-rose-200 text-rose-600 rounded-xl hover:bg-rose-300 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {wishesB.map((wish, idx) => (
              <div key={idx} className="group flex items-center justify-between bg-white/40 p-3 rounded-xl border border-white/60 hover:bg-white/70 transition-all animate-in fade-in">
                {editingB === idx ? (
                  <div className="flex items-center space-x-2 w-full">
                    <input 
                      autoFocus
                      className="flex-1 bg-white text-[11px] px-2 py-1 rounded" 
                      value={editVal} 
                      onChange={(e) => setEditVal(e.target.value)}
                    />
                    <button onClick={() => saveEdit('b')}><Check className="w-3 h-3 text-green-500"/></button>
                    <button onClick={() => setEditingB(null)}><XIcon className="w-3 h-3 text-gray-400"/></button>
                  </div>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-rose-800">{wish}</span>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => startEdit('b', idx, wish)} className="p-1 text-rose-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => onRemoveB(idx)} className="p-1 text-rose-200 hover:text-green-500 transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 p-4 bg-rose-50/50 rounded-2xl text-center">
         <p className="text-[9px] font-bold text-rose-300 uppercase tracking-widest leading-relaxed">
           Grant a wish, grow the love.<br/>Every check is a memory.
         </p>
      </div>
    </section>
  );
};

export default WishList;
