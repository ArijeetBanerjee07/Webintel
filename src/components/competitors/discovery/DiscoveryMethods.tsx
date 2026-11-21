
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
    <section className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Discover Competitors
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Choose a method to discover potential organic competitors.
        </p>
      </div>

      {/* Discovery method tabs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {discoveryMethods.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;

          return (
            <button
              key={method.id}
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
      <div className="mt-6 rounded-xl border border-emerald-500/10 bg-[#020603] p-5">
        {activeMethod === "shared-keywords" && (
          <div>
              <SharedKeywordDiscovery />
          </div>
        )}

        {activeMethod === "serp-overlap" && (
          <div>
          <SERPOverlapDiscovery />
          </div>
        )}

        {activeMethod === "category" && (
          <div>
            <CategoryDiscovery />
          </div>
        )}

        {activeMethod === "add-domain" && (
          <div>
            <AddDomainDiscovery />
          </div>
        )}
      </div>
    </section>
  );
}
