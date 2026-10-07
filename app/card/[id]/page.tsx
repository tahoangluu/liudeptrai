'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { cardStorage } from '@/lib/card-storage';
import { GreetingCardData } from '@/lib/types';
import { CardDisplayView } from '@/components/card-display-view';
import { Loader2, HeartCrack, Plus } from 'lucide-react';
import Link from 'next/link';

interface CardPageProps {
  params: Promise<{ id: string }>;
}

function CardDetailContent({ params }: CardPageProps) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const searchParams = useSearchParams();
  const dParam = searchParams.get('d');

  const [cardData, setCardData] = useState<GreetingCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    async function loadCard() {
      try {
        const data = await cardStorage.get(id, dParam);
        if (data) {
          setCardData(data);
          setShareUrl(window.location.href);
        }
      } catch (err) {
        console.error('Error loading card:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [id, dParam]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAF7F5]">
        <Loader2 className="w-9 h-9 text-rose-500 animate-spin" />
        <p className="text-sm font-medium text-stone-600">Đang chuẩn bị tấm thiệp yêu thương...</p>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#FAF7F5]">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-4">
          <HeartCrack className="w-8 h-8" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-stone-900">
          Không tìm thấy tấm thiệp
        </h2>
        <p className="text-stone-600 text-sm mt-2 max-w-sm">
          Đường dẫn có thể đã hết hạn hoặc không chính xác. Bạn có thể tự tay tạo một tấm thiệp mới ngay bây giờ.
        </p>
        <Link
          href="/create"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-md shadow-rose-300 hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo thiệp mới ngay</span>
        </Link>
      </div>
    );
  }

  return <CardDisplayView cardData={cardData} shareUrl={shareUrl} />;
}

export default function CardPage({ params }: CardPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAF7F5]">
          <Loader2 className="w-9 h-9 text-rose-500 animate-spin" />
          <p className="text-sm font-medium text-stone-600">Đang tải thiệp...</p>
        </div>
      }
    >
      <CardDetailContent params={params} />
    </Suspense>
  );
}
