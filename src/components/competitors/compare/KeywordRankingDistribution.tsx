
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

interface KeywordRankingDistributionProps {
  domains: ComparisonDomain[];
}

const rankingRanges = [
  { key: "top3", label: "Positions 1–3" },
  { key: "positions4to10", label: "Positions 4–10" },
  { key: "positions11to20", label: "Positions 11–20" },
  { key: "positions21to50", label: "Positions 21–50" },
  { key: "positions51to100", label: "Positions 51–100" },
];

export default function KeywordRankingDistribution({
  domains,
}: KeywordRankingDistributionProps) {
  const chartData = rankingRanges.map((range) => {
    const row: Record<string, string | number> = {
      position: range.label,
    };

    domains.forEach((item) => {
      row[item.domain] =
        item.stats.keywordRankingDistribution[
          range.key as keyof typeof item.stats.keywordRankingDistribution
        ];
    });

    return row;
  });

  const colors = [
    "#10b981",
    "#34d399",
    "#6ee7b7",
    "#059669",
  ];

  return (
    <section className="min-w-0 space-y-5">

      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Keyword Ranking Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compare the number of keywords ranking in different Google search
          position ranges.
        </p>
      </div>

      {/* Chart Card */}
      <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">

        <div className="mb-4 sm:mb-5">
          <h3 className="font-semibold text-white">
            Organic Keyword Position Breakdown
          </h3>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Number of ranking keywords across search position ranges
          </p>
        </div>

        {/* Responsive Chart Wrapper */}
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">

          <div
            className="h-[320px] sm:h-[380px]"
            style={{
              minWidth:
                domains.length > 2
                  ? `${domains.length * 150}px`
                  : "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e3a2a"
                  vertical={false}
                />

                {/* Ranking Position Labels */}
                <XAxis
                  dataKey="position"
                  interval={0}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                  axisLine={{ stroke: "#334155" }}
                  tickLine={false}
                />

                {/* Number of Keywords */}
                <YAxis
                  width={40}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#05170d",
                    border: "1px solid #10b981",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    Number(value).toLocaleString("en-IN"),
                    "Ranking Keywords",
                  ]}
                  labelStyle={{ color: "#fff" }}
                />

                {/* Legend */}
                <Legend
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{
                    paddingBottom: "15px",
                    color: "#cbd5e1",
                    fontSize: "11px",
                  }}
                />

                {/* Domain Comparison Bars */}
                {domains.map((item, index) => (
                  <Bar
                    key={item.domain}
                    dataKey={item.domain}
                    name={item.domain}
                    fill={colors[index % colors.length]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={35}
                  />
                ))}

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        {domains.length > 2 && (
          <p className="mt-2 text-xs text-slate-500 sm:hidden">
            Swipe horizontally to view all domains →
          </p>
        )}
      </div>
    </section>
  );
}
