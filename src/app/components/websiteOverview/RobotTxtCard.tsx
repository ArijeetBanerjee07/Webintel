import React from "react";
import { FileText } from "lucide-react";
import type { ScanResult } from "@/lib/scanner";

interface RobotsTxtCardProps {
  data: ScanResult;
}

export function RobotsTxtCard({ data }: RobotsTxtCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0B1410] p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-emerald-400" />
          <h3 className="text-base font-semibold text-white">robots.txt Rules</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-400">
          Active
        </span>
      </div>

      <div className="mt-4 max-h-64 overflow-y-auto rounded-xl border border-white/5 bg-[#080C0A] p-3.5 font-mono text-[11px] leading-relaxed text-zinc-300">
        <ul className="space-y-1">
          <li className="text-emerald-400">User-agent: *</li>
          <li className="text-zinc-400">Disallow: /private/</li>
          <li className="text-zinc-400">Allow: /</li>
          <li className="mt-2 text-emerald-400">{`Sitemap: https://${data.domain}/sitemap.xml`}</li>
        </ul>
      </div>
    </div>
  );
}