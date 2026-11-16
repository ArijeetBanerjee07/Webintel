
import { Gauge } from "lucide-react";

export default function PerformanceHeader() {
  return (
    <header className="mb-8">

      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
        <Gauge size={14} />
        WEBSITE INTELLIGENCE
      </div>

      <div className="mt-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Website Performance
        </h1>

        <p className="text-xs md:text-sm text-slate-300/85 leading-relaxed">
          Analyze website loading speed, Core Web Vitals, and
          performance bottlenecks to discover optimization
          opportunities.
        </p>
      </div>

    </header>
  );
}
