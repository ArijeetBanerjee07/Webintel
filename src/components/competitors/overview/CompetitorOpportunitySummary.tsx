
"use client";

import Link from "next/link";
import {
  Key,
  FileSearch,
  Link2,
  ArrowUpRight,
} from "lucide-react";

import type { CompetitorOpportunity } from "@/data/competitors/competitorTypes";

interface CompetitorOpportunitySummaryProps {
  data: CompetitorOpportunity[];
}

const opportunityIcons: Record<string, React.ElementType> = {
  "Keyword Opportunities": Key,
  "Content Opportunities": FileSearch,
  "Backlink Opportunities": Link2,
};

const priorityStyles = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function CompetitorOpportunitySummary({
  data,
}: CompetitorOpportunitySummaryProps) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Competitor Opportunities
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Identify areas where you can improve your competitive position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.map((opportunity) => {
          const Icon =
            opportunityIcons[opportunity.title] ?? ArrowUpRight;

          return (
            <Link
              href={opportunity.href}
              key={opportunity.id}
              className="group rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 transition hover:border-emerald-500/40 hover:bg-[#082012] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <Icon size={20} className="text-emerald-400" />
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    priorityStyles[opportunity.priority]
                  }`}
                >
                  {opportunity.priority} Priority
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">
                {opportunity.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {opportunity.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-400">
                  {opportunity.count.toLocaleString()}
                </span>

                <span className="flex items-center gap-1 text-xs text-slate-400 transition group-hover:text-emerald-400">
                  Explore
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {data.length === 0 && (
        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-8 text-center text-sm text-slate-400">
          No competitor opportunities found for this domain.
        </div>
      )}
    </div>
  );
}
