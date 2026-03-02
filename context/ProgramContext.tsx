"use client";

import { createContext, useContext, useState } from "react";
import { programs } from "@/data/programs";
import { Program } from "@/types/program";

interface ProgramContextType {
  selectedProgram: Program;
  setSelectedProgram: (program: Program) => void;
}

const ProgramContext = createContext<ProgramContextType>({
  selectedProgram: programs[0],
  setSelectedProgram: () => {},
});

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [selectedProgram, setSelectedProgram] = useState<Program>(programs[0]);
  return (
    <ProgramContext.Provider value={{ selectedProgram, setSelectedProgram }}>
      {children}
    </ProgramContext.Provider>
  );
}

export const useProgram = () => useContext(ProgramContext);