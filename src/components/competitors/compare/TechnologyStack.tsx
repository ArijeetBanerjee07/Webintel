
"use client";

import type {
  CompetitorOverviewStats,
  CompetitorRecord,
} from "@/data/competitors/competitorTypes";

interface ComparisonDomain {
  domain: string;
  stats: CompetitorOverviewStats | CompetitorRecord;
}

interface TechnologyStackProps {
  domains: ComparisonDomain[];
}

export default function TechnologyStack({
  domains,
}: TechnologyStackProps) {
  // Find technologies shared by multiple domains
  const technologyCount = new Map<string, number>();

  domains.forEach((item) => {
    const technologies = new Set(
      item.stats.technologyStack.map((technology) =>
        technology.toLowerCase()
      )
    );

    technologies.forEach((technology) => {
      technologyCount.set(
        technology,
        (technologyCount.get(technology) || 0) + 1
      );
    });
  });

  const sharedTechnologies = Array.from(technologyCount.keys()).filter(
    (technology) => (technologyCount.get(technology) || 0) > 1
  );

  return (
    <section className="mt-6 min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:mt-8 sm:p-5">
      {/* Section Heading */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Technology Stack Comparison
        </h2>

        <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
          Explore the technologies used by your competitors and identify
          common tools and platforms.
        </p>
      </div>

      {/* Horizontal Competitor Cards */}
      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-3">
        {/* Mobile Scroll Instruction */}
        <p className="mb-3 px-1 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all competitors →
        </p>

        <div className="flex min-w-max items-stretch gap-4">
          {domains.map((item) => (
            <div
              key={item.domain}
              className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-emerald-500/15 bg-[#020603] p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-[#031008] sm:w-[280px] sm:p-5"
            >
              {/* Domain Header */}
              <div className="mb-4 flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                  <span className="text-sm font-semibold text-emerald-400">
                    {item.domain.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">
                    Technology Profile
                  </p>

                  <h3
                    title={item.domain}
                    className="truncate text-sm font-semibold text-white sm:text-base"
                  >
                    {item.domain}
                  </h3>
                </div>
              </div>

              {/* Technology Count Summary */}
              <div className="mb-4 rounded-xl border border-emerald-500/10 bg-[#05170d] px-3 py-3">
                <p className="text-xs text-slate-400">
                  Technologies Detected
                </p>

                <p className="mt-1 text-2xl font-bold tabular-nums text-white">
                  {item.stats.technologyStack.length}
                </p>
              </div>

              {/* Technology List */}
              <div className="flex-1">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Detected Technologies
                </p>

                {item.stats.technologyStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.stats.technologyStack.map((technology) => {
                      const isShared = sharedTechnologies.includes(
                        technology.toLowerCase()
                      );

                      return (
                        <span
                          key={technology}
                          className={`max-w-full break-words rounded-lg border px-3 py-2 text-xs ${
                            isShared
                              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                              : "border-slate-700 bg-slate-800/50 text-slate-300"
                          }`}
                        >
                          {technology}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No technologies detected.
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-5 border-t border-emerald-500/10 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">
                    Shared technologies
                  </span>

                  <span className="text-sm font-semibold text-emerald-400">
                    {
                      item.stats.technologyStack.filter((technology) =>
                        sharedTechnologies.includes(
                          technology.toLowerCase()
                        )
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Technologies */}
      <div className="mt-5 min-w-0 rounded-xl border border-emerald-500/10 bg-[#020603] p-4 sm:mt-6 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
            <span className="text-emerald-400">✦</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Common Technologies
            </h3>
            <p className="text-xs text-slate-500">
              Technologies detected across multiple domains
            </p>
          </div>
        </div>

        {sharedTechnologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sharedTechnologies.map((technology) => (
              <span
                key={technology}
                className="max-w-full break-words rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
              >
                {technology}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No common technologies found among the selected domains.
          </p>
        )}
      </div>
    </section>
  );
}
