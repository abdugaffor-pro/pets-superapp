"use client";

import { X, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/data";
import { formatAed } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, changeQty, removeItem, clear, totals } = useCart();
  const entries = Object.entries(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-white shadow-lg2 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingCart size={18} /> Корзина
          </h3>
          <button onClick={closeCart} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-bg">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center text-ink-faint">
              <ShoppingCart size={44} className="mb-3.5" />
              <p className="text-[13px]">
                Корзина пока пуста.
                <br />
                Добавьте товары из каталога.
              </p>
            </div>
          ) : (
            entries.map(([id, qty]) => {
              const p = PRODUCTS.find((x) => x.id === id);
              if (!p) return null;
              return (
                <div key={id} className="flex gap-3 border-b border-line py-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-orange-50 text-2xl">
                    🐾
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 truncate text-[12.5px] font-bold">{p.name}</div>
                    <div className="mb-2 text-[10.5px] text-ink-faint">
                      {p.brandKind === "own" ? "Lucky Paul" : p.brand}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 rounded-lg bg-gray-bg p-0.5">
                        <button onClick={() => changeQty(id, -1)} className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white">
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[14px] text-center text-xs font-bold">{qty}</span>
                        <button onClick={() => changeQty(id, 1)} className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-serif text-[13px] font-extrabold">{formatAed(p.price * qty)}</div>
                    </div>
                    <button onClick={() => removeItem(id)} className="mt-1.5 text-[11px] text-ink-faint underline">
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-line bg-orange-50 px-6 py-5">
          <div className="flex justify-between py-1 text-[13px] text-ink-soft">
            <span>Товары ({totals.count})</span>
            <span>{formatAed(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between py-1 text-[13px] text-ink-soft">
            <span>НДС (5%)</span>
            <span>{formatAed(totals.vat)}</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-dashed border-line-strong pt-3 text-[17px] font-extrabold">
            <span>Итого</span>
            <span>{formatAed(totals.total)}</span>
          </div>
          <button
            onClick={() => {
              if (totals.count === 0) return;
              clear();
              setTimeout(closeCart, 400);
            }}
            className="mt-4 w-full rounded-2xl bg-ink py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
          >
            Оформить заказ (демо)
          </button>
        </div>
      </div>
    </>
  );
}
