'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, Globe } from 'lucide-react';
import { useMiniAppI18n } from '@/app/miniapp/i18n/context';

interface MiniAppHeaderProps {
  onMenuClick: () => void;
}

export const MiniAppHeader = ({ onMenuClick }: MiniAppHeaderProps) => {
  const { locale, setLocale } = useMiniAppI18n();

  const toggleLanguage = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-lg border-b border-white/5 py-3 px-4 flex items-center justify-between">
      {/* Menu Trigger */}
      <button 
        onClick={onMenuClick}
        className="p-2 text-gold/80 active:scale-95 transition-transform"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      {/* Center Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image 
          src="/logo.png" 
          alt="Zolotov" 
          width={100} 
          height={30} 
          className="object-contain brightness-0 invert" 
        />
      </div>

      {/* Lang Switcher */}
      <button 
        onClick={toggleLanguage}
        className="flex items-center space-x-1 bg-white/5 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-cream/70"
      >
        <Globe size={12} className="text-gold/50" />
        <span>{locale === 'ru' ? 'EN' : 'RU'}</span>
      </button>
    </header>
  );
};
