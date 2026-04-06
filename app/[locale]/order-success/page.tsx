'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || '...';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-secondary p-12 border border-white/5 text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-full mb-10 mx-auto text-gold">
        <Check size={40} strokeWidth={1} />
      </div>

      <h1 className="text-3xl font-serif text-cream uppercase tracking-lux mb-6">Заказ оформлен</h1>
      
      <p className="text-xs text-cream/40 uppercase tracking-widest leading-relaxed mb-10 px-8">
        Благодарим вас за выбор Zolotov. Наш менеджер свяжется с вами в ближайшее время через WhatsApp для подтверждения деталей.
      </p>

      <div className="bg-black/50 p-6 border border-white/5 mb-12">
        <span className="text-[9px] uppercase tracking-widest text-cream/30 block mb-2 font-accent">Номер вашего заказа</span>
        <span className="text-xl font-serif text-gold tracking-lux">#{orderNumber}</span>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/catalog"
          className="w-full py-5 bg-gold text-black flex items-center justify-center gap-3 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 font-accent"
        >
          Вернуться в каталог
          <ArrowRight size={14} />
        </Link>
        
        <Link
          href="/"
          className="w-full py-5 border border-white/5 text-cream/40 flex items-center justify-center gap-3 uppercase tracking-[0.4em] text-[10px] hover:text-gold hover:border-gold/30 transition-all duration-500 font-accent"
        >
          На главную
        </Link>
      </div>
    </motion.div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="pt-40 pb-24 px-6 min-h-[80vh] flex items-center justify-center">
        <Suspense fallback={<div className="text-cream text-[10px] uppercase tracking-widest">Загрузка...</div>}>
          <SuccessContent />
        </Suspense>
      </section>

      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
