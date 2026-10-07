'use client';

import React from 'react';
import { Palette, MessageSquareHeart, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  const steps = [
    {
      step: '01',
      icon: Palette,
      title: 'Chọn mẫu & sắc thái',
      desc: 'Lựa chọn giữa 6 phong cách thiết kế tinh xảo và 6 bảng màu rực rỡ, từ hoa hồng pastel dịu ngọt đến sắc đỏ nhung quý phái.',
      color: 'bg-rose-100 text-rose-600',
    },
    {
      step: '02',
      icon: MessageSquareHeart,
      title: 'Gửi gắm tâm tình',
      desc: 'Điền tên người nhận, người gửi cùng những lời chúc chân thành hoặc lựa chọn nhanh từ kho lời chúc văn phong tinh tế có sẵn.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Xuất thiệp & Gửi trao',
      desc: 'Xem thiệp sống động với hiệu ứng mở thiệp 3D, tải về ảnh PNG sắc nét hoặc sao chép liên kết gửi trực tiếp qua Zalo, Messenger.',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-rose-50/40 to-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Chỉ với 3 bước đơn giản
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Tạo một món quà tinh thần trọn vẹn trong chưa đầy một phút, gửi gắm trọn vẹn sự yêu thương.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/90 backdrop-blur-md rounded-2xl p-7 border border-rose-100/80 shadow-lg shadow-rose-950/5 hover:border-rose-300 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-xs`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-playfair font-bold text-3xl text-rose-200 group-hover:text-rose-300 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-playfair font-bold text-lg text-stone-900 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
