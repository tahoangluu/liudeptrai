'use client';

import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Deep Wine / Ruby / Rose subtle radial lights */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[34rem] rounded-full bg-gradient-to-b from-rose-900/35 via-wine-900/20 to-transparent blur-[120px]" />
      
      <div className="absolute top-1/3 -left-32 w-[30rem] h-[30rem] rounded-full bg-crimson/15 blur-[130px]" />
      
      <div className="absolute top-2/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-rose-950/40 blur-[140px]" />

      <div className="absolute bottom-10 left-1/3 w-[36rem] h-[28rem] rounded-full bg-amber-950/20 blur-[130px]" />

      {/* Subtle cinematic vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#23060a]/40 to-[#190306]/90 pointer-events-none" />

      {/* Very subtle luxury noise pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
