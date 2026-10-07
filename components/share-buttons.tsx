'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import { Share2, Copy, Download, Plus, Check, Loader2, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/sound';
import { fireGentleHearts } from '@/lib/confetti';

interface ShareButtonsProps {
  shareUrl: string;
  cardTargetId?: string;
  onSuccessNotice?: (msg: string) => void;
}

export function ShareButtons({
  shareUrl,
  cardTargetId = 'export-card-target',
  onSuccessNotice,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (onSuccessNotice) onSuccessNotice(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = async () => {
    soundManager.playSoftClick();
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      showToast('Đã sao chép đường link thiệp thành công! 💌');
      fireGentleHearts();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      showToast('Vui lòng copy link trên thanh địa chỉ trình duyệt');
    }
  };

  const handleShare = async () => {
    soundManager.playSoftClick();
    const url = shareUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thiệp Chúc Mừng 20/10 Dành Tặng Bạn 🌸',
          text: 'Một tấm thiệp đong đầy tình cảm nhân ngày Phụ Nữ Việt Nam 20/10 dành tặng bạn!',
          url,
        });
        showToast('Chia sẻ thành công! 💖');
      } catch {
        // User cancelled or aborted
      }
    } else {
      // Fallback to copying link
      handleCopyLink();
    }
  };

  const handleDownloadImage = async () => {
    soundManager.playSoftClick();
    const element = document.getElementById(cardTargetId);
    if (!element) {
      showToast('Không tìm thấy khung thiệp để tải ảnh!');
      return;
    }

    try {
      setDownloading(true);
      showToast('Đang tạo ảnh chất lượng cao, vui lòng chờ giây lát...');

      // Small delay to ensure all fonts and rendering are settled
      await new Promise((resolve) => setTimeout(resolve, 350));

      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2.5, // Crisp high-DPI quality
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = 'thiep-20-10.png';
      link.href = dataUrl;
      link.click();

      soundManager.playMagicalChime();
      fireGentleHearts();
      showToast('Tải thiệp PNG thành công! 🌸');
    } catch (err) {
      console.error('Download error:', err);
      showToast('Chưa thể tải ảnh trực tiếp, bạn có thể chụp ảnh màn hình tấm thiệp nhé!');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-rose-950 text-white text-xs sm:text-sm font-medium shadow-xl shadow-rose-950/20 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Button Grid */}
      <div className="w-full max-w-md grid grid-cols-2 gap-3 sm:gap-3.5">
        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer border border-rose-200 bg-white/90 text-rose-950 hover:bg-rose-50 hover:border-rose-400 hover:shadow-md hover:shadow-rose-100"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Đã chép link</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-rose-500" />
              <span>Copy link</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer border border-rose-200 bg-white/90 text-rose-950 hover:bg-rose-50 hover:border-rose-400 hover:shadow-md hover:shadow-rose-100"
        >
          <Share2 className="w-4 h-4 text-rose-500" />
          <span>Chia sẻ thiệp</span>
        </button>

        {/* Download PNG Button (Full width on mobile or prominent) */}
        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={downloading}
          className="col-span-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:opacity-95 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang xuất ảnh PNG...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className="font-semibold">Tải thiệp về máy (PNG)</span>
            </>
          )}
        </button>
      </div>

      {/* Create another card link */}
      <Link
        href="/create"
        onClick={() => soundManager.playSoftClick()}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 hover:text-rose-600 font-medium py-1 transition-colors group"
      >
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
        <span>Thiết kế thêm một tấm thiệp khác</span>
      </Link>
    </div>
  );
}
