import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Объединяет классы Tailwind CSS, разрешая конфликты.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует цену для валюты AED (Дирхамы ОАЭ).
 * Можно изменить настройки локали и валюты при необходимости.
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: 'AED' | 'USD' | 'RUB';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'AED', notation = 'standard' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
