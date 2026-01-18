"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, Send, Heart, Instagram, Linkedin, Globe, ArrowLeft,
  Sparkles, Zap, Anchor, Music, Camera, Star, Moon, Sun, Book, Shield, 
  Scroll, Users, Flame, Tent, Sunrise, Award, Feather, Crown, Key, Leaf, 
  Droplet, Cloud, Eye, Compass, Map, Flag, Youtube, Target, RefreshCw as RefreshCwIcon,
  Search
} from 'lucide-react';

// Import data from JSON files
import theForerunners from '@/data/The Forerunners.json';
import theTrendsetters from '@/data/The Trendsetters.json';
import theStrangers from '@/data/The Strangers.json';
import theRevivers from '@/data/The Revivers.json';
import theDistinguished from '@/data/The Distinguished.json';

// Import images from the root directory
import forerunnersImg from '../../Image Cover/Forerunners.png';
import trendsettersImg from '../../Image Cover/Trendsetters.png';
import strangersImg from '../../Image Cover/Strangers.png';
import reviversImg from '../../Image Cover/Revivers.png';
import distinguishedImg from '../../Image Cover/Distinguished.png';


// Extend the Window interface for the pendingCompanion hack
declare global {
  interface Window {
    pendingCompanion: any;
  }
}

/* -------------------------------------------------------------------------- */
/* DATA MAPPING & CONFIG                                                      */
/* -------------------------------------------------------------------------- */

const CATEGORY_STYLES: { [key: string]: { icon: React.ElementType; color: string } } = {
  '(The Forerunners)': { icon: Crown, color: "text-emerald-400" },
  '(The Trendsetters)': { icon: Flag, color: "text-amber-400" },
  '(The Strangers)': { icon: Moon, color: "text-indigo-400" },
  '(The Strangers )': { icon: Moon, color: "text-indigo-400" },
  '(The Revivers)': { icon: Zap, color: "text-cyan-400" },
  '(The Revivers )': { icon: Zap, color: "text-cyan-400" },
  '(The Distinguished)': { icon: Star, color: "text-pink-400" },
  'default': { icon: Target, color: 'text-slate-400'}
};

const ALL_RAW_DATA = [
  ...theForerunners,
  ...theTrendsetters,
  ...theStrangers,
  ...theRevivers,
  ...theDistinguished,
];

const ALL_COMPANIONS_DATA = ALL_RAW_DATA.map((item, index) => {
    const style = CATEGORY_STYLES[item.Categorization.trim() as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.default;
    return {
      id: index,
      title: item.Name,
      subtitle: item.Title,
      icon: style.icon,
      color: style.color,
      youtube: item["YouTube Title"],
      reason: item["Reason behind the Title"],
      desc: item["Lives Summary"],
      lessons: item["Lessons and Modern Application (Inferred)"],
    };
});

const CATEGORIES = [
  { 
    id: 1, 
    name: 'The Forerunners', 
    arabicTitle: 'السَّابِقُونَ', 
    tagline: 'The Firsts to Embrace The Call.', 
    color: '#10B981', // Emerald
    img: forerunnersImg,
    dataStartIndex: 0 
  },
  { 
    id: 2, 
    name: 'The Trendsetters', 
    arabicTitle: 'الْمُسْتَنُّونَ', 
    tagline: 'Whoever Starts a Good Tradition...', 
    color: '#F59E0B', // Amber
    img: trendsettersImg,
    dataStartIndex: theForerunners.length 
  },
  { 
    id: 3, 
    name: 'The Strangers', 
    arabicTitle: 'الْغُرَبَاءُ', 
    tagline: 'Blessed are those who remain firm.', 
    color: '#6366F1', // Indigo
    img: strangersImg,
    dataStartIndex: theForerunners.length + theTrendsetters.length
  },
  { 
    id: 4, 
    name: 'The Revivers', 
    arabicTitle: 'الْمُجَدِّدُونَ', 
    tagline: 'Those who Restore the Forgotten Sunnah.', 
    color: '#06B6D4', // Cyan
    img: reviversImg,
    dataStartIndex: theForerunners.length + theTrendsetters.length + theStrangers.length
  },
  { 
    id: 5, 
    name: 'The Distinguished', 
    arabicTitle: 'الْمُحْسِنُونَ', 
    tagline: 'The Ones who Strive for Excellence.', 
    color: '#EC4899', // Pink
    img: distinguishedImg,
    dataStartIndex: theForerunners.length + theTrendsetters.length + theStrangers.length + theRevivers.length
  },
];

function RefreshCw(props: any) {
    return <Zap {...props} />
}

const DEFINITIONS = [
  { 
      title: "The Forerunners", 
      text: "The first to respond. They do not hesitate when called to truth. Their defining trait is speed in doing good.",
      icon: Crown,
      trait: "Initiative & Speed"
  },
  { 
      title: "The Trendsetters", 
      text: "They establish traditions. When others are confused, they carve a path. They lead by example, not just words.",
      icon: Flag,
      trait: "Leadership & Innovation"
  },
  { 
      title: "The Strangers", 
      text: "They stand firm when alone. To be strange is to hold onto values when the world lets them go.",
      icon: Moon,
      trait: "Resilience & Integrity"
  },
  { 
      title: "The Revivers", 
      text: "They breathe life into the forgotten. They restore what time has eroded. They are the guardians of legacy.",
      icon: RefreshCw,
      trait: "Restoration & Knowledge"
  },
  { 
      title: "The Distinguished", 
      text: "They seek perfection (Ihsan). Good enough is not enough. They beautify every action with sincerity.",
      icon: Star,
      trait: "Excellence & Beauty"
  }
];

const CHAT_MESSAGES = [
  { id: 1, text: "Assalamu Alaikum! 👋", sender: 'bot', delay: 0.2 },
  { id: 2, text: "Welcome to The Firsts Project.", sender: 'bot', delay: 0.8 },
  { id: 3, text: "We combine modern design with authentic Islamic history.", sender: 'bot', delay: 1.6 },
  { id: 4, text: "Our goal is to revive the stories of the Sahaba.", sender: 'bot', delay: 2.4 },
  { id: 5, text: "Using technology to make history accessible.", sender: 'bot', delay: 3.2 },
  { id: 6, text: "Open for collaboration opportunities! 👇", sender: 'bot', delay: 4.0 }, 
];

/* -------------------------------------------------------------------------- */
/* COMPONENT: MOSAIC BACKGROUND (Transition Effect)                           */
/* -------------------------------------------------------------------------- */
const MosaicBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const COLUMNS = 12; 
  const ROWS = 8;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex flex-col bg-neutral-900">
      <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-6 md:grid-rows-8">
        {[...Array(96)].map((_, i) => { 
          const col = i % 12;
          const row = Math.floor(i / 12);
          const delay = (col + row) * 50; 
          return (
            <div key={i} className="perspective-[800px] w-full h-full">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isDarkMode ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  transitionDelay: `${delay}ms`
                }}
              >
                <div className="absolute inset-0 backface-hidden bg-[#F5F5DC] scale-[1.02]" style={{ backfaceVisibility: 'hidden' }} />
                <div 
                  className="absolute inset-0 backface-hidden bg-slate-950 scale-[1.02]" 
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateX(180deg)' 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


/* -------------------------------------------------------------------------- */
/* GLOBAL STYLES                                                              */
/* -------------------------------------------------------------------------- */
const GlobalStyles = () => (
  <style>{`
    @keyframes slideInRight { 0% { opacity:0; transform:translateX(40px); } 100% { opacity:1; transform:translateX(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
    @keyframes progress { 0% { transform:translateX(-100%); } 100% { transform:translateX(0); } }
    .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
    .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-progress { animation: progress 0.8s ease-out forwards; }
    .delay-100 { animation-delay: 0.1s; opacity: 0; } 
    .delay-200 { animation-delay: 0.2s; opacity: 0; }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENT: CIRCULAR WHEEL (Immersive Detail View)                      */
/* -------------------------------------------------------------------------- */
const CompanionWheel = ({ items, categoryInfo, onClose, isDarkMode, initialCompanionId }: { items: any[], categoryInfo: any, onClose: () => void, isDarkMode: boolean, initialCompanionId: number | null }) => {
  const CONFIG = { friction: 0.92, degPerItem: 36, visibleRange: 5 }; 
  
  const [state, setState] = useState({ rotation: 0, showModal: false, isDragging: false });
  const refs = useRef({ velocity: 0, lastY: 0, animId: null as number | null });
  const [layout, setLayout] = useState({ mode: 'desktop', radius: 120, centerX: 0 });

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setLayout({ mode: 'mobile', radius: 0, centerX: 0 });
      } else if (w < 1024) {
        setLayout({ mode: 'tablet', radius: 350, centerX: -240 });
      } else {
        setLayout({ mode: 'desktop', radius: 120, centerX: 0 });
      }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);
  
  useEffect(() => {
    if (initialCompanionId !== null) {
        const initialIndex = items.findIndex(item => item.id === initialCompanionId);
        if (initialIndex > -1) {
            const targetRotation = -initialIndex * CONFIG.degPerItem;
            setState(prevState => ({ ...prevState, rotation: targetRotation }));
        }
    }
  }, [initialCompanionId, items, CONFIG.degPerItem]);

  const DATA = items;

  const sidebarItemBgActive = isDarkMode ? 'bg-white/20 border-white/30' : 'bg-black/10 border-black/10';
  const sidebarItemBgInactive = isDarkMode ? 'bg-slate-900/60' : 'bg-[#F5F5DC]/60 shadow-lg';
  const backBtnClass = isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white border-white/5' : 'bg-black/5 hover:bg-black/10 text-black border-black/5';
  const readBtnClass = isDarkMode ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white' : 'border-black/10 bg-black/5 hover:bg-black/10 hover:border-black/30 text-black';
  const subTextClass = isDarkMode ? 'text-slate-300' : 'text-slate-800'; 
  const modalBg = isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-[#F5F5DC] border-black/5 text-black';
  const modalTextMain = isDarkMode ? 'text-white' : 'text-black';
  const modalTextSub = isDarkMode ? 'text-slate-300' : 'text-slate-700'; 
  const modalOverlay = isDarkMode ? 'bg-slate-950/80' : 'bg-slate-200/50';

  const activeIndex = useMemo(() => {
    if (!DATA || DATA.length === 0) return 0;
    const raw = Math.round(-state.rotation / CONFIG.degPerItem);
    return ((raw % DATA.length) + DATA.length) % DATA.length;
  }, [state.rotation, DATA.length, CONFIG.degPerItem]);

  const visibleItems = useMemo(() => {
    if (!DATA || DATA.length === 0) return [];
    const centerIdx = Math.round(-state.rotation / CONFIG.degPerItem);
    const result = [];
    for (let i = centerIdx - CONFIG.visibleRange; i <= centerIdx + CONFIG.visibleRange; i++) {
      result.push({ 
        id: i, 
        data: DATA[((i % DATA.length) + DATA.length) % DATA.length], 
        angle: (i * CONFIG.degPerItem) + state.rotation 
      });
    }
    return result;
  }, [state.rotation, DATA, CONFIG.degPerItem, CONFIG.visibleRange]);

  useEffect(() => {
    if (state.isDragging) {
        if(refs.current.animId) cancelAnimationFrame(refs.current.animId);
        return;
    }
    const loop = () => {
      if (Math.abs(refs.current.velocity) < 0.05) {
          refs.current.velocity = 0;
          return;
      }
      setState(p => ({ ...p, rotation: p.rotation + refs.current.velocity }));
      refs.current.velocity *= CONFIG.friction;
      refs.current.animId = requestAnimationFrame(loop);
    };
    if (Math.abs(refs.current.velocity) > 0.05) loop();
    return () => {
        if(refs.current.animId) cancelAnimationFrame(refs.current.animId)
    };
  }, [state.isDragging, CONFIG.friction]);

  const handlers = {
    wheel: (e: React.WheelEvent) => {
      refs.current.velocity = 0;
      setState(p => ({ ...p, rotation: p.rotation - e.deltaY * 0.15 }));
    },
    down: (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      refs.current.velocity = 0;
      refs.current.lastY = e.clientY;
      setState(p => ({ ...p, isDragging: true }));
    },
    move: (e: React.PointerEvent) => {
      if (!state.isDragging) return;
      const delta = e.clientY - refs.current.lastY;
      setState(p => ({ ...p, rotation: p.rotation + delta * 0.5 }));
      refs.current.velocity = delta * 0.5;
      refs.current.lastY = e.clientY;
    },
    up: (e: React.PointerEvent) => {
      setState(p => ({ ...p, isDragging: false }));
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const active = DATA[activeIndex] || DATA[0];
  if (!active) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden flex font-body select-none touch-none overscroll-none z-50 transition-colors duration-500 bg-transparent text-slate-900`}
      onWheel={handlers.wheel} onPointerDown={handlers.down} onPointerMove={handlers.move} onPointerUp={handlers.up} onPointerLeave={handlers.up}>
      
      <button 
        onClick={onClose}
        onPointerDown={(e) => e.stopPropagation()}
        className={`absolute top-6 left-6 md:top-12 md:left-12 z-[100] p-3 rounded-full backdrop-blur-md transition-colors flex items-center gap-2 pointer-events-auto border cursor-pointer ${backBtnClass}`}
      >
        <ArrowLeft size={20} />
        <span className="font-bold text-xs uppercase tracking-widest hidden md:inline">HOME</span>
      </button>

      <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000`}>
        <div className={`absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] transition-colors duration-700 ${active.color.replace('text-', 'bg-')}`} style={{ opacity: isDarkMode ? 0.3 : 0.2 }} />
      </div>

      <div className="absolute left-0 top-0 h-full w-20 md:w-24 lg:w-40 z-30 pointer-events-none">
        <div className="absolute top-1/2 w-full h-0">
          {visibleItems.map(({ id, data, angle }) => {
            if (!data) return null;
            const rad = (angle * Math.PI) / 180;
            const dist = Math.abs(angle);
            const opacity = 1 - dist / 100;
            if (opacity <= 0) return null;
            const isActive = data.id === active.id;
            
            let x, y, scale;
            if (layout.mode === 'mobile') {
                x = 0;
                y = angle * 3.0;
                scale = isActive ? 1.2 : 0.8;
            } else {
                x = layout.centerX + layout.radius * Math.cos(rad);
                y = layout.radius * Math.sin(rad);
                scale = isActive ? 1.3 : 0.7 - dist / 140;
            }

            return (
              <div key={id} className="absolute transform -translate-y-1/2 transition-transform duration-100 ease-out flex items-center justify-center w-full"
                style={{
                  top: 0,
                  left: 0, 
                  opacity, 
                  zIndex: isActive ? 50 : 10,
                  transform: `translate(${x}px, ${y}px) scale(${scale})`
                }}>
                <div className={`p-2 md:p-3 rounded-full backdrop-blur-md border shadow-2xl transition-all duration-300 ${isActive ? sidebarItemBgActive : sidebarItemBgInactive}`}>
                  <data.icon className={`w-4 h-4 md:w-5 md:h-5 ${data.color}`} />
                </div>
              </div>
            );
          })}
        </div>
        {layout.mode !== 'mobile' && (
            <div className={`absolute top-1/2 -translate-y-1/2 border-r rounded-full pointer-events-none ${isDarkMode ? 'border-white/5' : 'border-black/5'}`} 
                 style={{ left: layout.centerX, width: layout.radius * 2, height: layout.radius * 2 }} />
        )}
      </div>

      <div className={`flex-1 flex flex-col justify-center items-end pl-20 md:pl-32 lg:pl-60 pr-4 md:pr-12 lg:pr-24 z-10 pointer-events-none h-full relative ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        <div key={active.id} className="max-w-2xl pointer-events-auto text-right w-full">
            <h3 className={`text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 ${isDarkMode ? 'text-white/30' : 'text-black/50'}`}>{categoryInfo.name}</h3>

          <h2 className={`text-sm md:text-xl font-bold tracking-widest uppercase mb-2 animate-slideInRight ${active.color}`}>{active.subtitle}</h2>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter leading-none animate-slideInRight drop-shadow-2xl font-headline">{active.title}</h1>
          <div className="flex justify-end mb-8 w-full"><div className={`h-1 w-16 md:w-24 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-black/10'}`}><div className={`h-full ${active.color.replace('text-', 'bg-')} w-full animate-progress origin-left`} /></div></div>
          <p className={`text-sm md:text-lg font-light leading-relaxed mb-10 animate-slideInRight delay-100 ${subTextClass}`}>{active.desc}</p>
          <div className="flex justify-end animate-slideInRight delay-200">
            <button onPointerDown={e => e.stopPropagation()} onClick={() => setState(p => ({ ...p, showModal: true }))}
              className={`px-6 md:px-8 py-3 rounded-full border transition-all uppercase text-[10px] md:text-xs tracking-[0.2em] font-bold flex items-center gap-3 group pointer-events-auto hover:scale-105 active:scale-95 ${readBtnClass}`}>
              <span className={`group-hover:-translate-x-1 transition-transform duration-300 ${active.color}`}>←</span> Read Biography
            </button>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-8 left-8 text-[10px] uppercase tracking-widest font-mono ${isDarkMode ? 'text-slate-700' : 'text-slate-500'}`}>
        {String(activeIndex + 1).padStart(2, '0')} / {DATA.length}
      </div>

      {state.showModal && (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn ${modalOverlay}`} onPointerDown={e => e.stopPropagation()} onWheel={e => e.stopPropagation()}>
          <div className={`border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-8 animate-scaleIn ${modalBg}`}>
            <button onClick={() => setState(p => ({ ...p, showModal: false }))} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                <X className={`w-6 h-6 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-black'}`} />
            </button>
            <div className="flex flex-col gap-6">
              <div className={`flex items-center gap-4 border-b pb-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className={`p-4 rounded-xl ${active.color.replace('text-', 'bg-')}/20`}><active.icon className={`w-8 h-8 ${active.color}`} /></div>
                <div><h2 className={`text-sm font-bold tracking-widest uppercase ${active.color}`}>{active.subtitle}</h2><h1 className={`text-2xl md:text-4xl font-black font-headline ${modalTextMain}`}>{active.title}</h1></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Title Origin</h3><p className={`leading-relaxed mb-6 ${modalTextSub}`}>{active.reason}</p>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Life Summary</h3><p className={`leading-relaxed ${modalTextSub}`}>{active.desc}</p>
                </div>
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#F5F5DC]/5 border-black/5'}`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}><Sparkles className="w-4 h-4" /> Lessons</h3>
                  <p className={`leading-relaxed italic mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>"{active.lessons}"</p>
                  <div className={`mt-auto pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(active.youtube)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-red-400 hover:text-red-500 transition-colors">
                        <Youtube className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Watch</span>
                    </a>
                    <p className={`text-sm mt-2 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{active.youtube}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* COMPONENT: TILE TRANSITION CURTAIN                                         */
/* -------------------------------------------------------------------------- */
const TransitionCurtain = ({ mode, color, onCovered, onComplete, textData }: { mode: 'enter' | 'exit' | null, color: string, onCovered: () => void, onComplete: () => void, textData: any }) => {
  useEffect(() => {
    if (mode) {
      const coverTimer = setTimeout(() => { onCovered(); }, 1200); 
      const endTimer = setTimeout(() => { onComplete(); }, 3500); 
      return () => { clearTimeout(coverTimer); clearTimeout(endTimer); };
    }
  }, [mode, onCovered, onComplete]);

  if (!mode) return null;
  const isEnter = mode === 'enter';
  const originSide = isEnter ? 'left' : 'right';
  const targetSide = isEnter ? 'right' : 'left';

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="relative w-full h-[20%]"
          initial={{ width: '0%', [originSide]: 0, [targetSide]: 'auto' }}
          animate={{
            width: ['0%', '100%', '100%', '0%'], 
            left: isEnter ? [0, 0, 0, 'auto'] : ['auto', 'auto', 'auto', 0],
            right: isEnter ? ['auto', 'auto', 'auto', 0] : [0, 0, 0, 'auto'],
          }}
          transition={{ 
            duration: 3.5,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
            delay: i * 0.1 
          }}
          style={{ backgroundColor: color }}
        />
      ))}

      {mode === 'enter' && textData && (
         <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-[1001] text-white text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, times: [0.3, 0.35, 0.65, 0.7] }} 
         >
            <h1 className="font-headline font-black text-5xl md:text-7xl mb-4 tracking-tighter drop-shadow-xl">{textData.name}</h1>
            <h2 className="text-arabic text-3xl md:text-5xl text-white/90 drop-shadow-md">{textData.arabicTitle}</h2>
         </motion.div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN APP COMPONENT                                                         */
/* -------------------------------------------------------------------------- */
export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transitionMode, setTransitionMode] = useState<'enter' | 'exit' | null>(null); 
  const [transitionColor, setTransitionColor] = useState('#000');
  const [selectedCompanion, setSelectedCompanion] = useState<any | null>(null);
  const [transitionTextData, setTransitionTextData] = useState<any | null>(null); 
  const [chatInput, setChatInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [initialCompanionId, setInitialCompanionId] = useState<number | null>(null);

  const duplicatedItems = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];
  const [singleScreenWidth, setSingleScreenWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth;
      setSingleScreenWidth(width / 3);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
    }
    const results = ALL_COMPANIONS_DATA.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  useAnimationFrame((t, delta) => {
    if (!isDragging && singleScreenWidth > 0 && !selectedCompanion && !transitionMode) {
      const moveBy = -1; 
      x.set(x.get() + moveBy);
    }
  });

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      if (singleScreenWidth === 0) return;
      if (latest <= -singleScreenWidth * 2) {
        x.set(latest + singleScreenWidth);
      } else if (latest >= -singleScreenWidth / 2) {
        x.set(latest - singleScreenWidth);
      }
    });
    return () => unsubscribe();
  }, [x, singleScreenWidth]);

  const handleCardClick = (item: any) => {
    if (transitionMode) return;
    setTransitionColor(item.color);
    setTransitionTextData(item);
    setTransitionMode('enter');
  };
  
  const handleCategoryCardClick = (item: any) => {
    setIsSearchOpen(false);
    setInitialCompanionId(null);
    window.pendingCompanion = item;
    handleCardClick(item);
  };
  
  const handleSearchResultClick = (companion: any) => {
    const companionId = companion.id;
    let parentCategory = null;
    for (let i = CATEGORIES.length - 1; i >= 0; i--) {
        if (companionId >= CATEGORIES[i].dataStartIndex) {
            parentCategory = CATEGORIES[i];
            break;
        }
    }
    if (parentCategory) {
        setInitialCompanionId(companionId);
        window.pendingCompanion = parentCategory;
        handleCardClick(parentCategory);
    }
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const handleCloseDetail = () => {
    if (transitionMode) return;
    setTransitionColor(selectedCompanion?.color || '#000');
    setTransitionTextData(null);
    setTransitionMode('exit');
    setInitialCompanionId(null);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const phone = "6289674095935";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(chatInput)}`;
    window.open(url, '_blank');
    setChatInput("");
  };

  const getSubDataForCategory = (category: any) => {
    if (!category) return [];
    const startIndex = category.dataStartIndex;
    // Find the end index. It's either the start of the next category or the end of the data array.
    const nextCategory = CATEGORIES.find(c => c.dataStartIndex > startIndex);
    const endIndex = nextCategory ? nextCategory.dataStartIndex : ALL_COMPANIONS_DATA.length;
    
    return ALL_COMPANIONS_DATA.slice(startIndex, endIndex);
  };

  const transitionSettings = { duration: 0.6, ease: [0.4, 0, 0.2, 1] };

  const mainTextClass = isDarkMode ? 'text-white' : 'text-black';
  const cardBgClass = isDarkMode ? 'bg-slate-900 border border-white/10' : 'bg-[#F5F5DC]';

  const YaqeenLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 400 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10L50 30L70 40L50 50L40 70L30 50L10 40L30 30L40 10Z" fill="#F59E0B" />
      <rect x="25" y="25" width="30" height="30" transform="rotate(45 40 40)" fill="#06B6D4" style={{ mixBlendMode: "multiply" }} />
      <text x="85" y="65" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="55" fill="currentColor" letterSpacing="-2">
        yaqeen
      </text>
      <text x="290" y="45" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="currentColor" letterSpacing="1">INSTITUTE</text>
      <text x="290" y="60" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="currentColor" letterSpacing="1">FOR ISLAMIC</text>
      <text x="290" y="75" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="currentColor" letterSpacing="1">RESEARCH</text>
    </svg>
  );

  const MAIN_TITLE = "THE FIRSTS";
  const SUBTITLE = "Stories of the Prophet's Companions";

  return (
    <div className={`min-h-screen overflow-hidden flex flex-col justify-start pt-12 md:pt-20 p-2 md:p-4 font-body relative transition-colors duration-500 ${mainTextClass}`}>
      <GlobalStyles />
      <MosaicBackground isDarkMode={isDarkMode} />

      <div className={`fixed top-6 right-6 md:top-8 md:right-8 z-[130] flex flex-col items-end gap-2`}>
         <div className={`flex items-center p-1.5 rounded-full transition-all duration-300 shadow-lg border backdrop-blur-md ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-[#F5F5DC]/50 border-black/5'}`}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${isDarkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-slate-700 hover:bg-black/5'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {activeCard ? (
                <AnimatePresence>
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}
                            className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}`}
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </AnimatePresence>
            ) : (
                <>
                    <AnimatePresence>
                      {isSearchOpen && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 180, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`h-full w-full bg-transparent px-2 text-sm outline-none ${isDarkMode ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/40'}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={() => {
                        setIsSearchOpen(!isSearchOpen);
                        if (isSearchOpen) setSearchQuery('');
                      }}
                      className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}`}
                    >
                      {isSearchOpen ? <X size={20}/> : <Search size={20}/>}
                    </button>
                </>
            )}
        </div>
        
        <AnimatePresence>
          {!activeCard && isSearchOpen && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`w-64 max-h-80 overflow-y-auto p-2 rounded-2xl shadow-lg border backdrop-blur-md ${isDarkMode ? 'bg-slate-800/70 border-white/10' : 'bg-[#F5F5DC]/70 border-black/5'}`}
            >
              <ul>
                {searchResults.map(companion => (
                  <li key={companion.id}>
                    <button
                      onClick={() => handleSearchResultClick(companion)}
                      className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-3 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'}`}
                    >
                      <companion.icon className={`w-4 h-4 shrink-0 ${companion.color}`} />
                      <span className="flex-1 truncate">{companion.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TransitionCurtain 
        mode={transitionMode} 
        color={transitionColor} 
        textData={transitionTextData}
        onCovered={() => {
          if (transitionMode === 'enter' && window.pendingCompanion) {
            setSelectedCompanion(window.pendingCompanion);
            window.pendingCompanion = null;
          } 
          if (transitionMode === 'exit') {
            setSelectedCompanion(null);
          }
        }}
        onComplete={() => {
          setTransitionMode(null);
          setTransitionTextData(null);
        }}
      />

      {selectedCompanion && (
        <CompanionWheel 
            categoryInfo={selectedCompanion}
            items={getSubDataForCategory(selectedCompanion)}
            onClose={handleCloseDetail}
            isDarkMode={isDarkMode}
            initialCompanionId={initialCompanionId}
        />
      )}

      <AnimatePresence>
        {!selectedCompanion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            <div className="max-w-[98%] w-full mb-8 px-2 md:px-4 grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-64 relative z-10">
              <motion.div
                layout
                onClick={() => {
                  if (activeCard !== 'about') {
                    setActiveCard('about');
                    setIsSearchOpen(false);
                  }
                }}
                data-is-expanded={activeCard === 'about'}
                transition={transitionSettings}
                className={`
                  rounded-[32px] p-6 flex flex-col shadow-sm group cursor-pointer overflow-hidden transition-colors duration-500
                  ${activeCard === 'about' ? 'fixed inset-0 z-50 rounded-none w-full h-full m-0 p-4 md:p-6 overflow-y-auto cursor-auto' : 'md:col-span-1 relative hover:scale-[0.98] justify-between'}
                  ${activeCard === 'showreel' ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
                  ${isDarkMode ? (activeCard === 'about' ? 'bg-slate-900 border-white/10 text-white' : 'bg-slate-800 text-white') : (activeCard === 'about' ? 'bg-[#7C02A2] text-white' : 'bg-[#7C02A2] text-white')}
                `}
              >
                <motion.div layout="position" className="flex justify-between items-start w-full">
                    <span className="text-xs font-bold tracking-widest font-body opacity-60">ABOUT</span>
                </motion.div>
                {activeCard === 'about' ? (
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-full mx-auto w-full pb-32 px-2">
                        <div className="flex flex-col gap-4 h-full">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2 md:mb-4">The Mission</h2>
                            <div className={`rounded-3xl p-4 md:p-6 min-h-[300px] flex-1 flex flex-col justify-end gap-3 shadow-inner ${isDarkMode ? 'bg-white/5' : 'bg-white/5'}`}>
                                {CHAT_MESSAGES.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.4 + msg.delay, type: 'spring' }} className={`self-start px-5 py-3 rounded-2xl rounded-bl-none shadow-sm max-w-[90%] ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-800 text-white'}`}>
                                        <p className="text-base md:text-lg font-medium">{msg.text}</p>
                                    </motion.div>
                                ))}
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="mt-4 flex gap-2">
                                    <input 
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Write a message..."
                                        className={`h-12 flex-1 rounded-full px-4 flex items-center text-sm md:text-base outline-none transition-colors border-2 border-transparent focus:border-[#10B981]/50 ${isDarkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white/10 text-white placeholder-white/50'}`}
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center text-white shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-md"
                                    >
                                        <Send size={20} />
                                    </button>
                                  </motion.div>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 4.8, duration: 0.5 }}
                                className={`rounded-2xl p-4 border backdrop-blur-sm mt-auto ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gradient-to-br from-gray-900 to-black border-white/10'}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'opacity-40' : 'text-white/40'}`}>Content Source</span>
                                    <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/10' : 'bg-white/10'}`}></div>
                                </div>
                                <YaqeenLogo className={`h-8 md:h-12 w-auto mb-3 ${isDarkMode ? 'text-white' : 'text-white'}`} />
                                <p className={`text-xs leading-relaxed ${isDarkMode ? 'opacity-60' : 'text-slate-300'}`}>
                                    All historical content is sourced from the <strong>"The Firsts"</strong> series by Yaqeen Institute.
                                    <br className="mb-2"/>
                                    <span className="italic block mt-1 opacity-80">
                                        "If you find any errors or have feedback, please feel free to contact me."
                                    </span>
                                </p>
                            </motion.div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">The Categories</h2>
                            <div className="grid gap-3">
                                {DEFINITIONS.map((def, idx) => {
                                    const colors = [ "bg-emerald-500", "bg-amber-500", "bg-indigo-500", "bg-cyan-500", "bg-pink-500" ];
                                    return (
                                    <motion.div 
                                          key={idx} 
                                          initial={{ opacity: 0, y: 10 }} 
                                          animate={{ opacity: 1, y: 0, transition: { delay: 0.5 + (idx * 0.1) } }}
                                          whileHover={{ scale: 1.05, y: -5, zIndex: 10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                          className={`p-4 rounded-xl transition-colors relative text-white cursor-pointer ${colors[idx % colors.length]}`}
                                    >
                                        <h3 className="font-bold text-lg mb-1">{def.title}</h3>
                                        <p className="text-sm leading-relaxed opacity-90">{def.text}</p>
                                    </motion.div>
                                )})}
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                <a href="https://www.instagram.com/tarafazlin/" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"><Instagram size={24} /><span className="text-xs font-bold uppercase tracking-wider">Insta</span></a>
                                <a href="https://www.linkedin.com/in/tarasyahfazlin/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"><Linkedin size={24} /><span className="text-xs font-bold uppercase tracking-wider">LinkedIn</span></a>
                                <a href="https://www.pinterest.com/skatskadi/" target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"><Globe size={24} /><span className="text-xs font-bold uppercase tracking-wider">Pinterest</span></a>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-7xl font-headline group-hover:rotate-12 transition-transform">126</span>
                    </div>
                )}
              </motion.div>

              <motion.div
                layout
                onClick={() => {
                  if (activeCard !== 'showreel') {
                    setActiveCard('showreel');
                    setIsSearchOpen(false);
                  }
                }}
                data-is-expanded={activeCard === 'showreel'}
                transition={transitionSettings}
                initial="initial"
                whileHover="hover"
                className={`
                  rounded-[32px] p-6 flex flex-col justify-between shadow-sm group cursor-pointer overflow-hidden transition-colors duration-500
                  ${activeCard === 'showreel' ? 'fixed inset-0 z-50 rounded-none w-full h-full m-0 p-0 overflow-y-auto cursor-auto' : 'md:col-span-1 relative'}
                  ${activeCard === 'about' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  bg-[#1A3C34] text-white
                `}
              >
                {activeCard === 'showreel' ? (
                    <div 
                        className="flex flex-col items-center justify-start min-h-full max-w-full mx-auto w-full pt-24 pb-24 px-4 md:px-8"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <motion.h2 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-4xl md:text-7xl font-headline font-bold mb-12 md:mb-16 text-center leading-tight mt-10 md:mt-0 text-white`}
                        >
                            Choose who you<br/>want to be.
                        </motion.h2>
                        <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                            {DEFINITIONS.map((def, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1), type: 'spring', stiffness: 100 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className={`p-8 rounded-3xl border transition-all group/card flex flex-col relative overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] bg-white/5 border-white/10 hover:bg-white/10`}
                            >
                                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/card:bg-emerald-500/20 transition-colors"></div>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 text-emerald-300`}>
                                    <def.icon size={28} />
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 font-headline text-white`}>{def.title}</h3>
                                <div className="h-0.5 w-12 bg-emerald-500/50 mb-4 rounded-full"></div>
                                <p className={`text-sm leading-relaxed mb-6 flex-1 font-medium text-emerald-100/90`}>{def.text}</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
                                        <Sparkles size={12} /> {def.trait}
                                    </span>
                                </div>
                            </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <motion.span layout="position" className="text-xs font-bold tracking-widest font-body opacity-50 group-hover:opacity-80 transition-opacity">IDENTITY</motion.span>
                        <motion.div 
                            className="flex flex-col justify-center items-center h-full w-full"
                            variants={{ initial: { opacity: 1 }, hover: { opacity: 1 } }}
                        >
                            <motion.div layout="position" variants={{ hover: { rotate: 360 } }} transition={{ duration: 0.8, ease: "easeInOut" }} >
                                <Compass className={`w-20 h-20 transition-all duration-700 text-emerald-100/30 group-hover:text-emerald-100/80`} strokeWidth={1} />
                            </motion.div>
                            <motion.div 
                                variants={{ initial: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.4 } } }}
                                className={`mt-4 font-headline text-sm text-emerald-200/60`}
                            >
                                Discover your path
                            </motion.div>
                        </motion.div>
                    </>
                )}
              </motion.div>

              <motion.div
                className={`
                  md:col-span-2 rounded-[32px] flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm transition-all duration-500 group cursor-pointer
                  ${activeCard ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-[0.98]'}
                  bg-black border border-neutral-800
                `}
              >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="flex flex-col items-center z-10 relative p-4">
                      <h1
                        className="font-headline font-medium text-amber-500 md:text-neutral-800 transition-all duration-700 ease-out md:group-hover:-translate-y-2 md:group-hover:text-amber-100 md:group-hover:blur-0 blur-0 md:blur-[2px] md:group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] md:tracking-[0.3em]"
                      >
                        {MAIN_TITLE}
                      </h1>
                      <div className="transition-all duration-1000 delay-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 blur-0 md:blur-sm md:group-hover:blur-none mt-4 border-t border-amber-500/50 pt-3 w-full max-w-sm">
                        <p className="text-[10px] md:text-xs text-amber-500/80 font-body tracking-[0.3em] uppercase">
                          {SUBTITLE}
                        </p>
                      </div>
                  </div>
              </motion.div>
            </div>

            <div className={`relative w-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${activeCard ? 'opacity-0' : 'opacity-100'}`}>
              <motion.div
                ref={containerRef}
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -10000, right: 10000 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
                className="flex gap-6 px-6"
              >
                {duplicatedItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    onClick={() => handleCategoryCardClick(item)}
                    className={`relative flex-shrink-0 w-[280px] h-[400px] rounded-[32px] overflow-hidden group shadow-xl cursor-pointer transition-colors duration-300 ${cardBgClass}`}
                    whileHover={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image src={item.img} alt={item.name} fill style={{objectFit: 'cover'}} className="transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80" />
                    <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-40" style={{ backgroundColor: item.color }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="text-lg font-bold text-white mb-1 font-arabic">{item.arabicTitle}</span>
                      <h2 className="text-2xl font-headline font-bold text-white leading-tight mb-2">{item.name}</h2>
                      <p className="text-xs text-white/90 font-medium leading-relaxed max-w-[90%]">{item.tagline}</p>
                      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="mt-4">
                        <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-neutral-200 transition-colors">View Collection</button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
