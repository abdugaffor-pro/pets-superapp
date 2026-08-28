"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { NAV_ITEMS } from "./nav-items";
import { useCart } from "@/lib/cart-context";
import { useActivePet } from "@/lib/pet-context";

export function TopBar() {
  const pathname = usePathname();
  const { totals, openCart } = useCart();
  const { activePet } = useActivePet();

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-7">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 text-lg shadow-sm2">
            🐾
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-lg font-bold leading-tight">Lucky Paul</div>
            <div className="-mt-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">
              Экосистема для питомцев
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                  active ? "bg-orange-500 text-white" : "text-ink-soft hover:bg-orange-50 hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex flex-shrink-0 items-center gap-2.5">
          <Link
            href="/pet"
            className="flex items-center gap-2 rounded-full border border-line-strong bg-white py-1.5 pl-1.5 pr-3.5 shadow-sm2"
          >
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-100 text-sm">
              {activePet.avatar}
            </span>
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-[12.5px] font-bold">{activePet.owner}</span>
              <span className="text-[10.5px] font-semibold text-ink-faint">
                Питомец: {activePet.name}
              </span>
            </span>
          </Link>
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border border-line-strong bg-white py-2 pl-3.5 pr-3 shadow-sm2 transition-transform hover:-translate-y-0.5"
          >
            <ShoppingCart size={18} />
            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-extrabold text-white">
              {totals.count}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
