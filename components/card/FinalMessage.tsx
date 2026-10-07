'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { cardConfig } from '@/config/card';
import { soundManager } from '@/lib/sound';

interface FinalMessageProps {
  onReplay: () => void;
  receiverName?: string;
}

export function FinalMessage({ onReplay, receiverName }: FinalMessageProps) {
  const displayName = receiverName || cardConfig.receiver;
  const final = cardConfig.finalMessage;

  const handleReplayClick = () => {
    soundManager.playSoftClick();
    onReplay();
  };

  return (
    <section className="relative min-h-[90vh] py-28 px-4 sm:px-6 z-10 flex flex-col justify-between items-center text-center bg-gradient-to-b from-transparent via-[#1A0306]/80 to-[#120104]">
      {/* Background Deep Ruby Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] rounded-full bg-rose-950/40 blur-[140px] pointer-events-none" />

      {/* Main Final Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-2xl mx-auto w-full relative z-10 my-auto"
      >
        <div className="w-12 h-12 rounded-full bg-rose-900/60 border border-rose-500/40 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-950/50">
          <Heart className="w-6 h-6 text-rose-300 fill-rose-300/80 animate-gentle-pulse" />
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#FFFDF9] tracking-tight leading-tight">
          Gửi {displayName} của anh,
        </h2>

        <div className="space-y-5 mt-8 text-rose-100/90 text-base sm:text-lg font-light leading-relaxed">
          {final.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="h-[1px] w-16 bg-rose-500/30 mx-auto my-9" />

        <div className="flex flex-col items-center">
          <span className="text-sm text-rose-300/80 font-serif italic">
            {final.signOff}
          </span>
          <span className="font-dancing text-3xl sm:text-4xl font-bold text-amber-200 mt-2">
            {final.signature}
          </span>
          <p className="text-xs text-rose-300/50 mt-3 font-light">
            {final.postscript}
          </p>
        </div>
      </motion.div>

      {/* CINEMATIC ENDING BADGE & REPLAY BUTTON */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 w-full max-w-md mx-auto flex flex-col items-center gap-6 relative z-10"
      >
        {/* Women's Day Ending Signet */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-rose-300 uppercase">
            HAPPY VIETNAMESE WOMEN&apos;S DAY
          </span>
          <div className="flex items-center gap-3 mt-2 text-rose-400">
            <span className="w-8 h-[1px] bg-rose-500/40" />
            <span className="font-playfair font-bold text-base tracking-widest text-[#FFFDF9]">
              20 • 10
            </span>
            <span className="w-8 h-[1px] bg-rose-500/40" />
          </div>
        </div>

        {/* Replay Button */}
        <button
          type="button"
          onClick={handleReplayClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-black/40 group"
        >
          <RotateCcw className="w-4 h-4 text-rose-400 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Đọc lại từ đầu </span>
        </button>

        <p className="text-[11px] text-stone-500/70 font-light">
          Món quà nhỏ gửi trao người phụ nữ tuyệt vời nhất.
        </p>
      </motion.div>
    </section>
  );
}
