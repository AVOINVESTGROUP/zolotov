'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/store/cart';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCart((state) => state.totalItems());

  const toggleLocale = () => {
    const nextLocale = locale === 'ru' ? 'en' : 'ru';
    // Заменяем текущую локаль в пути
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('catalog'), href: `/${locale}/catalog` },
    { name: t('rings'), href: `/${locale}/catalog?category=rings` },
    { name: t('earrings'), href: `/${locale}/catalog?category=earrings` },
    { name: t('about'), href: `/${locale}/about` },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent text-shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-cream hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href={`/${locale}`} className="group flex flex-col items-center">
          <div className="relative w-[150px] h-[40px] md:w-[180px] md:h-[50px] transition-transform duration-700 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Zolotov"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <span className="text-[7px] tracking-[0.6em] uppercase text-gold/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            Dubai · Platinum · Diamonds
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.25em] text-cream/70 hover:text-gold transition-colors font-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Language Switcher */}
          <button 
            onClick={toggleLocale}
            className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-cream/60 hover:text-gold transition-colors"
            title={locale === 'ru' ? 'Switch to English' : 'Переключить на русский'}
          >
            <Globe size={16} strokeWidth={1} className="text-gold/50" />
            <span className="w-4 font-accent">{locale === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          <button className="text-cream/80 hover:text-gold transition-colors hidden sm:block">
            <Search size={18} strokeWidth={1.2} />
          </button>
          
          <Link href={`/${locale}/cart`} className="relative text-cream/80 hover:text-gold transition-colors">
            <ShoppingBag size={20} strokeWidth={1.2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-wine text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in border border-black/20">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[60] bg-black p-8 flex flex-col items-center justify-center border-4 border-gold/10 m-4"
          >
            <button 
                className="absolute top-8 right-8"
                onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} className="text-gold" strokeWidth={1} />
            </button>
            
            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif tracking-lux uppercase text-cream hover:text-gold transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
