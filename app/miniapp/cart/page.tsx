'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMiniAppI18n } from '../i18n/context';
import { useCart } from '@/store/cart';
import { useTWA } from '@/components/miniapp/TWAProvider';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function MiniAppCart() {
  const { t } = useMiniAppI18n();
  const { tg } = useTWA();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => window.history.back());

      if (items.length > 0) {
        tg.MainButton.setText(t('cart.checkout'));
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            window.location.href = '/miniapp/checkout';
        });
      } else {
        tg.MainButton.hide();
      }
    }
  }, [tg, items, t]);

  if (items.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6 text-gold/30">
          <Trash2 size={32} strokeWidth={1} />
        </div>
        <h2 className="text-xl font-serif text-cream mb-2 uppercase tracking-lux">{t('cart.empty')}</h2>
        <Link href="/miniapp/catalog" className="text-xs text-gold uppercase tracking-widest">{t('catalog.view_all')}</Link>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-serif text-cream uppercase tracking-lux mb-8">{t('cart.title')}</h1>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex space-x-4 bg-secondary/10 p-3 rounded-2xl border border-white/5">
            <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
               <Image src={item.images[0]?.src} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between min-w-0">
               <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-cream truncate">{item.name}</h3>
                  <p className="text-[10px] text-gold">{item.price} {t('common.aed')}</p>
               </div>
               
               <div className="flex items-center justify-between">
                  {/* Quantity controls inside Cart */}
                  <div className="flex items-center space-x-3 bg-black/40 rounded-lg p-1 border border-white/5">
                     <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 text-gold"><Minus size={12} /></button>
                     <span className="text-[10px] text-cream w-4 text-center">{item.quantity}</span>
                     <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gold"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 p-2"><Trash2 size={14} /></button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary for MiniApp (MainButton is outside) */}
      <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center px-2">
         <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Итого:</span>
         <span className="text-lg font-accent text-cream">{totalPrice().toLocaleString()} {t('common.aed')}</span>
      </div>
    </div>
  );
}
