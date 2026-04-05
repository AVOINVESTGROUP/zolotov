# Skill: Дизайн-система Zolotov

## Референс
https://jewelrymuse.ru — тёмная люкс-эстетика ювелирного магазина.

## Tailwind конфиг

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          card: '#1a1a1a',
        },
        text: {
          primary: '#f5f0e8',
          secondary: '#a89880',
          muted: '#6b6155',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#a07830',
        },
        border: {
          DEFAULT: '#2a2a2a',
          light: '#3a3a3a',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

## Базовые классы (глобальные стили)

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg-primary text-text-primary font-inter;
  }

  h1, h2, h3 {
    @apply font-cormorant;
  }
}

@layer components {
  /* Кнопка основная */
  .btn-primary {
    @apply bg-gold text-bg-primary font-montserrat text-sm uppercase tracking-widest
           px-8 py-3 transition-all duration-300
           hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,168,76,0.3)];
  }

  /* Кнопка контурная */
  .btn-outline {
    @apply border border-gold text-gold font-montserrat text-sm uppercase tracking-widest
           px-8 py-3 transition-all duration-300
           hover:bg-gold hover:text-bg-primary;
  }

  /* Карточка товара */
  .product-card {
    @apply bg-bg-secondary border border-border transition-all duration-300
           hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)];
  }

  /* Секционный заголовок */
  .section-title {
    @apply font-cormorant text-4xl md:text-5xl text-text-primary font-light tracking-wide;
  }

  /* Подзаголовок-лейбл */
  .section-label {
    @apply font-montserrat text-xs uppercase tracking-[0.3em] text-gold;
  }
}
```

## Компонент: Button

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'font-montserrat uppercase tracking-widest transition-all duration-300',
        {
          'bg-gold text-bg-primary hover:bg-gold-light': variant === 'primary',
          'border border-gold text-gold hover:bg-gold hover:text-bg-primary': variant === 'outline',
          'text-text-secondary hover:text-gold': variant === 'ghost',
        },
        {
          'text-xs px-6 py-2': size === 'sm',
          'text-sm px-8 py-3': size === 'md',
          'text-sm px-10 py-4': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}
```

## Компонент: ProductCard

```tsx
// components/product/ProductCard.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const price = parseFloat(product.price)
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/catalog/${product.slug}`} className="product-card block group">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]?.src || '/placeholder.jpg'}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.sale_price && (
            <span className="absolute top-3 left-3 bg-gold text-bg-primary
                           font-montserrat text-xs uppercase tracking-wider px-2 py-1">
              Sale
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-cormorant text-lg text-text-primary mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="font-montserrat text-gold text-sm">{formattedPrice}</p>
        </div>
      </Link>
    </motion.div>
  )
}
```

## Типографика — классы

```
Заголовок H1:   font-cormorant text-5xl md:text-7xl font-light tracking-wide
Заголовок H2:   font-cormorant text-4xl md:text-5xl font-light
Заголовок H3:   font-cormorant text-2xl font-normal
Лейбл:          font-montserrat text-xs uppercase tracking-[0.3em] text-gold
Тело текста:    font-inter text-base text-text-secondary leading-relaxed
Цена:           font-montserrat text-gold
```

## Спейсинг секций

```
Между секциями:   py-20 md:py-32
Внутри секции:    px-4 md:px-8 max-w-7xl mx-auto
Сетка товаров:    grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6
```

## Утилита cn

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
Установить: `npm install clsx tailwind-merge`
