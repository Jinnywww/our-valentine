
import React, { useState, useRef } from 'react';
import { Calendar, Plus, Trash2, Camera, Upload, Pencil, Check, X as XIcon } from 'lucide-react';

interface Moment {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface Props {
  moments: Moment[];
  onAdd: (moment: Omit<Moment, 'id'>) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number, updated: { title: string; date: string; image: string }) => void;
}

const MomentTimeline: React.FC<Props> = ({ moments, onAdd, onRemove, onEdit }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400');
  
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editImage, setEditImage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!newTitle || !newDate) return;
    onAdd({
      title: newTitle,
      date: newDate,
      image: newImage
    });
    setNewTitle('');
    setNewDate('');
    setNewImage('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400');
    setIsAdding(false);
  };

  const startEdit = (moment: Moment) => {
    setEditingId(moment.id);
    setEditTitle(moment.title);
    setEditDate(moment.date);
    setEditImage(moment.image);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle && editDate) {
      onEdit(editingId, { title: editTitle, date: editDate, image: editImage });
      setEditingId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) setEditImage(reader.result as string);
        else setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10 border-b border-rose-100/50 pb-4">
        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-rose-900/40">Our Moments</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all shadow-md active:scale-90"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isAdding && (
        <div className="mb-10 p-6 bg-white/60 rounded-[2rem] border border-rose-100 shadow-sm animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Moment Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-white border-none rounded-xl px-4 py-2 text-sm text-rose-900 focus:ring-1 focus:ring-rose-200 outline-none"
            />
            <input 
              type="date" 
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-white border-none rounded-xl px-4 py-2 text-sm text-rose-900 focus:ring-1 focus:ring-rose-200 outline-none"
            />
          </div>
          
          <div className="mb-4">
             <div className="flex items-center space-x-3">
               <div className="w-16 h-16 rounded-xl overflow-hidden bg-rose-50 border border-rose-100">
                 <img src={newImage} alt="Moment Preview" className="w-full h-full object-cover" />
               </div>
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center space-x-2 bg-white/80 border border-rose-100 rounded-xl px-4 py-2 text-xs font-bold text-rose-600 hover:bg-white transition-all"
               >
                 <Upload className="w-4 h-4" />
                 <span>Upload Photo</span>
               </button>
               <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, false)} 
               />
             </div>
          </div>

          <div className="flex space-x-3">
             <button onClick={handleAdd} className="flex-1 bg-rose-500 text-white py-2 rounded-xl text-xs font-bold hover:bg-rose-600 transition-all">Add Memory</button>
             <button onClick={() => setIsAdding(false)} className="px-6 py-2 border border-rose-200 text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="relative pl-8 space-y-10">
        {/* Timeline Axis */}
        <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-200 via-rose-100 to-transparent"></div>

        {moments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((moment) => (
          <div key={moment.id} className="relative group animate-in fade-in slide-in-from-left-4">
            {/* Timeline Dot */}
            <div className="absolute -left-[33px] top-1.5 w-6 h-6 bg-white border-4 border-rose-300 rounded-full z-10 shadow-sm group-hover:scale-125 transition-transform"></div>
            
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-white/30 backdrop-blur-sm p-6 rounded-[2.5rem] border border-white/40 hover:bg-white/50 transition-all group-hover:shadow-lg">
              {editingId === moment.id ? (
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-white px-3 py-2 rounded-xl text-xs border border-rose-100"
                    />
                    <input 
                      type="date" 
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="bg-white px-3 py-2 rounded-xl text-xs border border-rose-100"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <img src={editImage} className="w-12 h-12 rounded-lg object-cover" />
                    <button 
                      onClick={() => editFileInputRef.current?.click()}
                      className="text-[10px] font-bold text-rose-500 uppercase"
                    >
                      Change Photo
                    </button>
                    <input type="file" ref={editFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={handleSaveEdit} className="p-2 bg-green-500 text-white rounded-lg"><Check className="w-4 h-4"/></button>
                    <button onClick={() => setEditingId(null)} className="p-2 bg-gray-200 text-gray-500 rounded-lg"><XIcon className="w-4 h-4"/></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0 shadow-inner">
                    <img src={moment.image} alt={moment.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(moment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h4 className="text-xl font-serif font-black text-rose-900 group-hover:text-rose-600 transition-colors">{moment.title}</h4>
                    <p className="text-xs text-rose-800/60 mt-2 font-medium italic leading-relaxed">
                      "Another page in our never-ending book of love."
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => startEdit(moment)}
                      className="p-2 text-rose-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onRemove(moment.id)}
                      className="p-2 text-rose-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentTimeline;
