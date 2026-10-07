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

// Precomputed static petals to avoid hydration mismatch and avoid setState in effects
const STATIC_PETALS: Petal[] = [
  { id: 1, left: 8, top: -12, size: 16, rotation: 35, duration: 14, delay: 0, opacity: 0.5, color: 'rgba(244, 63, 94, 0.35)' },
  { id: 2, left: 18, top: -15, size: 20, rotation: 80, duration: 18, delay: 3, opacity: 0.6, color: 'rgba(251, 113, 133, 0.3)' },
  { id: 3, left: 28, top: -20, size: 14, rotation: 120, duration: 16, delay: 6, opacity: 0.45, color: 'rgba(249, 168, 212, 0.25)' },
  { id: 4, left: 38, top: -10, size: 18, rotation: 45, duration: 21, delay: 1, opacity: 0.55, color: 'rgba(254, 205, 211, 0.35)' },
  { id: 5, left: 48, top: -18, size: 22, rotation: 210, duration: 15, delay: 4, opacity: 0.5, color: 'rgba(253, 224, 71, 0.2)' },
  { id: 6, left: 58, top: -14, size: 15, rotation: 160, duration: 19, delay: 7, opacity: 0.4, color: 'rgba(244, 63, 94, 0.35)' },
  { id: 7, left: 68, top: -22, size: 21, rotation: 90, duration: 17, delay: 2, opacity: 0.6, color: 'rgba(251, 113, 133, 0.3)' },
  { id: 8, left: 78, top: -16, size: 17, rotation: 270, duration: 22, delay: 5, opacity: 0.45, color: 'rgba(249, 168, 212, 0.25)' },
  { id: 9, left: 88, top: -10, size: 19, rotation: 310, duration: 16, delay: 8, opacity: 0.5, color: 'rgba(254, 205, 211, 0.35)' },
  { id: 10, left: 94, top: -25, size: 13, rotation: 40, duration: 20, delay: 0.5, opacity: 0.4, color: 'rgba(253, 224, 71, 0.2)' },
  { id: 11, left: 14, top: -28, size: 18, rotation: 175, duration: 15, delay: 9, opacity: 0.5, color: 'rgba(244, 63, 94, 0.3)' },
  { id: 12, left: 42, top: -24, size: 15, rotation: 220, duration: 18, delay: 4.5, opacity: 0.4, color: 'rgba(251, 113, 133, 0.25)' },
  { id: 13, left: 62, top: -30, size: 20, rotation: 65, duration: 23, delay: 7.5, opacity: 0.55, color: 'rgba(249, 168, 212, 0.3)' },
  { id: 14, left: 82, top: -19, size: 16, rotation: 140, duration: 16, delay: 2.5, opacity: 0.45, color: 'rgba(254, 205, 211, 0.35)' },
];

export function PetalsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft atmospheric gradient meshes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-pink-100/40 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-100/35 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100/25 blur-3xl" />

      {/* Falling romantic petals */}
      {STATIC_PETALS.map((petal) => (
        <div
          key={petal.id}
          className="absolute transition-transform"
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
              filter: 'drop-shadow(0 2px 4px rgba(225, 29, 72, 0.1))',
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
