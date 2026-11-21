
"use client";

import type { CompetitorPage } from "@/data/competitors/competitorTypes";

interface CompetitorPagesTableProps {
  pages: CompetitorPage[];
}

export default function CompetitorPagesTable({
  pages,
}: CompetitorPagesTableProps) {
  if (pages.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-8 text-center">
        <p className="text-slate-400">
          No competitor page data available for this domain.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d]">
      <div className="overflow-x-auto">
           {/* Mobile scroll hint */}
      <p className="px-2 pt-3 text-xs text-slate-500 sm:hidden">
        Swipe horizontally to view all columns →
      </p>

        <table className="w-full min-w-[1100px] table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[19%]" />
            <col className="w-[8%]" />
          </colgroup>

          <thead className="border-b border-emerald-500/20 bg-[#082012]">
            <tr className="text-slate-400">
              <th className="px-5 py-4 font-medium">
                Competitor Page
              </th>
              <th className="whitespace-nowrap px-5 py-4 font-medium">
                Page Type
              </th>
              <th className="px-5 py-4 text-right font-medium">
                Organic Traffic
              </th>
              <th className="px-5 py-4 text-right font-medium">
                Organic Keywords
              </th>
              <th className="px-5 py-4 font-medium">
                Top Keyword
              </th>
              <th className="px-5 py-4 text-center font-medium">
                Position
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-500/10">
            {pages.map((page) => {
              const pagePath = page.pageUrl.replace(
                /^https?:\/\/[^/]+/,
                ""
              );

              return (
                <tr
                  key={page.id}
                  className="transition-colors hover:bg-emerald-500/5"
                >
                  {/* Competitor Page */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">
                      {page.pageTitle}
                    </div>

                    <div className="mt-1 break-all text-xs text-slate-400">
                      {page.competitorDomain}
                    </div>

                    <div className="mt-1 break-all text-xs text-slate-500">
                      {pagePath || "/"}
                    </div>
                  </td>

                  {/* Page Type */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                      {page.pageType}
                    </span>
                  </td>

                  {/* Organic Traffic */}
                  <td className="px-5 py-4 text-right font-medium text-white">
                    {page.organicTraffic.toLocaleString()}
                  </td>

                  {/* Organic Keywords */}
                  <td className="px-5 py-4 text-right text-slate-300">
                    {page.organicKeywords.toLocaleString()}
                  </td>

                  {/* Top Keyword */}
                  <td className="break-words px-5 py-4 text-slate-300">
                    {page.topKeyword}
                  </td>

                  {/* Position */}
                  <td className="px-5 py-4 text-center">
                    <span className="font-semibold text-emerald-400">
                      #{page.keywordPosition}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
