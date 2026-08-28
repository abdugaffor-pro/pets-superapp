"use client";

import { CalendarClock, ShoppingCart } from "lucide-react";
import type { Pet } from "@/lib/types";
import { formatAed } from "@/lib/format";

export function OrderAndBookingHistory({ pet }: { pet: Pet }) {
  const moreCount = pet.ordersTotal - pet.orders.length;

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-[17px] font-bold">
          <CalendarClock size={18} className="text-orange-600" /> Предстоящие записи
        </h3>
        <div className="flex flex-col gap-2.5">
          {pet.bookings.length === 0 ? (
            <p className="py-5 text-[13px] text-ink-faint">Нет предстоящих записей.</p>
          ) : (
            pet.bookings.map((b, i) => (
              <div key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-orange-100 bg-orange-50 px-[18px] py-3.5">
                <div className="w-auto flex-shrink-0 text-[11.5px] font-extrabold text-orange-700">{b.date}</div>
                <div className="flex-1 text-[13px] font-semibold">{b.desc}</div>
                <div className="ml-auto flex-shrink-0 text-[11.5px] font-bold text-ink-faint">{b.time}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-[17px] font-bold">
          <ShoppingCart size={18} className="text-orange-600" /> История заказов
        </h3>
        <div className="flex flex-col gap-2.5">
          {pet.orders.map((o, i) => (
            <div key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-line bg-panel px-[18px] py-3.5 shadow-sm2">
              <div className="w-auto flex-shrink-0 text-[11.5px] font-bold text-ink-faint">{o.date}</div>
              <div className="flex-1 text-[13px] font-semibold">{o.desc}</div>
              <div className="font-serif text-[13.5px] font-extrabold">{formatAed(o.total)}</div>
              <span
                className={`ml-auto flex-shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                  o.status === "delivered" ? "bg-success-bg text-success" : "bg-gray-bg text-gray-text"
                }`}
              >
                {o.status === "delivered" ? "Доставлен" : "Завершено"}
              </span>
            </div>
          ))}
          {moreCount > 0 && (
            <p className="pt-1.5 text-center text-xs italic text-ink-faint">
              и ещё {moreCount} более ранних заказов (всего {pet.ordersTotal})
            </p>
          )}
        </div>
      </div>
    </>
  );
}
