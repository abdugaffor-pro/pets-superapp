"use client";

import { Star } from "lucide-react";
import type { ServiceProvider } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/data";

export function ServiceCard({ service, onBook }: { service: ServiceProvider; onBook: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg2 border border-line bg-panel shadow-sm2">
      <div className="flex h-[100px] items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 font-serif text-lg font-extrabold text-white shadow-sm2">
          {service.initials}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <span className="inline-block w-fit rounded-md bg-gray-bg px-2 py-0.5 text-[10px] font-extrabold text-gray-text">
          {SERVICE_LABELS[service.category]}
        </span>
        <p className="text-[13px] font-bold">{service.name}</p>
        <p className="text-[11.5px] text-ink-soft">{service.role}</p>
        <div className="flex items-center gap-1 text-[11.5px] font-bold">
          <Star size={12} className="fill-orange-500 text-orange-500" />
          {service.rating}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="font-serif text-base font-extrabold">
            {service.price}
            <small className="text-[10.5px] font-semibold text-ink-faint"> AED / {service.unit}</small>
          </div>
          <button
            onClick={onBook}
            className="rounded-[10px] bg-ink px-3.5 py-2 text-[11.5px] font-bold text-white transition-colors hover:bg-orange-600"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}
