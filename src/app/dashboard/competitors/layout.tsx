
"use client";

import type { ReactNode } from "react";

import {
  CompetitorProvider,
  useCompetitor,
} from "@/context/CompetitorContext";

import DomainSelector from "@/components/competitors/shared/DomainSelector";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface CompetitorsLayoutContentProps {
  children: ReactNode;
}

function CompetitorsLayoutContent({
  children,
}: CompetitorsLayoutContentProps) {
  const { selectedDomain, setSelectedDomain } = useCompetitor();

  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="sticky top-15 z-40 bg-[#020603] pt-4 pb-3">
          <DomainSelector
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
          />
        </div>

        {children}
      </main>
    </div>
  );
}

export default function CompetitorsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CompetitorProvider>
      <CompetitorsLayoutContent>
        {children}
      </CompetitorsLayoutContent>
    </CompetitorProvider>
  );
}
