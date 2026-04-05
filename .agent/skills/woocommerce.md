# Skill: WooCommerce REST API

## Клиент (lib/woo.ts)

Все запросы к WC идут через серверные Route Handlers.
На клиенте вызываем только `/api/*` эндпоинты Next.js.

```ts
// lib/woo.ts — используется ТОЛЬКО в серверных контекстах
import axios from 'axios'

const wooClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3`,
  params: {
    consumer_key: process.env.WC_CONSUMER_KEY,
    consumer_secret: process.env.WC_CONSUMER_SECRET,
  },
})

export const getProducts = (params = {}) =>
  wooClient.get('/products', { params }).then(r => r.data)

export const getProductBySlug = async (slug: string) => {
  const products = await wooClient
    .get('/products', { params: { slug } })
    .then(r => r.data)
  return products[0] || null
}

export const getProduct = (id: number) =>
  wooClient.get(`/products/${id}`).then(r => r.data)

export const getCategories = (params = {}) =>
  wooClient
    .get('/products/categories', { params: { per_page: 100, hide_empty: true, ...params } })
    .then(r => r.data)

export const createOrder = (data: object) =>
  wooClient.post('/orders', data).then(r => r.data)
```

## Параметры запросов

### Товары
```ts
// Полный список параметров
{
  per_page: 24,          // до 100
  page: 1,
  category: 123,         // ID категории
  slug: 'ring-gold',     // по слагу
  status: 'publish',
  featured: true,        // только избранные
  on_sale: true,         // со скидкой
  orderby: 'date',       // date | price | popularity | rating
  order: 'desc',
  search: 'кольцо',
  min_price: '5000',
  max_price: '50000',
}
```

### Пагинация
```ts
// Из заголовков ответа
const totalProducts = response.headers['x-wp-total']
const totalPages = response.headers['x-wp-totalpages']
```

## Создание заказа

```ts
// Минимальный заказ без аккаунта
const orderData = {
  payment_method: 'bacs',          // банковский перевод (можно менять)
  payment_method_title: 'Банковский перевод',
  set_paid: false,
  status: 'pending',
  billing: {
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    phone: form.phone,
    address_1: form.address,
    city: form.city,
    country: 'RU',
  },
  shipping: {
    first_name: form.firstName,
    last_name: form.lastName,
    address_1: form.address,
    city: form.city,
    country: 'RU',
  },
  line_items: cartItems.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity,
  })),
  customer_note: form.comment || '',
}
```

## Обработка ошибок WC API

```ts
try {
  const order = await createOrder(orderData)
  // успех
} catch (error) {
  if (axios.isAxiosError(error)) {
    const wcError = error.response?.data
    // wcError.code — код ошибки WC
    // wcError.message — описание
    console.error('WC Error:', wcError?.code, wcError?.message)
  }
}
```

## Частые коды ошибок WC

| Код | Причина |
|-----|---------|
| `woocommerce_rest_authentication_error` | Неверные ключи API |
| `woocommerce_rest_cannot_view` | Нет прав на просмотр |
| `woocommerce_rest_product_invalid_id` | Товар не найден |
| `rest_no_route` | CORS или неверный URL |

## Типы из types/index.ts

Всегда использовать типизированные ответы:
```ts
import { Product, Category, Order } from '@/types'

const products: Product[] = await getProducts()
```
