export const dynamic = 'force-dynamic';
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartButton from '@/components/product/AddToCartButton';
import { getProductBySlug } from '@/lib/woo';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const images = product.images.map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt || product.name
  }));

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Product Section */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={images} />
          </div>

          {/* Right Content - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.4em] text-taupe mb-4 font-accent">
                {product.categories[0]?.name || 'Коллекция'}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-lux mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-10">
                <p className="text-2xl font-serif text-gold tracking-lux">
                  {formatPrice(product.price)}
                </p>
                {product.on_sale && (
                  <p className="text-sm text-cream/30 line-through tracking-widest">
                    {formatPrice(product.regular_price)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div 
                className="text-cream/60 text-sm leading-relaxed mb-12 font-sans prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description || product.short_description }}
              />

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-12">
                <AddToCartButton product={product} />
              </div>

              {/* Details List */}
              <div className="border-t border-white/5 pt-10 grid grid-cols-1 gap-6">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-lux">
                  <span className="text-cream/30">Артикул:</span>
                  <span className="text-cream">{product.id}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-lux">
                  <span className="text-cream/30">Материал:</span>
                  <span className="text-cream">Розовое золото 750</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-lux">
                  <span className="text-cream/30">Камни:</span>
                  <span className="text-cream">108 Бр. Кр. 57 (0.86ct)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section (Simple Placeholder) */}
      <section className="py-24 px-6 border-t border-white/5 bg-secondary/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-serif text-cream uppercase tracking-lux">Вам также может понравиться</h2>
        </div>
        {/* Placeholder grid for speed */}
        <div className="max-w-7xl mx-auto flex justify-center py-12 text-cream/20 uppercase tracking-[0.4em] text-[9px]">
           Рекомендации загружаются...
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
