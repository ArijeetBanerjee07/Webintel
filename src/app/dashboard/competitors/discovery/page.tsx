
"use client";

import CompetitorPageLayout from "@/components/competitors/shared/CompetitorPageLayout";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import { useCompetitor } from "@/context/CompetitorContext";
import DiscoveryMethods from "@/components/competitors/discovery/DiscoveryMethods";
import OrganicCompetitorsChart from "@/components/competitors/discovery/OrganicCompetitorsChart";
import CompetitorMetricsTable from "@/components/competitors/discovery/CompetitorMetricsTable";
import { Target } from "lucide-react";

export default function CompetitorDiscoveryPage() {
  const { selectedDomain } = useCompetitor();

  const selectedData = competitorMockData[selectedDomain.domain];

  // Sort competitors by estimated traffic and select the top 10
  const topTrafficCompetitors = [...selectedData.competitors]
    .sort((a, b) => b.estimatedTraffic - a.estimatedTraffic)
    .slice(0, 10);

  return (
    <CompetitorPageLayout>
      <div className="pt-8 pb-6 space-y-8">

        {/* Page Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Competitor Discovery
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Discover websites competing with your domain in organic
              search results. Identify keyword overlaps and explore
              potential competitors.
            </p>
          </div>
        </div>

        {/* Discovery Methods */}
        <DiscoveryMethods />

        {/* Section 1: Organic Competitors Chart */}
        <OrganicCompetitorsChart
          competitors={topTrafficCompetitors}
        />

        {/* Section 2: Competitor Metrics Table */}
        <CompetitorMetricsTable
          competitors={topTrafficCompetitors}
        />

      </div>
    </CompetitorPageLayout>
  );
}
