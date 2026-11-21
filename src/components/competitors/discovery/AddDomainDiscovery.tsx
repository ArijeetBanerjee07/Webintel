
"use client";

import { useState } from "react";
import {
  PlusCircle,
  Globe,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Clock3,
} from "lucide-react";




import { useCompetitor } from "@/context/CompetitorContext";
import { competitorMockData } from "@/data/competitors/competitorMockData";

export default function AddDomainDiscovery() {
  const {
    selectedDomain,
    addedDomains,
    addCompetitorDomain,
     removeCompetitorDomain,
  } = useCompetitor();

  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddDomain = () => {
    setError("");
    setSuccess("");

    const cleanedDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

    if (!cleanedDomain) {
      setError("Please enter a domain.");
      return;
    }

    const domainRegex =
      /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;

    if (!domainRegex.test(cleanedDomain)) {
      setError("Please enter a valid domain, such as example.com.");
      return;
    }

    const targetDomain = selectedDomain.domain
      .toLowerCase()
      .replace(/^www\./, "");

    if (cleanedDomain === targetDomain) {
      setError("This is your selected target domain.");
      return;
    }

    const existingCompetitors =
      competitorMockData[selectedDomain.domain]?.competitors || [];

    const alreadyInMockData = existingCompetitors.some(
      (competitor) =>
        competitor.domain.toLowerCase().replace(/^www\./, "") ===
        cleanedDomain
    );

   const alreadyAdded = addedDomains.some(
  (item) =>
    item.domain === cleanedDomain &&
    item.targetDomain === selectedDomain.domain
);
    if (alreadyInMockData || alreadyAdded) {
      setError("This domain is already in your competitor list.");
      return;
    }

    // Add the validated domain to shared context
  addCompetitorDomain(cleanedDomain, selectedDomain.domain);

    setSuccess(`${cleanedDomain} was added successfully.`);
    setDomain("");
  };

  const currentTargetDomains = addedDomains.filter(
  (item) => item.targetDomain === selectedDomain.domain
);
  return (
    <div>
      <div className="mb-5">
        <h3 className="font-medium text-white">
          Add Competitor Domain
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Enter a competitor website to add it to your tracking list.
        </p>
      </div>

      <div className="max-w-2xl">
        <label
          htmlFor="competitor-domain"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Website Domain
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Globe
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="competitor-domain"
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setError("");
                setSuccess("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddDomain();
              }}
              placeholder="example.com"
              className="w-full rounded-xl border border-emerald-500/20 bg-[#05170d] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500/60"
            />
          </div>

          <button
            onClick={handleAddDomain}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#020603] transition hover:bg-emerald-400"
          >
            <PlusCircle size={17} />
            Add Domain
          </button>
        </div>

        {error && (
          <p className="mt-3 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            {error}
          </p>
        )}

        {success && (
          <p className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={16} />
            {success}
          </p>
        )}

        <p className="mt-3 text-xs text-slate-500">
          Example: competitor.com or www.competitor.com
        </p>
      </div>

      {/* Added Competitor Domains */}
<div className="mt-8 border-t border-emerald-500/10 pt-6">
  <div className="mb-4 flex items-center justify-between">
    <div>
      <h3 className="font-medium text-white">
        Added Competitors
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        Domains you have manually added for tracking.
      </p>
    </div>

    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
      {currentTargetDomains.length} Domains
    </span>
  </div>

  {currentTargetDomains.length === 0 ? (
    <div className="rounded-xl border border-dashed border-emerald-500/20 p-8 text-center">
      <Globe className="mx-auto mb-3 text-slate-500" size={28} />

      <p className="text-sm text-slate-300">
        No competitors added yet.
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Add a website domain above to get started.
      </p>
    </div>
  ) : (
    <div className="space-y-3">
      {currentTargetDomains.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 rounded-xl border border-emerald-500/10 bg-[#05170d] p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <Globe size={18} className="text-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                {item.domain}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Added on{" "}
                {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs text-yellow-400">
              <Clock3 size={13} />
              Pending Analysis
            </span>

            <button
              onClick={() => removeCompetitorDomain(item.id)}
              title="Remove domain"
              className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}
