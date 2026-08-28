"use client";

import { Syringe } from "lucide-react";
import type { Pet } from "@/lib/types";
import { countdownBadge } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = { ok: "Актуально", warn: "Скоро истекает", danger: "Просрочена" };
const STATUS_STYLE: Record<string, string> = {
  ok: "bg-success-bg text-success",
  warn: "bg-warn-bg text-warn",
  danger: "bg-danger-bg text-danger",
};
const BADGE_STYLE: Record<string, string> = {
  ok: "bg-success-bg text-success",
  warn: "bg-warn-bg text-warn",
  danger: "bg-danger-bg text-danger",
};

export function VaccineTable({ pet }: { pet: Pet }) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-[17px] font-bold">
        <Syringe size={18} className="text-orange-600" /> Вакцинация
      </h3>
      <div className="overflow-x-auto rounded-lg2 border border-line shadow-sm2">
        <table className="w-full min-w-[640px] border-collapse bg-panel">
          <thead>
            <tr className="bg-orange-50">
              {["Вакцина", "Дата введения", "Следующая", "Статус", "До вакцинации"].map((h) => (
                <th key={h} className="px-[18px] py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pet.vaccines.map((v) => {
              const cd = countdownBadge(v.next);
              return (
                <tr key={v.name} className="border-t border-line hover:bg-orange-50">
                  <td className="px-[18px] py-3.5 text-[13px] font-semibold">{v.name}</td>
                  <td className="px-[18px] py-3.5 text-[13px]">{v.given}</td>
                  <td className="px-[18px] py-3.5 text-[13px]">{v.next}</td>
                  <td className="px-[18px] py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${STATUS_STYLE[v.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {STATUS_LABEL[v.status]}
                    </span>
                  </td>
                  <td className="px-[18px] py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-extrabold ${BADGE_STYLE[cd.cls]}`}>
                      {cd.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
