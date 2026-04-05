'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMiniAppI18n } from './i18n/context';
import { getProducts } from '@/lib/woo';
import { Product } from '@/types';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export default function MiniAppHome() {
  const { t, locale } = useMiniAppI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Передаем locale в API если в WC настроен мульти-язык
      const data = await getProducts({ per_page: 4 });
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [locale]);

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="relative h-[45vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573408302355-4e0b7cb934df?q=80&w=2070"
          alt="Luxury Jewelry"
          fill
          className="object-cover brightness-50 scale-105"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black via-transparent to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-12 h-12 mb-4 border border-gold/40 rounded-full flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-[10px] text-gold font-serif">ZA</div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-serif tracking-[0.2em] uppercase text-cream mb-2"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.4em] text-gold/80"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Categories / Navigation Quick Links */}
      <div className="px-5 -mt-8 relative z-10 grid grid-cols-2 gap-4">
        <Link href="/miniapp/catalog" className="bg-secondary p-4 rounded-xl border border-white/5 flex items-center justify-between group">
          <span className="text-[10px] uppercase tracking-widest text-cream/70">{t('catalog.title')}</span>
          <ChevronRight size={14} className="text-gold" />
        </Link>
        <Link href="/miniapp/cart" className="bg-secondary p-4 rounded-xl border border-white/5 flex items-center justify-between group">
          <span className="text-[10px] uppercase tracking-widest text-cream/70">{t('cart.title')}</span>
          <ShoppingBag size={14} className="text-gold" />
        </Link>
      </div>

      {/* Featured Section */}
      <section className="mt-12 px-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-[0.3em] font-serif text-cream">{t('catalog.title')}</h2>
          <Link href="/miniapp/catalog" className="text-[9px] uppercase tracking-widest text-gold">{t('catalog.view_all')}</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-secondary/50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/miniapp/catalog/${product.slug}`}
                className="group flex flex-col bg-secondary/30 rounded-2xl overflow-hidden border border-white/5 active:scale-[0.98] transition-transform"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={product.images[0]?.src || ''}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[9px] uppercase tracking-widest text-cream/50 truncate mb-1">{product.name}</p>
                  <p className="text-[10px] text-gold font-accent">{product.price} {t('common.aed')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer / Contact */}
      <footer className="mt-16 py-8 px-5 text-center border-t border-white/5">
         <p className="text-[8px] uppercase tracking-[0.5em] text-cream/20">© Zolotov — Dubai</p>
      </footer>
    </div>
  );
}
