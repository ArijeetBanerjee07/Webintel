
"use client";

import { useMemo } from "react";
import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CategoryDiscovery() {
  const { selectedDomain } = useCompetitor();

  // Get data for the currently selected target domain
  const selectedData = competitorMockData[selectedDomain.domain];

  const competitors = useMemo(
    () => selectedData?.competitors ?? [],
    [selectedData]
  );

  // Recalculate category statistics when the selected domain changes
  const { categoryData, uniqueCategories, mostCommonCategory } =
    useMemo(() => {
      const categoryCounts = competitors.reduce(
        (acc, competitor) => {
          acc[competitor.category] =
            (acc[competitor.category] || 0) + 1;

          return acc;
        },
        {} as Record<string, number>
      );

      const distribution = Object.entries(categoryCounts).map(
        ([category, count]) => ({
          category,
          competitors: count,
        })
      );

      const leadingCategory = distribution.reduce(
        (max, current) =>
          current.competitors > max.competitors ? current : max,
        { category: "N/A", competitors: 0 }
      );

      return {
        categoryData: distribution,
        uniqueCategories: distribution.length,
        mostCommonCategory: leadingCategory,
      };
    }, [competitors]);

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">

      {/* Selected Domain Context */}
      <div className="min-w-0 rounded-xl border border-emerald-500/20 bg-[#05170d] px-4 py-3 sm:px-5">
        <p className="text-sm text-slate-400">
          Category analysis for
        </p>

        <p className="mt-1 break-all font-semibold text-emerald-300">
          {selectedDomain.domain}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">

        <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">
          <p className="text-sm text-slate-400">
            Total Competitors
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {competitors.length}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Competitors identified across categories
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">
          <p className="text-sm text-slate-400">
            Business Categories
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {uniqueCategories}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Unique competitor categories
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:col-span-2 sm:p-5 xl:col-span-1">
          <p className="text-sm text-slate-400">
            Leading Category
          </p>

          <h3 className="mt-2 break-words text-lg font-semibold text-emerald-300">
            {mostCommonCategory.category}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {mostCommonCategory.competitors} competitors
          </p>
        </div>
      </div>

      {/* Category Distribution Chart */}
      <div className="min-w-0 w-full rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">

        <div className="mb-5">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Competitor Category Distribution
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Number of competitors identified in each business category.
          </p>
        </div>

        {categoryData.length > 0 ? (
          <div className="h-[300px] w-full min-w-0 sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#16452b"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  stroke="#94a3b8"
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                />

                <YAxis
                  type="category"
                  dataKey="category"
                  width={window.innerWidth < 640 ? 105 : 150}
                  stroke="#94a3b8"
                  tick={{ fontSize: 10 }}
                  interval={0}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#082012",
                    border: "1px solid #10b981",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="competitors"
                  name="Competitors"
                  fill="#10b981"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="py-10 text-center text-slate-400">
            No category data available.
          </p>
        )}
      </div>

      {/* Competitor Category Table */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d]">

        <div className="border-b border-emerald-500/20 p-4 sm:p-5">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Competitors by Business Category
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Explore competitors and their assigned business categories.
          </p>
        </div>

        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
          <p className="mb-2 px-4 pt-3 text-xs text-slate-500 sm:hidden">
            Swipe horizontally to view all columns →
          </p>

          <table className="w-full min-w-[800px] text-left text-sm">

            <thead className="bg-[#082012] text-xs uppercase text-slate-400">
              <tr>
                <th className="whitespace-nowrap px-5 py-4">
                  Domain
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Category
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Competition Level
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Organic Keywords
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Estimated Traffic
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-500/10">
              {competitors.length > 0 ? (
                competitors.map((competitor) => (
                  <tr
                    key={`${selectedDomain.domain}-${competitor.id}`}
                    className="transition-colors hover:bg-emerald-500/5"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-white">
                      {competitor.domain}
                    </td>

                    <td className="px-5 py-4 text-emerald-300">
                      {competitor.category}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {competitor.competitionLevel}%
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {competitor.organicKeywords.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {competitor.estimatedTraffic.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No competitors found for this domain.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
