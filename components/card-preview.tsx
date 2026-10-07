'use client';

import React, { forwardRef, useState } from 'react';
import { GreetingCardData } from '@/lib/types';
import { CARD_THEMES, getTemplateById } from '@/lib/templates';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

interface CardPreviewProps {
  data: GreetingCardData;
  is3dInteractive?: boolean;
  className?: string;
  isFloating?: boolean;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ data, is3dInteractive = true, className = '', isFloating = false }, ref) => {
    const theme = CARD_THEMES[data.themeId] || CARD_THEMES.rose;
    const template = getTemplateById(data.templateId);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!is3dInteractive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTilt({
        x: Number((-y / 28).toFixed(2)),
        y: Number((x / 28).toFixed(2)),
      });
    };

    const handleMouseLeave = () => {
      if (!is3dInteractive) return;
      setTilt({ x: 0, y: 0 });
    };

    // Font styling according to chosen fontStyle
    const getFontFamily = () => {
      switch (data.fontStyle) {
        case 'dancing':
          return 'font-dancing';
        case 'script':
          return 'font-script';
        case 'cormorant':
          return 'font-cormorant';
        case 'playfair':
        default:
          return 'font-playfair';
      }
    };

    return (
      <div
        className={`relative select-none ${isFloating ? 'animate-soft-float' : ''} ${className}`}
        style={{
          perspective: '1200px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft atmospheric ambient glow behind the card */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${theme.glowColor} 0%, rgba(255,255,255,0) 70%)`,
          }}
        />

        {/* Physical Greeting Card */}
        <div
          ref={ref}
          id="export-card-target"
          className="relative w-full max-w-[400px] h-[570px] mx-auto rounded-2xl overflow-hidden transition-transform duration-200 ease-out shadow-2xl flex flex-col justify-between"
          style={{
            background: theme.cardBg,
            borderColor: theme.cardBorder,
            transform: is3dInteractive
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : undefined,
            boxShadow: `0 25px 50px -12px ${theme.glowColor}, 0 0 0 1px ${theme.cardBorder}, 0 10px 20px -5px rgba(0, 0, 0, 0.04)`,
          }}
        >
          {/* Subtle ornate background watermark florals */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply flex items-center justify-center overflow-hidden"
            style={{ opacity: theme.patternOpacity }}
          >
            <svg
              className="w-[140%] h-[140%] text-stone-900 fill-current -rotate-12"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.3" fill="none" />
              <path
                d="M50 10 Q55 35 50 50 Q45 35 50 10 Z M50 90 Q55 65 50 50 Q45 65 50 90 Z M10 50 Q35 55 50 50 Q35 45 10 50 Z M90 50 Q65 55 50 50 Q65 45 90 50 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Double Ornate Border Frame */}
          <div
            className="absolute inset-3 rounded-xl pointer-events-none border transition-colors duration-500"
            style={{ borderColor: theme.cardBorder }}
          />
          <div
            className="absolute inset-[18px] rounded-lg pointer-events-none border border-dashed transition-colors duration-500"
            style={{ borderColor: `${theme.cardBorder}99` }}
          />

          {/* Corner Flourish Ornaments (SVG) */}
          <div className="absolute top-4 left-4 w-7 h-7 pointer-events-none" style={{ color: theme.ornamentColor }}>
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M2 2 H14 C8 2 2 8 2 14 V2 Z" opacity="0.65" />
              <circle cx="8" cy="8" r="2" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-7 h-7 pointer-events-none rotate-90" style={{ color: theme.ornamentColor }}>
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M2 2 H14 C8 2 2 8 2 14 V2 Z" opacity="0.65" />
              <circle cx="8" cy="8" r="2" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-7 h-7 pointer-events-none -rotate-90" style={{ color: theme.ornamentColor }}>
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M2 2 H14 C8 2 2 8 2 14 V2 Z" opacity="0.65" />
              <circle cx="8" cy="8" r="2" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-7 h-7 pointer-events-none rotate-180" style={{ color: theme.ornamentColor }}>
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M2 2 H14 C8 2 2 8 2 14 V2 Z" opacity="0.65" />
              <circle cx="8" cy="8" r="2" />
            </svg>
          </div>

          {/* CARD CONTENT HEADER */}
          <div className="relative pt-7 px-7 text-center z-10">
            {/* Top Emblem / Wax Seal */}
            <div className="inline-flex items-center justify-center mb-2.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.sealColor,
                  boxShadow: `0 4px 12px ${theme.glowColor}`,
                }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Header Badge */}
            <div className="flex flex-col items-center">
              <span
                className="text-[10px] tracking-[0.25em] font-semibold uppercase px-3 py-1 rounded-full border transition-all duration-300 mb-1"
                style={{
                  backgroundColor: theme.badgeBg,
                  color: theme.badgeText,
                  borderColor: `${theme.cardBorder}`,
                }}
              >
                {template.headerBadge || "HAPPY VIETNAMESE WOMEN'S DAY"}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span className="w-5 h-[1px]" style={{ backgroundColor: theme.ornamentColor }} />
                <span
                  className="font-playfair font-bold text-xs tracking-widest uppercase"
                  style={{ color: theme.subtextColor }}
                >
                  20 • 10 • 2026
                </span>
                <span className="w-5 h-[1px]" style={{ backgroundColor: theme.ornamentColor }} />
              </div>
            </div>

            {/* Recipient Headline */}
            <div className="mt-4 pt-1">
              <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Kính gửi đến
              </p>
              <h3
                className={`text-2xl sm:text-[26px] font-bold mt-0.5 tracking-tight px-2 break-words line-clamp-1 transition-all duration-300 ${getFontFamily()}`}
                style={{ color: theme.textColor }}
              >
                {data.recipient || 'Người Phụ Nữ Tuyệt Vời'}
              </h3>
            </div>
          </div>

          {/* CARD MESSAGE BODY */}
          <div className="relative px-8 py-2 z-10 flex-1 flex flex-col items-center justify-center text-center">
            {/* Elegant Quotation Mark */}
            <div
              className="text-3xl font-serif leading-none select-none -mb-1 opacity-40 font-cormorant"
              style={{ color: theme.ornamentColor }}
            >
              “
            </div>

            {/* Message Text with scroll if very long */}
            <div className="w-full max-h-[190px] overflow-y-auto px-2 py-1 scrollbar-none">
              <p
                className={`text-[15px] sm:text-[16px] leading-relaxed tracking-normal font-normal whitespace-pre-wrap transition-all duration-300 ${getFontFamily()}`}
                style={{ color: theme.textColor }}
              >
                {data.greeting ||
                  'Chúc bạn một ngày 20/10 ngập tràn niềm vui, nụ cười luôn rạng rỡ và luôn được yêu thương thật nhiều!'}
              </p>
            </div>

            {/* Bottom Quotation Mark */}
            <div
              className="text-3xl font-serif leading-none select-none -mt-1 opacity-40 font-cormorant"
              style={{ color: theme.ornamentColor }}
            >
              ”
            </div>
          </div>

          {/* CARD FOOTER / SIGNATURE */}
          <div className="relative pb-7 px-8 z-10 text-center">
            {/* Delicate divider with flower */}
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="w-10 h-[1px] opacity-40" style={{ backgroundColor: theme.ornamentColor }} />
              <Flower2 className="w-3.5 h-3.5 opacity-70" style={{ color: theme.ornamentColor }} />
              <span className="w-10 h-[1px] opacity-40" style={{ backgroundColor: theme.ornamentColor }} />
            </div>

            {/* Sender Sign-off */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] italic tracking-wide text-stone-500 font-serif">
                Thương yêu & Trân quý,
              </span>
              <p
                className="font-dancing text-xl font-bold tracking-wide mt-0.5 line-clamp-1"
                style={{ color: theme.accentColor }}
              >
                {data.sender || 'Người gửi yêu thương'}
              </p>
            </div>

            {/* Date Tag */}
            <div className="mt-2 text-[10px] tracking-wider uppercase opacity-60 text-stone-600 flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Ngày Phụ Nữ Việt Nam 20.10</span>
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Subtle glossy sheen reflection on card surface */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/40" />
        </div>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';
