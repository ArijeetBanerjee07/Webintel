
"use client";

import { TrendingUp, Search, Link2, Eye } from "lucide-react";
import type {
  CompetitorOverviewStats,
  CompetitorRecord,
} from "@/data/competitors/competitorTypes";

interface ComparisonDomain {
  domain: string;
  stats: CompetitorOverviewStats | CompetitorRecord;
}

interface ComparisonOverviewProps {
  domains: ComparisonDomain[];
}

const metrics = [
  {
    label: "Estimated Organic Traffic",
    key: "estimatedTraffic",
    icon: TrendingUp,
    format: (value: number) => value.toLocaleString("en-IN"),
  },
  {
    label: "Organic Keywords",
    key: "organicKeywords",
    icon: Search,
    format: (value: number) => value.toLocaleString("en-IN"),
  },
  {
    label: "Referring Domains",
    key: "referringDomains",
    icon: Link2,
    format: (value: number) => value.toLocaleString("en-IN"),
  },
  {
    label: "Organic Visibility",
    key: "visibility",
    icon: Eye,
    format: (value: number) => `${value}%`,
  },
] as const;

export default function ComparisonOverview({
  domains,
}: ComparisonOverviewProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Comparison Overview
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Compare key organic search metrics across selected domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.key}
              className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Icon size={18} className="text-emerald-400" />
                <span className="text-sm">{metric.label}</span>
              </div>

              <div className="mt-4 space-y-3">
                {domains.map((item) => {
                  const value = item.stats[metric.key];

                  return (
                    <div
                      key={item.domain}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-slate-400 truncate">
                        {item.domain}
                      </span>

                      <span className="text-lg font-semibold text-white">
                        {metric.format(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
