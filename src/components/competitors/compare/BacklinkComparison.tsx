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
    <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Backlink Comparison
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Compare dofollow and nofollow backlink distribution across domains.
        </p>
      </div>

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${domains.length}, minmax(240px, 1fr))`,
        }}
      >
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

          return (
            <div
              key={item.domain}
              className="rounded-xl border border-emerald-500/10 bg-[#020603] p-4"
            >
              <h3 className="mb-3 truncate text-center font-medium text-white">
                {item.domain}
              </h3>

              {/* Donut Chart */}
              <div className="relative h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
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
                        Number(value).toLocaleString(),
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: "#05170d",
                        border: "1px solid #10B981",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Centre value */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400">
                    Total Backlinks
                  </span>
                  <span className="text-xl font-bold text-white">
                    {backlink.totalBacklinks.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="mt-3 space-y-3">
                {chartData.map((entry, index) => {
                  const percentage =
                    backlink.totalBacklinks > 0
                      ? (entry.value / backlink.totalBacklinks) * 100
                      : 0;

                  return (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-slate-300">
                          {entry.name}
                        </span>
                      </div>

                      <span className="text-white">
                        {entry.value.toLocaleString()} (
                        {percentage.toFixed(1)}%)
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Referring Domains */}
              <div className="mt-5 border-t border-emerald-500/10 pt-4">
                <p className="text-sm text-slate-400">
                  Referring Domains
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {item.stats.referringDomains.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}