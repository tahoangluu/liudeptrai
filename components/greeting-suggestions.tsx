'use client';

import React, { useState } from 'react';
import { GREETING_SUGGESTIONS } from '@/lib/templates';
import { Sparkles, Check } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface GreetingSuggestionsProps {
  onSelectGreeting: (greeting: string, defaultRecipient?: string) => void;
}

export function GreetingSuggestions({ onSelectGreeting }: GreetingSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('mom');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentCategory =
    GREETING_SUGGESTIONS.find((c) => c.category === activeCategory) ||
    GREETING_SUGGESTIONS[0];

  const handleSelect = (text: string, index: number) => {
    soundManager.playSoftClick();
    setCopiedIndex(index);
    onSelectGreeting(text, currentCategory.recipientPlaceholder);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-rose-950 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Gợi ý lời chúc ý nghĩa</span>
        </label>
        <span className="text-[11px] text-stone-500 italic">Nhấn để áp dụng ngay</span>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {GREETING_SUGGESTIONS.map((cat) => (
          <button
            key={cat.category}
            type="button"
            onClick={() => {
              soundManager.playSoftClick();
              setActiveCategory(cat.category);
            }}
            className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
              activeCategory === cat.category
                ? 'bg-rose-600 text-white font-medium shadow-xs shadow-rose-300'
                : 'bg-white/80 text-stone-600 hover:bg-rose-100/60 hover:text-rose-900 border border-stone-200/60'
            }`}
          >
            {cat.categoryLabel}
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
        {currentCategory.items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(item, idx)}
            className="w-full text-left p-2.5 rounded-xl bg-white text-xs text-stone-700 hover:text-rose-950 hover:bg-rose-50/80 border border-stone-200/80 hover:border-rose-300 transition-all group flex items-start gap-2 shadow-2xs"
          >
            <span className="text-rose-400 font-bold text-sm leading-none mt-0.5 group-hover:scale-110 transition-transform">
              {copiedIndex === idx ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                '❝'
              )}
            </span>
            <span className="flex-1 leading-relaxed">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
