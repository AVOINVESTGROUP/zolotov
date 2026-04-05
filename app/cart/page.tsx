'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-serif text-cream uppercase tracking-lux">Корзина</h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-gold/60 text-[10px] uppercase tracking-widest font-accent">
            <span>{totalItems()} товаров</span>
            <span className="w-1 h-1 bg-gold/30 rounded-full" />
            <span>Дубай · Платина · Бриллианты</span>
          </div>
        </header>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Items List */}
            <div className="lg:col-span-7 space-y-12">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product_id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-6 md:gap-10 border-b border-white/5 pb-10"
                  >
                    {/* Item Image */}
                    <div className="relative aspect-[3/4] w-24 md:w-32 bg-secondary flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="130px"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col pt-2">
                      <div className="flex justify-between items-start mb-4">
                        <Link href={`/catalog/${item.slug}`}>
                          <h3 className="text-sm font-serif text-cream uppercase tracking-wide hover:text-gold transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.product_id)}
                          className="text-cream/20 hover:text-wine transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>

                      <p className="text-xs text-gold font-accent tracking-lux mb-8">
                        {formatPrice(item.price.toString())}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-6 mt-auto">
                        <div className="flex items-center border border-white/10 px-3 py-1.5 h-10">
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="text-cream/40 hover:text-cream px-2 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[10px] uppercase font-bold text-cream w-8 text-center bg-transparent border-none">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="text-cream/40 hover:text-cream px-2 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-secondary p-8 border border-white/5 sticky top-32">
                <h2 className="text-xs uppercase tracking-lux text-cream mb-8 pb-4 border-b border-white/5 font-accent">
                  Итог заказа
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-lux">
                    <span className="text-cream/40">Цена за товары</span>
                    <span className="text-cream">{formatPrice(totalPrice().toString())}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-lux">
                    <span className="text-cream/40">Доставка</span>
                    <span className="text-gold">Бесплатно</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-6 border-t border-white/10 mb-10">
                  <span className="text-xs uppercase tracking-lux text-cream font-bold">Всего к оплате:</span>
                  <span className="text-xl font-serif text-gold tracking-lux">
                    {formatPrice(totalPrice().toString())}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-5 bg-gold text-black flex items-center justify-center gap-3 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 font-accent"
                >
                  Оформить заказ
                  <ArrowRight size={14} />
                </Link>

                <p className="mt-8 text-[9px] text-cream/30 text-center uppercase tracking-widest leading-relaxed">
                  Безопасная оплата · Премиальная упаковка · Гарантия качества GIA
                </p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-secondary flex items-center justify-center rounded-full mb-8">
              <ShoppingBag size={32} className="text-cream/20" />
            </div>
            <h2 className="text-2xl font-serif text-cream uppercase tracking-lux mb-4">Ваша корзина пуста</h2>
            <p className="text-xs text-cream/40 uppercase tracking-widest mb-12">Время добавить в неё что-то особенное</p>
            <Link
              href="/catalog"
              className="px-12 py-4 border border-gold text-gold text-[10px] uppercase tracking-[0.4em] hover:bg-gold hover:text-black transition-all duration-500 font-accent"
            >
              В каталог
            </Link>
          </motion.div>
        )}
      </section>

      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
