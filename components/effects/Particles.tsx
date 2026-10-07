'use client';

import React from 'react';

// Tiny glowing particles
const PARTICLES = [
  { id: 1, x: 12, y: 18, size: 3, delay: 0.5, dur: 4.5 },
  { id: 2, x: 28, y: 45, size: 2, delay: 1.2, dur: 5.2 },
  { id: 3, x: 42, y: 22, size: 2.5, delay: 2.1, dur: 4.0 },
  { id: 4, x: 65, y: 35, size: 3, delay: 0.8, dur: 4.8 },
  { id: 5, x: 82, y: 15, size: 2, delay: 1.7, dur: 5.5 },
  { id: 6, x: 20, y: 75, size: 2.5, delay: 2.5, dur: 4.2 },
  { id: 7, x: 50, y: 85, size: 3, delay: 1.0, dur: 4.6 },
  { id: 8, x: 75, y: 68, size: 2, delay: 3.0, dur: 5.0 },
  { id: 9, x: 88, y: 80, size: 2.5, delay: 1.5, dur: 4.4 },
];

export function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-200/40 blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 6px 1px rgba(253, 224, 71, 0.45)',
            animation: `gentlePulse ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
