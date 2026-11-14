"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  CORE_MODULES,
  FAQ_ITEMS,
  QUICK_SEARCH_TAGS,
  WORKFLOW_STEPS,
} from "../components/help/helpData";

import { WorkflowPipeline } from "../components/help/WorkflowPipeline";
import { DocumentationModules } from "../components/help/DocumentationModules";
import { FaqAccordion } from "../components/help/FaqAccordion";
import { SupportAssistanceBox } from "../components/help/SupportAssistanceBox";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();

  const filteredModules = CORE_MODULES.map((mod) => {
    const moduleMatches =
      mod.title.toLowerCase().includes(query) ||
      mod.description.toLowerCase().includes(query);

    const matchingArticles = mod.relatedArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query)
    );

    return {
      ...mod,
      relatedArticles: moduleMatches
        ? mod.relatedArticles
        : matchingArticles,
    };
  }).filter(
    (mod) =>
      query === "" ||
      mod.title.toLowerCase().includes(query) ||
      mod.description.toLowerCase().includes(query) ||
      mod.relatedArticles.length > 0
  );

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tag.toLowerCase().includes(query)
  )

  const filteredWorkflows = WORKFLOW_STEPS.filter(
    (step) =>
      step.title.toLowerCase().includes(query) ||
      step.description.toLowerCase().includes(query) ||
      step.step.toLowerCase().includes(query) ||
      step.icon.toLowerCase().includes(query)
  )

  const hasResults =
    filteredModules.length > 0 ||
    filteredFaqs.length > 0 ||
    filteredWorkflows.length > 0;

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
                  &#8984;
                </span>
              )}

            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">

              <span className="text-zinc-500">
                Quick searches:
              </span>

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

            {query && (
              <p className="mt-4 text-xs text-zinc-400">
                Found {filteredModules.length} modules,{" "}
                {filteredFaqs.length} FAQs and{" "}
                {filteredWorkflows.length} workflows
              </p>
            )}

          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-20">

        {query && !hasResults ? (
          <div className="rounded-xl border border-zinc-800 bg-[#0B120F] p-10 text-center">

            <h2 className="text-xl font-semibold text-white">
              No results found
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              We couldn't find anything matching "{searchQuery}".
              Try another keyword.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-lg bg-[#10B981] px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Clear Search
            </button>

          </div>
        ) : (
          <>

            {!query && <WorkflowPipeline />}

            {query && filteredWorkflows.length > 0 && (
              <section>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#10B981]">
                    WebIntel Process
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Workflow Results
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {filteredWorkflows.map((step) => (
                    <Link
                      key={step.step}
                      href={`/help/workflows/${Number(step.step)}`}
                      className="rounded-xl border border-zinc-800 bg-[#0B120F] p-5 transition hover:border-[#10B981]/50"
                    >

                      <span className="text-xs font-semibold text-[#10B981]">
                        STEP {step.step}
                      </span>

                      <h3 className="mt-2 font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {step.description}
                      </p>

                      <span className="mt-4 inline-block text-xs font-medium text-[#10B981]">
                        View workflow →
                      </span>

                    </Link>
                  ))}

                </div>
              </section>
            )}

            {filteredModules.length > 0 && (
              <DocumentationModules
                modules={filteredModules}
                searchQuery={searchQuery}
              />
            )}

            {filteredFaqs.length > 0 && (
              <FaqAccordion
                items={filteredFaqs}
                searchQuery={searchQuery}
              />
            )}

            {!query && <SupportAssistanceBox />}

          </>
        )}

      </div>
    </main>
  )
}