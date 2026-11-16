import React from "react";
import { Globe } from "lucide-react";
import type { ScanResult } from "@/lib/scanner";

interface MetadataSummaryProps {
  data: ScanResult;
}

export function MetadataSummary({ data }: MetadataSummaryProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0B1410] p-6 lg:col-span-2 shadow-lg">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-emerald-400" />
        <h3 className="text-base font-semibold text-white">
          Scanned Domain Metadata Summary
        </h3>
      </div>

      <dl className="mt-5 space-y-4 text-xs">
        <div className="rounded-xl border border-white/5 bg-[#080C0A] p-3.5">
          <dt className="font-semibold uppercase tracking-wider text-zinc-500">
            Page Title
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {data.title || "Missing title tag"}
          </dd>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#080C0A] p-3.5">
          <dt className="font-semibold uppercase tracking-wider text-zinc-500">
            Meta Description
          </dt>
          <dd className="mt-1 leading-relaxed text-zinc-300">
            {data.description || "No meta description detected on root page."}
          </dd>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-[#080C0A] p-3.5">
            <dt className="font-semibold uppercase tracking-wider text-zinc-500">
              Canonical URL
            </dt>
            <dd className="mt-1 truncate font-mono text-emerald-400">
              {data.canonical || "Not specified"}
            </dd>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#080C0A] p-3.5">
            <dt className="font-semibold uppercase tracking-wider text-zinc-500">
              Primary H1 Heading
            </dt>
            <dd className="mt-1 font-mono text-zinc-200 truncate">
              {data.h1 || "Not specified"}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}