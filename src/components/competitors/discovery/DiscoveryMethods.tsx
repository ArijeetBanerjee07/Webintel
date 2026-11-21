
"use client";

import { useState } from "react";
import {
  Search,
  ChartNoAxesCombined,
  Layers,
  PlusCircle,
} from "lucide-react";

import SharedKeywordDiscovery from "./SharedKeywordDiscovery";
import SERPOverlapDiscovery from "./SERPOverlapDiscovery";
import CategoryDiscovery from "./CategoryDiscovery";
import AddDomainDiscovery from "./AddDomainDiscovery";

const discoveryMethods = [
  {
    id: "shared-keywords",
    label: "Shared Keywords",
    description: "Find competitors ranking for similar keywords.",
    icon: Search,
  },
  {
    id: "serp-overlap",
    label: "SERP Overlap",
    description: "Find domains appearing in the same search results.",
    icon: ChartNoAxesCombined,
  },
  {
    id: "category",
    label: "Category",
    description: "Discover competitors in the same industry.",
    icon: Layers,
  },
  {
    id: "add-domain",
    label: "Add Domain",
    description: "Manually add a competitor website.",
    icon: PlusCircle,
  },
];

export default function DiscoveryMethods() {
  const [activeMethod, setActiveMethod] = useState(
    "shared-keywords"
  );

  return (
    <section className="min-w-0 rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Discover Competitors
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Choose a method to discover potential organic competitors.
        </p>
      </div>

      {/* Mobile animated pill navigation */}
      <div className="mb-5 flex justify-center md:hidden">
        <div className="flex items-center justify-between gap-2 rounded-full border border-emerald-500/20 bg-[#020603] px-2 py-2 shadow-lg">
          {discoveryMethods.map((method) => {
            const Icon = method.icon;
            const isActive = activeMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setActiveMethod(method.id)}
                aria-label={method.label}
                aria-pressed={isActive}
                title={method.label}
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                    : "border border-transparent text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={2.3}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop discovery tabs - original design */}
      <div className="hidden grid-cols-2 gap-3 md:grid lg:grid-cols-4">
        {discoveryMethods.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setActiveMethod(method.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                isActive
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : "border-emerald-500/10 bg-[#020603] hover:border-emerald-500/30"
              }`}
            >
              <Icon
                size={20}
                className={
                  isActive ? "text-emerald-400" : "text-slate-400"
                }
              />

              <h3 className="mt-3 text-sm font-semibold text-white">
                {method.label}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {method.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected method content */}
      <div className="mt-4 min-w-0 rounded-xl border border-emerald-500/10 bg-[#020603] p-3 sm:mt-6 sm:p-5">
        {activeMethod === "shared-keywords" && (
          <SharedKeywordDiscovery />
        )}

        {activeMethod === "serp-overlap" && (
          <SERPOverlapDiscovery />
        )}

        {activeMethod === "category" && (
          <CategoryDiscovery />
        )}

        {activeMethod === "add-domain" && (
          <AddDomainDiscovery />
        )}
      </div>
    </section>
  );
}
