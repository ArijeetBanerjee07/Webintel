
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
    const technologies = new Set(item.stats.technologyStack);

    technologies.forEach((technology) => {
      const key = technology.toLowerCase();

      technologyCount.set(
        key,
        (technologyCount.get(key) || 0) + 1
      );
    });
  });

  const sharedTechnologies = Array.from(technologyCount.entries())
    .filter(([, count]) => count > 1)
    .map(([technology]) => technology);

  return (
    <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Technology Stack Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Explore the technologies used by your competitors and
          identify common tools and platforms.
        </p>
      </div>

      {/* Domain-wise technologies */}
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: `repeat(${domains.length}, minmax(240px, 1fr))`,
        }}
      >
        {domains.map((item) => (
          <div
            key={item.domain}
            className="rounded-xl border border-emerald-500/10 bg-[#020603] p-4"
          >
            <h3 className="mb-4 truncate font-medium text-white">
              {item.domain}
            </h3>

            <div className="flex flex-wrap gap-2">
              {item.stats.technologyStack.map((technology) => {
                const isShared = sharedTechnologies.includes(
                  technology.toLowerCase()
                );

                return (
                  <span
                    key={technology}
                    className={`rounded-lg border px-3 py-2 text-xs ${
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

            <p className="mt-5 border-t border-emerald-500/10 pt-3 text-xs text-slate-400">
              {item.stats.technologyStack.length} technologies detected
            </p>
          </div>
        ))}
      </div>

      {/* Shared technologies */}
      <div className="mt-6 rounded-xl border border-emerald-500/10 bg-[#020603] p-4">
        <h3 className="mb-3 font-medium text-white">
          Common Technologies
        </h3>

        {sharedTechnologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sharedTechnologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg bg-emerald-500/15 px-3 py-2 text-xs text-emerald-300"
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
