
"use client";

import type { CompetitorRecord } from "@/data/competitors/competitorTypes";

interface OrganicCompetitorsChartProps {
  competitors: CompetitorRecord[];
}

export default function OrganicCompetitorsChart({
  competitors,
}: OrganicCompetitorsChartProps) {

  // Find the highest traffic value for calculating bar widths
  const maxTraffic = Math.max(
    ...competitors.map((competitor) => competitor.estimatedTraffic),
    1
  );

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Organic Competitors
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Top 10 competitors ranked by estimated organic traffic.
        </p>
      </div>

      <div className="space-y-5">
        {competitors.map((competitor, index) => (
          <div key={competitor.id} className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500">
                  {index + 1}.
                </span>

                <span className="text-sm font-medium text-white">
                  {competitor.domain}
                </span>
              </div>

              <span className="text-sm font-semibold text-emerald-400">
                {competitor.estimatedTraffic.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#0b2a18]">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${
                    (competitor.estimatedTraffic / maxTraffic) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Traffic figures are estimated values from the available dataset.
      </p>
    </section>
  );
}
