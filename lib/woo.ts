import axios from 'axios';
import { Product, Category } from '@/types';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

/**
 * Базовый инстанс Axios для взаимодействия с WooCommerce REST API v3.
 * Эти запросы должны выполняться ТОЛЬКО на сервере (RSC, Route Handlers, Server Actions),
 * так как они используют секретные ключи WC_CONSUMER_KEY и WC_CONSUMER_SECRET.
 */
const wooClient = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  params: {
    consumer_key: CK,
    consumer_secret: CS,
  },
});

/**
 * Получить список товаров с поддержкой параметров (категории, лимит и т.д.).
 */
export async function getProducts(params: Record<string, any> = {}) {
  try {
    const response = await wooClient.get<Product[]>('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Получить один товар по его слагу (slug).
 */
export async function getProductBySlug(slug: string) {
  try {
    const response = await wooClient.get<Product[]>('/products', {
      params: { slug },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Получить список категорий.
 */
export async function getCategories(params: Record<string, any> = {}) {
  try {
    const response = await wooClient.get<Category[]>('/products/categories', {
      params: { 
        hide_empty: true,
        ...params 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default wooClient;
