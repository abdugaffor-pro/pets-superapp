# Lucky Paul — frontend (Next.js)

Реальный frontend, разбитый на компоненты по разделам кликабельного прототипа
(`../prototype/lucky-paul.html`): Home, Marketplace, Pet Profile, Services, Community.

Стек: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Веб-приложение, mobile-first —
открывается по ссылке в браузере телефона без установки из App Store/Google Play (см.
`docs/DATA_MODEL.md` и обсуждение выбора стека). Нативное приложение (React Native) —
следующий этап, когда наберётся аудитория.

## Запуск

```bash
npm install
npm run dev
```

Откроется на http://localhost:3000 — по умолчанию адаптивно (мобильная раскладка < 1024px,
десктопная — шире).

## Структура

```
app/                  — страницы (App Router): /, /marketplace, /pet, /services, /community
components/
  layout/             — TopBar (десктоп-навигация), BottomNav (нижние табы на телефоне), CartDrawer
  marketplace/         — плитки категорий, карточка и модалка товара
  pet/                 — переключатель питомца, health-grid, таблица вакцинации, документы, история
  services/            — карточка специалиста, модалка бронирования
  community/           — карточка и модалка поста
  ui/                  — переиспользуемые Modal, Button
lib/
  types.ts             — TypeScript-типы сущностей (Product, Pet, ServiceProvider, CommunityPost, ...)
  data.ts              — данные, перенесённые из прототипа (PRODUCTS, PETS, SERVICES, COMMUNITY_POSTS)
  cart-context.tsx      — React Context для корзины (замена глобальной переменной cart в прототипе)
  pet-context.tsx       — React Context для выбранного питомца
  format.ts             — форматирование AED, расчёт "дней до вакцинации"
```

## Что дальше (интеграция с backend)

Сейчас `lib/data.ts` — статические данные прямо в коде (как и в прототипе). Когда будет готов
backend поверх схемы `../database/schema.sql`, эти константы меняются на запросы к API
(`fetch`/React Query) без изменения компонентов — они уже принимают данные через пропсы с теми
же формами (`Product`, `Pet`, `ServiceProvider`, `CommunityPost` из `lib/types.ts`).

Корзина (`cart-context.tsx`) сейчас живёт только в памяти вкладки — как только появится
авторизация, это меняется на таблицу `cart_items` из схемы БД.
