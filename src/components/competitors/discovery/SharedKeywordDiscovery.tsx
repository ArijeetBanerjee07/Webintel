
"use client";

import { useState } from "react";
import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";

export default function SharedKeywordDiscovery() {
  const [visibleCount, setVisibleCount] = useState(10);

  const { selectedDomain } = useCompetitor();

  const selectedData = competitorMockData[selectedDomain.domain];

  // Retrieve all competitors for the selected target domain.
  const competitors = selectedData.competitors;

  // Collect shared keywords from all competitors.
  const keywordRows = competitors.flatMap((competitor) =>
    competitor.sharedKeywords.map((keyword, index) => ({
      ...keyword,
      competitorDomain: competitor.domain,
      id: `${competitor.id}-${index}`,
    }))
  );

  // Sort keywords by search volume (highest first).
  const sortedKeywordRows = [...keywordRows].sort(
    (a, b) => b.searchVolume - a.searchVolume
  );

  // Display only the requested number of records.
  const visibleKeywordRows = sortedKeywordRows.slice(0, visibleCount);

  // Calculate average search volume using all keyword records.
  const averageSearchVolume =
    keywordRows.length > 0
      ? Math.round(
          keywordRows.reduce(
            (total, item) => total + item.searchVolume,
            0
          ) / keywordRows.length
        )
      : 0;

  return (
    <div className="space-y-4">
      {/* Section heading */}
      <div>
        <h3 className="text-lg font-semibold text-white">
          Shared Keyword Results
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Keywords where {selectedDomain.domain} and other competitors
          have search rankings.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/20 bg-[#05170d] p-4">
          <p className="text-sm text-slate-400">Shared Keywords</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {keywordRows.length}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-[#05170d] p-4">
          <p className="text-sm text-slate-400">Competitors Found</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {competitors.length}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-[#05170d] p-4">
          <p className="text-sm text-slate-400">
            Average Search Volume
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {averageSearchVolume.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Keyword table */}
      <div className="overflow-x-auto rounded-xl border border-emerald-500/20">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-[#082012] text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Keyword</th>
              <th className="px-4 py-3 font-medium">Search Volume</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Intent</th>
              <th className="px-4 py-3 font-medium">Target Rank</th>
              <th className="px-4 py-3 font-medium">Competitor</th>
              <th className="px-4 py-3 font-medium">Competitor Rank</th>
              <th className="px-4 py-3 font-medium">Country</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-500/10">
            {visibleKeywordRows.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#082012]"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {item.keyword}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {item.searchVolume.toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    {item.keywordDifficulty}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {item.searchIntent}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {item.targetRanking !== null
                    ? `#${item.targetRanking}`
                    : "Not ranking"}
                </td>

                <td className="px-4 py-3 text-emerald-300">
                  {item.competitorDomain}
                </td>

                <td className="px-4 py-3 font-medium text-white">
                  #{item.competitorRanking}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {item.country}
                </td>
              </tr>
            ))}

            {visibleKeywordRows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  No shared keywords found for this domain.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Show More / Show Less */}
        {sortedKeywordRows.length > 10 && (
          <div className="flex justify-center py-3">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  prev >= sortedKeywordRows.length
                    ? 10
                    : Math.min(prev + 10, sortedKeywordRows.length)
                )
              }
              className="rounded-lg border border-emerald-500/30 px-5 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10"
            >
              {visibleCount >= sortedKeywordRows.length
                ? "Show Less"
                : "Show More"}
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Illustrative mock data for UI development. Rankings and search
        volumes are not live SEO measurements.
      </p>
    </div>
  );
}
