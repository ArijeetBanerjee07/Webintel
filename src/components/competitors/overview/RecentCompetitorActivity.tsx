
"use client";

import {
  FileText,
  Globe,
  Layers,
  Tag,
  AlertCircle,
  Activity,
} from "lucide-react";

import type { CompetitorActivity } from "@/data/competitors/competitorTypes";

interface RecentCompetitorActivityProps {
  data: CompetitorActivity[];
}

const typeIcons: Record<string, React.ElementType> = {
  "Content Change": FileText,
  "New Page": Globe,
  "Technology Change": Layers,
  "Pricing Change": Tag,
  "Technical Issue": AlertCircle,
  Performance: Activity,
};

const severityStyles = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function RecentCompetitorActivity({
  data,
}: RecentCompetitorActivityProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Recent Competitor Activity
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Track recent changes and updates detected across your competitors.
        </p>
      </div>

      <div className="space-y-3">
        {data.map((activity) => {
          const Icon = typeIcons[activity.type] ?? Activity;

          return (
            <div
              key={activity.id}
              className="flex flex-col gap-3 rounded-xl border border-emerald-500/10 bg-[#020603]/50 p-4 transition hover:border-emerald-500/30 sm:flex-row sm:items-start"
            >
              <div className="rounded-lg bg-emerald-500/10 p-2.5">
                <Icon size={18} className="text-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {activity.title}
                  </h3>

                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      severityStyles[activity.severity]
                    }`}
                  >
                    {activity.severity}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.description}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{activity.website}</span>
                  <span>{activity.type}</span>
                  <span>{activity.date}</span>
                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-400">
            No recent competitor activity found for this domain.
          </div>
        )}
      </div>
    </div>
  );
}
