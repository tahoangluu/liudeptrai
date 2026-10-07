'use client';

import React from 'react';
import Link from 'next/link';
import { CardTemplate } from '@/lib/types';
import { CARD_THEMES } from '@/lib/templates';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface TemplateCardProps {
  template: CardTemplate;
  isSelected?: boolean;
  onSelect?: () => void;
  asLink?: boolean;
}

export function TemplateCard({
  template,
  isSelected = false,
  onSelect,
  asLink = true,
}: TemplateCardProps) {
  const theme = CARD_THEMES[template.defaultTheme] || CARD_THEMES.rose;

  const content = (
    <div
      onClick={() => {
        soundManager.playSoftClick();
        if (onSelect) onSelect();
      }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border ${
        isSelected
          ? 'border-rose-500 shadow-xl shadow-rose-200/60 ring-2 ring-rose-400/40 scale-[1.02]'
          : 'border-rose-100/80 bg-white/80 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100 hover:-translate-y-1'
      }`}
    >
      {/* Decorative Card Mockup Header Preview */}
      <div
        className="relative h-56 p-5 flex flex-col justify-between overflow-hidden"
        style={{
          background: theme.cardBg,
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        {/* Soft Background glow */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-40 blur-xl pointer-events-none"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* Mini Corner ornaments */}
        <div className="absolute top-2 left-2 text-rose-400 opacity-50">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="absolute top-2 right-2 text-rose-400 opacity-50">
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Top Badges */}
        <div className="flex items-center justify-between z-10">
          <span
            className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
              borderColor: theme.cardBorder,
            }}
          >
            {template.name}
          </span>
          <span className="text-base">{theme.emoji}</span>
        </div>

        {/* Center Card Snippet */}
        <div className="my-auto text-center z-10 px-2 py-1">
          <div
            className="inline-block p-1 rounded-full mb-1 text-white shadow-xs"
            style={{ backgroundColor: theme.sealColor }}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
          <h4
            className="text-base font-bold tracking-tight line-clamp-1 font-playfair"
            style={{ color: theme.textColor }}
          >
            {template.defaultRecipient}
          </h4>
          <p
            className="text-[11px] mt-1 line-clamp-2 leading-relaxed opacity-85 px-1 font-sans"
            style={{ color: theme.textColor }}
          >
            {template.defaultGreeting}
          </p>
        </div>

        {/* Bottom Sender tag in preview */}
        <div className="text-right z-10">
          <span
            className="text-[11px] font-dancing font-bold"
            style={{ color: theme.accentColor }}
          >
            ~ {template.defaultSender}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 bg-white/95 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-playfair font-bold text-base text-stone-900 group-hover:text-rose-600 transition-colors">
              {template.name}
            </h3>
            <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              {template.tagline}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-rose-600 group-hover:text-rose-700">
          <span>Chọn mẫu này</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href={`/create?template=${template.id}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
