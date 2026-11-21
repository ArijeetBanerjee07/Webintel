
"use client";

import type { WeakLandingPage } from "@/data/competitors/competitorTypes";

interface WeakLandingPagesProps {
  data: WeakLandingPage[];
}

export default function WeakLandingPages({ data }: WeakLandingPagesProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Weak Landing Pages
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Identify target pages that need improvement compared with competitor pages.
        </p>
        <p className="mt-2 text-sm text-emerald-400">
          {data.length} weak landing pages identified
        </p>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No weak landing pages found for this domain.
        </p>
      ) : (
        <div className="overflow-x-auto">
             {/* Mobile scroll hint */}
      <p className="px-2 pt-3 text-xs text-slate-500 sm:hidden">
        Swipe horizontally to view all columns →
      </p>

          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-emerald-500/20 text-slate-400">
                <th className="px-4 py-3 font-medium">Target Page URL</th>
                <th className="px-4 py-3 font-medium">Page Topic</th>
                <th className="px-4 py-3 font-medium">Identified Weakness</th>
                <th className="px-4 py-3 font-medium">Competitor Domain</th>
                <th className="px-4 py-3 font-medium">Suggested Improvement</th>
              </tr>
            </thead>

            <tbody>
              {data.map((page, index) => (
                <tr
                  key={`${page.pageUrl}-${index}`}
                  className="border-b border-emerald-500/10 text-slate-300 hover:bg-[#082012]"
                >
                  <td className="px-4 py-4 text-emerald-400">
                    {page.pageUrl}
                  </td>
                  <td className="px-4 py-4">{page.pageTopic}</td>
                  <td className="px-4 py-4">{page.weakness}</td>
                  <td className="px-4 py-4">{page.competitorDomain}</td>
                  <td className="px-4 py-4">{page.suggestedImprovement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
