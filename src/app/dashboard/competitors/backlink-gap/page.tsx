
"use client";

import { useMemo } from "react";
import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import BacklinkGapTable from "@/components/competitors/backlink-gap/BacklinkGapTable";
import { Target } from "lucide-react";

export default function BacklinkGapPage() {
  const { selectedDomain } = useCompetitor();

  const backlinkGaps = useMemo(() => {
    return (
      competitorMockData[selectedDomain.domain]?.backlinkGaps ?? []
    );
  }, [selectedDomain.domain]);

  const missingBacklinks = backlinkGaps.filter(
    (item) => !item.targetHasBacklink
  );

  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Page Heading */}
        <div className="mb-8">
            
             <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Backlink Gap Analysis
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Discover domains linking to your competitors but not to your
            website, and identify new backlink opportunities.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-slate-400">Target Domain:</span>
            <span className="font-semibold text-emerald-400">
              {selectedDomain.domain}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">
            Missing Referring Domains
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {missingBacklinks.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Domains linking to competitors but not to {selectedDomain.domain}
          </p>
        </div>

        {/* Backlink Gap Table */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Backlink Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Referring domains discovered across your competitors.
          </p>
        </div>

        <BacklinkGapTable data={backlinkGaps} />

      </main>
    </div>
  );
}
