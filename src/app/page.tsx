"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, ArrowRight, Instagram, Linkedin, Globe, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

/* -------------------------------------------------------------------------- */
/* DATA SECTION                                */
/* -------------------------------------------------------------------------- */
const COMPANIONS = [
  { 
    id: 1, 
    name: 'The Forerunners', 
    arabicTitle: 'السَّابِقُونَ', 
    tagline: 'The Firsts to Embrace The Call.', 
    color: '#10B981', // Emerald
    img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    name: 'The Trendsetters', 
    arabicTitle: 'الْمُسْتَنُّونَ', 
    tagline: 'Whoever Starts a Good Tradition...', 
    color: '#F59E0B', // Amber
    img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'The Strangers', 
    arabicTitle: 'الْغُرَبَاءُ', 
    tagline: 'Blessed are those who remain firm.', 
    color: '#6366F1', // Indigo
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'The Revivers', 
    arabicTitle: 'الْمُجَدِّدُونَ', 
    tagline: 'Those who Restore the Forgotten Sunnah.', 
    color: '#06B6D4', // Cyan
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    name: 'The Distinguished', 
    arabicTitle: 'الْمُحْسِنُونَ', 
    tagline: 'The Ones who Strive for Excellence.', 
    color: '#EC4899', // Pink
    img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=500&auto=format&fit=crop' 
  },
];

const DEFINITIONS = [
  { title: "The Forerunners (As-Saabiqoon)", text: "These individuals are the first to respond to any good deed without delay or hesitation." },
  { title: "The Trendsetters (Al-Mustannoon)", text: "These are the people who establish a righteous path for others to follow and benefit from." },
  { title: "The Strangers (Al-Ghurabaa)", text: "This group holds onto their faith and values even when they feel out of place in society." },
  { title: "The Revivers (Al-Mujaddidoon)", text: "These people work to bring back spiritual practices that have been ignored or lost over time." },
  { title: "The Distinguished (Al-Muhsinoon)", text: "These individuals perform every action with the highest level of sincerity and beauty." }
];

const CHAT_MESSAGES = [
  { id: 1, text: "Assalamu Alaikum! 👋", sender: 'bot', delay: 0.2 },
  { id: 2, text: "Welcome to The Firsts Project.", sender: 'bot', delay: 0.8 },
  { id: 3, text: "We combine modern design with authentic Islamic history.", sender: 'bot', delay: 1.6 },
  { id: 4, text: "Our goal is to revive the stories of the Sahaba.", sender: 'bot', delay: 2.4 },
  { id: 5, text: "Using technology to make history accessible.", sender: 'bot', delay: 3.2 },
  { id: 6, text: "Explore the legacy below! 👇", sender: 'bot', delay: 4.0 },
];

/* -------------------------------------------------------------------------- */
/* COMPONENT: TILE TRANSITION CURTAIN                  */
/* -------------------------------------------------------------------------- */
const TransitionCurtain = ({ mode, color, onCovered, onComplete }) => {
  // mode: 'enter' (Left -> Right) or 'exit' (Right -> Left)
  
  // Logic: 
  // 1. Tiles Grow (Cover screen)
  // 2. Wait (Trigger content switch)
  // 3. Tiles Shrink (Reveal screen)

  useEffect(() => {
    if (mode) {
      // Step 1: Trigger content switch when screen is fully covered
      const coverTimer = setTimeout(() => {
        onCovered();
      }, 800); // Wait for tiles to fully expand (0.7s duration + slight buffer)

      // Step 2: Signal animation complete
      const endTimer = setTimeout(() => {
        onComplete();
      }, 1600); // 0.8s (cover) + 0.8s (reveal)

      return () => {
        clearTimeout(coverTimer);
        clearTimeout(endTimer);
      };
    }
  }, [mode, onCovered, onComplete]);

  if (!mode) return null;

  const isEnter = mode === 'enter'; // Enter = Left to Right
  // If Enter: Origin Left. If Exit: Origin Right.
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
            width: ['0%', '100%', '0%'], // Grow then Shrink
            left: isEnter ? [0, 0, 'auto'] : ['auto', 'auto', 0], // Swap origin for shrink phase
            right: isEnter ? ['auto', 'auto', 0] : [0, 0, 'auto'],
          }}
          transition={{
            duration: 1.4, // Total time for one tile's full cycle
            times: [0, 0.4, 1], // 40% time to grow, then shrink
            ease: [0.22, 1, 0.36, 1], // Custom bezier
            delay: i * 0.1, // Stagger effect
          }}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* COMPONENT: DETAIL PAGE (BLANK)                      */
/* -------------------------------------------------------------------------- */
const DetailPage = ({ companion, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col p-8 md:p-12 overflow-hidden bg-white"
    >
      {/* Background Color Block (Optional: Could be full screen color) */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundColor: companion.color }}></div>

      {/* Navigation Header */}
      <div className="w-full flex justify-between items-center mb-12 relative z-10">
        <button 
          onClick={onClose}
          className="bg-black/5 hover:bg-black/10 p-3 rounded-full text-black backdrop-blur-md transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={24} />
          <span className="font-bold text-sm hidden md:inline">BACK</span>
        </button>
        <span className="text-black/40 font-bold tracking-widest text-sm">THE FIRSTS</span>
      </div>

      {/* Blank Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
         <motion.span 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }} // Wait for wipe to finish
           className="text-black/60 font-headline text-xl md:text-2xl italic mb-4"
         >
            {companion.arabicTitle}
         </motion.span>
         <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.9 }}
           className="text-5xl md:text-8xl font-headline font-black text-black mb-6"
           style={{ color: companion.color }}
         >
            {companion.name}
         </motion.h1>
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="w-12 h-1 bg-black/10 rounded-full"
         />
      </div>
    </div>
  );
};


export default function Home() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCard, setActiveCard] = useState(null); 
  
  // Transition State
  const [transitionMode, setTransitionMode] = useState(null); // 'enter' | 'exit' | null
  const [transitionColor, setTransitionColor] = useState('#000');
  const [selectedCompanion, setSelectedCompanion] = useState(null); // The data
  
  const duplicatedItems = [...COMPANIONS, ...COMPANIONS, ...COMPANIONS];
  const [singleScreenWidth, setSingleScreenWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth;
      setSingleScreenWidth(width / 3);
    }
  }, []);

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

  // HANDLER: Enter Detail Page
  const handleCardClick = (item) => {
    if (transitionMode) return; // Prevent double clicks
    (window as any).pendingCompanion = item;
    setTransitionColor(item.color);
    setTransitionMode('enter');
  };

  // HANDLER: Exit Detail Page
  const handleCloseDetail = () => {
    if (transitionMode) return;
    setTransitionColor(selectedCompanion?.color || '#000');
    setTransitionMode('exit');
  };

  const transitionSettings = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1]
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] overflow-hidden flex flex-col justify-start pt-12 md:pt-20 p-4 font-body relative">
      
      {/* --- TRANSITION MANAGER --- */}
      <TransitionCurtain 
        mode={transitionMode} 
        color={transitionColor} 
        onCovered={() => {
            if (transitionMode === 'enter' && (window as any).pendingCompanion) {
                setSelectedCompanion((window as any).pendingCompanion);
                (window as any).pendingCompanion = null;
            }
            if (transitionMode === 'exit') {
                setSelectedCompanion(null);
            }
        }}
        onComplete={() => setTransitionMode(null)}
      />

      {/* --- DETAIL PAGE --- */}
      {selectedCompanion && (
        <DetailPage 
          companion={selectedCompanion} 
          onClose={handleCloseDetail} 
        />
      )}

      {/* --- BENTO GRID HEADER --- */}
      <div className="max-w-7xl w-full mb-8 px-6 grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-64 relative z-10">
         <motion.div
            layout
            onClick={() => activeCard !== 'about' && setActiveCard('about')}
            data-is-expanded={activeCard === 'about'}
            transition={transitionSettings}
            className={`
              bg-[#D8B4FE] rounded-[32px] p-6 flex flex-col shadow-sm group cursor-pointer overflow-hidden
              ${activeCard === 'about' ? 'fixed inset-0 z-50 rounded-none w-full h-full m-0 p-6 md:p-12 overflow-y-auto cursor-auto' : 'md:col-span-1 relative hover:scale-[0.98] justify-between'}
              ${activeCard === 'showreel' ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
            `}
         >
            {activeCard === 'about' && (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 transition={{ delay: 0.6, duration: 0.2 }}
                 className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 bg-black/10 rounded-full hover:bg-black/20 cursor-pointer"
                 onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}
               >
                 <X className="text-white w-8 h-8" />
               </motion.div>
            )}
            <motion.div layout="position" className="flex justify-between items-start w-full">
                <span className="text-xs font-bold tracking-widest text-black/60 font-body">ABOUT</span>
                {activeCard !== 'about' && (
                    <span className="text-4xl font-headline text-black/80 group-hover:rotate-12 transition-transform">99</span>
                )}
            </motion.div>
            {activeCard === 'about' ? (
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto w-full pb-32">
                    <div className="flex flex-col gap-4 h-full">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-black/80 mb-2 md:mb-4">The Mission</h2>
                        <div className="bg-white/40 rounded-3xl p-4 md:p-6 min-h-[400px] md:h-auto flex-1 flex flex-col justify-end gap-3 shadow-inner">
                            {CHAT_MESSAGES.map((msg) => (
                                <motion.div key={msg.id} initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.4 + msg.delay, type: 'spring' }} className="self-start bg-white px-5 py-3 rounded-2xl rounded-bl-none shadow-sm max-w-[90%]">
                                    <p className="text-base md:text-lg text-black/80 font-medium">{msg.text}</p>
                                </motion.div>
                            ))}
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="mt-4 flex gap-2">
                                <div className="bg-white/60 h-12 flex-1 rounded-full px-4 flex items-center text-black/40 text-sm md:text-base">Write a message...</div>
                                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center text-white shrink-0"><Send size={20} /></div>
                             </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-black/80 mb-2">The Categories</h2>
                        <div className="grid gap-3">
                            {DEFINITIONS.map((def, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (idx * 0.1) }} className="bg-white/50 p-4 rounded-xl hover:bg-white/80 transition-colors">
                                    <h3 className="font-bold text-black/80 text-lg mb-1">{def.title}</h3>
                                    <p className="text-black/60 text-sm leading-relaxed">{def.text}</p>
                                </motion.div>
                            ))}
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
                    <span className="text-7xl font-headline text-black/80 group-hover:rotate-12 transition-transform">99</span>
                </div>
            )}
         </motion.div>

         <motion.div
            layout
            onClick={() => setActiveCard(activeCard === 'showreel' ? null : 'showreel')}
            data-is-expanded={activeCard === 'showreel'}
            transition={transitionSettings}
            className={`
              bg-[#F472B6] rounded-[32px] p-6 flex flex-col justify-between shadow-sm group cursor-pointer overflow-hidden
              ${activeCard === 'showreel' ? 'fixed inset-0 z-50 rounded-none w-full h-full m-0' : 'md:col-span-1 relative hover:scale-[0.98]'}
              ${activeCard === 'about' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
         >
             {activeCard === 'showreel' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.2 }} className="absolute top-8 right-8 z-50 p-2 bg-black/10 rounded-full hover:bg-black/20 cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}><X className="text-white w-8 h-8" /></motion.div>
            )}
            <motion.span layout="position" className="text-xs font-bold tracking-widest text-black/60 font-body">SHOWREEL</motion.span>
            <div className="flex flex-col justify-center items-center h-full">
               <motion.div layout="position"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-white group-hover:scale-110 transition-transform"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" /></svg></motion.div>
               {activeCard === 'showreel' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-white font-headline text-xl">Play Full Video Sequence</motion.div>)}
            </div>
         </motion.div>

         <motion.div 
            className={`
              md:col-span-2 bg-[#CCF381] rounded-[32px] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm transition-opacity duration-500
              ${activeCard ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-[0.98]'}
            `}
         >
            <div className="absolute top-6 right-6 text-xs font-bold tracking-widest text-black/40 font-body uppercase">The Vanguard</div>
            <h1 className="text-6xl md:text-8xl font-headline font-black text-[#3D405B] tracking-tighter leading-none z-10">THE<br/>FIRSTS</h1>
            <p className="mt-2 text-[#3D405B]/70 font-medium italic font-headline">Stories of the Prophet's Companions</p>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/40 rounded-full blur-3xl group-hover:bg-white/60 transition-colors"></div>
         </motion.div>
      </div>

      {/* --- CAROUSEL --- */}
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
              onClick={() => {
                 handleCardClick(item);
              }}
              className="relative flex-shrink-0 w-[280px] h-[400px] rounded-[32px] overflow-hidden group shadow-xl bg-white cursor-pointer"
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Image src={item.img} alt={item.name} fill className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80" sizes="280px" />
              <div className="absolute inset-0 mix-blend-multiply opacity-40 transition-opacity group-hover:opacity-20" style={{ backgroundColor: item.color }} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <span className="text-lg font-bold text-white/90 mb-1 font-headline">{item.arabicTitle}</span>
                <h2 className="text-2xl font-headline font-bold text-white leading-tight mb-2">{item.name}</h2>
                <p className="text-xs text-white/80 font-medium leading-relaxed max-w-[90%]">{item.tagline}</p>
                <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="mt-4">
                  <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-neutral-200 transition-colors">View</button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
