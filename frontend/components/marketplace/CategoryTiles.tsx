"use client";

import { LayoutGrid, CircleDot, MapPin, UtensilsCrossed } from "lucide-react";
import { PRODUCTS, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/data";
import type { ProductCategory } from "@/lib/types";

const CATEGORY_ICONS: Record<string, typeof CircleDot> = {
  collar: CircleDot,
  leash: MapPin,
  gps: MapPin,
  food: UtensilsCrossed,
};

export function CategoryTiles({
  active,
  onChange,
}: {
  active: ProductCategory | "all";
  onChange: (cat: ProductCategory | "all") => void;
}) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
      <Tile
        active={active === "all"}
        icon={LayoutGrid}
        name="Все категории"
        count={PRODUCTS.length}
        onClick={() => onChange("all")}
      />
      {CATEGORY_ORDER.map((cat) => {
        const Icon = CATEGORY_ICONS[cat] ?? CircleDot;
        const count = PRODUCTS.filter((p) => p.category === cat).length;
        return (
          <Tile
            key={cat}
            active={active === cat}
            icon={Icon}
            name={CATEGORY_LABELS[cat]}
            count={count}
            onClick={() => onChange(cat)}
          />
        );
      })}
    </div>
  );
}

function Tile({
  active,
  icon: Icon,
  name,
  count,
  onClick,
}: {
  active: boolean;
  icon: typeof CircleDot;
  name: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-2.5 rounded-2xl border-[1.5px] p-3 text-left transition-all sm:p-4 ${
        active ? "border-ink bg-ink" : "border-line bg-panel hover:-translate-y-0.5 hover:shadow-sm2"
      }`}
    >
      <div
        className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] ${
          active ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
        }`}
      >
        <Icon size={18} />
      </div>
      <div className={`text-[13px] font-bold ${active ? "text-white" : ""}`}>{name}</div>
      <div className={`text-[11px] font-semibold ${active ? "text-white/60" : "text-ink-faint"}`}>
        {count} товаров
      </div>
    </button>
  );
}
