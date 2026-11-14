"use client";

import { useState } from "react";
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
import { Globe, BarChart3, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"research" | "analytics">("research");

  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      {/* Top Header Bar (Model Selector & Controls from Image 2) */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* View Mode Toggle Pill Bar */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-500/10">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#05170d] border border-emerald-500/20 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("research")}
              className={`flex items-center gap-2 px-3.5 py-1 rounded-full font-medium transition cursor-pointer ${
                activeTab === "research"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe size={13} />
              <span>Global Intelligence (Overview)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-3.5 py-1 rounded-full font-medium transition cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 size={13} />
              <span>Full Telemetry & Scans</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Node Telemetry Active</span>
          </div>
        </div>

        {/* IMAGE 2 HERO & GLOBE PRESENTATION */}
        {activeTab === "research" ? (
          <div className="space-y-4">
            {/* Research Header & Philosophy Brief */}
            <ResearchHero />

            {/* 3D Dotted Interactive Rotating Green Globe */}
            <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#05170d]/60 via-[#030c06] to-[#020603] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.06)]">
              <InteractiveGlobe />
            </div>

            {/* Quick KPI Preview below Globe */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Live Portfolio Signals
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("analytics")}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                >
                  <span>Explore full scan analytics</span>
                  <ChevronDown size={14} />
                </button>
              </div>
              <DashboardStats />
            </div>
          </div>
        ) : (
          /* DEEP TELEMETRY & ANALYTICS VIEW (RESTYLED WITH EMERALD OBSIDIAN THEME) */
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards */}
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white mb-4">
                Telemetry Metrics & Signals
              </h2>
              <DashboardStats />
            </div>

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
          </div>
        )}
      </div>
    </div>
  );
}
