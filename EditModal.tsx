
import React, { useState, useRef } from 'react';
import { X, Save, Palette, Calendar, User, Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: any;
  onSave: (config: any) => void;
}

const THEMES = [
  { id: 'rose', name: 'Sweet Rose', class: 'bg-gradient-to-br from-[#f8d7da] via-[#f3e5f5] to-[#e1f5fe]' },
  { id: 'lavender', name: 'Magic Lavender', class: 'bg-gradient-to-br from-[#f3e8ff] via-[#fae8ff] to-[#fce7f3]' },
  { id: 'sunset', name: 'Golden Hour', class: 'bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fee2e2]' },
  { id: 'ocean', name: 'Deep Sea Love', class: 'bg-gradient-to-br from-[#ecfeff] via-[#e0f2fe] to-[#eff6ff]' },
  { id: 'midnight', name: 'Midnight Sky', class: 'bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white' },
  { id: 'forest', name: 'Emerald Forest', class: 'bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]' },
  { id: 'cherry', name: 'Cherry Blossom', class: 'bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3]' },
  { id: 'minimal', name: 'Cloud Nine', class: 'bg-gradient-to-br from-[#fafafa] via-[#f4f4f5] to-[#e4e4e7]' }
];

const EditModal: React.FC<Props> = ({ isOpen, onClose, config, onSave }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, partner: 'A' | 'B') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalConfig({
          ...localConfig,
          [partner === 'A' ? 'partnerAImg' : 'partnerBImg']: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-rose-900/40 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-rose-500 p-8 flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-romantic font-bold">Customize Your Portal</h2>
            <p className="text-xs text-rose-100 font-medium opacity-80 uppercase tracking-widest mt-1">Universal Template for Every Couple</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Partners Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-rose-900/40">
              <User className="w-4 h-4" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Partners Identity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Partner A */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Partner A Name</label>
                  <input 
                    value={localConfig.partnerA}
                    onChange={(e) => setLocalConfig({...localConfig, partnerA: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-900 focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Partner A Photo</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-rose-100">
                      <img src={localConfig.partnerAImg} alt="Preview A" className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={() => fileInputARef.current?.click()}
                      className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose File</span>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputARef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'A')}
                    />
                  </div>
                </div>
              </div>

              {/* Partner B */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Partner B Name</label>
                  <input 
                    value={localConfig.partnerB}
                    onChange={(e) => setLocalConfig({...localConfig, partnerB: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-900 focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Partner B Photo</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-rose-100">
                      <img src={localConfig.partnerBImg} alt="Preview B" className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={() => fileInputBRef.current?.click()}
                      className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose File</span>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputBRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'B')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Dates Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-rose-900/40">
              <Calendar className="w-4 h-4" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Important Milestones</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Anniversary / Start Date</label>
              <input 
                type="date"
                value={localConfig.startDate}
                onChange={(e) => setLocalConfig({...localConfig, startDate: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-semibold text-rose-900 focus:ring-2 focus:ring-rose-200 outline-none"
              />
              <p className="text-[9px] text-rose-300 font-medium italic mt-1">This date will update the relationship clock on your dashboard.</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Theme Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-rose-900/40">
              <Palette className="w-4 h-4" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Dashboard Aesthetic</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setLocalConfig({...localConfig, theme: theme.class})}
                  className={`relative p-3 rounded-2xl border-2 transition-all text-left ${localConfig.theme === theme.class ? 'border-rose-500 bg-rose-50' : 'border-slate-50 hover:bg-slate-50'}`}
                >
                  <div className={`w-full aspect-square rounded-xl ${theme.class} mb-2 shadow-inner border border-white/20`}></div>
                  <span className="text-[10px] font-black text-slate-700 block text-center uppercase tracking-tighter">{theme.name}</span>
                  {localConfig.theme === theme.class && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Save className="w-2 h-2 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button onClick={onClose} className="px-6 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Cancel</button>
          <button 
            onClick={() => onSave(localConfig)}
            className="flex items-center justify-center space-x-2 bg-rose-500 text-white px-10 py-3 rounded-2xl text-xs font-black shadow-lg hover:bg-rose-600 transition-all active:scale-95 uppercase tracking-widest"
          >
            <Save className="w-4 h-4" />
            <span>Apply Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
