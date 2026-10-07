'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { cardConfig } from '@/config/card';

interface LoveLetterProps {
  receiverName?: string;
}

export function LoveLetter({ receiverName }: LoveLetterProps) {
  const displayName = receiverName || cardConfig.receiver;

  return (
    <section className="relative py-20 px-4 sm:px-6 z-10 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[32rem] rounded-full bg-rose-900/15 blur-[120px] pointer-events-none" />

      {/* Decorative Letter Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl p-7 sm:p-12 lg:p-16 border border-rose-500/20 bg-gradient-to-b from-[#2E0910]/90 via-[#26060C]/90 to-[#1F0408]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
      >
        {/* Subtle Inner Gold Trim */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-rose-500/15 pointer-events-none" />
        <div className="absolute inset-5 sm:inset-6 rounded-xl border border-dashed border-rose-500/10 pointer-events-none" />

        {/* Corner Flourish Elements */}
        <div className="absolute top-6 left-6 text-rose-400/30 pointer-events-none">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-6 right-6 text-rose-400/30 pointer-events-none">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Feather className="w-3.5 h-3.5 text-rose-400" />
            <span>{cardConfig.letter.sectionBadge}</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFDF9] tracking-tight">
            {cardConfig.letter.title}
          </h2>

          <div className="w-12 h-[1px] bg-rose-500/30 mx-auto mt-4" />
        </div>

        {/* Letter Content */}
        <div className="relative z-10 space-y-5 text-rose-100/90 text-sm sm:text-base lg:text-[17px] leading-relaxed font-light">
          <p className="font-playfair text-xl sm:text-2xl font-bold text-rose-200">
            Gửi {displayName},
          </p>

          {cardConfig.letter.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="text-stone-200/90 font-sans font-light leading-relaxed tracking-wide"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Letter Sign-off */}
        <div className="mt-12 pt-8 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-serif italic">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Ngày Phụ Nữ Việt Nam 20.10</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-xs text-rose-300/70 font-light block">
              {cardConfig.letter.closing}
            </span>
            <span className="font-dancing text-2xl sm:text-3xl font-bold text-amber-200 mt-1 block">
              {cardConfig.sender}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
