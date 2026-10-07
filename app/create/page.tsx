'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CardEditor } from '@/components/card-editor';
import { PetalsBackground } from '@/components/petals-background';
import { Loader2 } from 'lucide-react';

function EditorContainer() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template') || 'sweet-rose';

  return <CardEditor initialTemplateId={templateParam} />;
}

export default function CreatePage() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden pt-20">
      {/* Ambient background petals */}
      <PetalsBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Studio Area */}
      <main className="flex-1 relative z-10">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
              <p className="text-sm text-stone-500 font-medium">Đang tải studio tạo thiệp...</p>
            </div>
          }
        >
          <EditorContainer />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
