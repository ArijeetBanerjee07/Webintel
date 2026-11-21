
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type {
  CompetitorOverviewStats,
  CompetitorRecord,
} from "@/data/competitors/competitorTypes";

interface ComparisonDomain {
  domain: string;
  stats: CompetitorOverviewStats | CompetitorRecord;
}

interface BacklinkComparisonProps {
  domains: ComparisonDomain[];
}

const COLORS = ["#10B981", "#64748B"];

export default function BacklinkComparison({
  domains,
}: BacklinkComparisonProps) {
  return (
    <section className="mt-6 min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:mt-8 sm:p-5">
      {/* Section Heading */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Backlink Comparison
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
          Compare dofollow and nofollow backlink distribution across domains.
        </p>
      </div>

      {/* Horizontal Competitor Cards */}
      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-3">
        <p className="mb-3 px-1 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all competitors →
        </p>

        <div className="flex min-w-max items-stretch gap-4">
          {domains.map((item) => {
            const backlink = item.stats.backlinkProfile;

            const chartData = [
              {
                name: "Dofollow",
                value: backlink.dofollowBacklinks,
              },
              {
                name: "Nofollow",
                value: backlink.nofollowBacklinks,
              },
            ];

            const hasBacklinks = backlink.totalBacklinks > 0;

            return (
              <div
                key={item.domain}
                className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-emerald-500/15 bg-[#020603] p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-[#031008] sm:w-[280px] sm:p-5"
              >
                {/* Domain Header */}
                <div className="mb-4 flex min-w-0 items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <span className="text-sm font-semibold text-emerald-400">
                      {item.domain.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">
                      Backlink Profile
                    </p>
                    <h3
                      title={item.domain}
                      className="truncate text-sm font-semibold text-white sm:text-base"
                    >
                      {item.domain}
                    </h3>
                  </div>
                </div>

                {/* Total Backlinks Summary */}
                <div className="rounded-xl border border-emerald-500/10 bg-[#05170d] px-3 py-3">
                  <p className="text-xs text-slate-400">
                    Total Backlinks
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-white">
                    {backlink.totalBacklinks.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Donut Chart */}
                <div className="relative mx-auto mt-3 h-48 w-full max-w-[260px]">
                  {hasBacklinks ? (
                    <>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="58%"
                            outerRadius="82%"
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={COLORS[index]}
                              />
                            ))}
                          </Pie>

                          <Tooltip
                            formatter={(value, name) => [
                              Number(value).toLocaleString("en-IN"),
                              name,
                            ]}
                            contentStyle={{
                              backgroundColor: "#05170d",
                              border: "1px solid #10B981",
                              borderRadius: "10px",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                            itemStyle={{ color: "#fff" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Centre Label */}
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500">
                          Distribution
                        </span>
                        <span className="mt-1 text-sm font-semibold text-emerald-400">
                          {backlink.totalBacklinks.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      No backlink data available.
                    </div>
                  )}
                </div>

                {/* Backlink Legend */}
                <div className="mt-2 space-y-3">
                  {chartData.map((entry, index) => {
                    const percentage =
                      backlink.totalBacklinks > 0
                        ? (entry.value / backlink.totalBacklinks) * 100
                        : 0;

                    return (
                      <div
                        key={entry.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-xs text-slate-400 sm:text-sm">
                            {entry.name}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-xs font-medium text-white sm:text-sm">
                            {entry.value.toLocaleString("en-IN")}
                          </span>
                          <span className="min-w-[48px] text-right text-xs text-slate-500">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Referring Domains */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-emerald-500/15 pt-4">
                  <div>
                    <p className="text-xs text-slate-400 sm:text-sm">
                      Referring Domains
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-white">
                      {item.stats.referringDomains.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <span className="text-lg text-emerald-400">↗</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
