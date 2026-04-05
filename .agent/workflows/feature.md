# Workflow: Добавление новой фичи / страницы

## Шаги

### 1. Определить тип компонента
- **Страница** → создать в `app/`
- **Секция** (блок на странице) → `components/sections/`
- **UI элемент** → `components/ui/`
- **Товарный компонент** → `components/product/`

### 2. Определить Server vs Client
```
Нужен useState / useEffect / обработчик событий?
  ДА → 'use client' первой строкой
  НЕТ → Server Component (без директивы)
```

### 3. Данные
```
Данные нужны?
  НЕТ → просто JSX
  ДА → они статические или динамические?
    СТАТИЧЕСКИЕ → fetch в Server Component
    ДИНАМИЧЕСКИЕ (меняются по действию) → TanStack Query в Client Component
    КОРЗИНА / UI STATE → Zustand
```

### 4. Стили
1. Использовать классы из `styling.md` skill
2. Цвета только из дизайн-системы (не хардкодить #hex)
3. Анимации через Framer Motion (не CSS transition для сложных)

### 5. Типы
Всегда добавлять в `types/index.ts` если новая структура данных.

### 6. Проверка перед коммитом
```powershell
npm run build   # должен пройти без ошибок
npm run lint    # 0 ошибок
```

### 7. Коммит
```powershell
git add .
git commit -m "feat: [описание что сделано]"
git push
# Vercel деплоит автоматически
```

## Чеклист новой страницы

- [ ] Файл создан в правильном месте в `app/`
- [ ] `generateMetadata` добавлен (title, description, OG)
- [ ] Loading state (`loading.tsx` рядом или Suspense)
- [ ] Error state (`error.tsx` рядом или try/catch)
- [ ] Мобильная адаптация проверена
- [ ] Изображения через `next/image`
- [ ] Нет прямых обращений к WC API из клиентского кода

## Именование

```
Компоненты:  PascalCase.tsx
Хуки:        use-kebab-case.ts
Утилиты:     kebab-case.ts
Страницы:    page.tsx (Next.js конвенция)
```
