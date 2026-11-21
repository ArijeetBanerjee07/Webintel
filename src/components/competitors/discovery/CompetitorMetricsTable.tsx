
"use client";

import type { CompetitorRecord } from "@/data/competitors/competitorTypes";

interface CompetitorMetricsTableProps {
  competitors: CompetitorRecord[];
}

export default function CompetitorMetricsTable({
  competitors,
}: CompetitorMetricsTableProps) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Competitor Metrics
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Compare the organic search metrics of discovered competitors.
        </p>
      </div>

      {competitors.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No competitor data available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <p className="mb-2 px-4 pt-3 text-xs text-slate-500 sm:hidden">
    Swipe horizontally to view all columns →
  </p>
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-emerald-500/20 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Competition Level</th>
                <th className="px-4 py-3">Common Keywords</th>
                <th className="px-4 py-3">SE Keywords</th>
                <th className="px-4 py-3">Visibility</th>
                <th className="px-4 py-3">Estimated Traffic</th>
              </tr>
            </thead>

            <tbody>
              {competitors.map((competitor) => (
                <tr
                  key={competitor.id}
                  className="border-b border-emerald-500/10 transition-colors hover:bg-[#082012]"
                >
                  <td className="px-4 py-4 text-sm font-medium text-white">
                    {competitor.domain}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#0b2a18]">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${Math.min(
                              Math.max(competitor.competitionLevel, 0),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-300">
                        {competitor.competitionLevel}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-300">
                    {competitor.commonKeywords.toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-300">
                    {competitor.organicKeywords.toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-300">
                    {competitor.visibility}%
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-emerald-400">
                    {competitor.estimatedTraffic.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
