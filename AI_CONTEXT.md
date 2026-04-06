# AI_CONTEXT.md — Zolotov Jewelry Store

## Проект
**Zolotov** — headless фронтенд для ювелирного интернет-магазина.  
Дизайн-референс: https://jewelrymuse.ru (тёмная люкс-эстетика, Tilda)  
Локальный путь: `C:\Dev\Zolotov`

## Архитектура

```
WordPress (бэкенд)              Next.js (фронт)           Vercel
──────────────────              ───────────────           ──────
WooCommerce                     App Router (Next 14+)     Edge CDN
  ├─ Товары / Категории         Tailwind CSS              GitHub auto-deploy
  ├─ Заказы / Платежи           Framer Motion
  └─ JWT Auth              ←──  Zustand (корзина)
                                TanStack Query
                                Axios → WooCommerce REST API
```

## Стек

| Слой | Технология | Версия |
|------|-----------|--------|
| Framework | Next.js App Router | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3+ |
| Animation | Framer Motion | latest |
| State | Zustand + persist | latest |
| Data fetching | TanStack React Query | v5 |
| HTTP | Axios | latest |
| Backend | WordPress + WooCommerce | — |
| API | WooCommerce REST API v3 | — |
| Auth | JWT Authentication (WP plugin) | — |
| Deploy | Vercel | — |

## Переменные окружения (.env.local)

```env
NEXT_PUBLIC_WP_URL=https://[домен].ru
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
JWT_SECRET=[ключ из wp-config.php]
```

> `NEXT_PUBLIC_*` — доступны на клиенте. Остальные — только сервер (Server Components, Route Handlers).

## Структура проекта

```
C:\Dev\Zolotov\
├── app/
│   ├── layout.tsx              # Root layout (шрифты, провайдеры)
│   ├── page.tsx                # Главная страница
│   ├── catalog/
│   │   ├── page.tsx            # Каталог с фильтрами
│   │   └── [slug]/page.tsx     # Карточка товара
│   ├── cart/page.tsx           # Корзина
│   ├── checkout/page.tsx       # Оформление заказа
│   ├── [category]/page.tsx     # Категорийные страницы
│   └── api/
│       ├── products/route.ts   # Проксирование WC API (скрываем ключи)
│       └── checkout/route.ts   # Создание заказа через прокси
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── BrandCarousel.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProcessSteps.tsx
│   │   └── TrustBlock.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductGallery.tsx
│       └── AddToCart.tsx
│
├── lib/
│   ├── woo.ts                  # WooCommerce API клиент
│   └── utils.ts                # Хелперы (форматирование цен и т.д.)
│
├── store/
│   └── cart.ts                 # Zustand корзина
│
├── types/
│   └── index.ts                # TypeScript типы
│
├── public/
│   └── fonts/                  # Локальные шрифты
│
├── .env.local                  # Секреты (в .gitignore!)
├── .agent/                     # AI контекст (в git)
│   ├── skills/
│   └── workflows/
├── GEMINI.md
├── AI_CONTEXT.md
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Дизайн-система

### Цвета (тёмная люкс-палитра)
```css
--bg-primary: #0a0a0a        /* почти чёрный фон */
--bg-secondary: #111111      /* карточки, секции */
--bg-card: #1a1a1a           /* hover состояния */
--text-primary: #f5f0e8      /* кремово-белый */
--text-secondary: #a89880    /* приглушённый золотистый */
--accent-gold: #c9a84c       /* основной акцент */
--accent-gold-light: #e8c97a /* hover акцент */
--border: #2a2a2a            /* разделители */
```

### Типографика
- **Заголовки:** Cormorant Garamond (serif, люкс)
- **Тело:** Inter (sans-serif, читаемость)
- **Акценты/лейблы:** Montserrat (uppercase, tracking)

### Принципы UI
- Тёмный фон, светлый текст
- Золотые акценты — только для CTA и ключевых элементов
- Много воздуха (padding, spacing)
- Анимации — плавные, не агрессивные (ease-out, 300-500ms)
- Hover на карточках товаров — лёгкий scale + золотая рамка

## WooCommerce API

**Base URL:** `https://[домен].ru/wp-json/wc/v3`

### Ключевые эндпоинты
```
GET  /products                  # список товаров
GET  /products/{id}             # один товар
GET  /products?category={id}    # по категории
GET  /products/categories       # все категории
POST /orders                    # создать заказ
POST /customers                 # создать покупателя
```

### Авторизация публичных запросов
```
?consumer_key=ck_xxx&consumer_secret=cs_xxx
```
> Ключи НИКОГДА не уходят на клиент — только через Next.js Route Handlers (серверная прокси)

### Создание заказа (тело запроса)
```json
{
  "payment_method": "bacs",
  "billing": { "first_name": "", "last_name": "", "email": "", "phone": "" },
  "line_items": [{ "product_id": 123, "quantity": 1 }]
}
```

## Страницы и компоненты (приоритет)

### P0 — Запуск
1. Layout (Header + Footer)
2. Главная страница (Hero + бренд-карусель + топ товары)
3. Каталог (сетка + фильтр по категориям)
4. Карточка товара

### P1 — Конверсия
5. Корзина (Zustand)
6. Checkout + создание заказа

### P2 — SEO и полировка
7. Метатеги, OG теги
8. Sitemap
9. Оптимизация изображений

## Текущий статус

- [x] Архитектура определена
- [x] WordPress настроен
- [x] Next.js проект создан и инициализирован
- [x] Деплой на Vercel
- [x] Дизайн-система и шрифты (v4 @theme)
- [x] Базовый Layout
- [x] Главная страница
- [x] Каталог
- [x] Карточка товара
- [x] КОРЗИНА (Zustand + Mini App)
- [x] Checkout (Proxy API)
- [x] Telegram Mini App (RU/EN)
- [x] Полная интернационализация сайта (i18n)

## Важные решения

| Решение | Причина |
|---------|---------|
| App Router (не Pages) | Будущее Next.js, RSC, лучший SEO |
| Route Handlers как прокси | Ключи WC не светим на клиенте |
| Zustand + persist | Лёгкая корзина, сохраняется в localStorage |
| Framer Motion | Плавные анимации уровня люкс-сайта |
| Cormorant Garamond | Ювелирный характер, как у образца |
| Webpack для шрифтов | Обход багов Turbopack в Next.js 16 (Module not found) |
