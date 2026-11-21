
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
        item.stats.keywordRankingDistribution[range.key as keyof typeof item.stats.keywordRankingDistribution];
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
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Keyword Ranking Distribution
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Compare the number of keywords ranking in different Google search
          position ranges.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
        <div className="mb-5">
          <h3 className="font-semibold text-white">
            Organic Keyword Position Breakdown
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Number of ranking keywords across search position ranges
          </p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 20, left: 5, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e3a2a"
                vertical={false}
              />

              <XAxis
                dataKey="position"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#05170d",
                  border: "1px solid #10b981",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                formatter={(value) => [
                  Number(value).toLocaleString("en-IN"),
                  "Ranking Keywords",
                ]}
                labelStyle={{ color: "#fff" }}
              />

              <Legend
                verticalAlign="top"
                align="center"
                wrapperStyle={{
                  paddingBottom: "20px",
                  color: "#cbd5e1",
                  fontSize: "12px",
                }}
              />

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
    </section>
  );
}
