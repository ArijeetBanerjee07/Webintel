
"use client";

import { useState } from "react";
import { Globe, Target } from "lucide-react";

import CompetitorPageLayout from "@/components/competitors/shared/CompetitorPageLayout";
import CompetitorDropdown, {
  type CompetitorDropdownOption,
} from "@/components/competitors/compare/CompetitorDropdown";

import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";

import ComparisonOverview from "@/components/competitors/compare/ComparisonOverview";
import OrganicPerformance from "@/components/competitors/compare/OrganicPerformance";
import KeywordRankingDistribution from "@/components/competitors/compare/KeywordRankingDistribution";
import TopPerformingPages from "@/components/competitors/compare/TopPerformingPages";
import ContentThemes from "@/components/competitors/compare/ContentThemes";
import BacklinkComparison from "@/components/competitors/compare/BacklinkComparison";
import TechnologyStack from "@/components/competitors/compare/TechnologyStack";

import PositioningComparisonTable from "@/components/competitors/compare/PositioningComparisonTable";

export default function CompareDomainsPage() {
  const { selectedDomain, addedDomains } = useCompetitor();

  const selectedData = competitorMockData[selectedDomain.domain];

  // Store competitor selections along with the target domain
  const [selection, setSelection] = useState({
    targetDomain: selectedDomain.domain,
    competitorOne: "",
    competitorTwo: "",
    competitorThree: "",
  });

  // Use selections only when they belong to the currently selected target
  const competitorOne =
    selection.targetDomain === selectedDomain.domain
      ? selection.competitorOne
      : "";

  const competitorTwo =
    selection.targetDomain === selectedDomain.domain
      ? selection.competitorTwo
      : "";

  const competitorThree =
    selection.targetDomain === selectedDomain.domain
      ? selection.competitorThree
      : "";

  const [activeTab, setActiveTab] = useState<"seo" | "positioning">("seo");

  // Get manually added competitors for the currently selected target
  const manualCompetitors = addedDomains.filter(
    (item) => item.targetDomain === selectedDomain.domain
  );

  // Convert existing competitors into the common dropdown option format
  const existingCompetitorOptions: CompetitorDropdownOption[] =
    selectedData.competitors.map((competitor) => ({
      id: competitor.id,
      domain: competitor.domain,
      competitionLevel: competitor.competitionLevel,
      isAnalyzed: true,
    }));

  // Convert manually added competitors into the same format
  const manualCompetitorOptions: CompetitorDropdownOption[] =
    manualCompetitors.map((competitor) => ({
      id: competitor.id,
      domain: competitor.domain,
      isAnalyzed: false,
    }));

  // Combine existing and manually added competitors
  const allCompetitorOptions = [
    ...existingCompetitorOptions,
    ...manualCompetitorOptions,
  ];

  // Dropdown 1: All available competitors
  const competitorOneOptions = allCompetitorOptions;

  // Dropdown 2: Exclude competitor 1
  const competitorTwoOptions = allCompetitorOptions.filter(
    (competitor) => competitor.domain !== competitorOne
  );

  // Dropdown 3: Exclude competitors 1 and 2
  const competitorThreeOptions = allCompetitorOptions.filter(
    (competitor) =>
      competitor.domain !== competitorOne &&
      competitor.domain !== competitorTwo
  );

  // Collect selected competitor domains in dropdown order
  const selectedCompetitorDomains = [
    competitorOne,
    competitorTwo,
    competitorThree,
  ].filter(Boolean);

  // Identify selected competitors that are awaiting analysis
  const pendingCompetitors = manualCompetitors.filter((competitor) =>
    selectedCompetitorDomains.includes(competitor.domain)
  );

  // Positioning data contains only analyzed mock competitor profiles
  const positioningData = selectedData.positioningComparison;

  const positioningDomains = [
    positioningData.target,

    ...selectedCompetitorDomains.flatMap((domain) => {
      const competitor = positioningData.competitors.find(
        (item) => item.domain === domain
      );

      return competitor ? [competitor] : [];
    }),
  ];

  // Prepare SEO comparison data using only analyzed competitors
  const comparisonDomains = [
    {
      domain: selectedDomain.domain,
      stats: selectedData.stats,
    },

    ...selectedCompetitorDomains.flatMap((domain) => {
      const competitor = selectedData.competitors.find(
        (item) => item.domain === domain
      );

      return competitor
        ? [{ domain: competitor.domain, stats: competitor }]
        : [];
    }),
  ];

  // Clear all competitor selections
  const clearSelections = () => {
    setSelection({
      targetDomain: selectedDomain.domain,
      competitorOne: "",
      competitorTwo: "",
      competitorThree: "",
    });
  };

  return (
    <CompetitorPageLayout>
      <div className="space-y-8 pt-8 pb-6">

        {/* Page Heading */}
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <Target size={14} />
            <span>Competitor Intelligence</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Compare Domains
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Compare your website against competitors to understand their
            organic performance, keyword footprint, backlinks, and content strategy.
          </p>
        </div>

        {/* Domain Selection */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Select Domains to Compare
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Your target domain is selected automatically.
              Choose up to three different competitors.
            </p>
          </div>

          {/* Target Domain */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#05170d] p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Globe size={22} />
              </div>

              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                  Your Target Domain
                </p>

                <h3 className="text-lg font-semibold text-white mt-1">
                  {selectedDomain.domain}
                </h3>
              </div>
            </div>
          </div>

          {/* Three Competitor Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompetitorDropdown
              label="Competitor 1"
              options={competitorOneOptions}
              value={competitorOne}
              onChange={(domain) => {
                setSelection({
                  targetDomain: selectedDomain.domain,
                  competitorOne: domain,
                  competitorTwo: "",
                  competitorThree: "",
                });
              }}
            />

            <CompetitorDropdown
              label="Competitor 2"
              options={competitorTwoOptions}
              value={competitorTwo}
              onChange={(domain) => {
                setSelection({
                  targetDomain: selectedDomain.domain,
                  competitorOne,
                  competitorTwo: domain,
                  competitorThree: "",
                });
              }}
            />

            <CompetitorDropdown
              label="Competitor 3"
              options={competitorThreeOptions}
              value={competitorThree}
              onChange={(domain) => {
                setSelection({
                  targetDomain: selectedDomain.domain,
                  competitorOne,
                  competitorTwo,
                  competitorThree: domain,
                });
              }}
            />
          </div>

          {/* Selection Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-[#05170d] p-4">
            <div>
              <p className="text-white font-medium">
                {selectedCompetitorDomains.length} of 3 competitors selected
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Select competitors to view their comparison.
              </p>
            </div>

            {selectedCompetitorDomains.length > 0 && (
              <button
                type="button"
                onClick={clearSelections}
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Clear Selection
              </button>
            )}
          </div>
        </section>

        {/* Comparison Tabs */}
        <div className="flex gap-2 border-b border-emerald-500/20">
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "seo"
                ? "border-emerald-400 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            SEO Comparison
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("positioning")}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "positioning"
                ? "border-emerald-400 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Positioning Comparison
          </button>
        </div>

        {/* SEO Comparison Content */}
        {activeTab === "seo" && (
          <>
            <ComparisonOverview domains={comparisonDomains} />

            <OrganicPerformance domains={comparisonDomains} />

            <KeywordRankingDistribution domains={comparisonDomains} />

            <TopPerformingPages domains={comparisonDomains} />

            <ContentThemes domains={comparisonDomains} />

            <BacklinkComparison domains={comparisonDomains} />

            <TechnologyStack domains={comparisonDomains} />
          </>
        )}

        {/* Positioning Comparison Content */}
        {activeTab === "positioning" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Positioning Comparison
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Compare homepage messaging, services, offers, calls to action,
                pricing presentation, and differentiators across selected domains.
              </p>
            </div>

            <PositioningComparisonTable domains={positioningDomains} />
          </div>
        )}

        {/* Manually Added Competitors Awaiting Analysis */}
        {pendingCompetitors.length > 0 && (
          <div className="rounded-2xl border border-yellow-500/20 bg-[#05170d] p-5">
            <h3 className="text-base font-semibold text-white">
              Competitors Awaiting Analysis
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              These domains have been added but do not have SEO analysis data yet.
            </p>

            <div className="mt-4 space-y-3">
              {pendingCompetitors.map((competitor) => (
                <div
                  key={competitor.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/10 bg-[#020603] p-3"
                >
                  <span className="text-sm font-medium text-white break-all">
                    {competitor.domain}
                  </span>

                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                    Not analyzed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CompetitorPageLayout>
  );
}
