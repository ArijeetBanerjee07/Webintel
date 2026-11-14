"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  websiteHealthScores,
  healthTrendData,
} from "@/data/dashboardData";

export default function WebsiteHealth() {
  return (
    <section className="min-w-0 space-y-6">

      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-white">
          Website Health
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Monitor your website performance and health metrics.
        </p>
      </div>

      {/* Circular Score Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {websiteHealthScores.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-xl border border-white/10 bg-[#101A22] p-5"
          >

            <h3 className="mb-5 text-sm font-medium text-gray-300">
              {item.title}
            </h3>

            {/* Circular Progress */}
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  ${item.color} ${item.score * 3.6}deg,
                  #263642 ${item.score * 3.6}deg
                )`,
              }}
            >

              {/* Inner Circle */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#101A22]">

                <span
                  className="text-2xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.score}%
                </span>

              </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              {item.description}
            </p>

          </div>
        ))}

      </div>

      {/* Health Trend Chart */}
      <div className="rounded-xl border border-white/10 bg-[#101A22] p-5">

        <div className="mb-6">
          <h3 className="font-semibold text-white">
            Website Health Trend
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Overall website health over the last six months.
          </p>
        </div>

        <div className="h-[250px] w-full">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthTrendData}
              margin={{
                top: 10,
                right: 15,
                left: -20,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#263642"
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
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
                formatter={(value) => [`${value}%`, "Health Score"]}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#34D399"
                strokeWidth={3}
                dot={{
                  fill: "#34D399",
                  stroke: "#101A22",
                  strokeWidth: 2,
                  r: 5,
                }}
                activeDot={{ r: 7 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>

    </section>
  );
}
