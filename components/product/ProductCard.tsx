'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/store/cart';
import { useLocale, useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);
  const locale = useLocale();
  const t = useTranslations('catalog');

  const mainImage = product.images[0]?.src || '/placeholder.jpg';
  const hoverImage = product.images[1]?.src || mainImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group flex flex-col", className)}
    >
      {/* Image Container */}
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
        <Link href={`/${locale}/catalog/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="p-3 bg-white text-black rounded-full hover:bg-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <ShoppingCart size={18} strokeWidth={1.5} />
          </button>
          
          <Link 
            href={`/${locale}/catalog/${product.slug}`}
            className="p-3 bg-white text-black rounded-full hover:bg-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
          >
            <Eye size={18} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Badges */}
        {product.on_sale && (
          <span className="absolute top-4 left-4 bg-wine text-white text-[9px] uppercase tracking-lux px-3 py-1.5 font-bold z-10">
            {t('sale')}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center">
        <span className="text-[9px] uppercase tracking-[0.3em] text-taupe mb-2 font-accent">
          {product.categories[0]?.name || t('title')}
        </span>
        <Link href={`/${locale}/catalog/${product.slug}`}>
          <h3 className="text-sm font-serif text-cream uppercase tracking-wide group-hover:text-gold transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-xs font-accent text-gold tracking-lux">
            {formatPrice(product.price)}
          </p>
          {product.on_sale && (
            <p className="text-[10px] text-cream/30 line-through tracking-wider">
              {formatPrice(product.regular_price)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
