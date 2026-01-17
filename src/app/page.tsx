"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Globe, Sunrise, Award, X, Youtube, Star } from 'lucide-react';

// Import data from JSON files
import theForerunners from '@/data/The Forerunners.json';
import theTrendsetters from '@/data/The Trendsetters.json';
import theStrangers from '@/data/The Strangers.json';
import theRevivers from '@/data/The Revivers.json';
import theDistinguished from '@/data/The Distinguished.json';

// Define categories with colors and icons
const CATEGORIES = {
  '(The Forerunners)': {
    Icon: Sparkles,
    Color: 'text-emerald-400',
    BgColor: 'bg-emerald-400',
  },
  '(The Trendsetters)': {
    Icon: Zap,
    Color: 'text-amber-400',
    BgColor: 'bg-amber-400',
  },
  '(The Strangers)': {
    Icon: Globe,
    Color: 'text-indigo-400',
    BgColor: 'bg-indigo-400',
  },
  '(The Revivers )': { // Note space in JSON
    Icon: Sunrise,
    Color: 'text-cyan-400',
    BgColor: 'bg-cyan-400',
  },
   '(The Strangers )': { // Note space in JSON
    Icon: Globe,
    Color: 'text-indigo-400',
    BgColor: 'bg-indigo-400',
  },
  '(The Revivers)': {
    Icon: Sunrise,
    Color: 'text-cyan-400',
    BgColor: 'bg-cyan-400',
  },
  '(The Distinguished)': {
    Icon: Award,
    Color: 'text-pink-400',
    BgColor: 'bg-pink-400',
  }
};

// Combine all data sources
const ALL_RAW_DATA = [
  ...theForerunners,
  ...theTrendsetters,
  ...theStrangers,
  ...theRevivers,
  ...theDistinguished,
];

// Map the raw data to the format the component expects
const DATA = ALL_RAW_DATA.map((item, index) => {
  const categoryInfo = CATEGORIES[item.Categorization.trim() as keyof typeof CATEGORIES] || { Icon: Star, Color: 'text-slate-300', BgColor: 'bg-slate-300' };
  return {
    id: index + 1,
    title: item.Name,
    subtitle: item.Title,
    desc: item['Lives Summary'],
    reason: item['Reason behind the Title'],
    lessons: item['Lessons and Modern Application (Inferred)'],
    youtube: item['YouTube Title'],
    icon: categoryInfo.Icon,
    color: categoryInfo.Color,
    bgColor: categoryInfo.BgColor,
  };
});


// KONFIGURASI UKURAN & FISIKA
const RADIUS = 110; 
const CENTER_X = 0; 
const FRICTION = 0.92; 
const DEGREE_PER_ITEM = 18; 
const VISIBLE_ITEMS_RANGE = 12;

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  // State untuk Drag
  const [isDragging, setIsDragging] = useState(false);
  
  const velocityRef = useRef(0);
  const lastY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const rawIndex = Math.round(-rotation / DEGREE_PER_ITEM);
    const index = ((rawIndex % DATA.length) + DATA.length) % DATA.length;
    setActiveIndex(index);
  }, [rotation]);

  useEffect(() => {
    if (isDragging) {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        return;
    }

    const loop = () => {
      if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0;
          return;
      }
      setRotation((prev) => prev + velocityRef.current);
      velocityRef.current *= FRICTION; 
      animationFrameId.current = requestAnimationFrame(loop);
    };

    if (Math.abs(velocityRef.current) > 0.05) {
        loop();
    }
    
    return () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isDragging]);

  const handleWheel = (e: React.WheelEvent) => {
    velocityRef.current = 0;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    setRotation((prev) => prev - e.deltaY * 0.15);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastY.current = e.clientY;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault(); 
    const currentY = e.clientY;
    const delta = currentY - lastY.current;
    const sensitivity = 0.5;
    setRotation((prev) => prev + delta * sensitivity);
    velocityRef.current = delta * sensitivity; 
    lastY.current = currentY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const getVisibleItems = () => {
    const centerIndex = Math.round(-rotation / DEGREE_PER_ITEM);
    const items = [];

    for (let i = centerIndex - VISIBLE_ITEMS_RANGE; i <= centerIndex + VISIBLE_ITEMS_RANGE; i++) {
        const angleDeg = (i * DEGREE_PER_ITEM) + rotation;
        const dataIndex = ((i % DATA.length) + DATA.length) % DATA.length;
        
        items.push({
            virtualId: i,
            data: DATA[dataIndex],
            dataIndex: dataIndex,
            angleDeg: angleDeg
        });
    }
    return items;
  };

  const activeData = DATA[activeIndex] || DATA[0];
  const visibleItems = getVisibleItems();

  return (
    <div 
      className="h-[100dvh] w-full bg-slate-950 text-white overflow-hidden flex font-sans select-none touch-none overscroll-none"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000 ease-in-out bg-slate-950">
        <div className={`absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${activeData.bgColor}`}></div>
      </div>

      <div className="absolute left-0 top-0 h-full w-40 z-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full" style={{ height: 0 }}>
          {visibleItems.map((item) => {
            const angleRad = (item.angleDeg * Math.PI) / 180;
            const x = CENTER_X + RADIUS * Math.cos(angleRad);
            const y = RADIUS * Math.sin(angleRad);
            
            const distanceFromCenter = Math.abs(item.angleDeg);
            
            const opacity = 1 - distanceFromCenter / 100;
            const isActive = item.dataIndex === activeIndex;
            const scale = isActive ? 1.3 : 0.7 - distanceFromCenter / 140;

            if (opacity <= 0) return null;

            return (
              <div
                key={item.virtualId}
                className={`absolute transform -translate-y-1/2 flex items-center transition-transform duration-100 ease-out`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  opacity: Math.max(0, opacity),
                  transform: `translate(0, ${y}px) scale(${scale})`,
                  zIndex: isActive ? 50 : 10
                }}
              >
                <div className={`p-2 md:p-3 rounded-full backdrop-blur-md border border-white/5 shadow-2xl transition-all duration-300 ${isActive ? 'bg-white/20 border-white/30' : 'bg-slate-900/60'}`}>
                  <item.data.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.data.color}`} />
                </div>
              </div>
            );
          })}
        </div>
        <div 
            className="absolute top-1/2 transform -translate-y-1/2 border-r border-white/5 rounded-full pointer-events-none"
            style={{ left: CENTER_X, width: RADIUS * 2, height: RADIUS * 2 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-end pl-36 md:pl-60 pr-8 md:pr-24 z-10 pointer-events-none relative h-full">
        <div 
            key={activeData.id} 
            className="max-w-2xl pointer-events-auto text-right"
        > 
            <h2 className={`text-lg md:text-xl font-bold tracking-widest uppercase mb-2 animate-slideInRight ${activeData.color}`}>
                {activeData.subtitle}
            </h2>
            <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none animate-slideInRight text-white drop-shadow-2xl font-headline">
                {activeData.title}
            </h1>
            
            <div className="flex justify-end mb-8 w-full">
                <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${activeData.bgColor} w-full animate-progress origin-left`}></div>
                </div>
            </div>

            <p className="text-sm md:text-lg text-slate-300 font-light leading-relaxed mb-10 animate-slideInRight delay-100 font-body">
              {activeData.desc}
            </p>

            <div className="flex justify-end animate-slideInRight delay-200">
                <button 
                    onPointerDown={(e) => e.stopPropagation()} 
                    onClick={() => setShowModal(true)}
                    className={`px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-[0.2em] font-bold flex items-center gap-3 group cursor-pointer pointer-events-auto`}
                >
                    <span className={`group-hover:-translate-x-1 transition-transform duration-300 ${activeData.color}`}>←</span>
                    Read Biography
                </button>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-slate-700 text-[10px] uppercase tracking-widest font-mono">
        {String(activeIndex + 1).padStart(2, '0')} / {DATA.length}
      </div>

      {showModal && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
            onPointerDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
        >
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-8 animate-scaleIn font-body">
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <X className="w-6 h-6 text-slate-400 hover:text-white" />
                </button>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className={`p-4 rounded-xl ${activeData.bgColor}/20`}>
                            <activeData.icon className={`w-8 h-8 ${activeData.color}`} />
                        </div>
                        <div>
                            <h2 className={`text-sm font-bold tracking-widest uppercase ${activeData.color}`}>{activeData.subtitle}</h2>
                            <h1 className="text-3xl md:text-4xl font-black text-white font-headline">{activeData.title}</h1>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Reason Behind Title</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">{activeData.reason}</p>
                            
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Life Summary</h3>
                            <p className="text-slate-300 leading-relaxed">{activeData.desc}</p>
                        </div>
                        
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Lessons & Application
                            </h3>
                            <p className="text-slate-200 leading-relaxed italic mb-6">"{activeData.lessons}"</p>

                            <div className="mt-auto pt-4 border-t border-white/5">
                                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeData.youtube)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-red-400 hover:text-red-500 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Watch on YouTube</span>
                                </a>
                                <p className="text-slate-400 text-sm mt-2 line-clamp-2">{activeData.youtube}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-slideInRight {
            animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
            animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-progress {
            animation: progress 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
