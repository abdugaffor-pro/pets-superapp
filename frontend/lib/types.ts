export type ProductCategory = "collar" | "leash" | "gps" | "food";
export type ProductTag = "hit" | "new" | "soon";
export type BrandKind = "own" | "partner";

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandKind: BrandKind;
  maker: string;
  category: ProductCategory;
  price: number;
  spec: string;
  tag?: ProductTag;
  soon?: boolean;
  imageUrl?: string;
  features: string[];
}

export type VaccineStatus = "ok" | "warn" | "danger";

export interface Vaccine {
  name: string;
  given: string; // dd.mm.yyyy
  next: string; // dd.mm.yyyy
  status: VaccineStatus;
}

export interface PetDocument {
  name: string;
  meta: string;
}

export interface Order {
  date: string;
  desc: string;
  total: number;
  status: "delivered" | "done";
}

export interface Booking {
  date: string;
  desc: string;
  time: string;
}

export interface HealthStat {
  label: string;
  val: string;
  sub: string;
  icon: "weight" | "activity" | "calendar" | "pet";
  danger?: boolean;
}

export type PetStatus = "ok" | "warn" | "danger";

export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat";
  avatar: string;
  breed: string;
  age: string;
  weight: string;
  owner: string;
  status: PetStatus;
  statusLabel: string;
  healthPct: number;
  orders: Order[];
  ordersTotal: number;
  bookings: Booking[];
  stats: HealthStat[];
  vaccines: Vaccine[];
  docs: PetDocument[];
}

export type ServiceCategory = "vet" | "groom" | "train" | "board" | "walk";

export interface ServiceProvider {
  id: string;
  category: ServiceCategory;
  name: string;
  role: string;
  rating: number;
  price: number;
  unit: string;
  initials: string;
}

export interface CommunityComment {
  author: string;
  text: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  initials: string;
  time: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: CommunityComment[];
}

export interface CartLine {
  productId: string;
  quantity: number;
}
