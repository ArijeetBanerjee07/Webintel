"use client";

import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import CompetitorPagesTable from "@/components/competitors/pages/CompetitorPagesTable";
import { Target } from "lucide-react";

export default function CompetitorPagesPage() {
  const { selectedDomain } = useCompetitor();

  const competitorData = competitorMockData[selectedDomain.domain];

  const pages = competitorData?.competitorPages ?? [];

  const totalTraffic = pages.reduce(
    (total, page) => total + page.organicTraffic,
    0
  );

  const totalKeywords = pages.reduce(
    (total, page) => total + page.organicKeywords,
    0
  );

  return (
    <div className="min-h-screen bg-[#020603] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-6">
           <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Competitor Pages
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Explore high-performing pages across your competitors and
            understand their organic search performance.
          </p>
        </div>

        {/* Selected Domain */}
        <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-slate-400">Target Domain:</span>
            <span className="font-semibold text-emerald-400">
              {selectedDomain.domain}
            </span>
          </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 mt-8">

          <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
            <p className="text-sm text-slate-400">
              Competitor Pages
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {pages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
            <p className="text-sm text-slate-400">
              Combined Organic Traffic
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {totalTraffic.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
            <p className="text-sm text-slate-400">
              Combined Organic Keywords
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {totalKeywords.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Competitor Pages Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Top Performing Competitor Pages
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Page-level organic search metrics for your competitors.
            </p>
          </div>

          <CompetitorPagesTable pages={pages} />
        </div>

      </div>
    </div>
  );
}