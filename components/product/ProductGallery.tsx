'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ImageItem[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const currentImage = images[activeIndex] || { src: '/placeholder.jpg', alt: 'Product image' };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 w-full md:w-20 overflow-x-auto no-scrollbar">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 border transition-all duration-300",
              activeIndex === index ? "border-gold opacity-100" : "border-white/10 opacity-40 hover:opacity-100"
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div 
        ref={containerRef}
        className="relative flex-1 aspect-[3/4] bg-secondary overflow-hidden group cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              scale: zoom ? 2 : 1,
              transition: zoom ? 'none' : 'transform 0.5s ease-out',
            }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
