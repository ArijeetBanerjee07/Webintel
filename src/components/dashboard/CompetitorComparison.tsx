
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
        <h2 className="text-xl font-bold text-white">
          Competitor Intelligence
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Compare your website performance with tracked competitors.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {competitorSummary.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-[#101A22] p-5"
          >
            <p className="text-sm text-gray-400">
              {item.title}
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {item.value}
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              {item.description}
            </p>
          </div>
        ))}

      </div>

      {/* Visibility Chart + Recent Changes */}
      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">

        {/* Estimated Visibility Comparison */}
        <div className="flex min-w-0 flex-col rounded-xl border border-white/10 bg-[#101A22] p-5">

          <div className="mb-6">
            <h3 className="font-semibold text-white">
              Estimated Visibility Comparison
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Estimated search visibility across tracked websites.
            </p>
          </div>

          {/* Bar Chart */}
          <div className="h-[300px] w-full">
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
                  stroke="#263642"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: "#D1D5DB", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#101A22",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  formatter={(value) => [
                    `${value}%`,
                    "Visibility",
                  ]}
                />

                <Bar
                  dataKey="visibility"
                  fill="#34D399"
                  radius={[0, 6, 6, 0]}
                  barSize={22}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Recent Competitor Changes */}
        <div className="flex min-w-0 flex-col rounded-xl border border-white/10 bg-[#101A22] p-5">

          <div className="mb-5">
            <h3 className="font-semibold text-white">
              Recent Competitor Changes
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Monitor recently detected competitor activities.
            </p>
          </div>

          {/* Activity List */}
          <div className="flex-1 space-y-4">

            {competitorActivity.map((item, index) => (
              <div
                key={`${item.competitor}-${index}`}
                className="flex flex-col gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >

                {/* Activity Details */}
                <div className="min-w-0">
                  <p className="font-medium text-white">
                    {item.competitor}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.activity}
                  </p>
                </div>

                {/* Activity Type + Date */}
                <div className="flex shrink-0 flex-wrap items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.severity === "high"
                        ? "bg-red-500/10 text-red-400"
                        : item.severity === "medium"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="whitespace-nowrap text-xs text-gray-500">
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
