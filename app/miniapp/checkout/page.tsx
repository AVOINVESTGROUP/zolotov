'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMiniAppI18n } from '../i18n/context';
import { useCart } from '@/store/cart';
import { useTWA } from '@/components/miniapp/TWAProvider';

export default function MiniAppCheckout() {
  const { t } = useMiniAppI18n();
  const { tg } = useTWA();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '', // WhatsApp
    email: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => window.history.back());
      
      // Предзаполняем имя из TG
      if (tg.initDataUnsafe?.user) {
        setFormData(prev => ({
          ...prev,
          firstName: tg.initDataUnsafe.user.first_name || '',
          lastName: tg.initDataUnsafe.user.last_name || ''
        }));
      }
    }
  }, [tg]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    // Простая валидация
    if (!formData.firstName || !formData.phone || !formData.address) {
       tg?.showAlert('Пожалуйста, заполните Имя, Телефон и Адрес');
       return;
    }

    setIsSubmitting(true);
    tg?.MainButton.showProgress();

    try {
      const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Оплата в Telegram (Cash on Delivery)',
        set_paid: false,
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: 'Dubai',
          state: 'DU',
          postcode: '00000',
          country: 'AE',
          email: formData.email || 'tg_user@example.com',
          phone: formData.phone
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: 'Dubai',
          postcode: '00000',
          country: 'AE'
        },
        line_items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        meta_data: [
          { key: 'whatsapp_number', value: formData.phone },
          { key: 'source', value: 'Telegram Mini App' }
        ]
      };

      const response = await axios.post('/api/checkout', orderData);
      
      if (response.data.success) {
         clearCart();
         tg?.HapticFeedback.notificationOccurred('success');
         window.location.href = `/miniapp/order-success?orderId=${response.data.orderId}`;
      } else {
         throw new Error('Order creation failed');
      }
    } catch (err) {
      tg?.showAlert('Ошибка при создании заказа. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
      tg?.MainButton.hideProgress();
    }
  };

  useEffect(() => {
    if (tg) {
      tg.MainButton.setText('ПОДТВЕРДИТЬ ЗАКАЗ');
      tg.MainButton.setParams({ 
          color: '#D4AF37', // Gold 
          text_color: '#000000' 
      });
      tg.MainButton.show();
      tg.MainButton.onClick(handleSubmit);
    }
    return () => {
       tg?.MainButton.hide();
    };
  }, [tg, formData, items]);

  return (
    <div className="p-6 pb-32">
       <h1 className="text-2xl font-serif text-cream uppercase tracking-lux mb-8">{t('checkout.title')}</h1>
       <div className="space-y-6">
          <div className="bg-secondary/10 p-5 rounded-2xl border border-white/5 space-y-4">
             <div>
                <label className="text-[10px] uppercase text-gold/60 mb-2 block font-accent">Имя и Фамилия</label>
                <div className="flex space-x-2">
                   <input 
                     className="w-1/2 bg-black/40 border border-white/10 rounded-lg p-3 text-cream text-[13px] outline-none focus:border-gold/50 transition-all"
                     value={formData.firstName}
                     onChange={e => setFormData({...formData, firstName: e.target.value})}
                     placeholder="Имя"
                   />
                   <input 
                     className="w-1/2 bg-black/40 border border-white/10 rounded-lg p-3 text-cream text-[13px] outline-none focus:border-gold/50 transition-all"
                     value={formData.lastName}
                     onChange={e => setFormData({...formData, lastName: e.target.value})}
                     placeholder="Фамилия"
                   />
                </div>
             </div>

             <div>
                <label className="text-[10px] uppercase text-gold/60 mb-2 block font-accent">WhatsApp / Телефон</label>
                <input 
                   className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-cream text-[13px] outline-none focus:border-gold/50 transition-all"
                   value={formData.phone}
                   onChange={e => setFormData({...formData, phone: e.target.value})}
                   placeholder="+971..."
                />
             </div>

             <div>
                <label className="text-[10px] uppercase text-gold/60 mb-2 block font-accent">Адрес доставки в Дубае</label>
                <textarea 
                   className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-cream text-[13px] outline-none focus:border-gold/50 transition-all min-h-[80px]"
                   value={formData.address}
                   onChange={e => setFormData({...formData, address: e.target.value})}
                   placeholder="Район, улица, дом..."
                />
             </div>
          </div>

          <div className="flex justify-between items-center px-2">
             <span className="text-[10px] uppercase tracking-widest text-cream/30">Сумма к оплате:</span>
             <span className="text-xl font-accent text-gold">{totalPrice().toLocaleString()} {t('common.aed')}</span>
          </div>
       </div>
    </div>
  );
}
