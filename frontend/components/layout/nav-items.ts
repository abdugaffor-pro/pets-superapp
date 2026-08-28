import { Home, Store, Clock, Users, Heart } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "Главная", shortLabel: "Главная", icon: Home },
  { href: "/marketplace", label: "Маркетплейс", shortLabel: "Товары", icon: Store },
  { href: "/services", label: "Услуги", shortLabel: "Услуги", icon: Clock },
  { href: "/community", label: "Сообщество", shortLabel: "Клуб", icon: Users },
  { href: "/pet", label: "Профиль питомца", shortLabel: "Питомец", icon: Heart },
] as const;
