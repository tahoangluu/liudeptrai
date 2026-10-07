import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-rose-100/80 bg-white/60 backdrop-blur-md py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="font-playfair font-bold text-xl text-stone-900 tracking-tight">
            20.10 Cards Studio
          </span>
        </div>

        <p className="text-sm text-stone-600 max-w-md font-normal leading-relaxed">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-current mx-0.5" /> for
          every wonderful woman.
        </p>

        <p className="text-xs text-rose-600/90 font-medium tracking-wider uppercase mt-1">
          20.10 • Vietnamese Women&apos;s Day
        </p>

        <div className="mt-6 pt-6 border-t border-rose-100 w-full max-w-sm flex items-center justify-center gap-6 text-xs text-stone-500">
          <Link href="/" className="hover:text-rose-600 transition-colors">
            Trang chủ
          </Link>
          <span>•</span>
          <Link href="/#templates" className="hover:text-rose-600 transition-colors">
            Mẫu thiệp
          </Link>
          <span>•</span>
          <Link href="/create" className="hover:text-rose-600 transition-colors">
            Tạo thiệp
          </Link>
        </div>

        <p className="mt-4 text-[11px] text-stone-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Lan tỏa nụ cười và sự trân quý đến những người phụ nữ Việt Nam</span>
        </p>
      </div>
    </footer>
  );
}
