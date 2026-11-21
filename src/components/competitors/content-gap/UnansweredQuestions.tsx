
"use client";

import type { UnansweredQuestion } from "@/data/competitors/competitorTypes";

interface UnansweredQuestionsProps {
  data: UnansweredQuestion[];
}

export default function UnansweredQuestions({
  data,
}: UnansweredQuestionsProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Unanswered User Questions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Discover user questions that competitors answer but your website
          does not adequately cover.
        </p>

        <p className="mt-2 text-sm text-emerald-400">
          {data.length} unanswered questions identified
        </p>
      </div>

      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No unanswered questions found for this domain.
        </p>
      ) : (
        <div className="overflow-x-auto">
             {/* Mobile scroll hint */}
      <p className="px-2 pt-3 text-xs text-slate-500 sm:hidden">
        Swipe horizontally to view all columns →
      </p>

          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-emerald-500/20 text-slate-400">
                <th className="px-4 py-3 font-medium">User Question</th>
                <th className="px-4 py-3 font-medium">Search Intent</th>
                <th className="px-4 py-3 font-medium">Competitor Domain</th>
                <th className="px-4 py-3 font-medium">Target Coverage</th>
                <th className="px-4 py-3 font-medium">Suggested Content</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={`${item.question}-${index}`}
                  className="border-b border-emerald-500/10 text-slate-300 hover:bg-[#082012]"
                >
                  <td className="px-4 py-4 text-white">
                    {item.question}
                  </td>

                  <td className="px-4 py-4">
                    {item.searchIntent}
                  </td>

                  <td className="px-4 py-4">
                    {item.competitorDomain}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.targetCoverage === "Missing"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {item.targetCoverage}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {item.suggestedContent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
