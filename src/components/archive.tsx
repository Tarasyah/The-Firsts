"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';

const COMPANIONS = [
  { id: 1, name: 'Abu Bakr As-Siddiq', title: 'The Forerunner', color: '#10B981', img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=500&auto=format&fit=crop', imageHint: 'man portrait' },
  { id: 2, name: 'Khadijah bint Khuwaylid', title: 'The First Mother', color: '#EC4899', img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=500&auto=format&fit=crop', imageHint: 'woman portrait' },
  { id: 3, name: 'Umar ibn Al-Khattab', title: 'The Al-Farooq', color: '#6366F1', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=500&auto=format&fit=crop', imageHint: 'scrolls library' },
  { id: 4, name: 'Ali ibn Abi Talib', title: 'The Gate of Knowledge', color: '#F59E0B', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop', imageHint: 'desert landscape' },
  { id: 5, name: 'Bilal ibn Rabah', title: 'The Muezzin', color: '#14B8A6', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop', imageHint: 'mountain sunrise' },
];

export default function Archive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const duplicatedItems = [...COMPANIONS, ...COMPANIONS, ...COMPANIONS];
  
  const [segmentWidth, setSegmentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth;
      const oneSegmentWidth = width / 3;
      setSegmentWidth(oneSegmentWidth);
      x.set(-oneSegmentWidth); // Start at the beginning of the second segment
    }
  }, [x]);

  useAnimationFrame((time, delta) => {
    if (!isDragging && segmentWidth > 0) {
      let moveBy = -0.5; // Controls the auto-scroll speed
      let newX = x.get() + moveBy;

      // Wrap-around logic
      if (newX <= -2 * segmentWidth) {
        newX += segmentWidth;
      } else if (newX > 0) {
        newX -= segmentWidth;
      }
      
      x.set(newX);
    }
  });

  return (
    <div className="relative w-full cursor-grab active:cursor-grabbing">
      <motion.div
        ref={containerRef}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -segmentWidth * 2.5, right: segmentWidth * 0.5 }}
        dragElastic={0.05}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        className="flex gap-6 px-6"
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="relative flex-shrink-0 w-[350px] h-[500px] rounded-[40px] overflow-hidden group shadow-xl bg-white"
            whileHover={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Image 
              src={item.img} 
              alt={item.name} 
              width={350}
              height={500}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80" 
              data-ai-hint={item.imageHint || ''}
            />
            <div 
              className="absolute inset-0 mix-blend-multiply opacity-40 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: item.color }}
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                {item.title}
              </span>
              <h2 className="text-3xl font-headline font-bold text-white leading-tight">
                {item.name}
              </h2>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">
                  View Legacy
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
