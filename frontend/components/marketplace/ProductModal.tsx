"use client";

import { Check, Minus, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { items, changeQty } = useCart();
  const inCart = product ? items[product.id] || 0 : 0;

  return (
    <Modal open={!!product} onClose={onClose} maxWidthClass="max-w-[820px]">
      {product && (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div
            className={`flex min-h-[220px] items-center justify-center sm:min-h-[320px] ${
              product.brandKind === "own" ? "bg-gradient-to-br from-orange-100 to-orange-50" : "bg-gray-bg"
            }`}
          >
            <span className="text-7xl">🐾</span>
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <span
              className={`mb-2.5 inline-block w-fit rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                product.brandKind === "own" ? "bg-orange-500 text-white" : "bg-gray-bg text-gray-text"
              }`}
            >
              {product.brandKind === "own" ? "Lucky Paul" : product.brand}
            </span>
            <h2 className="mb-2.5 text-xl font-bold leading-snug sm:text-[22px]">{product.name}</h2>
            <div className="mb-4 text-xs text-ink-faint">{product.maker}</div>
            <div className="mb-[18px] text-[13.5px] leading-relaxed text-ink-soft">{product.spec}</div>
            <ul className="mb-5 flex flex-col gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12.5px]">
                  <Check size={15} className="flex-shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between border-t border-line pt-[18px]">
              <div className="font-serif text-2xl font-extrabold sm:text-[26px]">
                {product.price}
                <small className="text-xs font-semibold text-ink-faint"> AED</small>
              </div>
              {product.soon ? (
                <button disabled className="cursor-not-allowed rounded-2xl bg-gray-bg px-6 py-3.5 text-[13.5px] font-bold text-gray-text">
                  Скоро в продаже
                </button>
              ) : inCart > 0 ? (
                <div className="flex items-center gap-2.5 rounded-xl bg-ink p-1.5">
                  <button onClick={() => changeQty(product.id, -1)} className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-white hover:bg-orange-600">
                    <Minus size={14} />
                  </button>
                  <span className="text-[15px] font-bold text-white">{inCart}</span>
                  <button onClick={() => changeQty(product.id, 1)} className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-white hover:bg-orange-600">
                    <Plus size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => changeQty(product.id, 1)}
                  className="flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-[13.5px] font-bold text-white transition-colors hover:bg-orange-600"
                >
                  <Plus size={16} /> Добавить в корзину
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
