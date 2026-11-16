import React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Map,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import type { ScanResult } from "@/lib/scanner";

interface OverviewMetricsProps {
  data: ScanResult;
  overallScore: number;
  scoreColor: string;
}

export function OverviewMetrics({ data, overallScore, scoreColor }: OverviewMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-emerald-500/20 bg-[#0B1410] p-5 shadow-lg">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Domain Health Score
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-bold text-white">
            {overallScore}
            <span className="text-sm font-normal text-zinc-500">/100</span>
          </span>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${scoreColor}`}>
            {overallScore >= 80 ? "Healthy" : overallScore >= 50 ? "Needs Work" : "Critical"}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#0B1410] p-5 shadow-lg">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Indexability Status
        </span>
        <div className="mt-3 flex items-center gap-2">
          {data.statusCode === 200 ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          )}
          <span className="text-lg font-semibold text-white">
            {data.statusCode === 200 ? "Indexable" : "Non-Indexable"}
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          {`HTTP Status: ${data.statusCode} (${data.responseLatencyMs}ms)`}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#0B1410] p-5 shadow-lg">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          HTTPS / SSL Security
        </span>
        <div className="mt-3 flex items-center gap-2">
          {data.isHttps ? (
            <>
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-lg font-semibold text-emerald-400">HTTPS Secure</span>
            </>
          ) : (
            <>
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              <span className="text-lg font-semibold text-rose-400">Insecure HTTP</span>
            </>
          )}
        </div>
        <p className="mt-1 truncate text-xs text-zinc-500">{data.domain}</p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#0B1410] p-5 shadow-lg">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          XML Sitemap
        </span>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold text-white">Detected</span>
        </div>
        <a
          href={`https://${data.domain}/sitemap.xml`}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-1 truncate text-xs text-emerald-400 hover:underline"
        >
          <span className="truncate">{`https://${data.domain}/sitemap.xml`}</span>
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      </div>
    </div>
  );
}