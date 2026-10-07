'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { cardConfig } from '@/config/card';

export function Timeline() {
  const events = cardConfig.timeline.events;

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
          <Calendar className="w-3.5 h-3.5 text-rose-400" />
          <span>{cardConfig.timeline.sectionBadge}</span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#FFFDF9] tracking-tight">
          {cardConfig.timeline.title}
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/70 mt-3 font-light leading-relaxed">
          {cardConfig.timeline.subtitle}
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l border-rose-500/20 space-y-10 sm:space-y-12 ml-2 sm:ml-8">
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 flex items-center justify-center ${
                evt.highlight
                  ? 'bg-rose-500 border-amber-300 shadow-md shadow-rose-500/50'
                  : 'bg-[#2B080C] border-rose-500/50'
              }`}
            >
              {evt.highlight && <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />}
            </div>

            {/* Event Box */}
            <div
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                evt.highlight
                  ? 'border-rose-500/50 bg-gradient-to-r from-[#4A0E17]/80 to-[#2A080C]/80 shadow-xl shadow-rose-950/40'
                  : 'border-rose-900/30 bg-[#26060C]/60 hover:border-rose-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-rose-400 tracking-wider uppercase">
                  {evt.date}
                </span>
                {evt.highlight && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-gentle-pulse" />
                )}
              </div>

              <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#FFFDF9] leading-snug">
                {evt.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300/80 mt-2 font-light leading-relaxed">
                {evt.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
