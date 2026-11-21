
"use client";

import type { BacklinkGap } from "@/data/competitors/competitorTypes";

interface BacklinkGapTableProps {
  data: BacklinkGap[];
}

export default function BacklinkGapTable({
  data,
}: BacklinkGapTableProps) {
  const missingBacklinks = data.filter(
    (item) => !item.targetHasBacklink
  );

  if (missingBacklinks.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-8 text-center">
        <p className="text-slate-400">
          No backlink gaps found for this domain.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-500/20 bg-[#05170d]">
         {/* Mobile scroll hint */}
      <p className="px-2 pt-3 text-xs text-slate-500 sm:hidden">
        Swipe horizontally to view all columns →
      </p>

      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="border-b border-emerald-500/20 bg-[#082012] text-slate-300">
          <tr>
            <th className="px-5 py-4">Referring Domain</th>
            <th className="px-5 py-4">Competitor Domains</th>
            <th className="px-5 py-4">Domain Authority</th>
            <th className="px-5 py-4">Backlinks</th>
            <th className="px-5 py-4">Link Type</th>
            <th className="px-5 py-4">First Seen</th>
            <th className="px-5 py-4">Target Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-emerald-500/10">
          {missingBacklinks.map((item) => (
            <tr
              key={item.id}
              className="transition-colors hover:bg-emerald-500/5"
            >
              <td className="px-5 py-4 font-medium text-white">
                {item.referringDomain}
              </td>

              <td className="px-5 py-4 text-slate-300">
                <div className="flex flex-wrap gap-1">
                  {item.competitorDomains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-5 py-4 text-slate-300">
                {item.domainAuthority}
              </td>

              <td className="px-5 py-4 text-slate-300">
                {item.backlinkCount}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.linkType === "Dofollow"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {item.linkType}
                </span>
              </td>

              <td className="px-5 py-4 text-slate-400">
                {item.firstSeen}
              </td>

              <td className="px-5 py-4">
                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                  Missing
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
