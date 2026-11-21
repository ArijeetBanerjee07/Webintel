
"use client";

import { ExternalLink } from "lucide-react";
import type { CompetitorRecord } from "@/data/competitors/competitorTypes";

interface CompetitorSummaryTableProps {
  data: CompetitorRecord[];
}

export default function CompetitorSummaryTable({
  data,
}: CompetitorSummaryTableProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Competitor Comparison
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Compare your competitors based on their estimated organic search
          performance.
        </p>
      </div>

     <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
        {/* Mobile scroll instruction */}
  <p className="mb-2 text-xs text-slate-500 sm:hidden">
    Swipe horizontally to view all columns →
  </p>

  <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-emerald-500/20 text-xs uppercase tracking-wider text-slate-400">
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Competition Level</th>
              <th className="px-4 py-3">Common Keywords</th>
              <th className="px-4 py-3">Organic Keywords</th>
              <th className="px-4 py-3">Estimated Traffic</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((competitor) => (
              <tr
                key={competitor.id}
                className="border-b border-emerald-500/10 transition hover:bg-[#082012]"
              >
                <td className="px-4 py-4 text-sm font-medium text-white">
                  {competitor.domain}
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${competitor.competitionLevel}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-slate-300">
                      {competitor.competitionLevel}%
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-slate-300">
                  {competitor.commonKeywords.toLocaleString()}
                </td>

                <td className="px-4 py-4 text-sm text-slate-300">
                  {competitor.organicKeywords.toLocaleString()}
                </td>

                <td className="px-4 py-4 text-sm text-slate-300">
                  {competitor.estimatedTraffic.toLocaleString()}
                </td>

                <td className="px-4 py-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    View
                    <ExternalLink size={13} />
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-slate-400"
                >
                  No competitors found for this domain.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Competition levels and organic search metrics are illustrative mock
        data and will require an SEO data provider.
      </p>
    </div>
  );
}
