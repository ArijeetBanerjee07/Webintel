"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react";
import type { ScanResult } from "@/lib/scanner";

const QUICK_EXAMPLES = ["vercel.com", "shopify.com", "github.com", "stripe.com"];

export default function ScannerPage() {
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (target?: string) => {
    const domain = (target || domainInput).trim();
    if (!domain) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to scan website");
      }

      setResult(data.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 60) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <div className="min-h-screen bg-[#070B09] text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-[#0A100D]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-black shadow-md shadow-emerald-500/20">
                W
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">Webintel</span>
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Live Scanner
            </span>
          </div>

          <nav className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/help" className="text-zinc-400 hover:text-white transition">
              Help &amp; Docs
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 font-mono text-[11px] border border-zinc-700">
              Supabase DB Connected
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Hero & Search Bar */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Website Intelligence Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Scan &amp; Audit Any Public Website
          </h1>
          <p className="text-sm text-zinc-400">
            Real-time HTTP probing, SEO signals, technology fingerprinting, and sales opportunities.
          </p>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="mt-6 relative flex items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Enter domain (e.g. shopify.com, stripe.com)..."
                disabled={loading}
                className="w-full bg-[#0B1310] border border-zinc-800 rounded-xl py-3.5 pl-11 pr-32 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                disabled={loading || !domainInput.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-semibold hover:bg-emerald-400 disabled:opacity-50 transition shadow-sm flex items-center gap-1.5"
              >
                {loading ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    Analyze <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Examples */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <span>Try:</span>
            {QUICK_EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setDomainInput(ex);
                  handleScan(ex);
                }}
                className="text-zinc-400 hover:text-emerald-400 underline decoration-zinc-700 hover:decoration-emerald-500 transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Scan Results View */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Card */}
            <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xl font-bold text-white tracking-tight">{result.domain}</h2>
                  <a
                    href={result.canonicalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400">{result.canonicalUrl}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {result.responseLatencyMs}ms TTFB
                </span>
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  HTTP {result.statusCode}
                </span>
                <span
                  className={`px-3 py-1 rounded-md text-xs font-mono border flex items-center gap-1.5 ${
                    result.isHttps
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}
                >
                  {result.isHttps ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" /> HTTPS Secure
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5" /> Unencrypted
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="col-span-2 md:col-span-1 bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Overall Health
                </span>
                <div className="my-3">
                  <span
                    className={`inline-block text-5xl font-black rounded-2xl px-4 py-2 border ${getScoreColor(
                      result.scores.overall
                    )}`}
                  >
                    {result.scores.overall}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">Weighted Performance</span>
              </div>

              <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs font-medium text-zinc-400">Technical Score</span>
                <div className="my-2 text-3xl font-bold text-white">{result.scores.technical}/100</div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${result.scores.technical}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs font-medium text-zinc-400">SEO Quality</span>
                <div className="my-2 text-3xl font-bold text-white">{result.scores.seo}/100</div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full"
                    style={{ width: `${result.scores.seo}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs font-medium text-zinc-400">Content Depth</span>
                <div className="my-2 text-3xl font-bold text-white">{result.scores.content}/100</div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full"
                    style={{ width: `${result.scores.content}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs font-medium text-zinc-400">Response Speed</span>
                <div className="my-2 text-3xl font-bold text-white">{result.scores.performance}/100</div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${result.scores.performance}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detected Technology Stack */}
            <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Detected Technology Signatures ({result.technologies.length})
              </h3>
              {result.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {result.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-xs"
                    >
                      <span className="font-semibold text-white">{tech.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                        {tech.category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500">No third-party stack signatures detected on landing markup.</p>
              )}
            </div>

            {/* Opportunities (Lead Generation) */}
            {result.opportunities.length > 0 && (
              <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Identified Service &amp; Outreach Opportunities ({result.opportunities.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.opportunities.map((opp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-amber-400">{opp.type}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase font-mono">
                            {opp.impact} Impact
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{opp.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Findings & Recommendations */}
            <div className="bg-[#0B1310] border border-zinc-800/90 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Technical &amp; SEO Audit Findings ({result.findings.length})
              </h3>
              <div className="space-y-3">
                {result.findings.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            f.severity === "CRITICAL"
                              ? "bg-rose-500/20 text-rose-400"
                              : f.severity === "HIGH"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {f.severity}
                        </span>
                        <span className="font-semibold text-zinc-200">{f.issue}</span>
                      </div>
                      <p className="text-zinc-400">{f.evidence}</p>
                      <p className="text-zinc-500 italic">Recommendation: {f.recommendation}</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[11px] shrink-0 self-start sm:self-center">
                      {f.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0A100D]/50 py-6 text-center text-xs text-zinc-500">
        Webintel Website Ingestion &amp; Intelligence Module • Connected to Supabase PostgreSQL
      </footer>
    </div>
  );
}
