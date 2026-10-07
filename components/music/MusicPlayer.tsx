'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Music, Sparkles } from 'lucide-react';
import { cardConfig } from '@/config/card';

// Romantic Web Audio Piano / Music Box Chime synthesizer fallback
class AmbientMelodySynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: NodeJS.Timeout | null = null;

  private initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public start() {
    this.isPlaying = true;
    const ctx = this.initCtx();
    if (!ctx) return;

    // A romantic, gentle chord progression (Fmaj7 - C - Dm7 - Am)
    const melody = [
      349.23, 440.0, 523.25, 659.25, // Fmaj7
      523.25, 440.0, 392.0, 329.63,  // C / Em
      293.66, 349.23, 440.0, 523.25, // Dm7
      440.0, 392.0, 329.63, 261.63,  // Am / C
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.045, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 1.5);

      this.timer = setTimeout(playNext, 650);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

const synthInstance = new AmbientMelodySynth();

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if audio file can load or fall back
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      // Audio file not found or unsupported, fallback to synth
      setUseSynth(true);
    };

    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      // Pause
      if (useSynth) {
        synthInstance.stop();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (useSynth) {
        synthInstance.start();
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay rejected or file missing, switch to synth
            setUseSynth(true);
            synthInstance.start();
            setIsPlaying(true);
          });
      }
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={cardConfig.music.src}
        loop
        preload="none"
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền lãng mạn'}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền lãng mạn'}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 shadow-lg shadow-rose-900/30 ring-1 ring-rose-400/30'
            : 'bg-[#2B080C]/70 border-rose-900/40 text-stone-400 hover:text-rose-200 hover:border-rose-700/50'
        }`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
              <span className="w-[2px] bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
              <span className="w-[2px] bg-rose-400 rounded-full animate-bounce [animation-delay:-0.45s] h-3.5" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
        </div>

        <span className="text-[11px] font-medium tracking-wider uppercase">
          {isPlaying ? 'Âm nhạc' : 'Bật nhạc'}
        </span>

        {isPlaying && (
          <Sparkles className="w-3 h-3 text-amber-300 animate-gentle-pulse hidden sm:inline" />
        )}
      </button>
    </div>
  );
}
