'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GreetingCardData, ThemeId, FontStyleId } from '@/lib/types';
import { TEMPLATES, getTemplateById } from '@/lib/templates';
import { cardStorage, generateCardId } from '@/lib/card-storage';
import { ThemePicker } from './theme-picker';
import { GreetingSuggestions } from './greeting-suggestions';
import { CardPreview } from './card-preview';
import { soundManager } from '@/lib/sound';
import { fireCardCelebration } from '@/lib/confetti';
import {
  Wand2,
  Sparkles,
  Type,
  Layout,
  User,
  HeartHandshake,
  MessageSquare,
  Loader2,
  Eye,
} from 'lucide-react';

interface CardEditorProps {
  initialTemplateId?: string;
}

export function CardEditor({ initialTemplateId = 'sweet-rose' }: CardEditorProps) {
  const router = useRouter();
  const initialTemplate = getTemplateById(initialTemplateId);

  const [cardData, setCardData] = useState<GreetingCardData>({
    id: generateCardId(),
    templateId: initialTemplate.id,
    themeId: initialTemplate.defaultTheme,
    recipient: initialTemplate.defaultRecipient,
    sender: initialTemplate.defaultSender,
    greeting: initialTemplate.defaultGreeting,
    fontStyle: initialTemplate.fontStyle,
    createdAt: '2026-10-20T00:00:00.000Z',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const handleTemplateChange = (templateId: string) => {
    soundManager.playSoftClick();
    const tpl = getTemplateById(templateId);
    setCardData((prev) => ({
      ...prev,
      templateId: tpl.id,
      themeId: tpl.defaultTheme,
      fontStyle: tpl.fontStyle,
      // Only replace default greeting if current is untouched or matching previous default
      greeting: prev.greeting ? prev.greeting : tpl.defaultGreeting,
    }));
  };

  const handleThemeChange = (themeId: ThemeId) => {
    setCardData((prev) => ({ ...prev, themeId }));
  };

  const handleFontChange = (fontStyle: FontStyleId) => {
    soundManager.playSoftClick();
    setCardData((prev) => ({ ...prev, fontStyle }));
  };

  const handleGreetingSelect = (text: string, defaultRecipient?: string) => {
    setCardData((prev) => ({
      ...prev,
      greeting: text,
      recipient: prev.recipient || defaultRecipient || '',
    }));
  };

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      soundManager.playMagicalChime();
      fireCardCelebration();

      // Ensure fields have safe fallbacks
      const finalData: GreetingCardData = {
        ...cardData,
        recipient: cardData.recipient.trim() || 'Người Phụ Nữ Tuyệt Vời',
        sender: cardData.sender.trim() || 'Người gửi yêu thương',
        greeting:
          cardData.greeting.trim() ||
          'Chúc bạn ngày 20/10 ngập tràn niềm vui, nụ cười rạng rỡ và luôn được yêu thương!',
        createdAt: new Date().toISOString(),
      };

      const { id, shareUrl } = await cardStorage.save(finalData);

      // Extract query payload from shareUrl if available to pass directly
      const urlObj = new URL(shareUrl, window.location.href);
      const payload = urlObj.searchParams.get('d');

      setTimeout(() => {
        if (payload) {
          router.push(`/card/${id}?d=${payload}`);
        } else {
          router.push(`/card/${id}`);
        }
      }, 500);
    } catch (err) {
      console.error('Error creating card:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Mobile Switch Tabs between Form & Preview */}
      <div className="lg:hidden flex items-center p-1 bg-stone-200/60 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileTab === 'editor'
              ? 'bg-white text-rose-950 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Type className="w-3.5 h-3.5 text-rose-500" />
          <span>Chỉnh sửa thông tin</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileTab === 'preview'
              ? 'bg-white text-rose-950 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-rose-500" />
          <span>Xem thiệp (Live Preview)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM CONTROLS */}
        <div
          className={`lg:col-span-6 space-y-6 ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                Studio sáng tạo
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                Thiết kế tấm thiệp của bạn
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Từng thay đổi của bạn sẽ được phản ánh trực tiếp trên tấm thiệp bên cạnh.
              </p>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-6">
              {/* Choose Template selector */}
              <div>
                <label className="text-sm font-semibold text-stone-800 flex items-center gap-1.5 mb-2">
                  <Layout className="w-4 h-4 text-rose-500" />
                  <span>Chọn phong cách mẫu</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleTemplateChange(tpl.id)}
                      className={`px-3 py-2 text-xs rounded-xl border text-center font-medium transition-all cursor-pointer ${
                        cardData.templateId === tpl.id
                          ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-rose-200'
                      }`}
                    >
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Color Picker */}
              <ThemePicker
                selectedThemeId={cardData.themeId}
                onSelectTheme={handleThemeChange}
              />

              {/* Typography Font Picker */}
              <div>
                <label className="text-sm font-semibold text-stone-800 flex items-center gap-1.5 mb-2">
                  <Type className="w-4 h-4 text-rose-500" />
                  <span>Kiểu chữ tiêu đề</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'playfair', name: 'Playfair', fontClass: 'font-playfair' },
                    { id: 'cormorant', name: 'Cormorant', fontClass: 'font-cormorant' },
                    { id: 'dancing', name: 'Dancing', fontClass: 'font-dancing text-sm' },
                    { id: 'script', name: 'Script', fontClass: 'font-script text-base' },
                  ].map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => handleFontChange(font.id as FontStyleId)}
                      className={`px-2 py-2 rounded-xl border text-center transition-all cursor-pointer ${font.fontClass} ${
                        cardData.fontStyle === font.id
                          ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-rose-200'
                      }`}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input: Người nhận */}
              <div>
                <label
                  htmlFor="recipient-input"
                  className="text-sm font-semibold text-stone-800 flex items-center gap-1.5 mb-2"
                >
                  <User className="w-4 h-4 text-rose-500" />
                  <span>Người nhận</span>
                </label>
                <input
                  id="recipient-input"
                  type="text"
                  value={cardData.recipient}
                  onChange={(e) =>
                    setCardData({ ...cardData, recipient: e.target.value })
                  }
                  placeholder="Ví dụ: Mẹ yêu"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Input: Người gửi */}
              <div>
                <label
                  htmlFor="sender-input"
                  className="text-sm font-semibold text-stone-800 flex items-center gap-1.5 mb-2"
                >
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <span>Người gửi</span>
                </label>
                <input
                  id="sender-input"
                  type="text"
                  value={cardData.sender}
                  onChange={(e) =>
                    setCardData({ ...cardData, sender: e.target.value })
                  }
                  placeholder="Ví dụ: Con gái của mẹ"
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Textarea: Lời chúc */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="greeting-input"
                    className="text-sm font-semibold text-stone-800 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-rose-500" />
                    <span>Lời chúc 20/10</span>
                  </label>
                  <span className="text-[11px] text-stone-400">
                    {cardData.greeting.length}/300 ký tự
                  </span>
                </div>
                <textarea
                  id="greeting-input"
                  rows={4}
                  value={cardData.greeting}
                  onChange={(e) =>
                    setCardData({ ...cardData, greeting: e.target.value })
                  }
                  placeholder="Nhập lời chúc 20/10 của bạn..."
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Greeting Suggestions */}
              <GreetingSuggestions onSelectGreeting={handleGreetingSelect} />

              {/* Submit Button: Tạo thiệp */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:opacity-95 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang hoàn tất thiệp...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Tạo thiệp & Xem kết quả ✨</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW */}
        <div
          className={`lg:col-span-6 sticky top-24 ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-rose-200 text-rose-700 text-xs font-semibold shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>LIVE PREVIEW – Cập nhật thời gian thực</span>
            </div>

            {/* The Live Interactive Card */}
            <div className="w-full flex justify-center">
              <CardPreview data={cardData} is3dInteractive={true} isFloating={false} />
            </div>

            {/* Mobile quick switch to continue editing */}
            <div className="lg:hidden mt-6 w-full max-w-sm">
              <button
                type="button"
                onClick={() => setMobileTab('editor')}
                className="w-full py-3 rounded-xl border border-rose-300 bg-white text-rose-700 font-medium text-xs shadow-xs"
              >
                ← Quay lại chỉnh sửa thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
