
"use client";

import { BookOpen, Check, Layers3 } from "lucide-react";

import type {
  CompetitorOverviewStats,
  CompetitorRecord,
} from "@/data/competitors/competitorTypes";

interface ComparisonDomain {
  domain: string;
  stats: CompetitorOverviewStats | CompetitorRecord;
}

interface ContentThemesProps {
  domains: ComparisonDomain[];
}

export default function ContentThemes({ domains }: ContentThemesProps) {
  // Identify themes appearing in more than one domain
  const themeCounts = new Map<string, number>();

  domains.forEach((item) => {
    const uniqueThemes = new Set(
      item.stats.contentThemes.map((theme) => theme.toLowerCase())
    );

    uniqueThemes.forEach((theme) => {
      themeCounts.set(theme, (themeCounts.get(theme) || 0) + 1);
    });
  });

  const sharedThemes = [...themeCounts.entries()].filter(
    ([, count]) => count > 1
  );

  return (
    <section className="min-w-0 space-y-5">
      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Content Themes
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Explore the main content topics covered by each domain and identify
          shared themes.
        </p>
      </div>

      {/* Shared Theme Summary */}
      <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Layers3 size={18} className="shrink-0 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">
            Shared Content Themes
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {sharedThemes.length > 0 ? (
            sharedThemes.map(([theme, count]) => (
              <span
                key={theme}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300"
              >
                <Check size={13} className="shrink-0" />
                <span className="break-words">{theme}</span>
                <span className="shrink-0 text-emerald-500/70">
                  ({count} domains)
                </span>
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No shared themes found among the selected domains.
            </p>
          )}
        </div>
      </div>

      {/* Domain Comparison Columns */}
      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-3">
        {/* Mobile Scroll Instruction */}
        <p className="mb-3 px-1 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all competitors →
        </p>

        <div
          className="grid min-w-max gap-4"
          style={{
            gridTemplateColumns: `repeat(${domains.length}, minmax(260px, 1fr))`,
          }}
        >
          {domains.map((item, index) => (
            <div
              key={item.domain}
              className="min-w-0 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#05170d] transition-colors hover:border-emerald-500/40"
            >
              {/* Domain Header */}
              <div className="border-b border-emerald-500/20 bg-[#082012] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                  <span className="text-xs text-slate-400">
                    {index === 0 ? "Target Domain" : `Competitor ${index}`}
                  </span>
                </div>

                <h3 className="truncate font-semibold text-white">
                  {item.domain}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {item.stats.contentThemes.length} identified themes
                </p>
              </div>

              {/* Theme List */}
              <div className="space-y-3 p-3 sm:p-4">
                {item.stats.contentThemes.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No content themes available.
                  </p>
                ) : (
                  item.stats.contentThemes.map((theme) => {
                    const isShared =
                      (themeCounts.get(theme.toLowerCase()) || 0) > 1;

                    return (
                      <div
                        key={theme}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-sm transition-colors ${
                          isShared
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border-emerald-500/10 bg-[#082012] text-slate-300"
                        }`}
                      >
                        <BookOpen
                          size={15}
                          className={
                            isShared
                              ? "shrink-0 text-emerald-400"
                              : "shrink-0 text-slate-500"
                          }
                        />

                        <span className="min-w-0 flex-1 break-words">
                          {theme}
                        </span>

                        {isShared && (
                          <Check
                            size={15}
                            className="shrink-0 text-emerald-400"
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
