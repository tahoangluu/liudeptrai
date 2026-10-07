'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift as GiftIcon, Heart, Sparkles } from 'lucide-react';
import { cardConfig } from '@/config/card';
import { fireGentleHearts } from '@/lib/confetti';
import { soundManager } from '@/lib/sound';

export function Gift() {
  const [opened, setOpened] = useState(false);
  const gift = cardConfig.gift;

  const handleOpenGift = () => {
    if (opened) return;
    soundManager.playMagicalChime();
    fireGentleHearts();
    setOpened(true);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 max-w-3xl mx-auto text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
          <GiftIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>{gift.sectionBadge}</span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#FFFDF9] tracking-tight">
          {gift.title}
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/70 mt-2.5 font-light">
          {gift.subtitle}
        </p>
      </div>

      {/* Interactive Gift Box */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {!opened ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenGift}
            className="cursor-pointer group relative flex flex-col items-center"
          >
            {/* Ambient Aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-500/20 to-amber-200/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* 3D Gift Box Visual */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#9E1B32] via-[#660C1A] to-[#40060F] border-2 border-amber-300/60 shadow-2xl flex flex-col items-center justify-center text-amber-200 shadow-rose-950/60">
              {/* Ribbon crossing */}
              <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-300 opacity-80 shadow-xs" />
              <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-300 opacity-80 shadow-xs" />

              {/* Bow Icon on top */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-amber-300 text-rose-950 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <GiftIcon className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            {/* Click CTA Pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-300 to-rose-300 text-rose-950 text-xs font-bold tracking-wider uppercase shadow-md shadow-rose-950/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{gift.boxLabel}</span>
            </div>
          </motion.div>
        ) : (
          /* REVEALED SECRET MESSAGE */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-3xl p-7 sm:p-10 border border-amber-400/40 bg-gradient-to-b from-[#3D0A13]/95 to-[#24040A]/95 backdrop-blur-xl shadow-2xl shadow-rose-950/60 relative overflow-hidden text-center"
            >
              {/* Golden corner shines */}
              <div className="absolute top-4 right-4 text-amber-300/40">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-rose-950 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-400/30">
                <Heart className="w-6 h-6 fill-current" />
              </div>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-amber-100">
                {gift.revealedMessage.headline}
              </h3>

              <p className="text-sm sm:text-base text-rose-100/90 mt-4 font-light leading-relaxed max-w-lg mx-auto">
                {gift.revealedMessage.body}
              </p>

              <div className="h-[1px] w-16 bg-amber-400/30 mx-auto my-6" />

              <p className="font-dancing text-xl sm:text-2xl font-bold text-amber-200">
                {gift.revealedMessage.promise}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
