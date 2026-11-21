
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { scannedDomains } from "@/data/competitors/competitorMockData";

import type { ScannedDomain } from "@/data/competitors/competitorTypes";

// Type for manually added competitor domains
export interface AddedCompetitorDomain {
  id: string;
  domain: string;
   targetDomain: string;
  addedAt: string;
}

// Context properties
interface CompetitorContextType {
  selectedDomain: ScannedDomain;
  setSelectedDomain: (domain: ScannedDomain) => void;
  addedDomains: AddedCompetitorDomain[];
  addCompetitorDomain: (domain: string, targetDomain: string) => void;
  removeCompetitorDomain: (id: string) => void;
}

const CompetitorContext = createContext<
  CompetitorContextType | undefined
>(undefined);

interface CompetitorProviderProps {
  children: ReactNode;
}

export function CompetitorProvider({
  children,
}: CompetitorProviderProps) {
  // Currently selected target domain
  const [selectedDomain, setSelectedDomain] = useState<ScannedDomain>(
    scannedDomains[0]
  );

  // Stores manually added competitor domains
  const [addedDomains, setAddedDomains] = useState<
    AddedCompetitorDomain[]
  >([]);

  // Adds a new competitor domain
 const addCompetitorDomain = (
  domain: string,
  targetDomain: string
) => {
  const newDomain: AddedCompetitorDomain = {
    id: crypto.randomUUID(),
    domain,
    targetDomain,
    addedAt: new Date().toISOString(),
  };

  setAddedDomains((previous) => [...previous, newDomain]);
};

  //remove a competitor domain

  const removeCompetitorDomain = (id: string) => {
  setAddedDomains((previous) =>
    previous.filter((item) => item.id !== id)
  );
};

  return (
    <CompetitorContext.Provider
      value={{
        selectedDomain,
        setSelectedDomain,
        addedDomains,
        addCompetitorDomain,
        removeCompetitorDomain,
      }}
    >
      {children}
    </CompetitorContext.Provider>
  );
}

// Custom hook to access competitor context
export function useCompetitor() {
  const context = useContext(CompetitorContext);

  if (!context) {
    throw new Error(
      "useCompetitor must be used within a CompetitorProvider"
    );
  }

  return context;
}
