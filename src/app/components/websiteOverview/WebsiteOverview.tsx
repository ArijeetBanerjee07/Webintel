import React from "react";
import type { ScanResult } from "@/lib/scanner";
import { OverviewMetrics } from "./OverviewMetrics";
import { MetadataSummary } from "./MetaDataSummary";
import { RobotsTxtCard } from "./RobotTxtCard";

interface WebsiteOverviewProps {
  data: ScanResult;
}

export  function WebsiteOverview({ data }: WebsiteOverviewProps) {
  const overallScore = data.scores.overall;
  const scoreColor =
    overallScore >= 80
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : overallScore >= 50
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
      : "text-rose-400 border-rose-500/30 bg-rose-500/10";

  return (
    <div className="space-y-6">
      <OverviewMetrics data={data} overallScore={overallScore} scoreColor={scoreColor} />

      <div className="grid gap-6 lg:grid-cols-3">
        <MetadataSummary data={data} />
        <RobotsTxtCard data={data} />
      </div>
    </div>
  )
}