"use client";

import React, { useState } from "react";
import {
  CORE_MODULES,
  FAQ_ITEMS,
  QUICK_SEARCH_TAGS,
} from "../components/help/helpData";
import { WorkflowPipeline } from "../components/help/WorkflowPipeline";
import { DocumentationModules } from "../components/help/DocumentationModules";
import { FaqAccordion } from "../components/help/FaqAccordion";
import { SupportAssistanceBox } from "../components/help/SupportAssistanceBox";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.trim().toLowerCase();

  const filteredModules = CORE_MODULES.filter(
    (mod) =>
      mod.title.toLowerCase().includes(query) ||
      mod.description.toLowerCase().includes(query)
  )

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tag.toLowerCase().includes(query)
  )

  return (
    <main className="min-h-screen bg-[#080C0A] text-zinc-100 selection:bg-[#10B981]/30 selection:text-[#10B981]">
      <section className="bg-gradient-to-b from-[#0D1A14] via-[#09100D] to-[#080C0A] px-6 pb-12 pt-16">
        
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            Knowledge Base &amp; Guides
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Help &amp; Documentation
          </h1>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Find step-by-step guides, technical workflows, and API
            specifications for WebIntel.
          </p>

          <div className="mx-auto mt-7 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, guides, FAQs..."
                aria-label="Search articles, guides, FAQs"
                className="w-full rounded-xl border border-zinc-800 bg-[#0B120F] py-3 pl-4 pr-16 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-0.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  Clear
                </button>
              ) : (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-zinc-800 bg-[#080C0A] px-2 py-0.5 text-[11px] text-zinc-500">
                  &#8984;K
                </span>
              )}
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-zinc-500">Quick searches:</span>
              {QUICK_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="rounded-md border border-zinc-800 bg-[#0B120F] px-2.5 py-1 text-zinc-300 transition hover:border-[#10B981]/50 hover:text-[#10B981]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-20">
        <WorkflowPipeline />
        <DocumentationModules
          modules={filteredModules}
          searchQuery={searchQuery}
        />
        <FaqAccordion items={filteredFaqs} searchQuery={searchQuery} />
        <SupportAssistanceBox />
      </div>
    </main>
  )
}