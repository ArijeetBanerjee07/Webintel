
"use client";

import { ExternalLink, Globe, TrendingUp } from "lucide-react";

import type {
  CompetitorOverviewStats,
  CompetitorRecord,
} from "@/data/competitors/competitorTypes";

interface ComparisonDomain {
  domain: string;
  stats: CompetitorOverviewStats | CompetitorRecord;
}

interface TopPerformingPagesProps {
  domains: ComparisonDomain[];
}

export default function TopPerformingPages({
  domains,
}: TopPerformingPagesProps) {
  return (
    <section className="min-w-0 space-y-5">
      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Top Performing Pages
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Compare the highest-performing organic pages across selected domains.
        </p>
      </div>

      {/* Domain Comparison Columns */}
      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-3">
        {/* Mobile Scroll Instruction */}
        <p className="mb-3 px-1 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all competitors →
        </p>

        <div
          className="grid min-w-max gap-4"
          style={{
            gridTemplateColumns: `repeat(${domains.length}, minmax(280px, 1fr))`,
          }}
        >
          {domains.map((item, index) => {
            const sortedPages = [...item.stats.topPages].sort(
              (a, b) => b.estimatedTraffic - a.estimatedTraffic
            );

            return (
              <div
                key={item.domain}
                className="min-w-0 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d] transition-colors hover:border-emerald-500/40"
              >
                {/* Domain Header */}
                <div className="border-b border-emerald-500/20 bg-[#082012] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Globe
                      size={17}
                      className="shrink-0 text-emerald-400"
                    />
                    <span className="text-xs text-slate-400">
                      {index === 0 ? "Target Domain" : `Competitor ${index}`}
                    </span>
                  </div>

                  <h3 className="truncate font-semibold text-white">
                    {item.domain}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {sortedPages.length} top-performing pages
                  </p>
                </div>

                {/* Page List */}
                <div className="space-y-4 p-3 sm:p-4">
                  {sortedPages.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No page data available.
                    </p>
                  ) : (
                    sortedPages.map((page, pageIndex) => (
                      <div
                        key={page.url}
                        className="space-y-3 rounded-xl border border-emerald-500/10 bg-[#082012] p-3"
                      >
                        {/* Page URL */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="mb-1 text-xs text-slate-500">
                              Page {pageIndex + 1}
                            </p>

                            <a
                              href={page.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={page.url}
                              className="break-all text-sm text-emerald-400 transition-colors hover:text-emerald-300"
                            >
                              {page.url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                            </a>
                          </div>

                          <ExternalLink
                            size={15}
                            className="mt-1 shrink-0 text-slate-500"
                          />
                        </div>

                        {/* Page Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              Estimated Traffic
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {page.estimatedTraffic.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              Ranking Keywords
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {page.rankingKeywords.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="col-span-2 flex items-center justify-between border-t border-emerald-500/10 pt-2">
                            <span className="text-xs text-slate-500">
                              Average Position
                            </span>

                            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                              <TrendingUp size={14} />
                              {page.averagePosition.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
