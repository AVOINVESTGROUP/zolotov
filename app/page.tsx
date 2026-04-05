import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/woo';
import { Product } from '@/types';

// Mock data in case API returns empty results during dev
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Blockchain Diamond Ring',
    slug: 'blockchain-diamond-ring',
    price: '12500',
    regular_price: '15000',
    sale_price: '12500',
    on_sale: true,
    images: [{ id: 1, src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070', name: 'Ring 1', alt: 'Ring 1' }],
    categories: [{ id: 1, name: 'Rings', slug: 'rings' }],
    permalink: '', description: '', short_description: '', status: '', stock_status: 'instock', attributes: [], related_ids: [], upsell_ids: [], meta_data: []
  },
  {
    id: 2,
    name: 'Platinum 950 Necklace',
    slug: 'platinum-950-necklace',
    price: '8200',
    regular_price: '8200',
    sale_price: '',
    on_sale: false,
    images: [{ id: 2, src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070', name: 'Necklace 1', alt: 'Necklace 1' }],
    categories: [{ id: 2, name: 'Necklaces', slug: 'necklaces' }],
    permalink: '', description: '', short_description: '', status: '', stock_status: 'instock', attributes: [], related_ids: [], upsell_ids: [], meta_data: []
  },
  {
    id: 3,
    name: 'Dubai Gold Bracelet',
    slug: 'dubai-gold-bracelet',
    price: '4500',
    regular_price: '4500',
    sale_price: '',
    on_sale: false,
    images: [{ id: 3, src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070', name: 'Bracelet 1', alt: 'Bracelet 1' }],
    categories: [{ id: 3, name: 'Bracelets', slug: 'bracelets' }],
    permalink: '', description: '', short_description: '', status: '', stock_status: 'instock', attributes: [], related_ids: [], upsell_ids: [], meta_data: []
  },
  {
    id: 4,
    name: 'Royal Diamond Earrings',
    slug: 'royal-diamond-earrings',
    price: '21000',
    regular_price: '25000',
    sale_price: '21000',
    on_sale: true,
    images: [{ id: 4, src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974', name: 'Earrings 1', alt: 'Earrings 1' }],
    categories: [{ id: 4, name: 'Earrings', slug: 'earrings' }],
    permalink: '', description: '', short_description: '', status: '', stock_status: 'instock', attributes: [], related_ids: [], upsell_ids: [], meta_data: []
  }
];

export default async function Home() {
  const products = await getProducts({ per_page: 8 });
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      
      {/* Product Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3 block font-accent">
            Новые поступления
          </span>
          <h2 className="text-4xl font-serif text-cream uppercase tracking-lux">
            The Collection
          </h2>
        </header>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-20 text-center">
            <Link 
              href="/catalog"
              className="inline-block px-12 py-4 border border-cream/10 text-cream text-[10px] uppercase tracking-[0.4em] hover:bg-cream hover:text-black transition-all duration-500"
            >
              Смотреть всё
            </Link>
        </div>
      </section>

      {/* Trust Block (Style of jewelrymuse.ru) */}
      <section className="py-24 bg-secondary border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="text-xs uppercase tracking-lux text-gold mb-4 font-accent">Бесплатная доставка</h4>
            <p className="text-[9px] text-cream/40 leading-relaxed uppercase tracking-widest font-sans">По всему миру для заказов от 50,000 AED</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-lux text-gold mb-4 font-accent">Гарантия качества</h4>
            <p className="text-[9px] text-cream/40 leading-relaxed uppercase tracking-widest font-sans">Международные сертификаты GIA и IGI</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-lux text-gold mb-4 font-accent">Приватный сервис</h4>
            <p className="text-[9px] text-cream/40 leading-relaxed uppercase tracking-widest font-sans">Индивидуальный консьерж для каждого клиента</p>
          </div>
        </div>
      </section>
      
      {/* Footer Placeholder */}
      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
