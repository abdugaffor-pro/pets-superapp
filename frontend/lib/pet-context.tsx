"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PETS } from "./data";
import type { Pet } from "./types";

interface PetContextValue {
  activePetId: string;
  setActivePetId: (id: string) => void;
  activePet: Pet;
}

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: ReactNode }) {
  const [activePetId, setActivePetId] = useState(PETS[0].id);
  const activePet = PETS.find((p) => p.id === activePetId) ?? PETS[0];

  return (
    <PetContext.Provider value={{ activePetId, setActivePetId, activePet }}>
      {children}
    </PetContext.Provider>
  );
}

export function useActivePet(): PetContextValue {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("useActivePet должен использоваться внутри <PetProvider>");
  return ctx;
}
