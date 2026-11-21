
"use client";

import { Users, Eye, Key, FileSearch } from "lucide-react";
import type { CompetitorOverviewStats as CompetitorOverviewStatsType } from "@/data/competitors/competitorTypes";

interface CompetitorOverviewStatsProps {
  data: CompetitorOverviewStatsType;
   trackedCompetitors: number;
}

export default function CompetitorOverviewStats({
  data,trackedCompetitors,
}: CompetitorOverviewStatsProps) {
  const stats = [
    {
      label: "Tracked Competitors",
      value: trackedCompetitors.toString(),
      icon: Users,
    },
    {
      label: "Organic Visibility",
      value: `${data.organicVisibility}%`,
      icon: Eye,
    },
    {
      label: "Keyword Gaps",
      value: data.keywordGaps.toString(),
      icon: Key,
    },
    {
      label: "Content Gaps",
      value: data.contentGaps.toString(),
      icon: FileSearch,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5 transition hover:border-emerald-500/40 hover:bg-[#082012] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <Icon size={18} className="text-emerald-400" />
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
