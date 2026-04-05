# Skill: Next.js App Router паттерны

## Server vs Client компоненты

### Server Component (по умолчанию)
```tsx
// app/catalog/page.tsx — данные фетчатся на сервере
import { getProducts } from '@/lib/woo'

export default async function CatalogPage() {
  const products = await getProducts({ per_page: 24 })
  return <ProductGrid products={products} />
}
```

### Client Component (интерактивность)
```tsx
'use client'
// Всегда первой строкой если нужны: useState, useEffect, обработчики событий
import { useCart } from '@/store/cart'
```

**Правило:** Server по умолчанию. Client только если нужна интерактивность.

## Data Fetching паттерны

### Серверный фетч (предпочтительно)
```tsx
// app/catalog/[slug]/page.tsx
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}

// Генерация метаданных
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  return {
    title: `${product.name} | Zolotov`,
    description: product.short_description,
    openGraph: { images: [product.images[0]?.src] }
  }
}
```

### Клиентский фетч (TanStack Query)
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useProducts(categoryId?: number) {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () =>
      axios.get('/api/products', { params: { category: categoryId } }).then(r => r.data),
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}
```

## Route Handlers (API прокси)

### Скрываем WC ключи от клиента
```ts
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const url = new URL(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/products`)
  url.searchParams.set('consumer_key', process.env.WC_CONSUMER_KEY!)
  url.searchParams.set('consumer_secret', process.env.WC_CONSUMER_SECRET!)
  if (category) url.searchParams.set('category', category)
  url.searchParams.set('per_page', '24')

  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  const data = await res.json()
  return NextResponse.json(data)
}
```

## Image оптимизация

```tsx
import Image from 'next/image'

<Image
  src={product.images[0]?.src || '/placeholder.jpg'}
  alt={product.images[0]?.alt || product.name}
  width={600}
  height={600}
  className="object-cover"
  priority={isAboveFold} // true только для first-screen изображений
/>
```

```ts
// next.config.ts — разрешаем домен WP
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.твойдомен.ru',
      },
    ],
  },
}
```

## Загрузка шрифтов

```tsx
// app/layout.tsx
import { Cormorant_Garamond, Inter, Montserrat } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
})
```

## Провайдеры (QueryClient)

```tsx
// components/providers/QueryProvider.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
```

## Анимации (Framer Motion)

```tsx
// Базовый fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Stagger для списков
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

<motion.div variants={stagger} initial="hidden" animate="visible">
  {products.map(p => (
    <motion.div key={p.id} variants={fadeIn}>
      <ProductCard product={p} />
    </motion.div>
  ))}
</motion.div>
```

## Типичные ошибки

| Ошибка | Решение |
|--------|---------|
| `useCart` в Server Component | Добавь `'use client'` |
| Ключи WC в клиентском коде | Используй Route Handler как прокси |
| `any` тип | Используй типы из `types/index.ts` |
| `console.log` в продакшне | Убирай перед коммитом |
