'use client';

import React, { useState } from 'react';
import { TEMPLATES } from '@/lib/templates';
import { TemplateCard } from './template-card';
import { Sparkles, Heart } from 'lucide-react';

export function TemplateGallery() {
  const [filter, setFilter] = useState<string>('all');

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  return (
    <section id="templates" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BỘ SƯU TẬP ĐỘC BẢN</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Chọn một phong cách
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Mỗi tấm thiệp mang một linh hồn và giai điệu riêng. Hãy chọn phong cách hòa hợp nhất
            với người phụ nữ bạn muốn gửi trao yêu thương.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-300'
                  : 'bg-white/90 text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              Tất cả mẫu ({TEMPLATES.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('mom')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filter === 'mom'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-300'
                  : 'bg-white/90 text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              Dành cho Mẹ
            </button>
            <button
              type="button"
              onClick={() => setFilter('love')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filter === 'love'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-300'
                  : 'bg-white/90 text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              Người yêu & Vợ
            </button>
            <button
              type="button"
              onClick={() => setFilter('elegant')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filter === 'elegant'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-300'
                  : 'bg-white/90 text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              Quý phái & Sang trọng
            </button>
            <button
              type="button"
              onClick={() => setFilter('friend')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                filter === 'friend'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-300'
                  : 'bg-white/90 text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              Bạn bè & Tri kỷ
            </button>
          </div>
        </div>

        {/* Templates Grid (2 columns on mobile, 3 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Small bottom note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-500 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Mỗi mẫu đều có thể tùy biến màu sắc, nội dung và lời chúc không giới hạn.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
