/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cardConfig } from '@/config/card';
import { soundManager } from '@/lib/sound';

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const photos = cardConfig.gallery.photos;

  const handleOpenLightbox = (index: number) => {
    soundManager.playSoftClick();
    setSelectedIdx(index);
  };

  const handleCloseLightbox = () => {
    soundManager.playSoftClick();
    setSelectedIdx(null);
  };

  const handlePrev = useCallback(() => {
    soundManager.playSoftClick();
    setSelectedIdx((prev) => (prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    soundManager.playSoftClick();
    setSelectedIdx((prev) => (prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : null));
  }, [photos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{cardConfig.gallery.sectionBadge}</span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#FFFDF9] tracking-tight">
          {cardConfig.gallery.title}
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/70 mt-3 font-light leading-relaxed">
          {cardConfig.gallery.subtitle}
        </p>
      </div>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {photos.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-rose-900/30 bg-[#2C0A10]/70 aspect-[4/3] sm:aspect-[4/3] shadow-lg shadow-black/40 hover:border-rose-500/50 hover:shadow-rose-950/50 transition-all duration-300"
          >
            {/* Image display */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-out"
              />

              {/* Ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0407] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Tag / Location */}
              {item.location && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-rose-200 tracking-wider">
                  {item.location}
                </div>
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <p className="text-xs sm:text-sm font-medium text-stone-100 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                <span className="text-[10px] text-rose-300/80 font-light flex items-center gap-1 mt-1">
                  <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                  <span>Chạm để phóng to</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              aria-label="Đóng xem ảnh"
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ảnh trước"
              className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Ảnh sau"
              className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
              <motion.img
                key={photos[selectedIdx].id}
                src={photos[selectedIdx].src}
                alt={photos[selectedIdx].caption}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              {/* Caption & Counter */}
              <div className="mt-4 text-center max-w-lg">
                <p className="text-sm sm:text-base text-stone-100 font-medium">
                  {photos[selectedIdx].caption}
                </p>
                <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-rose-300/70 font-light">
                  {photos[selectedIdx].location && <span>{photos[selectedIdx].location}</span>}
                  <span>•</span>
                  <span>
                    {selectedIdx + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
