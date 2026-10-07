'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Sparkles, Volume2, VolumeX, Menu, X, Wand2 } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playMagicalChime();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-sm shadow-rose-950/5 py-3 border-b border-rose-100/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => soundManager.playSoftClick()}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-300/50 group-hover:scale-105 transition-transform duration-300">
            <Heart className="w-5 h-5 fill-current animate-gentle-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-playfair font-bold text-2xl tracking-tight text-rose-950 flex items-center gap-1.5">
              20<span className="text-rose-500 font-serif">•</span>10
            </span>
            <span className="text-[10px] tracking-widest uppercase text-rose-500/80 -mt-1 font-medium">
              Thiệp Yêu Thương
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-rose-600 ${
              pathname === '/' ? 'text-rose-600 font-semibold' : 'text-stone-600'
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/#templates"
            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
          >
            Mẫu thiệp
          </Link>
          <Link
            href="/create"
            className={`text-sm font-medium transition-colors hover:text-rose-600 flex items-center gap-1.5 ${
              pathname === '/create' ? 'text-rose-600 font-semibold' : 'text-stone-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            Tạo thiệp
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2 rounded-full text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-500" />}
          </button>

          {/* CTA Button */}
          <Link
            href="/create"
            onClick={() => soundManager.playSoftClick()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm shadow-md shadow-rose-400/30 hover:shadow-lg hover:shadow-rose-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Wand2 className="w-4 h-4" />
            <span>Tạo thiệp ngay</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-rose-50 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-rose-100 px-6 py-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600"
            >
              Trang chủ
            </Link>
            <Link
              href="/#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600"
            >
              Mẫu thiệp
            </Link>
            <Link
              href="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600"
            >
              Tạo thiệp mới
            </Link>
            <Link
              href="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-md shadow-rose-300"
            >
              Bắt đầu tạo thiệp ✨
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
