
"use client";

import { useState } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";


export interface CompetitorDropdownOption {
  id: string;
  domain: string;
  competitionLevel?: number;
  isAnalyzed: boolean;
}

interface CompetitorDropdownProps {
  label: string;
  options: CompetitorDropdownOption[];
  value: string;
  onChange: (domain: string) => void;
}

export default function CompetitorDropdown({
  label,
  options,
  value,
  onChange,
}: CompetitorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCompetitor = options.find(
    (competitor) => competitor.domain === value
  );

  const handleSelect = (domain: string) => {
    onChange(domain);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="w-full min-h-[52px] rounded-xl border border-emerald-500/20 bg-[#05170d] px-4 py-3 text-left flex items-center justify-between gap-3 hover:border-emerald-500/50 focus:outline-none focus:border-emerald-400 transition-colors"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Globe size={17} className="text-emerald-400 shrink-0" />

          <span className="text-sm text-white truncate">
            {selectedCompetitor
              ? selectedCompetitor.domain
              : "Select competitor"}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full z-50 max-h-72 overflow-y-auto rounded-xl border border-emerald-500/30 bg-[#05170d] shadow-xl shadow-black/40">
          {options.length === 0 ? (
            <p className="p-4 text-sm text-slate-400">
              No competitors available.
            </p>
          ) : (
            options.map((competitor) => {
              const isSelected = value === competitor.domain;

              return (
                <button
                  key={competitor.id}
                  type="button"
                  onClick={() => handleSelect(competitor.domain)}
                  className={`w-full text-left p-4 border-b border-emerald-500/10 last:border-b-0 transition-colors ${
                    isSelected
                      ? "bg-emerald-500/10"
                      : "hover:bg-[#082012]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white truncate">
                      {competitor.domain}
                    </span>

                    {isSelected && (
                      <Check
                        size={17}
                        className="text-emerald-400 shrink-0"
                      />
                    )}
                  </div>

                  {competitor.isAnalyzed &&
                  competitor.competitionLevel !== undefined ? (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400">
                          Competition Level
                        </span>

                        <span className="text-emerald-400 font-semibold">
                          {competitor.competitionLevel}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                          style={{
                            width: `${competitor.competitionLevel}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex mt-3 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-300">
                      Pending Analysis
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

