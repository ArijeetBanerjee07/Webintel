
"use client";

import { useState } from "react";
import { Globe, Monitor, Smartphone, Search } from "lucide-react";

export default function WebsiteAnalysisControls() {

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-[#06180d] p-5 sm:p-6">

      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Analyze Your Website
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Enter a website URL and select a device to analyze its performance.
        </p>
      </div>

      {/* Website URL Input */}
      <div className="mb-5">
        <label
          htmlFor="websiteUrl"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Website URL
        </label>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#020603] px-4 py-3">

          <Globe size={18} className="text-emerald-400 shrink-0" />

          <input
            id="websiteUrl"
            type="url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

        </div>
      </div>

      {/* Device Selection */}
      <div className="mb-6">

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Analysis Device
        </label>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              device === "desktop"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-500/20 bg-[#020603] text-slate-400 hover:border-emerald-500/50"
            }`}
          >
            <Monitor size={18} />
            Desktop
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              device === "mobile"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-500/20 bg-[#020603] text-slate-400 hover:border-emerald-500/50"
            }`}
          >
            <Smartphone size={18} />
            Mobile
          </button>

        </div>
      </div>

      {/* Analyze Button */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#020603] transition hover:bg-emerald-400"
      >
        <Search size={18} />
        Analyze Website
      </button>

    </section>
  );
}
