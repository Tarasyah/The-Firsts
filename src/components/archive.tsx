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
  // This component is no longer used in the main page.
  return null;
};
