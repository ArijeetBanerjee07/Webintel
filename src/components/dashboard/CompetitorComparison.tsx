"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  competitorSummary,
  competitorVisibilityData,
  competitorActivity,
} from "@/data/dashboardData";

export default function CompetitorComparison() {
  return (
    <section className="mt-8 space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Competitor Intelligence
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Compare your website performance with tracked competitors.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {competitorSummary.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 hover:border-emerald-500/35 transition"
          >
            <p className="text-xs font-medium text-slate-400">
              {item.title}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {item.value}
            </h3>
            <p className="mt-1.5 text-[11px] text-slate-400/80">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Visibility Chart + Recent Changes */}
      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
        {/* Estimated Visibility Comparison */}
        <div className="flex min-w-0 flex-col rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 hover:border-emerald-500/35 transition">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white">
              Estimated Visibility Comparison
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Estimated search visibility across tracked websites.
            </p>
          </div>

          {/* Bar Chart */}
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={competitorVisibilityData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 25,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(16, 185, 129, 0.12)"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#6EE7B7", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: "#D1D5DB", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#06180d",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `${value}%`,
                    "Visibility",
                  ]}
                />

                <Bar
                  dataKey="visibility"
                  fill="#10B981"
                  radius={[0, 6, 6, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Competitor Changes */}
        <div className="flex min-w-0 flex-col rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 hover:border-emerald-500/35 transition">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Recent Competitor Changes
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Monitor recently detected competitor activities.
            </p>
          </div>

          {/* Activity List */}
          <div className="flex-1 space-y-3.5">
            {competitorActivity.map((item, index) => (
              <div
                key={`${item.competitor}-${index}`}
                className="flex flex-col gap-2.5 border-b border-emerald-500/10 pb-3.5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Activity Details */}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">
                    {item.competitor}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.activity}
                  </p>
                </div>

                {/* Activity Type + Date */}
                <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${
                      item.severity === "high"
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : item.severity === "medium"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="whitespace-nowrap text-[11px] text-slate-400/80">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
