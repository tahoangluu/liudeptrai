'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OpenCard } from '@/components/intro/OpenCard';
import { cardConfig } from '@/config/card';
import { Heart } from 'lucide-react';

function CardContent() {
  const searchParams = useSearchParams();
  const rawTo = searchParams.get('to');

  // Sanitize input to prevent injection or layout breakages
  const receiverName = rawTo ? rawTo.trim().slice(0, 30) : cardConfig.receiver;

  return <OpenCard receiverName={receiverName} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#23060a] flex flex-col items-center justify-center text-rose-200">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-gentle-pulse" />
          <p className="mt-4 text-xs font-light tracking-widest uppercase">
            20 • 10 • Loading...
          </p>
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}
