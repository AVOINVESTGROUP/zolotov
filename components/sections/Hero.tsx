'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10" />
        {/* Placeholder for high-end jewelry image */}
        <div 
          className="w-full h-full bg-cover bg-center scale-105 animate-slow-zoom"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2070")',
          }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold mb-6 block font-accent">
            Dubai · Since 2014
          </span>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-cream leading-[1.1] mb-8 tracking-tight-lux">
            Platinum 950 <br />
            <span className="italic">& Diamonds</span>
          </h1>
          
          <p className="text-sm md:text-base text-cream/60 max-w-xl mx-auto mb-10 leading-relaxed font-sans font-light tracking-wide">
            Discover a unique collection inspired by modern architecture and eternal craftsmanship. Crafted in the heart of Dubai.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/catalog"
              className="group relative px-10 py-4 bg-cream text-black text-[10px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Перейти в магазин</span>
            </Link>
            
            <Link 
              href="/catalog"
              className="group flex items-center text-[10px] uppercase tracking-[0.4em] text-cream hover:text-gold transition-all duration-300 border-b border-cream/20 pb-1"
            >
              Коллекции <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
