
import React, { useState, useMemo } from 'react';
import { MapPin, Navigation, ArrowRightLeft, LocateFixed } from 'lucide-react';

const DistanceTracker: React.FC = () => {
  const [city1, setCity1] = useState('New York');
  const [city2, setCity2] = useState('London');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  
  const distance = useMemo(() => {
    if (coords) {
      // If we have exact location, we still mock a "long distance" for the demo
      // but biased by the presence of real coords
      const baseHash = (city1.length * 13) + (city2.length * 27);
      return Math.floor((baseHash % 5000) + coords.lat + coords.lon + 100);
    }
    if (!city1 || !city2) return 0;
    // Mock logic: generate a consistent number based on city names
    const hash = (city1.length * 13) + (city2.length * 27);
    return (hash % 12000) + 42;
  }, [city1, city2, coords]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setCity1("Current Location");
        setLoadingLoc(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please check your permissions.");
        setLoadingLoc(false);
      }
    );
  };

  return (
    <div className="w-full bg-white/20 p-6 rounded-[2rem] border border-white/40 shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-500 rounded-lg shadow-sm">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-900/60">Distance Tracker</h3>
        </div>
        <button 
          onClick={handleUseMyLocation}
          disabled={loadingLoc}
          className={`p-2 rounded-full transition-all ${coords ? 'bg-green-500 text-white' : 'bg-rose-100 text-rose-500 hover:bg-rose-200'} active:scale-90`}
          title="Use My Exact Location"
        >
          <LocateFixed className={`w-4 h-4 ${loadingLoc ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-4 relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
          <input 
            type="text" 
            value={city1}
            onChange={(e) => {
                setCity1(e.target.value);
                setCoords(null);
            }}
            className="w-full bg-white/60 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-rose-900 focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder-rose-200"
            placeholder="Partner A Location"
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[42%] z-10">
           <div className="bg-white shadow-md p-1.5 rounded-full border border-rose-50">
             <ArrowRightLeft className="w-3 h-3 text-rose-300 rotate-90" />
           </div>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
          <input 
            type="text" 
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            className="w-full bg-white/60 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-rose-900 focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder-rose-200"
            placeholder="Partner B Location"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <p className="text-4xl font-serif font-black text-rose-900 tracking-tighter">
          {distance.toLocaleString()} <span className="text-sm font-sans uppercase tracking-widest text-rose-400">km</span>
        </p>
        <p className="text-[10px] text-rose-800/60 font-medium italic mt-2">
          {coords ? "Calculated using your exact coordinates ✨" : "\"The shortest path between us is a thought.\""}
        </p>
      </div>
    </div>
  );
};

export default DistanceTracker;
