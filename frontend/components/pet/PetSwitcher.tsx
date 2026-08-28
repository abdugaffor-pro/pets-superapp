"use client";

import { PETS } from "@/lib/data";
import { useActivePet } from "@/lib/pet-context";

export function PetSwitcher() {
  const { activePetId, setActivePetId } = useActivePet();
  return (
    <div className="mb-6 flex flex-wrap gap-2.5">
      {PETS.map((p) => (
        <button
          key={p.id}
          onClick={() => setActivePetId(p.id)}
          className={`flex items-center gap-2.5 rounded-full border-[1.5px] py-2 pl-2.5 pr-[18px] text-[13px] font-bold transition-all ${
            activePetId === p.id ? "border-ink bg-ink text-white" : "border-line-strong bg-white"
          }`}
        >
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-orange-100 text-sm">
            {p.avatar}
          </span>
          {p.name}
        </button>
      ))}
      <button className="rounded-full border-[1.5px] border-dashed border-line-strong px-4 py-2 text-[13px] font-semibold text-ink-faint">
        + Добавить питомца
      </button>
    </div>
  );
}
