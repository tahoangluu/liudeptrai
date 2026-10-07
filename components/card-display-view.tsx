'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { GreetingCardData } from '@/lib/types';
import { CARD_THEMES } from '@/lib/templates';
import { CardPreview } from './card-preview';
import { ShareButtons } from './share-buttons';
import { PetalsBackground } from './petals-background';
import { fireCardCelebration, fireGentleHearts } from '@/lib/confetti';
import { soundManager } from '@/lib/sound';
import { Heart, Sparkles, MailOpen, Mail, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

interface CardDisplayViewProps {
  cardData: GreetingCardData;
  shareUrl: string;
}

export function CardDisplayView({ cardData, shareUrl }: CardDisplayViewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const theme = CARD_THEMES[cardData.themeId] || CARD_THEMES.rose;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger celebration once on page mount
    if (!hasCelebrated) {
      setTimeout(() => {
        fireCardCelebration();
        soundManager.playMagicalChime();
        setHasCelebrated(true);
      }, 400);
    }
  }, [hasCelebrated]);

  const toggleEnvelope = () => {
    soundManager.playSoftClick();
    if (!isOpen) {
      soundManager.playMagicalChime();
      fireGentleHearts();
    }
    setIsOpen(!isOpen);
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between py-8 px-4 sm:px-6 overflow-x-hidden">
      {/* Background Petals & Glow */}
      <PetalsBackground />

      {/* Top Floating Utility Navigation */}
      <header className="relative z-20 max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-rose-200 text-stone-700 hover:text-rose-600 text-xs sm:text-sm font-medium transition-colors shadow-2xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Về trang chủ</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Envelope view toggle */}
          <button
            type="button"
            onClick={toggleEnvelope}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel border border-rose-200 text-stone-700 hover:text-rose-600 text-xs font-medium transition-colors shadow-2xs"
          >
            {isOpen ? (
              <>
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">Gấp vào phong bì</span>
              </>
            ) : (
              <>
                <MailOpen className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">Mở thiệp ra</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle sound"
            className="p-2 rounded-full glass-panel border border-rose-200 text-stone-600 hover:text-rose-600 transition-colors shadow-2xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </header>

      {/* Main Focus: 3D Greeting Card Showcase */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
        {/* Envelope Presentation if closed */}
        {!isOpen ? (
          <div
            onClick={toggleEnvelope}
            className="w-full max-w-[400px] h-[340px] rounded-3xl p-6 relative cursor-pointer group shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden"
            style={{
              background: `linear-gradient(145deg, #FFF1F2 0%, #FFE4E6 60%, #FECDD3 100%)`,
              border: `2px solid ${theme.cardBorder}`,
              boxShadow: `0 25px 50px -12px ${theme.glowColor}`,
            }}
          >
            {/* Envelope flap decor */}
            <div
              className="absolute top-0 left-0 right-0 h-32 origin-top transition-transform duration-300"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #FDE2E4 0%, #FBB6CE 100%)',
                borderBottom: `1px solid ${theme.cardBorder}`,
              }}
            />

            <div className="z-10 flex items-center justify-between text-xs text-rose-800 font-semibold uppercase tracking-wider">
              <span>Thư gửi người thương</span>
              <span>20 • 10</span>
            </div>

            {/* Wax Seal in Center */}
            <div className="z-20 my-auto text-center flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: theme.sealColor,
                  boxShadow: `0 8px 25px ${theme.glowColor}`,
                }}
              >
                <Heart className="w-8 h-8 fill-current animate-gentle-pulse" />
              </div>
              <p className="mt-3 font-playfair font-bold text-stone-800 text-lg">
                Dành tặng: {cardData.recipient}
              </p>
              <span className="text-xs text-rose-600 mt-1 font-medium bg-white/70 px-3 py-1 rounded-full border border-rose-200">
                ✨ Chạm để mở thiệp
              </span>
            </div>

            <div className="z-10 text-right text-xs text-stone-600 font-dancing font-bold">
              Từ: {cardData.sender}
            </div>
          </div>
        ) : (
          /* Opened Card View */
          <div className="w-full flex flex-col items-center">
            {/* Card Preview element */}
            <div className="w-full max-w-[400px]">
              <CardPreview
                ref={cardRef}
                data={cardData}
                is3dInteractive={true}
                isFloating={false}
              />
            </div>

            {/* Bottom Status Tag */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-200 text-rose-800 text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Tấm thiệp đã sẵn sàng 💗</span>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Bạn có thể chia sẻ đường link hoặc tải về máy dưới dạng hình ảnh PNG độ phân giải cao.
              </p>
            </div>

            {/* Share & Download Buttons */}
            <div className="mt-6 w-full max-w-md">
              <ShareButtons
                shareUrl={shareUrl}
                cardTargetId="export-card-target"
              />
            </div>
          </div>
        )}
      </main>

      {/* Bottom mini copyright watermark */}
      <footer className="relative z-10 text-center text-[11px] text-stone-400 py-2">
        20.10 Cards • Tôn vinh vẻ đẹp Phụ Nữ Việt Nam
      </footer>
    </div>
  );
}
