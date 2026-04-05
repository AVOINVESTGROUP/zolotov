'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMiniAppI18n } from '../i18n/context';
import { getProducts, getCategories } from '@/lib/woo';
import { Product, Category } from '@/types';
import { useTWA } from '@/components/miniapp/TWAProvider';

export default function MiniAppCatalog() {
  const { t, locale } = useMiniAppI18n();
  const { tg } = useTWA();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Настройка кнопки BackButton
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
          window.location.href = '/miniapp';
      });
    }
    return () => tg?.BackButton.hide();
  }, [tg]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts({ 
          category: selectedCategory || undefined,
          per_page: 20 
        }),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="p-5">
      <header className="mb-8">
        <h1 className="text-2xl font-serif text-cream uppercase tracking-lux mb-6">{t('catalog.title')}</h1>
        
        {/* Horizontal Category Scroll */}
        <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-[9px] uppercase tracking-widest transition-all border ${
              !selectedCategory ? 'bg-gold text-black border-gold' : 'border-white/10 text-white/40'
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-6 py-2 rounded-full text-[9px] uppercase tracking-widest whitespace-nowrap transition-all border ${
                selectedCategory === cat.slug ? 'bg-gold text-black border-gold' : 'border-white/10 text-white/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-secondary/50 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/miniapp/catalog/${product.slug}`}
              className="flex flex-col bg-secondary/20 rounded-2xl overflow-hidden border border-white/5"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.images[0]?.src || ''}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-[9px] uppercase tracking-widest text-cream/40 mb-1 truncate">{product.name}</p>
                <p className="text-[10px] text-gold">{product.price} {t('common.aed')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
