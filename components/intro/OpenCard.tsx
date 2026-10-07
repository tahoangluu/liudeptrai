'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './LoadingScreen';
import { Envelope } from './Envelope';
import { Hero } from '../card/Hero';
import { LoveLetter } from '../card/LoveLetter';
import { Gallery } from '../card/Gallery';
import { LoveReasons } from '../card/LoveReasons';
import { Timeline } from '../card/Timeline';
import { Gift } from '../card/Gift';
import { FinalMessage } from '../card/FinalMessage';
import { Petals } from '../effects/Petals';
import { Particles } from '../effects/Particles';
import { BackgroundGlow } from '../effects/BackgroundGlow';
import { MusicPlayer } from '../music/MusicPlayer';

interface OpenCardProps {
  receiverName?: string;
}

export function OpenCard({ receiverName }: OpenCardProps) {
  // Lazy state initializers to avoid setState in effect
  const [hasLoaded, setHasLoaded] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('has_opened_card_2010') === 'true';
    } catch {
      return false;
    }
  });

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('has_opened_card_2010') === 'true';
    } catch {
      return false;
    }
  });

  const handleFinishLoading = () => {
    setHasLoaded(true);
  };

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    try {
      sessionStorage.setItem('has_opened_card_2010', 'true');
    } catch {
      // Ignore
    }
  };

  const handleReplay = () => {
    try {
      sessionStorage.removeItem('has_opened_card_2010');
    } catch {
      // Ignore
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#23060a] text-[#FAF5F0] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Background Atmosphere */}
      <BackgroundGlow />
      <Particles />
      <Petals />

      {/* Floating Ambient Music Player */}
      <MusicPlayer />

      {/* STEP 1: INITIAL LOADING SCREEN */}
      {!hasLoaded && (
        <LoadingScreen
          onFinish={handleFinishLoading}
          receiverName={receiverName}
        />
      )}

      {/* STEP 2: ENVELOPE OPENING STAGE */}
      <AnimatePresence mode="wait">
        {hasLoaded && !isOpen && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
          >
            <Envelope
              onOpen={handleOpenEnvelope}
              receiverName={receiverName}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 3: FULL ROMANTIC LOVE CARD SECTIONS */}
      {hasLoaded && isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 w-full"
        >
          {/* 1. Hero Title */}
          <Hero receiverName={receiverName} />

          {/* 2. Love Letter */}
          <LoveLetter receiverName={receiverName} />

          {/* 3. Memory Gallery */}
          <Gallery />

          {/* 4. Reasons Why I Love You */}
          <LoveReasons />

          {/* 5. Love Timeline */}
          <Timeline />

          {/* 6. Secret Interactive Gift Box */}
          <Gift />

          {/* 7. Final Message & Replay Button */}
          <FinalMessage
            onReplay={handleReplay}
            receiverName={receiverName}
          />
        </motion.main>
      )}
    </div>
  );
}
