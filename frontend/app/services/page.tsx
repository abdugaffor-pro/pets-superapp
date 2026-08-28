"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Stethoscope, Scissors, Dumbbell, Home as HomeIcon, Footprints } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { BookingModal } from "@/components/services/BookingModal";
import { SERVICES, SERVICE_LABELS, SERVICE_ORDER } from "@/lib/data";
import type { ServiceCategory, ServiceProvider } from "@/lib/types";

const CATEGORY_ICONS: Record<ServiceCategory, typeof Stethoscope> = {
  vet: Stethoscope,
  groom: Scissors,
  train: Dumbbell,
  board: HomeIcon,
  walk: Footprints,
};

function ServicesInner() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as ServiceCategory | null) ?? "all";
  const [activeCat, setActiveCat] = useState<ServiceCategory | "all">(initialCat);
  const [booking, setBooking] = useState<ServiceProvider | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(
    () => SERVICES.filter((s) => activeCat === "all" || s.category === activeCat),
    [activeCat]
  );

  return (
    <div>
      <span className="mb-3.5 inline-flex rounded-full bg-orange-100 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-orange-600">
        Services
      </span>
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-[32px]">Услуги для питомца</h1>
      <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft sm:text-[14.5px]">
        Бронирование ветеринаров, грумеров, тренеров, передержки и выгула — с рейтингом, ценой и записью в один
        клик (демо-режим).
      </p>

      <div className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        <CatTile active={activeCat === "all"} icon={LayoutGrid} name="Все услуги" count={SERVICES.length} onClick={() => setActiveCat("all")} />
        {SERVICE_ORDER.map((cat) => (
          <CatTile
            key={cat}
            active={activeCat === cat}
            icon={CATEGORY_ICONS[cat]}
            name={SERVICE_LABELS[cat]}
            count={SERVICES.filter((s) => s.category === cat).length}
            onClick={() => setActiveCat(cat)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} onBook={() => setBooking(s)} />
        ))}
      </div>

      <BookingModal
        service={booking}
        onClose={() => setBooking(null)}
        onConfirm={(message) => {
          setToast(message);
          setBooking(null);
          setTimeout(() => setToast(null), 2500);
        }}
      />

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-white shadow-lg2 sm:bottom-8">
          {toast}
        </div>
      )}
    </div>
  );
}

function CatTile({
  active,
  icon: Icon,
  name,
  count,
  onClick,
}: {
  active: boolean;
  icon: typeof Stethoscope;
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
      <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] ${active ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}`}>
        <Icon size={18} />
      </div>
      <div className={`text-[13px] font-bold ${active ? "text-white" : ""}`}>{name}</div>
      <div className={`text-[11px] font-semibold ${active ? "text-white/60" : "text-ink-faint"}`}>
        {count} специалистов
      </div>
    </button>
  );
}

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesInner />
    </Suspense>
  );
}
