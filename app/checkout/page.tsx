'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: 'Dubai',
  });

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) {
      router.push('/cart');
    }
  }, [mounted, items, router]);

  if (!mounted || items.length === 0) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items,
          total: totalPrice(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}&orderNumber=${data.orderNumber}`);
      } else {
        setError(data.error || 'Произошла ошибка при оформлении заказа');
      }
    } catch (err) {
      setError('Ошибка сети. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-cream/40 hover:text-gold transition-colors text-[10px] uppercase tracking-lux mb-12"
        >
          <ArrowLeft size={14} />
          Назад в корзину
        </Link>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-serif text-cream uppercase tracking-lux mb-10">Оформление заказа</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6 font-accent">Контактная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Имя</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Александр"
                      className="w-full bg-secondary border border-white/5 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Фамилия</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Золотов"
                      className="w-full bg-secondary border border-white/5 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alexander@zolotov.store"
                      className="w-full bg-secondary border border-white/5 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Телефон</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 00 000 0000"
                      className="w-full bg-secondary border border-white/5 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gold px-1 font-accent">WhatsApp (Обезательно)</label>
                    <input
                      required
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Для связи и подтверждения"
                      className="w-full bg-secondary border border-gold/30 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6 font-accent">Адрес доставки в Дубае</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Улица, дом, апартаменты</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Burj Khalifa, Apt 101"
                      className="w-full bg-secondary border border-white/5 p-4 text-cream text-sm focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Город</label>
                      <input
                        readOnly
                        type="text"
                        name="city"
                        value={formData.city}
                        className="w-full bg-secondary/50 border border-white/5 p-4 text-cream/60 text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-cream/40 px-1">Способ оплаты</label>
                      <div className="flex items-center gap-3 p-4 bg-secondary border border-gold/20 text-[10px] uppercase tracking-widest text-gold h-full">
                         <CreditCard size={14} />
                         Оплата при получении
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-secondary p-10 border border-white/5 sticky top-32">
              <h2 className="text-xs uppercase tracking-lux text-cream mb-10 pb-4 border-b border-white/5 font-accent">
                Ваш заказ
              </h2>

              <div className="space-y-6 mb-10">
                {items.map(item => (
                  <div key={item.product_id} className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span className="text-cream/60 max-w-[70%]">{item.name} x{item.quantity}</span>
                    <span className="text-cream">{formatPrice((item.price * item.quantity).toString())}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-cream/40">Итого:</span>
                  <span className="text-xl font-serif text-gold tracking-lux">{formatPrice(totalPrice().toString())}</span>
                </div>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-wine/10 border border-wine/20 text-wine text-[10px] uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full py-6 bg-gold text-black flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 font-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Обработка заказа...' : 'Оплатить при получении'}
                {!loading && <Lock size={12} />}
              </button>

              <div className="mt-10 flex flex-col gap-4">
                 <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-cream/40">
                    <Truck size={14} strokeWidth={1} />
                    Бесплатная доставка по Дубаю за 24 часа
                 </div>
                 <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-cream/40">
                    <Lock size={14} strokeWidth={1} />
                    Безопасное оформление заказа
                 </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
