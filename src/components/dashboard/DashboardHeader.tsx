"use client";

import { useState } from "react";
import { ChevronDown, Settings, Upload, Check } from "lucide-react";

export default function DashboardHeader() {
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("WebIntel AI v4.0");
  const [copied, setCopied] = useState(false);

  const models = [
    "WebIntel AI v4.0",
    "WebIntel DeepScan v2.1",
    "ChatGPT v4.0",
    "Claude 3.7 Sonnet (Intelligence)",
  ];

  const handleExport = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#0d2816]/60 bg-[#020603]/80 backdrop-blur-md sticky top-0 z-10">
      {/* Left: Model Selector Pill (Image 2 style) */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06180d] hover:bg-[#0a2715] border border-emerald-500/25 text-white/90 text-xs font-medium transition cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.08)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>{selectedModel}</span>
          <ChevronDown
            size={13}
            className={`text-slate-400 transition-transform ${
              modelDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {modelDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[#06180d] border border-emerald-500/30 p-1.5 shadow-2xl z-30">
            {models.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedModel(m);
                  setModelDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-center justify-between cursor-pointer ${
                  selectedModel === m
                    ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{m}</span>
                {selectedModel === m && <Check size={12} className="text-emerald-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Configuration & Export buttons (Image 2 style) */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06180d] hover:bg-[#0a2715] border border-emerald-500/25 text-white/90 text-xs font-medium transition cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.06)]"
        >
          <span>Configuration</span>
          <Settings size={13} className="text-emerald-400/80" />
        </button>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06180d] hover:bg-[#0a2715] border border-emerald-500/25 text-white/90 text-xs font-medium transition cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.06)]"
        >
          <span>{copied ? "Exported!" : "Export"}</span>
          <Upload size={13} className="text-emerald-400/80" />
        </button>
      </div>
    </header>
  );
}
