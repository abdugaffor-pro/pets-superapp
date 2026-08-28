-- Lucky Paul (Pets SuperApp) — схема БД, PostgreSQL 14+
-- Соответствует сущностям текущего прототипа: prototype/lucky-paul.html
-- (PRODUCTS, PETS, SERVICES, COMMUNITY_POSTS и связанные структуры)

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- для gen_random_uuid()

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE,
  phone       TEXT UNIQUE,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- PETS + здоровье
-- =========================================================
CREATE TYPE pet_species AS ENUM ('dog', 'cat', 'other');
CREATE TYPE pet_status  AS ENUM ('ok', 'warn', 'danger');

CREATE TABLE pets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  species     pet_species NOT NULL,
  breed       TEXT,
  birth_date  DATE,
  weight_kg   NUMERIC(5,2),
  avatar_emoji TEXT,           -- временно, пока нет фото (как в прототипе: 🐕/🐈)
  photo_url   TEXT,
  status      pet_status NOT NULL DEFAULT 'ok',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TYPE vaccine_status AS ENUM ('ok', 'warn', 'danger');

CREATE TABLE pet_vaccines (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id      UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  given_date  DATE NOT NULL,
  next_date   DATE NOT NULL,
  status      vaccine_status NOT NULL DEFAULT 'ok', -- пересчитывается по next_date в приложении/джобе
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE pet_documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id      UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  doc_type    TEXT,           -- passport | vet_certificate | pedigree | insurance | other
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- История осмотров — источник для "Последний осмотр" в health-grid
CREATE TABLE pet_vet_visits (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id      UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  visit_date  DATE NOT NULL,
  vet_name    TEXT,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Заготовка под будущий GPS/трекер-роадмап ("Активность" в health-grid)
CREATE TABLE pet_activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id      UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  steps       INTEGER,
  source      TEXT NOT NULL DEFAULT 'manual', -- manual | lucky_paul_gps | partner_device
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (pet_id, log_date, source)
);

-- =========================================================
-- MARKETPLACE: бренды и товары
-- =========================================================
CREATE TYPE brand_kind AS ENUM ('own', 'partner');

CREATE TABLE brands (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL UNIQUE,   -- 'Lucky Paul', 'PetSafe', 'Ruffwear', ...
  kind         brand_kind NOT NULL,
  manufacturer TEXT,                    -- напр. 'TIZE (Шэньчжэнь)' для own-бренда
  description  TEXT
);

CREATE TABLE product_categories (
  id    SERIAL PRIMARY KEY,
  code  TEXT NOT NULL UNIQUE,   -- collar | leash | gps | food
  label TEXT NOT NULL
);

CREATE TYPE product_tag AS ENUM ('hit', 'new', 'soon');

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id      UUID NOT NULL REFERENCES brands(id),
  category_id   INTEGER NOT NULL REFERENCES product_categories(id),
  name          TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'AED',
  spec          TEXT,                  -- короткая строка характеристик (как в карточке)
  tag           product_tag,
  is_available  BOOLEAN NOT NULL DEFAULT true, -- false для tag='soon' (в разработке)
  image_url     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE product_features (
  id          SERIAL PRIMARY KEY,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  feature     TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- =========================================================
-- CART / ORDERS
-- =========================================================
CREATE TABLE cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE TYPE order_status AS ENUM ('pending', 'paid', 'delivered', 'cancelled');

CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  pet_id      UUID REFERENCES pets(id),   -- для какого питомца сделан заказ (опционально)
  subtotal    NUMERIC(10,2) NOT NULL,
  vat         NUMERIC(10,2) NOT NULL,     -- 5% как в прототипе (cartTotals)
  total       NUMERIC(10,2) NOT NULL,
  status      order_status NOT NULL DEFAULT 'pending',
  ordered_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  quantity    INTEGER NOT NULL,
  unit_price  NUMERIC(10,2) NOT NULL      -- цена товара на момент заказа (снапшот)
);

-- =========================================================
-- SERVICES / BOOKINGS
-- =========================================================
CREATE TABLE service_categories (
  id    SERIAL PRIMARY KEY,
  code  TEXT NOT NULL UNIQUE,   -- vet | groom | train | board | walk
  label TEXT NOT NULL
);

CREATE TABLE service_providers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       INTEGER NOT NULL REFERENCES service_categories(id),
  name              TEXT NOT NULL,
  role_description  TEXT,
  rating            NUMERIC(2,1),
  price             NUMERIC(10,2) NOT NULL,
  price_unit        TEXT NOT NULL,        -- приём | сеанс | выезд | сутки | выгул
  avatar_initials   TEXT,
  photo_url         TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT true
);

CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

CREATE TABLE bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  pet_id        UUID NOT NULL REFERENCES pets(id),
  provider_id   UUID NOT NULL REFERENCES service_providers(id),
  booking_date  DATE NOT NULL,
  booking_time  TIME NOT NULL,
  status        booking_status NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- COMMUNITY
-- =========================================================
CREATE TABLE community_tags (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL UNIQUE
);

CREATE TABLE community_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id   UUID NOT NULL REFERENCES users(id),
  title       TEXT NOT NULL,
  excerpt     TEXT,
  body        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE community_post_tags (
  post_id  UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  tag_id   INTEGER NOT NULL REFERENCES community_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE community_comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES users(id),
  text        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Лайки — отдельной таблицей, а не счётчиком, чтобы знать "лайкнул ли я" и не дать лайкать дважды
CREATE TABLE community_likes (
  post_id     UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

-- =========================================================
-- ИНДЕКСЫ
-- =========================================================
CREATE INDEX idx_pets_owner              ON pets(owner_id);
CREATE INDEX idx_pet_vaccines_pet        ON pet_vaccines(pet_id);
CREATE INDEX idx_pet_documents_pet       ON pet_documents(pet_id);
CREATE INDEX idx_products_category       ON products(category_id);
CREATE INDEX idx_products_brand          ON products(brand_id);
CREATE INDEX idx_orders_user             ON orders(user_id);
CREATE INDEX idx_order_items_order       ON order_items(order_id);
CREATE INDEX idx_bookings_user           ON bookings(user_id);
CREATE INDEX idx_bookings_provider_date  ON bookings(provider_id, booking_date);
CREATE INDEX idx_community_comments_post ON community_comments(post_id);
CREATE INDEX idx_community_post_tags_tag ON community_post_tags(tag_id);
