export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/woo';
import { cn } from '@/lib/utils';

interface CatalogPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const currentCategorySlug = searchParams.category;
  const currentPage = parseInt(searchParams.page || '1');
  const perPage = 12;

  // 1. Получаем категории для фильтра
  const allCategories = await getCategories();
  
  // 2. Находим ID текущей категории по слагу, если он есть
  const currentCategory = allCategories.find(cat => cat.slug === currentCategorySlug);
  
  // 3. Формируем параметры запроса
  const productParams: any = {
    per_page: perPage * currentPage, // Для упрощенной пагинации "Показать ещё"
    status: 'publish',
  };

  if (currentCategory) {
    productParams.category = currentCategory.id;
  }

  // 4. Получаем товары
  const products = await getProducts(productParams);

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Catalog Header */}
      <section className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-lux mb-8">
          {currentCategory ? currentCategory.name : 'Каталог'}
        </h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-white/5 pb-8 overflow-x-auto no-scrollbar">
          <Link 
            href="/catalog"
            className={cn(
              "text-[10px] uppercase tracking-[0.4em] transition-colors whitespace-nowrap font-accent",
              !currentCategorySlug ? "text-gold" : "text-cream/40 hover:text-cream"
            )}
          >
            Все украшения
          </Link>
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] transition-colors whitespace-nowrap font-accent",
                currentCategorySlug === category.slug ? "text-gold" : "text-cream/40 hover:text-cream"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Show More Pagination */}
            {products.length >= perPage * currentPage && (
              <div className="mt-20 text-center">
                <Link
                  href={`/catalog?${new URLSearchParams({
                    ...(currentCategorySlug ? { category: currentCategorySlug } : {}),
                    page: (currentPage + 1).toString()
                  }).toString()}`}
                  scroll={false}
                  className="inline-block px-12 py-4 border border-cream/10 text-cream text-[10px] uppercase tracking-[0.4em] hover:bg-cream hover:text-black transition-all duration-500 font-accent"
                >
                  Показать ещё
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-cream/30 uppercase tracking-lux text-sm mb-8 font-accent">
              В этой категории пока нет товаров
            </p>
            <Link 
              href="/catalog"
              className="text-gold text-[10px] uppercase tracking-lux font-accent border-b border-gold/30 pb-2"
            >
              Вернуться в общий каталог
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5 text-cream/20 text-[9px] uppercase tracking-[0.5em] font-accent">
        © {new Date().getFullYear()} Zolotov — High Jewelry House Dubai
      </footer>
    </main>
  );
}
