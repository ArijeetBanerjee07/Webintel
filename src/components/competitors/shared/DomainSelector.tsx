
"use client";

import { useState } from "react";
import { Globe, Clock3, ChevronDown } from "lucide-react";
import { scannedDomains } from "@/data/competitors/competitorMockData";
import type { ScannedDomain } from "@/data/competitors/competitorTypes";


interface DomainSelectorProps {
  selectedDomain: ScannedDomain;
  onDomainChange: (domain: ScannedDomain) => void;
}

export default function DomainSelector({
  selectedDomain,
  onDomainChange,
}: DomainSelectorProps) {
  const [isDomainOpen, setIsDomainOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Selector Description */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Globe size={16} className="text-emerald-400" />
            Target Website
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Select the website whose competitors you want to analyse.
          </p>
        </div>

        {/* Domain Dropdown */}
        <div className="relative w-full sm:w-72">

          {/* Selected Domain */}
          <button
            type="button"
            onClick={() => setIsDomainOpen(!isDomainOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-emerald-500/30 bg-[#020603] px-4 py-3 text-left transition hover:border-emerald-400"
          >
            <div>
              <p className="text-sm font-semibold text-white">
                {selectedDomain.domain}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Clock3 size={12} className="text-emerald-400" />
                Last analyzed: {selectedDomain.lastAnalyzed}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`text-emerald-400 transition-transform ${
                isDomainOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Options */}
          {isDomainOpen && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-emerald-500/30 bg-[#05170d] shadow-xl">

              {scannedDomains.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onDomainChange(item);
                    setIsDomainOpen(false);
                  }}
                  className={`w-full border-b border-emerald-500/10 px-4 py-3 text-left transition last:border-0 hover:bg-[#082012] ${
                    selectedDomain.id === item.id
                      ? "bg-emerald-500/10"
                      : ""
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {item.domain}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock3 size={12} className="text-emerald-400" />
                    Last analyzed: {item.lastAnalyzed}
                  </p>
                </button>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
