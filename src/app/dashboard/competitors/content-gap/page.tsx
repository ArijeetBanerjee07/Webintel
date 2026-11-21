
"use client";

import { useState } from "react";
import { useCompetitor } from "@/context/CompetitorContext";
import ContentGapTabs from "@/components/competitors/content-gap/ContentGapTabs";
import { competitorMockData } from "@/data/competitors/competitorMockData";
import MissingTopicClusters from "@/components/competitors/content-gap/MissingTopicClusters";
import WeakLandingPages from "@/components/competitors/content-gap/WeakLandingPages";
import OutdatedContent from "@/components/competitors/content-gap/OutdatedContent";
import UnansweredQuestions from "@/components/competitors/content-gap/UnansweredQuestions";
import { Target } from "lucide-react";

export default function ContentGapPage() {

     const { selectedDomain } = useCompetitor();
    const contentGapData =
  competitorMockData[selectedDomain.domain];
 

  const [activeTab, setActiveTab] = useState("topics");

  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Page Heading */}
        <div className="mb-8">

             <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Target size={14} />
              <span>Competitor Intelligence</span>
            </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Content Gap Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Identify missing topics, weak landing pages, outdated content
            and unanswered user questions compared with your competitors.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-slate-400">Target Domain:</span>
            <span className="font-semibold text-emerald-400">
              {selectedDomain.domain}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] px-4">
          <ContentGapTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Tab Content Placeholder */}
       {/* Tab Content */}
<div className="mt-6">
  {activeTab === "topics" && (
    <MissingTopicClusters
      data={contentGapData?.missingTopicClusters ?? []}
    />
  )}

  {activeTab === "landing-pages" && (
  <WeakLandingPages
    data={contentGapData?.weakLandingPages ?? []}
  />
)}

 {activeTab === "outdated" && (
  <OutdatedContent
    data={contentGapData?.outdatedContent ?? []}
  />
)}
 {activeTab === "questions" && (
  <UnansweredQuestions
    data={contentGapData?.unansweredQuestions ?? []}
  />
)}
</div>

      </main>
    </div>
  );
}
