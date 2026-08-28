"use client";

import { Check, Weight, Activity, Calendar, PawPrint } from "lucide-react";
import type { Pet } from "@/lib/types";

const ICONS = { weight: Weight, activity: Activity, calendar: Calendar, pet: PawPrint };

export function PetOverview({ pet }: { pet: Pet }) {
  const statusColors =
    pet.status === "ok"
      ? "bg-success-bg text-success"
      : pet.status === "warn"
        ? "bg-warn-bg text-warn"
        : "bg-danger-bg text-danger";

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center gap-4 rounded-lg2 border border-line bg-panel p-5 shadow-sm2 sm:gap-5 sm:p-7">
        <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-3xl shadow-md2 sm:h-[78px] sm:w-[78px] sm:text-4xl">
          {pet.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold sm:text-2xl">{pet.name}</h2>
          <div className="text-[13px] text-ink-soft">
            {pet.breed} · {pet.age} · {pet.weight} · Владелец: {pet.owner}
          </div>
        </div>
        <div className={`flex w-full items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold sm:w-auto sm:ml-auto ${statusColors}`}>
          <Check size={15} /> {pet.statusLabel}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5">
        {pet.stats.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <div key={s.label} className="rounded-xl border border-line bg-panel p-4 shadow-sm2">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                <Icon size={14} className="text-orange-500" /> {s.label}
              </div>
              <div className="font-serif text-lg font-extrabold sm:text-[21px]">{s.val}</div>
              <div className={`mt-0.5 text-[11.5px] ${s.danger ? "font-bold text-danger" : "text-ink-soft"}`}>
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
