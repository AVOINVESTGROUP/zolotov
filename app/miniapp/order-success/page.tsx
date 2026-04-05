'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import { useMiniAppI18n } from '../i18n/context';
import { useTWA } from '@/components/miniapp/TWAProvider';

function OrderSuccessContent() {
  const { t } = useMiniAppI18n();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { tg } = useTWA();

  useEffect(() => {
    if (tg) {
      tg.MainButton.hide();
      tg.BackButton.hide();
      tg.HapticFeedback.notificationOccurred('success');
    }
  }, [tg]);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 bg-black text-center">
      <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-8 border border-gold/20 animate-pulse">
        <CheckCircle size={48} className="text-gold" strokeWidth={1} />
      </div>
      
      <h1 className="text-3xl font-serif text-cream uppercase tracking-lux mb-4">{t('success.title')}</h1>
      
      <div className="bg-secondary/20 p-4 rounded-xl border border-white/5 mb-8">
        <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-1 font-accent">Номер вашего заказа:</p>
        <p className="text-2xl font-accent text-gold">#{orderId || '0000'}</p>
      </div>
      
      <p className="text-[11px] text-cream/60 leading-relaxed uppercase tracking-widest max-w-[240px] mb-12">
        Наш менеджер свяжется с вами в WhatsApp в ближайшее время.
      </p>

      <Link 
        href="/miniapp"
        className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-gold hover:text-cream transition-colors"
      >
        <ChevronLeft size={14} />
        <span>Вернуться в магазин</span>
      </Link>
    </div>
  );
}

export default function MiniAppOrderSuccess() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-gold">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
