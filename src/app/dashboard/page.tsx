"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResearchHero from "@/components/dashboard/ResearchHero";
import InteractiveGlobe from "@/components/dashboard/InteractiveGlobe";
import DashboardStats from "@/components/dashboard/DashboardStat";
import WebsiteHealth from "@/components/dashboard/WebsiteHealth";
import TrafficSources from "@/components/dashboard/TrafficSources";
import CompetitorComparison from "@/components/dashboard/CompetitorComparison";
import OpportunityFeed from "@/components/dashboard/OppurtunityFeed";
import MonitoringActivity from "@/components/dashboard/MonitoringActivity";
import RecentScans from "@/components/dashboard/RecentScans";
import QuickActions from "@/components/dashboard/QuickActions";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      {/* Top Header Bar (Model Selector & Controls matching Image 2) */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Research Header & Philosophy Brief (Matching Image 2) */}
        <ResearchHero />

        {/* 3D Dotted Interactive Rotating Green Globe (Matching Image 2) */}
        <div className="relative mt-2 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#05170d]/60 via-[#030c06] to-[#020603] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.06)]">
          <InteractiveGlobe />
        </div>

        {/* Detailed Telemetry & Signals Section */}
        <section id="portfolio-telemetry" className="pt-12 pb-16 space-y-10 border-t border-emerald-500/15 mt-8">
          {/* Section Divider Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
                <Sparkles size={14} />
                <span>Live Portfolio Intelligence</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Telemetry Overview & Health
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time ingestion active</span>
            </div>
          </div>

          {/* KPI Cards */}
          <DashboardStats />

          {/* Website Health and Traffic Sources */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="h-full min-w-0">
              <WebsiteHealth />
            </div>
            <div className="h-full min-w-0 space-y-6">
              <TrafficSources />
              <QuickActions />
            </div>
          </div>

          {/* Competitor Intelligence */}
          <CompetitorComparison />

          {/* Opportunity Feed */}
          <OpportunityFeed />

          {/* Monitoring Activity Timeline */}
          <MonitoringActivity />

          {/* Recent Scans Table */}
          <RecentScans />
        </section>
      </div>
    </div>
  );
}
