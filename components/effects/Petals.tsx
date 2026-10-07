'use client';

import React from 'react';

interface Petal {
  id: number;
  left: number;
  top: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

// Precomputed petals with romantic rose, crimson and burgundy tints
const STATIC_PETALS: Petal[] = [
  { id: 1, left: 6, top: -12, size: 16, rotation: 35, duration: 16, delay: 0, opacity: 0.45, color: '#e11d48' },
  { id: 2, left: 16, top: -15, size: 20, rotation: 80, duration: 20, delay: 3, opacity: 0.55, color: '#f43f5e' },
  { id: 3, left: 26, top: -20, size: 14, rotation: 120, duration: 18, delay: 7, opacity: 0.4, color: '#fda4af' },
  { id: 4, left: 36, top: -10, size: 18, rotation: 45, duration: 22, delay: 1.5, opacity: 0.5, color: '#be123c' },
  { id: 5, left: 46, top: -18, size: 22, rotation: 210, duration: 17, delay: 5, opacity: 0.45, color: '#e11d48' },
  { id: 6, left: 56, top: -14, size: 15, rotation: 160, duration: 21, delay: 8, opacity: 0.35, color: '#f43f5e' },
  { id: 7, left: 66, top: -22, size: 21, rotation: 90, duration: 19, delay: 2.5, opacity: 0.55, color: '#fda4af' },
  { id: 8, left: 76, top: -16, size: 17, rotation: 270, duration: 23, delay: 6, opacity: 0.4, color: '#be123c' },
  { id: 9, left: 86, top: -10, size: 19, rotation: 310, duration: 18, delay: 9, opacity: 0.45, color: '#e11d48' },
  { id: 10, left: 93, top: -25, size: 13, rotation: 40, duration: 22, delay: 0.8, opacity: 0.35, color: '#fda4af' },
  { id: 11, left: 21, top: -28, size: 18, rotation: 175, duration: 17, delay: 10, opacity: 0.45, color: '#f43f5e' },
  { id: 12, left: 71, top: -24, size: 16, rotation: 220, duration: 20, delay: 4.2, opacity: 0.4, color: '#be123c' },
];

export function Petals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {STATIC_PETALS.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            animation: `fallAndSway ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
            }}
          >
            <path
              d="M12 0C12 0 24 10 24 20C24 26.6274 18.6274 32 12 32C5.37258 32 0 26.6274 0 20C0 10 12 0 12 0Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
