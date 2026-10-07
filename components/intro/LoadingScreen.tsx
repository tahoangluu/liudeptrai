'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onFinish: () => void;
  receiverName?: string;
}

export function LoadingScreen({ onFinish, receiverName = 'em' }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Elegant brief timeout (1.4s) to create emotional buildup without frustrating the user
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 600);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1F0407] text-[#FAF5F0] px-4"
        >
          {/* Subtle glow orb */}
          <div className="absolute w-72 h-72 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />

          {/* Minimalist 20 • 10 Brand Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-900 to-rose-700/80 border border-rose-500/30 flex items-center justify-center mb-6 shadow-xl shadow-rose-950/50">
              <Heart className="w-5 h-5 text-rose-300 fill-rose-300/80 animate-gentle-pulse" />
            </div>

            <div className="font-playfair text-3xl sm:text-4xl font-bold tracking-widest text-[#FFFDF9] mb-2">
              20 <span className="text-rose-500 font-serif">•</span> 10
            </div>

            <div className="h-[1px] w-12 bg-rose-500/40 my-3" />

            <p className="text-xs sm:text-sm tracking-widest uppercase font-light text-rose-200/80 mt-1">
              Preparing something special for {receiverName}...
            </p>

            {/* Delicate animated progress line */}
            <div className="w-36 h-[2px] bg-rose-950/60 rounded-full mt-6 overflow-hidden relative border border-rose-900/30">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
