
"use client";

import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import { useState } from "react";

export default function SERPOverlapDiscovery() {
  const { selectedDomain } = useCompetitor();

  const selectedData = competitorMockData[selectedDomain.domain];
  const competitors = selectedData.competitors;

  const serpRows = competitors.flatMap((competitor) =>
    competitor.serpOverlap.map((record, index) => ({
      ...record,
      competitorDomain: competitor.domain,
      id: `${competitor.id}-${index}`,
    }))
  );

  const sortedRows = [...serpRows].sort(
    (a, b) => b.searchVolume - a.searchVolume
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const visibleRows = sortedRows.slice(0, visibleCount);

  const averageSearchVolume =
    serpRows.length > 0
      ? Math.round(
          serpRows.reduce((total, row) => total + row.searchVolume, 0) /
            serpRows.length
        )
      : 0;

  const averageTargetPosition =
    serpRows.length > 0
      ? (
          serpRows.reduce((total, row) => total + row.targetRanking, 0) /
          serpRows.length
        ).toFixed(1)
      : "0";

  const averageCompetitorPosition =
    serpRows.length > 0
      ? (
          serpRows.reduce((total, row) => total + row.competitorRanking, 0) /
          serpRows.length
        ).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Shared SERP Queries</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {serpRows.length}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Queries where both domains appear
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Competitors Found</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {new Set(serpRows.map((row) => row.competitorDomain)).size}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Competitors appearing alongside your domain
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Average Search Volume</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {averageSearchVolume.toLocaleString()}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Across overlapping queries
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Average Positions</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {averageTargetPosition} / {averageCompetitorPosition}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Target / Competitor
          </p>
        </div>
      </div>

      {/* SERP Overlap Table */}
      <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d]">
        <div className="border-b border-emerald-500/20 p-5">
          <h3 className="text-lg font-semibold text-white">
            SERP Overlap Keywords
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Search queries where your domain and competitors appear together
            in search results.
          </p>
        </div>

        <div className="overflow-x-auto">
          <p className="mb-2 px-4 pt-3 text-xs text-slate-500 sm:hidden">
    Swipe horizontally to view all columns →
  </p>
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#082012] text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-4">Keyword</th>
                <th className="px-5 py-4">Search Volume</th>
                <th className="px-5 py-4">Target Position</th>
                <th className="px-5 py-4">Competitor</th>
                <th className="px-5 py-4">Competitor Position</th>
                <th className="px-5 py-4">Country</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-500/10">
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-emerald-500/5"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {row.keyword}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {row.searchVolume.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-emerald-300">
                      #{row.targetRanking}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {row.competitorDomain}
                    </td>

                    <td className="px-5 py-4 text-emerald-300">
                      #{row.competitorRanking}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {row.country}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No SERP overlap records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedRows.length > 10 && (
          <div className="flex justify-center border-t border-emerald-500/10 py-4">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  prev >= sortedRows.length
                    ? 10
                    : Math.min(prev + 10, sortedRows.length)
                )
              }
              className="rounded-lg border border-emerald-500/30 px-5 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10"
            >
              {visibleCount >= sortedRows.length
                ? "Show Less"
                : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
