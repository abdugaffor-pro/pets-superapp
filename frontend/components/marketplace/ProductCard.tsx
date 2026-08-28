"use client";

import { Plus, Minus, Clock } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatAed } from "@/lib/format";

const TAG_LABEL: Record<string, string> = { hit: "Хит", new: "Новинка", soon: "Скоро" };
const TAG_STYLE: Record<string, string> = {
  hit: "bg-orange-600 text-white",
  new: "bg-ink text-white",
  soon: "border border-line-strong bg-white text-ink-soft",
};

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const { items, changeQty } = useCart();
  const inCart = items[product.id] || 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg2 border border-line bg-panel shadow-sm2 transition-all hover:-translate-y-1 hover:shadow-md2">
      <button
        onClick={onOpen}
        className={`relative flex h-[120px] items-center justify-center sm:h-[150px] ${
          product.brandKind === "own"
            ? "bg-gradient-to-br from-orange-100 to-orange-50"
            : "bg-gradient-to-br from-[#F7F5F2] to-gray-bg"
        }`}
      >
        {product.tag && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${TAG_STYLE[product.tag]}`}
          >
            {TAG_LABEL[product.tag]}
          </span>
        )}
        <span className={`text-4xl ${product.brandKind === "own" ? "text-orange-600" : "text-gray-text"}`}>🐾</span>
      </button>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <span
          className={`inline-block w-fit rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
            product.brandKind === "own" ? "bg-orange-500 text-white" : "bg-gray-bg text-gray-text"
          }`}
        >
          {product.brandKind === "own" ? "Lucky Paul" : product.brand}
        </span>
        <button onClick={onOpen} className="text-left text-[13px] font-bold leading-snug hover:text-orange-600">
          {product.name}
        </button>
        <p className="min-h-[32px] text-[11.5px] leading-relaxed text-ink-soft">
          {product.spec}
          <br />
          <span className="text-ink-faint">{product.maker}</span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="font-serif text-base font-extrabold">
            {product.price}
            <small className="text-[10.5px] font-semibold text-ink-faint"> AED</small>
          </div>
          {product.soon ? (
            <button disabled title="В разработке" className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-gray-bg text-gray-text">
              <Clock size={16} />
            </button>
          ) : inCart > 0 ? (
            <div className="flex items-center gap-2 rounded-[10px] bg-ink p-0.5">
              <button onClick={() => changeQty(product.id, -1)} className="flex h-[26px] w-[26px] items-center justify-center rounded-lg text-white hover:bg-orange-600">
                <Minus size={13} />
              </button>
              <span className="min-w-[14px] text-center text-xs font-bold text-white">{inCart}</span>
              <button onClick={() => changeQty(product.id, 1)} className="flex h-[26px] w-[26px] items-center justify-center rounded-lg text-white hover:bg-orange-600">
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => changeQty(product.id, 1)}
              title="Добавить в корзину"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-ink text-white transition-colors hover:bg-orange-600"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
