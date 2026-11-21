
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
    <section className="space-y-5">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Top Performing Pages
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Compare the highest-performing organic pages across selected domains.
        </p>
      </div>

      {/* Domain Comparison Columns */}
      <div className="overflow-x-auto pb-3">
        <div
          className="grid gap-4 min-w-max"
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
                className="rounded-2xl border border-emerald-500/20 bg-[#05170d] overflow-hidden hover:border-emerald-500/40 transition-colors"
              >
                {/* Domain Header */}
                <div className="p-4 border-b border-emerald-500/20 bg-[#082012]">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={17} className="text-emerald-400" />
                    <span className="text-xs text-slate-400">
                      {index === 0 ? "Target Domain" : `Competitor ${index}`}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold truncate">
                    {item.domain}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {sortedPages.length} top-performing pages
                  </p>
                </div>

                {/* Page List */}
                <div className="p-4 space-y-4">
                  {sortedPages.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      No page data available.
                    </p>
                  ) : (
                    sortedPages.map((page, pageIndex) => (
                      <div
                        key={page.url}
                        className="rounded-xl border border-emerald-500/10 bg-[#082012] p-3 space-y-3"
                      >
                        {/* Page URL */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 mb-1">
                              Page {pageIndex + 1}
                            </p>

                            <a
                              href={page.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={page.url}
                              className="text-sm text-emerald-400 hover:text-emerald-300 break-all transition-colors"
                            >
                              {page.url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                            </a>
                          </div>

                          <ExternalLink
                            size={15}
                            className="text-slate-500 shrink-0 mt-1"
                          />
                        </div>

                        {/* Page Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-500">
                              Estimated Traffic
                            </p>
                            <p className="text-sm font-semibold text-white mt-1">
                              {page.estimatedTraffic.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Ranking Keywords
                            </p>
                            <p className="text-sm font-semibold text-white mt-1">
                              {page.rankingKeywords.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="col-span-2 pt-2 border-t border-emerald-500/10 flex items-center justify-between">
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
