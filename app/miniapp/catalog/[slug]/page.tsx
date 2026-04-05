'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { useMiniAppI18n } from '../../i18n/context';
import { getProductBySlug } from '@/lib/woo';
import { Product } from '@/types';
import { useTWA } from '@/components/miniapp/TWAProvider';
import { useCart } from '@/store/cart';

export default function MiniAppProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useMiniAppI18n();
  const { tg } = useTWA();
  const addItem = useCart((state) => state.addItem);
  const { slug } = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductBySlug(slug);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (tg && product) {
      // Кнопка Назад
      tg.BackButton.show();
      tg.BackButton.onClick(() => window.history.back());

      // Настройка MainButton для добавления в корзину
      tg.MainButton.setText(t('product.add_to_cart'));
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        addItem(product);
        tg.HapticFeedback.notificationOccurred('success');
        tg.MainButton.setText('УРА! В КОРЗИНЕ');
        setTimeout(() => {
            tg.MainButton.setText(t('product.add_to_cart'));
        }, 2000);
      });
    }

    return () => {
      tg?.MainButton.hide();
      tg?.BackButton.hide();
    };
  }, [tg, product, t, addItem]);

  if (loading) return <div className="h-screen flex items-center justify-center text-gold animate-pulse uppercase tracking-[0.4em] text-[10px]">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-cream">Product not found</div>;

  return (
    <div className="pb-24">
      {/* Product Image Gallery (Simple for MiniApp) */}
      <div className="aspect-[4/5] relative w-full overflow-hidden">
        <Image
          src={product.images[0]?.src || ''}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-serif text-cream uppercase tracking-lux mb-2">{product.name}</h1>
        <p className="text-xl text-gold font-accent mb-6">{product.price} {t('common.aed')}</p>
        
        <div className="space-y-6">
          <div className="border-t border-white/5 pt-6">
             <h3 className="text-[10px] uppercase tracking-widest text-cream/30 mb-3 underline decoration-gold/20">Описание</h3>
             <div 
               className="text-[12px] text-cream/70 leading-relaxed font-sans prose prose-invert max-w-none"
               dangerouslySetInnerHTML={{ __html: product.description }}
             />
          </div>
        </div>
      </div>
    </div>
  );
}
