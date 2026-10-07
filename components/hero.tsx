'use client';

import React from 'react';
import Link from 'next/link';
import { CardPreview } from './card-preview';
import { GreetingCardData } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates';
import { Wand2, Eye, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export function Hero() {
  const heroCardData: GreetingCardData = {
    id: 'hero-sample',
    templateId: 'sweet-rose',
    themeId: 'rose',
    recipient: 'Người Phụ Nữ Tuyệt Vời',
    sender: 'Thương Gửi Đến Bạn',
    greeting:
      'Chúc bạn một ngày 20/10 thật rực rỡ, ngập tràn tiếng cười và luôn được nâng niu như những đóa hồng sớm mai!',
    fontStyle: 'playfair',
    createdAt: '2026-10-20T00:00:00.000Z',
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Romantic Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100/90 to-pink-100/90 border border-rose-200/80 text-rose-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>20 • 10 • 2026</span>
              <span className="text-rose-400">|</span>
              <span className="text-rose-700">Ngày Phụ Nữ Việt Nam</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Tạo một lời chúc <br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
                thật đặc biệt
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Thiết kế thiệp 20/10 của riêng bạn và gửi món quà yêu thương đến những người phụ nữ
              đặc biệt: Mẹ kính yêu, người bạn đời, đồng nghiệp hay cô bạn thân.
            </p>

            {/* Value Points Pill */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>6+ Mẫu thiệp cao cấp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Tùy chỉnh realtime 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Tải ảnh PNG & Chia sẻ tức thì</span>
              </div>
            </div>

            {/* 2 CTA Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/create"
                onClick={() => soundManager.playSoftClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-xl shadow-rose-400/30 hover:shadow-rose-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Wand2 className="w-5 h-5" />
                <span>Tạo thiệp ngay</span>
              </Link>

              <a
                href="#templates"
                onClick={() => soundManager.playSoftClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/90 hover:bg-white text-stone-800 font-semibold text-base border border-rose-200 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Eye className="w-4 h-4 text-rose-500" />
                <span>Xem mẫu ({TEMPLATES.length})</span>
              </a>
            </div>

            {/* Subtle user quote */}
            <p className="mt-8 text-xs text-stone-500 italic">
              ❝ Một món quà nhỏ nhưng rất tinh tế và đáng yêu dành cho người phụ nữ mình yêu thương. ❞
            </p>
          </div>

          {/* Right Column: 3D Floating Mockup Card */}
          <div className="lg:col-span-5 flex justify-center items-center z-10 relative">
            <div className="relative group transition-transform duration-500">
              {/* Outer decorative halos */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-rose-400/20 via-pink-300/30 to-amber-200/20 blur-2xl -z-10 group-hover:scale-105 transition-transform duration-500" />

              {/* Decorative mini badges around card */}
              <div className="hidden sm:flex absolute -top-4 -left-6 z-20 items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-white text-xs font-semibold text-rose-800 shadow-lg shadow-rose-950/5 animate-gentle-pulse">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Hiệu ứng thiệp 3D</span>
              </div>

              <div className="hidden sm:flex absolute -bottom-3 -right-5 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border border-white text-xs font-semibold text-rose-800 shadow-lg shadow-rose-950/5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Gửi gắm yêu thương</span>
              </div>

              {/* The 3D Floating Card Preview */}
              <div className="transform transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.02]">
                <CardPreview data={heroCardData} isFloating={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
