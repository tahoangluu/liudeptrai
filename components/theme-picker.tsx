'use client';

import React from 'react';
import { CARD_THEMES } from '@/lib/templates';
import { ThemeId } from '@/lib/types';
import { Check } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface ThemePickerProps {
  selectedThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
}

export function ThemePicker({ selectedThemeId, onSelectTheme }: ThemePickerProps) {
  const themes = Object.values(CARD_THEMES);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-stone-800 flex items-center gap-2">
          <span>Chọn sắc thái (Theme)</span>
        </label>
        <span className="text-xs text-rose-600 font-medium">
          {CARD_THEMES[selectedThemeId]?.name}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {themes.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                soundManager.playSoftClick();
                onSelectTheme(theme.id);
              }}
              className={`group relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-center ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/70 shadow-md shadow-rose-200/50 scale-[1.03]'
                  : 'border-stone-200 bg-white/80 hover:border-rose-300 hover:bg-rose-50/30'
              }`}
            >
              {/* Color Swatch Dot */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shadow-inner text-sm relative mb-1.5 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: theme.cardBg,
                  border: `2px solid ${theme.cardBorder}`,
                }}
              >
                <span>{theme.emoji}</span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Theme Name */}
              <span
                className={`text-[12px] font-medium leading-tight truncate w-full ${
                  isSelected ? 'text-rose-950 font-bold' : 'text-stone-600'
                }`}
              >
                {theme.name.replace(/ .*/, '')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
