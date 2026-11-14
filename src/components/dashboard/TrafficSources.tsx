"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { trafficSourceData } from "@/data/dashboardData";

export default function TrafficSources() {
  const totalTraffic = trafficSourceData.reduce(
    (total, source) => total + source.value,
    0
  );

  return (
    <section className="mt-0 space-y-4">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Traffic Source Intelligence
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Understand where website visitors originate.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-6 hover:border-emerald-500/35 transition">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="relative h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  stroke="#05170d"
                  strokeWidth={2}
                >
                  {trafficSourceData.map((source) => (
                    <Cell
                      key={source.name}
                      fill={source.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`${value}%`, "Traffic share"]}
                  contentStyle={{
                    backgroundColor: "#06180d",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#FFFFFF" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white tracking-tight">
                {totalTraffic}%
              </span>
              <span className="mt-1 text-xs text-emerald-400/80 font-medium">
                Traffic Sources
              </span>
            </div>
          </div>

          {/* Traffic Legend */}
          <div>
            <h3 className="mb-4 text-xs font-semibold text-white tracking-wide">
              Traffic Breakdown
            </h3>

            <div className="space-y-4">
              {trafficSourceData.map((source) => (
                <div key={source.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: source.color,
                        }}
                      />
                      <span className="text-xs text-slate-300">
                        {source.name}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-white">
                      {source.value}%
                    </span>
                  </div>

                  {/* Percentage Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#082914]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${source.value}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-emerald-500/15 pt-3.5">
          <p className="text-[11px] text-slate-400/70">
            Traffic distribution shown as illustrative sample data. Actual traffic intelligence depends on connected data providers.
          </p>
        </div>
      </div>
    </section>
  );
}
