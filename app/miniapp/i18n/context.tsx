'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'ru' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    'hero.title': 'Zolotov Luxury',
    'hero.subtitle': 'Ювелирный дом в вашем Telegram',
    'catalog.title': 'Коллекция',
    'catalog.view_all': 'Смотреть всё',
    'cart.title': 'Корзина',
    'cart.empty': 'Ваша корзина пуста',
    'cart.checkout': 'Оформить заказ',
    'product.add_to_cart': 'В корзину',
    'checkout.title': 'Заказ',
    'success.title': 'Заказ оформлен!',
    'common.back': 'Назад',
    'common.aed': 'AED',
  },
  en: {
    'hero.title': 'Zolotov Luxury',
    'hero.subtitle': 'High Jewelry in your Telegram',
    'catalog.title': 'Collection',
    'catalog.view_all': 'View All',
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty',
    'cart.checkout': 'Checkout',
    'product.add_to_cart': 'Add to Cart',
    'checkout.title': 'Checkout',
    'success.title': 'Order Placed!',
    'common.back': 'Back',
    'common.aed': 'AED',
  }
};

const I18nContext = createContext<I18nContextType | null>(null);

export function MiniAppI18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ru');

  useEffect(() => {
    // В будущем здесь будет автоопределение из TG
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const userLang = (window as any).Telegram.WebApp.initDataUnsafe?.user?.language_code;
      if (userLang === 'en') setLocale('en');
    }
  }, []);

  const t = (key: string) => {
    return (translations[locale] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useMiniAppI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useMiniAppI18n must be used within MiniAppI18nProvider');
  return context;
};
