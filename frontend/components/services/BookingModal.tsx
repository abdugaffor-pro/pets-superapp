"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { ServiceProvider } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/data";
import { PETS } from "@/lib/data";
import { useActivePet } from "@/lib/pet-context";

export function BookingModal({
  service,
  onClose,
  onConfirm,
}: {
  service: ServiceProvider | null;
  onClose: () => void;
  onConfirm: (message: string) => void;
}) {
  const { activePetId } = useActivePet();
  const [petId, setPetId] = useState(activePetId);
  const [time, setTime] = useState("14:00");

  return (
    <Modal open={!!service} onClose={onClose} maxWidthClass="max-w-[460px]">
      {service && (
        <div className="p-6 sm:p-8">
          <h3 className="text-[19px] font-bold">Запись: {service.name}</h3>
          <div className="mb-5 mt-1 text-[12.5px] text-ink-soft">
            {SERVICE_LABELS[service.category]} · {service.price} AED / {service.unit}
          </div>

          <label className="mb-1.5 mt-4 block text-[11px] font-bold uppercase tracking-wide text-ink-faint">
            Питомец
          </label>
          <select
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            className="w-full rounded-xl border-[1.5px] border-line-strong px-3.5 py-2.5 text-[13.5px] outline-none focus:border-orange-400"
          >
            {PETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.avatar} {p.name}
              </option>
            ))}
          </select>

          <label className="mb-1.5 mt-4 block text-[11px] font-bold uppercase tracking-wide text-ink-faint">
            Дата
          </label>
          <input
            type="date"
            defaultValue="2026-08-28"
            className="w-full rounded-xl border-[1.5px] border-line-strong px-3.5 py-2.5 text-[13.5px] outline-none focus:border-orange-400"
          />

          <label className="mb-1.5 mt-4 block text-[11px] font-bold uppercase tracking-wide text-ink-faint">
            Время
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border-[1.5px] border-line-strong px-3.5 py-2.5 text-[13.5px] outline-none focus:border-orange-400"
          >
            {["09:00", "11:00", "14:00", "17:00"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button
            onClick={() => onConfirm(`Запись к ${service.name} оформлена — демо-режим ✓`)}
            className="mt-6 w-full rounded-2xl bg-ink py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
          >
            Подтвердить запись (демо)
          </button>
        </div>
      )}
    </Modal>
  );
}
