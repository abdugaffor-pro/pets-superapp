-- Стартовые справочники (категории, бренды) — без них приложение не заведётся.
-- Полные данные товаров/услуг/постов пока живут в prototype/lucky-paul.html
-- (константы PRODUCTS, SERVICES, COMMUNITY_POSTS) — перенести их сюда INSERT'ами
-- по мере переезда фронтенда на реальный backend.

INSERT INTO product_categories (code, label) VALUES
  ('collar', 'Ошейники'),
  ('leash',  'Поводки'),
  ('gps',    'GPS-устройства'),
  ('food',   'Корм');

INSERT INTO service_categories (code, label) VALUES
  ('vet',   'Ветеринария'),
  ('groom', 'Груминг'),
  ('train', 'Тренировки'),
  ('board', 'Передержка'),
  ('walk',  'Выгул');

INSERT INTO community_tags (name) VALUES
  ('Golden Retriever'),
  ('Британская короткошёрстная'),
  ('Здоровье'),
  ('Дрессировка'),
  ('Питание'),
  ('Общие темы');

INSERT INTO brands (name, kind, manufacturer, description) VALUES
  ('Lucky Paul', 'own', 'TIZE (Шэньчжэнь)', 'Собственный бренд Lucky Paul: ошейники, поводки, GPS-линейка (в разработке)'),
  ('PetSafe',    'partner', NULL, 'Партнёрский бренд'),
  ('Ruffwear',   'partner', NULL, 'Партнёрский бренд'),
  ('Kongo',      'partner', NULL, 'Партнёрский бренд'),
  ('Whistle',    'partner', NULL, 'Партнёрский бренд'),
  ('Fi',         'partner', NULL, 'Партнёрский бренд'),
  ('Tractive',   'partner', NULL, 'Партнёрский бренд'),
  ('PitPat',     'partner', NULL, 'Партнёрский бренд'),
  ('Royal Canin','partner', NULL, 'Партнёрский бренд'),
  ('Purina',     'partner', NULL, 'Партнёрский бренд'),
  ('Acana',      'partner', NULL, 'Партнёрский бренд'),
  ('Orijen',     'partner', NULL, 'Партнёрский бренд'),
  ('Hill''s',    'partner', NULL, 'Партнёрский бренд'),
  ('Brit Care',  'partner', NULL, 'Партнёрский бренд');
