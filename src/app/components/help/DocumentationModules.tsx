import React, { useState } from "react";
import {
  Rocket,
  LayoutDashboard,
  Radar,
  Users,
  Search,
  Bell,
  ArrowRight,
  
} from "lucide-react";
import { DocArticle, DocModule } from "./helpData";

interface DocumentationModulesProps {
  modules: DocModule[];
  searchQuery: string;
}

const MODULE_ICONS: Record<DocModule["icon"], React.ReactNode> = {
  rocket: <Rocket className="h-4 w-4" />,
  layout: <LayoutDashboard className="h-4 w-4" />,
  radar: <Radar className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  search: <Search className="h-4 w-4" />,
  bell: <Bell className="h-4 w-4" />,
};

export function DocumentationModules({
  modules,
  searchQuery,
}: DocumentationModulesProps) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<{
    module: DocModule;
    selectedArticle?: DocArticle;
  } | null>(null);

  const toggleArticles = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-labelledby="modules-heading">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
            Architecture &amp; Manuals
          </span>
          <h2
            id="modules-heading"
            className="mt-1 text-2xl font-bold text-white"
          >
            Core Documentation Modules
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          {modules.length} Essential Modules
        </span>
      </div>

      {modules.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const isArticlesOpen = expandedCardId === mod.id;

            return (
              <div
                key={mod.id}
                id={mod.id}
                className="group flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-[#0B120F] p-6 transition hover:border-[#10B981]/60 hover:bg-[#0E1713]"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]">
                    {MODULE_ICONS[mod.icon]}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-100 group-hover:text-[#10B981]">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-800/80 pt-3.5 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleArticles(mod.id)}
                    aria-expanded={isArticlesOpen}
                    className="flex w-full items-center justify-between text-left text-zinc-400 transition hover:text-zinc-200"
                  >
                    <span>
                      Related Articles ({mod.relatedArticles.length})
                    </span>
                    <span
                      className={`transition-transform duration-200 ${
                        isArticlesOpen ? "rotate-90 text-[#10B981]" : ""
                      }`}
                    >
                      &rsaquo;
                    </span>
                  </button>

                  {isArticlesOpen && (
                    <ul className="mt-2.5 space-y-1.5 rounded-lg border border-zinc-800/80 bg-[#080C0A] p-2.5">
                      {mod.relatedArticles.map((article) => (
                        <li key={article.title}>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveGuide({
                                module: mod,
                                selectedArticle: article,
                              })
                            }
                            className="flex w-full items-start justify-between gap-2 rounded px-1.5 py-1 text-left text-[11px] text-zinc-300 transition hover:bg-[#10B981]/10 hover:text-[#10B981]"
                          >
                            <span>{article.title}</span>
                            <span className="shrink-0 text-[10px] text-zinc-500">
                              {article.readTime}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveGuide({ module: mod })}
                    className="mt-2.5 flex w-full items-center justify-between font-medium text-[#10B981] transition hover:text-[#34D399]"
                  >
                    <span>View Guide</span>

<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0B120F] p-8 text-center text-sm text-zinc-400">
          No documentation modules matched &ldquo;{searchQuery}&rdquo;.
        </div>
      )}

      {activeGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveGuide(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#10B981]/30 bg-[#0B120F] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
                  {activeGuide.module.title}
                </span>
                <h3
                  id="guide-modal-title"
                  className="mt-1 text-lg font-bold text-white"
                >
                  {activeGuide.selectedArticle
                    ? activeGuide.selectedArticle.title
                    : `${activeGuide.module.title} — Step-by-Step Guide`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveGuide(null)}
                aria-label="Close guide"
                className="rounded-lg border border-zinc-800 bg-[#080C0A] px-2.5 py-1 text-xs text-zinc-400 hover:border-[#10B981]/50 hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {activeGuide.selectedArticle ? (
                <>
                  <span className="inline-block rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2.5 py-0.5 text-[11px] text-[#10B981]">
                    {activeGuide.selectedArticle.readTime}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {activeGuide.selectedArticle.summary}
                  </p>
                </>
              ) : (
                <p className="text-sm leading-relaxed text-zinc-400">
                  {activeGuide.module.description}
                </p>
              )}

              <div className="rounded-xl border border-zinc-800/90 bg-[#080C0A] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
                  {activeGuide.selectedArticle
                    ? "Quick Implementation Steps"
                    : "Workflow Instructions"}
                </p>
                <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {activeGuide.module.guideSteps.map((step, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="font-bold text-[#10B981]">
                        0{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
              {activeGuide.selectedArticle ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveGuide({ module: activeGuide.module })
                  }
                  className="text-xs font-medium text-[#10B981] hover:text-[#34D399]"
                >
                  &larr; View Full Module Guide
                </button>
              ) : (
                <span className="text-xs text-zinc-500">
                  WebIntel Documentation
                </span>
              )}
              <button
                type="button"
                onClick={() => setActiveGuide(null)}
                className="rounded-lg bg-[#10B981] px-4 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-[#34D399]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}