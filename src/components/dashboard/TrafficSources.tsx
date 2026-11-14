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
    <section className="mt-0">
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Traffic Source Intelligence
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Understand where website visitors originate.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-white/10 bg-[#101A22] p-6 shadow-lg shadow-black/20">

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

          {/* Pie Chart */}
          <div className="relative h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={115}
                  paddingAngle={3}
                  stroke="none"
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
                    backgroundColor: "#101A22",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                  }}
                  itemStyle={{ color: "#FFFFFF" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {totalTraffic}%
              </span>

              <span className="mt-1 text-xs text-gray-400">
                Traffic Sources
              </span>
            </div>
          </div>

          {/* Traffic Legend */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Traffic Breakdown
            </h3>

            <div className="space-y-5">
              {trafficSourceData.map((source) => (
                <div key={source.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: source.color,
                        }}
                      />

                      <span className="text-sm text-gray-300">
                        {source.name}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-white">
                      {source.value}%
                    </span>
                  </div>

                  {/* Percentage Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
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
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-xs text-gray-500">
            Traffic distribution shown as illustrative sample data.
            Actual traffic intelligence depends on connected data providers.
          </p>
        </div>

      </div>
    </section>
  );
}
