'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { cardConfig } from '@/config/card';

interface HeroProps {
  receiverName?: string;
}

export function Hero({ receiverName }: HeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const displayName = receiverName || cardConfig.receiver;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full bg-rose-600/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>{cardConfig.hero.dateBadge}</span>
          <span className="text-rose-500/60">•</span>
          <span>Dành riêng cho {displayName}</span>
        </motion.div>

        {/* Cinematic Title Reveal - Line by Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-playfair text-3xl sm:text-4xl text-rose-200/90 font-medium tracking-wide"
        >
          {cardConfig.hero.greetingPrefix} {displayName},
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          className="font-playfair text-4xl sm:text-6xl font-bold tracking-tight text-[#FFFDF9] mt-3 leading-[1.2]"
        >
          người con gái <br />
          <span className="text-gradient-rose">anh thương nhất.</span>
        </motion.h1>

        {/* Elegant divider with single delicate heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-3 my-7"
        >
          <span className="w-12 h-[1px] bg-rose-500/30" />
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400/80" />
          <span className="w-12 h-[1px] bg-rose-500/30" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-sm sm:text-base text-rose-100/70 max-w-md font-light leading-relaxed"
        >
          Hôm nay là một ngày thật đặc biệt, và anh muốn gửi gắm tất cả những yêu thương chân thành nhất đến em.
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 0.85, y: scrolled ? 15 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-rose-300/60 pointer-events-none"
      >
        <span className="tracking-widest uppercase text-[10px]">Cuộn xuống để đọc tiếp</span>
        <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
