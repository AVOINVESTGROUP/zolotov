'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, ShoppingBag, Info, Phone } from 'lucide-react';
import Link from 'next/link';
import { useMiniAppI18n } from '@/app/miniapp/i18n/context';

interface MiniAppMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniAppMenu = ({ isOpen, onClose }: MiniAppMenuProps) => {
  const { t, locale } = useMiniAppI18n();

  const menuItems = [
    { icon: <Home size={20} />, label: t('miniapp.home') || 'Главная', href: '/miniapp' },
    { icon: <ShoppingBag size={20} />, label: t('catalog.title') || 'Каталог', href: '/miniapp/catalog' },
    { icon: <Info size={20} />, label: t('nav.about') || 'О бренде', href: '/miniapp/about' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-[60] w-3/4 max-w-sm bg-black border-r border-white/10 p-8 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gold/60"
            >
              <X size={24} />
            </button>

            <div className="mt-12 flex flex-col space-y-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-4 text-cream/70 hover:text-gold active:scale-95 transition-all text-lg font-light tracking-wide uppercase"
                >
                  <span className="text-gold/60">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-10 left-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/40">
                Zolotov · Dubai
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
