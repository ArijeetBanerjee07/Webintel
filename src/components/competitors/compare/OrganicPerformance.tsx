
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
    <section className="space-y-5">

      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Organic Performance
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Compare organic keywords and estimated organic traffic across domains.
        </p>
      </div>

      {/* Combined Chart */}
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">

        <div className="mb-5">
          <h3 className="text-white font-semibold">
            Organic Keywords vs Traffic
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Monthly estimated traffic and ranking keyword comparison
          </p>
        </div>

        <div className="h-[380px] w-full">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{
                top: 15,
                right: 20,
                left: 10,
                bottom: 45,
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
                angle={-20}
                textAnchor="end"
                interval={0}
                height={65}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />

              {/* Left Axis - Organic Keywords */}
              <YAxis
                yAxisId="keywords"
                orientation="left"
                tick={{ fill: "#34d399", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Organic Keywords",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#34d399",
                  fontSize: 11,
                }}
              />

              {/* Right Axis - Estimated Traffic */}
              <YAxis
                yAxisId="traffic"
                orientation="right"
                tick={{ fill: "#6ee7b7", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Estimated Traffic",
                  angle: 90,
                  position: "insideRight",
                  fill: "#6ee7b7",
                  fontSize: 11,
                }}
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#05170d",
                  border: "1px solid #10b981",
                  borderRadius: "10px",
                  color: "#fff",
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
                  paddingBottom: "20px",
                  color: "#cbd5e1",
                  fontSize: "12px",
                }}
              />

              {/* Dark Emerald - Organic Keywords */}
              <Bar
                yAxisId="keywords"
                dataKey="organicKeywords"
                name="Organic Keywords"
                fill="#047857"
                radius={[5, 5, 0, 0]}
                maxBarSize={35}
              />

              {/* Light Emerald - Estimated Traffic */}
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

    </section>
  );
}
