
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
  const { categoryData, uniqueCategories, mostCommonCategory } = useMemo(() => {
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
    <div className="space-y-6">
      {/* Selected Domain Context */}
      <div className="rounded-xl border border-emerald-500/20 bg-[#05170d] px-5 py-3">
        <p className="text-sm text-slate-400">
          Category analysis for
        </p>
        <p className="mt-1 font-semibold text-emerald-300">
          {selectedDomain.domain}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Total Competitors</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {competitors.length}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Competitors identified across categories
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Business Categories</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {uniqueCategories}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Unique competitor categories
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
          <p className="text-sm text-slate-400">Leading Category</p>
          <h3 className="mt-2 text-lg font-semibold text-emerald-300">
            {mostCommonCategory.category}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {mostCommonCategory.competitors} competitors
          </p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">
            Competitor Category Distribution
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Number of competitors identified in each business category.
          </p>
        </div>

        {categoryData.length > 0 ? (
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={160}
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#082012",
                    border: "1px solid #10b981",
                    borderRadius: "10px",
                    color: "#fff",
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
      <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d]">
        <div className="border-b border-emerald-500/20 p-5">
          <h3 className="text-lg font-semibold text-white">
            Competitors by Business Category
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Explore competitors and their assigned business categories.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-[#082012] text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-4">Domain</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Competition Level</th>
                <th className="px-5 py-4">Organic Keywords</th>
                <th className="px-5 py-4">Estimated Traffic</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-500/10">
              {competitors.length > 0 ? (
                competitors.map((competitor) => (
                  <tr
                    key={`${selectedDomain.domain}-${competitor.id}`}
                    className="transition-colors hover:bg-emerald-500/5"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {competitor.domain}
                    </td>
                    <td className="px-5 py-4 text-emerald-300">
                      {competitor.category}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {competitor.competitionLevel}%
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {competitor.organicKeywords.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
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
