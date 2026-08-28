"use client";

import { PetSwitcher } from "@/components/pet/PetSwitcher";
import { PetOverview } from "@/components/pet/PetOverview";
import { VaccineTable } from "@/components/pet/VaccineTable";
import { DocumentsGrid } from "@/components/pet/DocumentsGrid";
import { OrderAndBookingHistory } from "@/components/pet/OrderAndBookingHistory";
import { useActivePet } from "@/lib/pet-context";

export default function PetPage() {
  const { activePet } = useActivePet();

  return (
    <div>
      <span className="mb-3.5 inline-flex rounded-full bg-orange-100 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-orange-600">
        Pet profile
      </span>
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-[32px]">Профиль питомца</h1>
      <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft sm:text-[14.5px]">
        Здоровье, вакцинация и документы каждого питомца — в одном месте. Экосистема Lucky Paul рассчитана не
        только на собак: переключайтесь между питомцами владельца.
      </p>

      <PetSwitcher />
      <PetOverview pet={activePet} />
      <VaccineTable pet={activePet} />
      <DocumentsGrid pet={activePet} />
      <OrderAndBookingHistory pet={activePet} />
    </div>
  );
}
