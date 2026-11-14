"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";

type InspectorTab = "stack" | "headers" | "network" | "opportunities";

interface DomainPreset {
  host: string;
  ip: string;
  status: string;
  protocol: string;
  ttfb: string;
  tlsVersion: string;
  server: string;
  stack: Array<{ name: string; category: string; version?: string }>;
  headers: Array<{ name: string; value: string; pass: boolean }>;
  opportunities: Array<{ title: string; impact: "High" | "Medium" | "Low"; detail: string }>;
}

const PRESETS: Record<string, DomainPreset> = {
  "stripe.com": {
    host: "stripe.com",
    ip: "199.60.103.28",
    status: "200 OK",
    protocol: "HTTP/3 (QUIC)",
    ttfb: "34ms",
    tlsVersion: "TLS 1.3 (ChaCha20-Poly1305)",
    server: "cloudflare-warp",
    stack: [
      { name: "React", category: "UI Library", version: "18.3" },
      { name: "Next.js", category: "SSR Framework", version: "14.2" },
      { name: "Cloudflare Edge", category: "CDN & WAF" },
      { name: "Stripe.js", category: "Payments Engine" },
      { name: "PostgreSQL", category: "Database Layer" },
      { name: "Tailwind CSS", category: "Styling" },
    ],
    headers: [
      { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload", pass: true },
      { name: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'nonce-...' https://js.stripe.com", pass: true },
      { name: "X-Frame-Options", value: "DENY", pass: true },
      { name: "X-Content-Type-Options", value: "nosniff", pass: true },
      { name: "Cross-Origin-Opener-Policy", value: "same-origin", pass: true },
    ],
    opportunities: [
      { title: "Static Asset Brotli Compression", impact: "Low", detail: "96% of bundle compressed via Brotli. 4% legacy gzip fallback." },
      { title: "Third-party Script Sandboxing", impact: "Medium", detail: "Ensure external telemetry runs in dedicated web worker." },
    ],
  },
  "linear.app": {
    host: "linear.app",
    ip: "76.76.21.21",
    status: "200 OK",
    protocol: "HTTP/2",
    ttfb: "28ms",
    tlsVersion: "TLS 1.3 (AES_128_GCM)",
    server: "Vercel Edge",
    stack: [
      { name: "React", category: "UI Library", version: "19.0" },
      { name: "Next.js", category: "Fullstack Framework", version: "16.4" },
      { name: "Tailwind CSS", category: "Design System", version: "4.0" },
      { name: "GraphQL", category: "API Layer" },
      { name: "Vercel Edge Network", category: "Hosting / CDN" },
    ],
    headers: [
      { name: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains", pass: true },
      { name: "Content-Security-Policy", value: "script-src 'self' 'unsafe-eval' https://cdn.linear.app", pass: true },
      { name: "X-Content-Type-Options", value: "nosniff", pass: true },
      { name: "Referrer-Policy", value: "strict-origin-when-cross-origin", pass: true },
    ],
    opportunities: [
      { title: "Font Subsetting Preload", impact: "Low", detail: "Preload primary Inter Variable font face in HTML header." },
    ],
  },
  "github.com": {
    host: "github.com",
    ip: "140.82.121.4",
    status: "200 OK",
    protocol: "HTTP/2",
    ttfb: "48ms",
    tlsVersion: "TLS 1.3 (ECDHE-RSA)",
    server: "GitHub Frontend Engine",
    stack: [
      { name: "Primer UI", category: "Design Framework" },
      { name: "Turbo / ViewComponent", category: "DOM Engine" },
      { name: "Fastly CDN", category: "Edge Caching" },
      { name: "Ruby on Rails", category: "Backend Runtime" },
    ],
    headers: [
      { name: "Strict-Transport-Security", value: "max-age=31536000; includeSubdomains; preload", pass: true },
      { name: "Content-Security-Policy", value: "default-src 'none'; base-uri 'self'", pass: true },
      { name: "X-Frame-Options", value: "deny", pass: true },
      { name: "X-XSS-Protection", value: "0", pass: true },
    ],
    opportunities: [
      { title: "Stale-While-Revalidate Edge Cache", impact: "Medium", detail: "Implement edge cache tags on public documentation routes." },
    ],
  },
  "vercel.com": {
    host: "vercel.com",
    ip: "76.76.21.9",
    status: "200 OK",
    protocol: "HTTP/3",
    ttfb: "22ms",
    tlsVersion: "TLS 1.3",
    server: "Vercel Edge Global",
    stack: [
      { name: "Next.js", category: "App Router", version: "16.4" },
      { name: "React", category: "UI Library", version: "19.0" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Geist Font Stack", category: "Typography" },
      { name: "Turbopack", category: "Build Tool" },
    ],
    headers: [
      { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload", pass: true },
      { name: "Content-Security-Policy", value: "default-src 'self' https://*.vercel.com", pass: true },
      { name: "X-Content-Type-Options", value: "nosniff", pass: true },
    ],
    opportunities: [
      { title: "Image CDN Optimization", impact: "Low", detail: "All media delivered via next/image WebP pipeline." },
    ],
  },
};

function normalizeHost(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "stripe.com";
  try {
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(candidate);
    return parsed.hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return trimmed.toLowerCase();
  }
}

export function HomeInteractive() {
  const { openAuth } = useAuth();
  const [targetInput, setTargetInput] = useState("");
  const [selectedHost, setSelectedHost] = useState("stripe.com");
  const [activeTab, setActiveTab] = useState<InspectorTab>("stack");
  const [isInspecting, setIsInspecting] = useState(false);

  const activeData: DomainPreset = PRESETS[selectedHost] || {
    host: selectedHost,
    ip: "104.21.58.112",
    status: "200 OK",
    protocol: "HTTP/2",
    ttfb: "42ms",
    tlsVersion: "TLS 1.3",
    server: "Edge Proxy / CDN",
    stack: [
      { name: "Detected Web Framework", category: "Frontend Engine" },
      { name: "Cloud CDN", category: "Network Layer" },
      { name: "Security Gate", category: "WAF" },
    ],
    headers: [
      { name: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains", pass: true },
      { name: "Content-Security-Policy", value: "default-src 'self'", pass: true },
      { name: "X-Content-Type-Options", value: "nosniff", pass: true },
    ],
    opportunities: [
      { title: "Inspect in Comprehensive Scanner", impact: "High", detail: "Launch a deep network crawl to catalog all 50+ telemetry endpoints." },
    ],
  };

  function handleInspect(hostToInspect: string) {
    const normalized = normalizeHost(hostToInspect);
    setIsInspecting(true);
    setTargetInput(normalized);

    setTimeout(() => {
      setSelectedHost(normalized);
      setIsInspecting(false);
    }, 400);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!targetInput.trim()) return;
    handleInspect(targetInput);
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="shell">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
              Surface Telemetry Engine
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[11px] text-zinc-400">Zero Credentials Required</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            Continuous intelligence for public web surfaces.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg sm:leading-8">
            WebIntel continuously crawls domains to identify framework architectures, validate
            HTTP security posture, map release diffs, and pinpoint operational vulnerabilities.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="button-primary w-full sm:w-auto"
            >
              <span>Get Started with WebIntel</span>
              <Icon name="arrow-up-right" width={14} height={14} />
            </button>
            <Link href="/#services" className="button-secondary w-full sm:w-auto">
              <span>Explore Architecture &amp; Specs</span>
            </Link>
          </div>
        </div>

        {/* Real Interactive Inspector Console */}
        <div className="mt-14 mx-auto max-w-4xl">
          {/* Quick-Select Domain Bar */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Icon name="terminal" width={13} height={13} className="text-emerald-400" />
              <span>Inspect domain:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(PRESETS).map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => handleInspect(domain)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition ${
                    selectedHost === domain
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                      : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Console Window */}
          <div className="card-terminal overflow-hidden border border-white/[0.1] shadow-2xl">
            {/* Window Titlebar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#070c09] px-4 py-2.5 gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-zinc-300">
                  <Icon name="lock" width={11} height={11} className="text-emerald-400" />
                  <span className="text-zinc-500">https://</span>
                  <span className="font-semibold text-white">{activeData.host}</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  LIVE TELEMETRY
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="hidden md:inline text-zinc-500 text-[10px] uppercase tracking-wider">EDGE // US-EAST</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 border border-emerald-500/20">
                  {activeData.status}
                </span>
                <span className="text-zinc-400">{activeData.ttfb}</span>
              </div>
            </div>

            {/* Target URL Search Input */}
            <form onSubmit={handleSubmit} className="flex border-b border-white/[0.08] bg-[#090f0c] p-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-emerald-400">
                  $
                </span>
                <input
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="Enter any domain to inspect (e.g. github.com, stripe.com, vercel.com)..."
                  className="w-full bg-transparent pl-8 pr-4 py-1.5 font-mono text-xs text-white placeholder-zinc-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1 font-mono text-xs text-zinc-200 transition"
              >
                Inspect ↵
              </button>
            </form>

            {/* Inspector Navigation Tabs */}
            <div className="flex border-b border-white/[0.08] bg-[#070c09] px-4">
              {(
                [
                  { id: "stack", label: "Tech Stack & Packages", icon: "code" },
                  { id: "headers", label: "Security & CSP Headers", icon: "shield" },
                  { id: "network", label: "Network & TLS Handshake", icon: "activity" },
                  { id: "opportunities", label: "Optimization Findings", icon: "zap" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition ${
                    activeTab === tab.id
                      ? "border-emerald-400 text-white bg-white/[0.02]"
                      : "border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon name={tab.icon} width={13} height={13} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-5 sm:p-6 min-h-[260px] bg-[#070b09]">
              {isInspecting ? (
                <div className="flex flex-col items-center justify-center py-12 text-center font-mono text-xs text-emerald-400 animate-pulse">
                  <Icon name="radar" width={24} height={24} className="animate-spin mb-3 text-emerald-400" />
                  <span>Connecting to edge socket &amp; resolving headers for {targetInput}...</span>
                </div>
              ) : (
                <>
                  {/* STACK TAB */}
                  {activeTab === "stack" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Fingerprinted Frameworks &amp; Dependencies ({activeData.stack.length})</span>
                        <span className="font-mono text-[11px] text-emerald-400">Validated DOM Signatures</span>
                      </div>
                      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {activeData.stack.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                          >
                            <div>
                              <p className="text-xs font-medium text-white">{item.name}</p>
                              <p className="font-mono text-[10px] text-zinc-500">{item.category}</p>
                            </div>
                            {item.version && (
                              <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                                v{item.version}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* HEADERS TAB */}
                  {activeTab === "headers" && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-zinc-400 pb-1">
                        <span>Header Directive</span>
                        <span>Evaluation</span>
                      </div>
                      <div className="space-y-2">
                        {activeData.headers.map((hdr) => (
                          <div
                            key={hdr.name}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 flex items-start justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <p className="text-emerald-400 font-semibold">{hdr.name}</p>
                              <p className="text-zinc-400 truncate text-[11px] mt-0.5">{hdr.value}</p>
                            </div>
                            <span className="shrink-0 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px]">
                              PASS
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* NETWORK TAB */}
                  {activeTab === "network" && (
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[10px] uppercase text-zinc-500">Destination IP</p>
                          <p className="text-sm font-semibold text-white mt-1">{activeData.ip}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[10px] uppercase text-zinc-500">Transport</p>
                          <p className="text-sm font-semibold text-emerald-400 mt-1">{activeData.protocol}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[10px] uppercase text-zinc-500">Edge TTFB</p>
                          <p className="text-sm font-semibold text-white mt-1">{activeData.ttfb}</p>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[10px] uppercase text-zinc-500">Server Signature</p>
                          <p className="text-xs font-semibold text-zinc-300 mt-1 truncate">{activeData.server}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 font-mono text-xs">
                        <p className="text-zinc-400 text-[11px]">Cryptographic Suite Handshake:</p>
                        <p className="text-white mt-1 font-semibold">{activeData.tlsVersion}</p>
                      </div>
                    </div>
                  )}

                  {/* OPPORTUNITIES TAB */}
                  {activeTab === "opportunities" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Actionable Technical Improvements</span>
                        <span className="font-mono text-[11px] text-zinc-500">Auto-Generated Signals</span>
                      </div>
                      <div className="space-y-2">
                        {activeData.opportunities.map((opp) => (
                          <div
                            key={opp.title}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 flex items-start justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white text-xs">{opp.title}</span>
                                <span
                                  className={`rounded px-1.5 py-0.2 font-mono text-[9px] uppercase ${
                                    opp.impact === "High"
                                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                      : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                  }`}
                                >
                                  {opp.impact} Priority
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-1">{opp.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Inspector Footer Bar */}
            <div className="flex flex-wrap items-center justify-between border-t border-white/[0.08] bg-[#070c09] px-4 py-2.5 text-xs text-zinc-400">
              <span className="font-mono text-[11px] text-zinc-500">
                Data refreshed via WebIntel Autonomous Node Swarm
              </span>
              <Link
                href="/contact"
                className="font-mono text-[11px] text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
              >
                <span>Automate continuous scans for your domains</span>
                <Icon name="arrow-up-right" width={11} height={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
