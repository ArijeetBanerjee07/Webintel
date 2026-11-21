
"use client";

import type { OutdatedContent as OutdatedContentType } from "@/data/competitors/competitorTypes";

interface OutdatedContentProps {
  data: OutdatedContentType[];
}

export default function OutdatedContent({ data }: OutdatedContentProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Outdated Content
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Find older content that may need updates to remain relevant and competitive.
        </p>
        <p className="mt-2 text-sm text-emerald-400">
          {data.length} outdated pages identified
        </p>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No outdated content found for this domain.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-emerald-500/20 text-slate-400">
                <th className="px-4 py-3 font-medium">Page URL</th>
                <th className="px-4 py-3 font-medium">Page Title</th>
                <th className="px-4 py-3 font-medium">Last Updated</th>
                <th className="px-4 py-3 font-medium">Content Issue</th>
                <th className="px-4 py-3 font-medium">Competitor Domain</th>
              </tr>
            </thead>

            <tbody>
              {data.map((page, index) => (
                <tr
                  key={`${page.pageUrl}-${index}`}
                  className="border-b border-emerald-500/10 text-slate-300 hover:bg-[#082012]"
                >
                  <td className="px-4 py-4 text-emerald-400">
                    {page.pageUrl}
                  </td>
                  <td className="px-4 py-4">{page.pageTitle}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {page.lastUpdated}
                  </td>
                  <td className="px-4 py-4">{page.contentIssue}</td>
                  <td className="px-4 py-4">{page.competitorDomain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
