
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

  return (
    <section className="space-y-5">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Content Themes
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Explore the main content topics covered by each domain and identify
          shared themes.
        </p>
      </div>

      {/* Shared Theme Summary */}
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Layers3 size={18} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">
            Shared Content Themes
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {[...themeCounts.entries()]
            .filter(([, count]) => count > 1)
            .map(([theme, count]) => (
              <span
                key={theme}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300"
              >
                <Check size={13} />
                {theme}
                <span className="text-emerald-500/70">
                  ({count} domains)
                </span>
              </span>
            ))}

          {[...themeCounts.values()].every((count) => count <= 1) && (
            <p className="text-sm text-slate-400">
              No shared themes found among the selected domains.
            </p>
          )}
        </div>
      </div>

      {/* Domain Comparison Columns */}
      <div className="overflow-x-auto pb-3">
        <div
          className="grid gap-4 min-w-max"
          style={{
            gridTemplateColumns: `repeat(${domains.length}, minmax(260px, 1fr))`,
          }}
        >
          {domains.map((item, index) => (
            <div
              key={item.domain}
              className="rounded-2xl border border-emerald-500/20 bg-[#05170d] overflow-hidden hover:border-emerald-500/40 transition-colors"
            >
              {/* Domain Header */}
              <div className="p-4 border-b border-emerald-500/20 bg-[#082012]">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={17} className="text-emerald-400" />
                  <span className="text-xs text-slate-400">
                    {index === 0 ? "Target Domain" : `Competitor ${index}`}
                  </span>
                </div>

                <h3 className="text-white font-semibold truncate">
                  {item.domain}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {item.stats.contentThemes.length} identified themes
                </p>
              </div>

              {/* Theme List */}
              <div className="p-4 space-y-3">
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
                              ? "text-emerald-400 shrink-0"
                              : "text-slate-500 shrink-0"
                          }
                        />

                        <span className="flex-1">{theme}</span>

                        {isShared && (
                          <Check
                            size={15}
                            className="text-emerald-400 shrink-0"
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
