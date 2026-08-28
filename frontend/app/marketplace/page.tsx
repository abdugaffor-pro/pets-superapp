"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CategoryTiles } from "@/components/marketplace/CategoryTiles";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductModal } from "@/components/marketplace/ProductModal";
import { PRODUCTS } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";

type SortMode = "default" | "price-asc" | "price-desc" | "name-asc";

export default function MarketplacePage() {
  const [activeCat, setActiveCat] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("default");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => activeCat === "all" || p.category === activeCat);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "ru"));
    return list;
  }, [activeCat, search, sort]);

  const own = filtered.filter((p) => p.brandKind === "own");
  const partner = filtered.filter((p) => p.brandKind === "partner");

  return (
    <div>
      <span className="mb-3.5 inline-flex rounded-full bg-orange-100 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-orange-600">
        Marketplace
      </span>
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-[32px]">Каталог Lucky Paul</h1>
      <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft sm:text-[14.5px]">
        {PRODUCTS.length} товара для собак и кошек: собственное производство Lucky Paul (TIZE) — отдельно от
        ассортимента партнёрских брендов. Кликните на карточку, чтобы открыть подробную страницу товара.
      </p>

      <CategoryTiles active={activeCat} onChange={setActiveCat} />

      <div className="mb-7 flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или бренду…"
            className="w-full rounded-full border border-line-strong bg-white py-2.5 pl-10 pr-4 text-[13.5px] outline-none focus:border-orange-400"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="rounded-full border border-line-strong bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-soft outline-none"
        >
          <option value="default">Сортировка: по умолчанию</option>
          <option value="price-asc">Цена: сначала дешевле</option>
          <option value="price-desc">Цена: сначала дороже</option>
          <option value="name-asc">По названию</option>
        </select>
        <span className="whitespace-nowrap text-xs text-ink-faint">{filtered.length} товаров</span>
      </div>

      {own.length > 0 && (
        <ProductSection title="Продукция Lucky Paul" desc="Собственное производство (TIZE, Шэньчжэнь)" dotOwn count={own.length} products={own} onOpen={setOpenProduct} />
      )}
      {partner.length > 0 && (
        <ProductSection title="Партнёрские бренды" desc="Ассортимент проверенных внешних поставщиков" count={partner.length} products={partner} onOpen={setOpenProduct} />
      )}
      {own.length === 0 && partner.length === 0 && (
        <p className="py-10 text-center text-[13px] text-ink-faint">Ничего не найдено по этому фильтру.</p>
      )}

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </div>
  );
}

function ProductSection({
  title,
  desc,
  dotOwn,
  count,
  products,
  onOpen,
}: {
  title: string;
  desc: string;
  dotOwn?: boolean;
  count: number;
  products: Product[];
  onOpen: (p: Product) => void;
}) {
  return (
    <section className="mb-10">
      <div className="mb-1 flex flex-wrap items-center gap-3">
        <span className={`h-[9px] w-[9px] rounded-full ${dotOwn ? "bg-orange-500" : "bg-ink-faint"}`} />
        <h3 className="text-[17px] font-bold">{title}</h3>
        <span className="text-xs font-semibold text-ink-faint">
          {count} {count === 1 ? "позиция" : "позиций"}
        </span>
      </div>
      <p className="mb-[18px] ml-[21px] text-[12.5px] text-ink-soft">{desc}</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={() => onOpen(p)} />
        ))}
      </div>
    </section>
  );
}
