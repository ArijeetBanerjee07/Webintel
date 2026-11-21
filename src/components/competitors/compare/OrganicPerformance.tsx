
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

interface OrganicPerformanceProps {
  domains: ComparisonDomain[];
}

export default function OrganicPerformance({
  domains,
}: OrganicPerformanceProps) {
  // Prepare both metrics in one dataset
  const performanceData = domains.map((item) => ({
    domain: item.domain,
    organicKeywords: item.stats.organicKeywords,
    estimatedTraffic: item.stats.estimatedTraffic,
  }));

  return (
    <section className="min-w-0 space-y-5">

      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Organic Performance
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compare organic keywords and estimated organic traffic across domains.
        </p>
      </div>

      {/* Combined Chart */}
      <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">

        <div className="mb-4 sm:mb-5">
          <h3 className="font-semibold text-white">
            Organic Keywords vs Traffic
          </h3>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Monthly estimated traffic and ranking keyword comparison
          </p>
        </div>

        {/* Chart Wrapper */}
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">

          <div
            className="h-[320px] sm:h-[380px]"
            style={{
              minWidth:
                performanceData.length > 2
                  ? `${performanceData.length * 150}px`
                  : "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 15,
                  right: 15,
                  left: 5,
                  bottom: 35,
                }}
                barGap={6}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e3a2a"
                  vertical={false}
                />

                {/* Domain Names */}
                <XAxis
  dataKey="domain"
  angle={typeof window !== "undefined" && window.innerWidth < 640 ? -90 : -20}
  textAnchor="end"
  interval={0}
  height={typeof window !== "undefined" && window.innerWidth < 640 ? 100 : 60}
  tick={{
    fill: "#94a3b8",
    fontSize: 10,
  }}
  axisLine={{ stroke: "#334155" }}
  tickLine={false}
/>
                {/* Left Axis - Organic Keywords */}
                <YAxis
                  yAxisId="keywords"
                  orientation="left"
                  width={45}
                  tick={{
                    fill: "#34d399",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Keywords",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#34d399",
                    fontSize: 10,
                  }}
                />

                {/* Right Axis - Estimated Traffic */}
                <YAxis
                  yAxisId="traffic"
                  orientation="right"
                  width={45}
                  tick={{
                    fill: "#6ee7b7",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Traffic",
                    angle: 90,
                    position: "insideRight",
                    fill: "#6ee7b7",
                    fontSize: 10,
                  }}
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
                  formatter={(value, name) => [
                    Number(value).toLocaleString("en-IN"),
                    name,
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

                {/* Organic Keywords */}
                <Bar
                  yAxisId="keywords"
                  dataKey="organicKeywords"
                  name="Organic Keywords"
                  fill="#047857"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={35}
                />

                {/* Estimated Traffic */}
                <Bar
                  yAxisId="traffic"
                  dataKey="estimatedTraffic"
                  name="Estimated Traffic"
                  fill="#6ee7b7"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={35}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        {performanceData.length > 2 && (
          <p className="mt-2 text-xs text-slate-500 sm:hidden">
            Swipe horizontally to view all domains →
          </p>
        )}
      </div>
    </section>
  );
}
