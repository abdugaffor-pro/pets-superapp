"use client";

import { FileText } from "lucide-react";
import type { Pet } from "@/lib/types";

export function DocumentsGrid({ pet }: { pet: Pet }) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-[17px] font-bold">
        <FileText size={18} className="text-orange-600" /> Документы питомца
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {pet.docs.map((d) => (
          <div key={d.name} className="flex flex-col gap-2.5 rounded-xl border border-line bg-panel p-4 shadow-sm2">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-orange-100">
              <FileText size={19} className="text-orange-600" />
            </div>
            <h5 className="text-[13px] font-bold leading-snug">{d.name}</h5>
            <div className="text-[11px] text-ink-faint">{d.meta}</div>
            <button className="mt-auto rounded-lg border border-line-strong bg-white py-2 text-[11.5px] font-bold text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white">
              Просмотреть
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
