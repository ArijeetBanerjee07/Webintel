
"use client";

import { Target } from "lucide-react";

import CompetitorPageLayout from "@/components/competitors/shared/CompetitorPageLayout";

import CompetitorOverviewStats from "@/components/competitors/overview/CompetitorOverviewStats";
import CompetitivePositioningMap from "@/components/competitors/overview/CompetitivePositioningMap";
import CompetitorSummaryTable from "@/components/competitors/overview/CompetitorSummaryTable";
import CompetitorOpportunitySummary from "@/components/competitors/overview/CompetitorOpportunitySummary";
import RecentCompetitorActivity from "@/components/competitors/overview/RecentCompetitorActivity";

import { competitorMockData } from "@/data/competitors/competitorMockData";
import { useCompetitor } from "@/context/CompetitorContext";

export default function CompetitorOverviewPage() {

  const { selectedDomain } = useCompetitor();
  const selectedData = competitorMockData[selectedDomain.domain];

  // Get the top 3 competitors based on competition level
  const topCompetitors = [...selectedData.competitors]
    .sort((a, b) => b.competitionLevel - a.competitionLevel)
    .slice(0, 3);

  // Prepare positioning map data using the selected domain and top 3 competitors
  const positioningMap = [
    {
      domain: selectedDomain.domain,
      organicKeywords: selectedData.stats.organicKeywords,
      organicTraffic: selectedData.stats.estimatedTraffic,
      visibility: selectedData.stats.visibility,
    },
    ...topCompetitors.map((competitor) => ({
      domain: competitor.domain,
      organicKeywords: competitor.organicKeywords,
      organicTraffic: competitor.estimatedTraffic,
      visibility: competitor.visibility,
    })),
  ];

  return (
    <CompetitorPageLayout>
      <section className="pt-8 pb-6 space-y-6">

        {/* Page Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Competitor Overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Understand your competitive landscape, organic search visibility,
              and opportunities to outperform competing websites.
            </p>
          </div>
        </div>

        {/* Competitor Stat Cards */}
        <CompetitorOverviewStats
          data={selectedData.stats}
          trackedCompetitors={selectedData.competitors.length}
        />

        {/* Competitor Positioning Map */}
        <div className="mt-6">
          <CompetitivePositioningMap
            data={positioningMap}
            selectedDomain={selectedDomain.domain}
          />
        </div>

        {/* Competitor Summary Table */}
        <div className="mt-6">
          <CompetitorSummaryTable data={topCompetitors} />
        </div>

        {/* Competitor Opportunities Summary */}
        <div className="mt-6">
          <CompetitorOpportunitySummary data={selectedData.opportunities} />
        </div>

        {/* Recent Competitor Activity */}
        <div className="mt-6">
          <RecentCompetitorActivity data={selectedData.activities} />
        </div>

      </section>
    </CompetitorPageLayout>
  );
}
