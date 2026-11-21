
"use client";

import type { MissingTopicCluster } from "@/data/competitors/competitorTypes";

interface MissingTopicClustersProps {
  data: MissingTopicCluster[];
}

export default function MissingTopicClusters({
  data,
}: MissingTopicClustersProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-emerald-500/20">

      {/* Table Heading */}
      <div className="border-b border-emerald-500/20 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">
          Missing Topic Clusters
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Topics covered by competitors but missing or insufficiently
          covered on your website.
        </p>
      </div>

      {/* Record Count */}
      <div className="px-5 py-3 text-sm text-slate-400">
        Showing{" "}
        <span className="font-semibold text-emerald-400">
          {data.length}
        </span>{" "}
        topic clusters
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Mobile scroll hint */}
      <p className="px-2 pt-3 text-xs text-slate-500 sm:hidden">
        Swipe horizontally to view all columns →
      </p>


        <table className="w-full min-w-[900px] text-left text-sm">

          <thead className="bg-[#082012] text-xs uppercase text-slate-400">
            <tr>
              <th className="px-5 py-4">Topic Cluster</th>
              <th className="px-5 py-4">Related Keywords</th>
              <th className="px-5 py-4">Competitor Domain</th>
              <th className="px-5 py-4">Competitor Coverage</th>
              <th className="px-5 py-4">Target Coverage</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-500/10">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={`${item.topic}-${index}`}
                  className="transition-colors hover:bg-[#082012]"
                >
                  <td className="px-5 py-4 font-medium text-white">
                    {item.topic}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex max-w-xs flex-wrap gap-2">
                      {item.relatedKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {item.competitorDomain}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {item.competitorCoverage}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        item.targetCoverage === "Missing"
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {item.targetCoverage}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-slate-400"
                >
                  No missing topic clusters found for this domain.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
