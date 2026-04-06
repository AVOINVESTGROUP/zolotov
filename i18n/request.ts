import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Список поддерживаемых языков
export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'ru';
  
  // Валидация параметра локали
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
