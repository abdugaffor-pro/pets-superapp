"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { PRODUCTS } from "./data";

interface CartTotals {
  count: number;
  subtotal: number;
  vat: number;
  total: number;
}

interface CartContextValue {
  items: Record<string, number>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  changeQty: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  totals: CartTotals;
}

const CartContext = createContext<CartContextValue | null>(null);

// НДС 5% — как в прототипе (cartTotals). В реальном приложении ставку
// стоит вынести в конфиг, а не хардкодить в коде (см. docs/DATA_MODEL.md).
const VAT_RATE = 0.05;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);

  const changeQty = useCallback((productId: string, delta: number) => {
    setItems((prev) => {
      const next = Math.max(0, (prev[productId] || 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[productId];
      else copy[productId] = next;
      return copy;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const totals = useMemo<CartTotals>(() => {
    let count = 0;
    let subtotal = 0;
    for (const [id, qty] of Object.entries(items)) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) continue;
      count += qty;
      subtotal += p.price * qty;
    }
    const vat = subtotal * VAT_RATE;
    return { count, subtotal, vat, total: subtotal + vat };
  }, [items]);

  const value: CartContextValue = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    changeQty,
    removeItem,
    clear,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart должен использоваться внутри <CartProvider>");
  return ctx;
}
