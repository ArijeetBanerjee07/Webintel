import React from "react";
import Link from "next/link";
import {
  Globe,
  ScanSearch,
  BarChart3,
  Users,
  Activity,
  FileCheck2,
} from "lucide-react";
import { WORKFLOW_STEPS, WorkflowStep } from "./helpData";

const STEP_ICONS: Record<WorkflowStep["icon"], React.ReactNode> = {
  globe: <Globe className="h-3.5 w-3.5" />,
  crawl: <ScanSearch className="h-3.5 w-3.5" />,
  analyze: <BarChart3 className="h-3.5 w-3.5" />,
  compete: <Users className="h-3.5 w-3.5" />,
  monitor: <Activity className="h-3.5 w-3.5" />,
  act: <FileCheck2 className="h-3.5 w-3.5" />,
};

export function WorkflowPipeline() {
  return (
    <section
      aria-labelledby="workflow-heading"
      className="rounded-2xl border border-[#10B981]/25 bg-gradient-to-b from-[#0D1A14] to-[#0A110E] p-6 sm:p-8"
    >
      <div className="text-center">
        <span className="inline-block rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
          Intelligence Pipeline
        </span>

        <h2
          id="workflow-heading"
          className="mt-3 text-2xl font-bold text-white sm:text-3xl"
        >
          6-Step Intelligence Workflow
        </h2>

        <p className="mt-1.5 text-xs text-zinc-400 sm:text-sm">
          How WebIntel ingests, parses, and delivers actionable web signals in
          real-time
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {WORKFLOW_STEPS.map((item) => (
          <Link
            key={item.step}
            href={`/help/workflows/${Number(item.step)}`}
            className="flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-[#080C0A]/90 p-4 transition hover:border-[#10B981]/50 hover:bg-[#0E1713]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-[#10B981]">
                  {item.step}
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]">
                  {STEP_ICONS[item.icon]}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-semibold text-zinc-100">
                {item.title}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}