"use client";

import { Layers, Target } from "lucide-react";

export default function ResearchHero() {
  return (
    <div className="w-full max-w-5xl mx-auto pt-6 pb-4 px-4 text-center">
      {/* Main Title (Image 2 style) */}
      <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white/95">
        Website Intelligence <span className="font-bold text-white">Research</span>
      </h1>

      {/* Pill Badge (Image 2 style) */}
      <div className="flex justify-center mt-3.5 mb-8">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-[#072212] border border-emerald-500/35 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Performance Intelligence
        </span>
      </div>

      {/* Narrative & Metric Cards Split Grid (Image 2 style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-left">
        {/* Left Column: Intelligence Philosophy */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-3.5 pr-0 md:pr-4">
          <p className="text-xs md:text-sm text-slate-300/85 leading-relaxed">
            Young drivers don&apos;t lack effort. They lack structure, measurable feedback, and data-driven progression. Most training is based on repetition — not analysis.
          </p>

          <p className="text-xs md:text-sm leading-relaxed">
            <span className="font-bold text-emerald-400 tracking-wide">WEBINTEL IQ</span>{" "}
            <span className="text-slate-300/85">
              is built on measurable systems that translate performance into intelligence.
            </span>
          </p>
        </div>

        {/* Right Column: Two Stat Cards */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3.5">
          {/* Card 1: 14 Systems */}
          <div className="rounded-2xl p-4 bg-[#05170d] border border-emerald-500/25 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-[0_0_20px_rgba(16,185,129,0.05)]">
            <div className="flex items-start justify-between">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                14 Systems
              </span>
              <Layers size={18} className="text-emerald-400 mt-1 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400/80 font-medium mt-4">
              Structured Framework
            </div>
          </div>

          {/* Card 2: 0.5s Gap */}
          <div className="rounded-2xl p-4 bg-[#05170d] border border-emerald-500/25 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-[0_0_20px_rgba(16,185,129,0.05)]">
            <div className="flex items-start justify-between">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                0.5s Gap
              </span>
              <Target size={18} className="text-emerald-400 mt-1 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400/80 font-medium mt-4">
              Performance Opportunity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

