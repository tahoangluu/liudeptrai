'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { cardConfig } from '@/config/card';
import { fireCardCelebration } from '@/lib/confetti';
import { soundManager } from '@/lib/sound';

interface EnvelopeProps {
  onOpen: () => void;
  receiverName?: string;
}

export function Envelope({ onOpen, receiverName }: EnvelopeProps) {
  const [stage, setStage] = useState<'idle' | 'opening' | 'done'>('idle');
  const displayName = receiverName || cardConfig.receiver;

  const handleOpenClick = () => {
    if (stage !== 'idle') return;

    soundManager.playSoftClick();
    setStage('opening');

    // Trigger celebration sound & confetti burst during opening
    setTimeout(() => {
      soundManager.playMagicalChime();
      fireCardCelebration();
    }, 450);

    // Complete transition to main card
    setTimeout(() => {
      setStage('done');
      onOpen();
    }, 1800);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 z-20 overflow-hidden">
      {/* Background Soft Light Vignette */}
      <div className="absolute w-[36rem] h-[36rem] rounded-full bg-rose-900/20 blur-[130px] pointer-events-none" />

      {/* Screen Headline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-8 sm:mb-12 z-10 max-w-md"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-rose-500/25 bg-rose-950/40 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{cardConfig.badgeText}</span>
        </span>

        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFDF9] tracking-tight leading-snug">
          Một món quà nhỏ <br />
          <span className="text-gradient-rose">dành riêng cho {displayName}.</span>
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/70 mt-2 font-light">
          Chạm vào phong bì hoặc bấm nút bên dưới để mở thiệp
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div
        className="relative z-20 w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center cursor-pointer group"
        onClick={handleOpenClick}
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={
            stage === 'opening'
              ? {
                  scale: [1, 1.03, 1.08, 1.3],
                  y: [0, -5, -20, -50],
                  opacity: [1, 1, 1, 0],
                  transition: { duration: 1.8, times: [0, 0.2, 0.6, 1] },
                }
              : {}
          }
          whileHover={stage === 'idle' ? { y: -8, scale: 1.02 } : {}}
          className="relative w-full h-full transition-shadow duration-500"
        >
          {/* Envelope Glow Rim */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-400/20 to-amber-300/20 blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />

          {/* Envelope Body (Backplate & Pocket) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-rose-700/40 bg-gradient-to-br from-[#4A0E17] via-[#350A10] to-[#25050A]">
            {/* Subtle inner parchment texture */}
            <div className="absolute inset-0 bg-radial from-rose-900/30 via-transparent to-black/40 pointer-events-none" />

            {/* LETTER SLIDING UP ANIMATION */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={
                stage === 'opening'
                  ? {
                      y: -130,
                      opacity: 1,
                      scale: 1.05,
                      transition: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    }
                  : { y: 20, opacity: 0.4 }
              }
              className="absolute inset-x-5 top-6 bottom-4 rounded-xl glass-ivory p-5 text-stone-900 shadow-xl flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between border-b border-rose-200/60 pb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-800">
                  20 • 10 • 2026
                </span>
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              </div>
              <div className="my-auto text-center py-2">
                <p className="font-playfair text-base sm:text-lg font-bold text-rose-950">
                  Gửi {displayName},
                </p>
                <p className="text-xs text-stone-600 font-serif italic mt-1 line-clamp-2">
                  Người con gái anh luôn yêu thương và trân quý nhất...
                </p>
              </div>
              <div className="text-right">
                <span className="font-dancing text-sm font-bold text-rose-700">
                  ~ {cardConfig.sender}
                </span>
              </div>
            </motion.div>

            {/* ENVELOPE LOWER POCKET (Clips over the letter) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 50% 65%, 0% 40%)',
                background: 'linear-gradient(180deg, #57121D 0%, #3B0911 70%, #29050B 100%)',
                borderTop: '1px solid rgba(225, 29, 72, 0.25)',
              }}
            />

            {/* ENVELOPE TOP FLAP */}
            <motion.div
              animate={
                stage === 'opening'
                  ? {
                      rotateX: -180,
                      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    }
                  : { rotateX: 0 }
              }
              style={{
                transformOrigin: 'top center',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                background: 'linear-gradient(180deg, #6B1624 0%, #4D0E19 100%)',
                borderBottom: '1px solid rgba(244, 63, 94, 0.3)',
              }}
              className="absolute inset-0 z-30 pointer-events-none transform-style-3d"
            />

            {/* GOLD / RUBY WAX SEAL IN CENTER */}
            <AnimatePresence>
              {stage === 'idle' && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                >
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    {/* Golden shimmer ring */}
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 opacity-70 blur-xs" />
                    
                    {/* The Wax Seal Button */}
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#9E1B32] via-[#751122] to-[#4A0A15] border-2 border-amber-300/60 shadow-xl flex flex-col items-center justify-center text-amber-200">
                      <Heart className="w-6 h-6 fill-amber-200/90 text-amber-100 animate-gentle-pulse" />
                      <span className="text-[8px] font-bold tracking-widest mt-0.5 uppercase">
                        20•10
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative Corner Filigrees */}
            <div className="absolute top-2 left-2 text-rose-400/40 pointer-events-none z-30">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="absolute top-2 right-2 text-rose-400/40 pointer-events-none z-30">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Primary Action Button: [ MỞ THIỆP ] */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-8 sm:mt-10 z-20 flex flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={handleOpenClick}
          disabled={stage !== 'idle'}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-rose-950 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100 hover:brightness-105 shadow-xl shadow-rose-950/60 hover:shadow-rose-900/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60"
        >
          <MailOpen className="w-4 h-4 text-rose-800 group-hover:rotate-12 transition-transform" />
          <span className="tracking-wider uppercase font-bold text-rose-950">
            {stage === 'opening' ? 'Đang mở thiệp...' : 'Mở thiệp yêu thương'}
          </span>
          <Heart className="w-4 h-4 text-rose-700 fill-rose-700 animate-gentle-pulse" />
        </button>

        <p className="text-[11px] text-rose-300/60 font-light tracking-wide">
          Một bất ngờ nho nhỏ đang đợi em phía sau cánh cửa này...
        </p>
      </motion.div>
    </div>
  );
}
