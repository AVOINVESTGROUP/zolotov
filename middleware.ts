import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // Список поддерживаемых локалей
  locales,
  // По умолчанию — русский
  defaultLocale: 'ru',
  // Префикс всегда в URL (для SEO)
  localePrefix: 'always'
});

export const config = {
  // Пропускаем статику, API и некстовские запросы
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
