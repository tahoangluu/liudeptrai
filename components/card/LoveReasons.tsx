'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { cardConfig } from '@/config/card';

export function LoveReasons() {
  const reasons = cardConfig.reasons.items;

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>{cardConfig.reasons.sectionBadge}</span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#FFFDF9] tracking-tight">
          {cardConfig.reasons.title}
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/70 mt-3 font-light leading-relaxed">
          {cardConfig.reasons.subtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {reasons.map((reason, idx) => (
          <motion.div
            key={reason.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group relative rounded-2xl p-6 sm:p-7 border border-rose-900/30 bg-gradient-to-br from-[#330B12]/80 via-[#26060C]/90 to-[#1D0307]/90 backdrop-blur-md shadow-xl shadow-black/40 hover:border-rose-500/40 hover:shadow-rose-950/40 transition-all duration-300 flex flex-col justify-between ${
              idx === reasons.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* Top Index & Small Sparkle */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-playfair font-bold text-2xl sm:text-3xl text-rose-500/60 group-hover:text-rose-400 transition-colors">
                  {reason.number}
                </span>
                <Sparkles className="w-4 h-4 text-rose-400/30 group-hover:text-amber-300 transition-colors" />
              </div>

              <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#FFFDF9] group-hover:text-rose-200 transition-colors">
                {reason.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300/80 mt-2.5 font-light leading-relaxed">
                {reason.description}
              </p>
            </div>

            {/* Bottom Subtle Bar */}
            <div className="mt-6 pt-4 border-t border-rose-900/30 flex items-center justify-between text-[11px] text-rose-400/60 font-serif italic">
              <span>Mỗi ngày thêm thương</span>
              <Heart className="w-3 h-3 text-rose-400/50 group-hover:fill-rose-400 group-hover:text-rose-400 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
