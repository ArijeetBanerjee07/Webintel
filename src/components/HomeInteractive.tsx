"use client";

import { FormEvent, useState } from "react";

import { Icon } from "@/components/Icon";

type ScanPhase = "sample" | "ready" | "demo";
type OpportunityBand = "High" | "Medium" | "Strong";

type IntelligenceProfile = {
  host: string;
  systemsAnalyzed: number;
  riskScore: number;
  opportunity: OpportunityBand;
  changeSignals: number;
};

const SAMPLE_PROFILE: IntelligenceProfile = { host: "stripe.com", systemsAnalyzed: 14, riskScore: 86, opportunity: "High", changeSignals: 4 };

const NETWORK_NODES: ReadonlyArray<{ id: string; cx: number; cy: number; hot: boolean }> = [
  { id: "a", cx: 22, cy: 28, hot: false }, { id: "b", cx: 58, cy: 18, hot: true }, { id: "c", cx: 96, cy: 34, hot: true }, { id: "d", cx: 138, cy: 22, hot: false }, { id: "e", cx: 40, cy: 68, hot: true }, { id: "f", cx: 84, cy: 78, hot: false }, { id: "g", cx: 128, cy: 64, hot: true }, { id: "h", cx: 28, cy: 112, hot: false }, { id: "i", cx: 72, cy: 118, hot: true }, { id: "j", cx: 118, cy: 108, hot: false }, { id: "k", cx: 156, cy: 96, hot: true }
];

const NETWORK_LINKS: ReadonlyArray<readonly [string, string]> = [["b", "c"], ["c", "d"], ["b", "e"], ["c", "f"], ["e", "f"], ["f", "g"], ["g", "k"], ["e", "i"], ["i", "j"], ["f", "i"], ["c", "g"]];

function normalizePublicHost(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
    const looksPublic = host.includes(".") && !host.startsWith(".") && !host.endsWith(".") && /^[a-z0-9.-]+$/.test(host);
    return looksPublic ? host : null;
  } catch {
    return null;
  }
}

function profileForHost(host: string): IntelligenceProfile {
  let hash = 0;
  for (const char of host) hash = (Math.imul(hash, 33) + char.charCodeAt(0)) >>> 0;
  const bands: readonly OpportunityBand[] = ["High", "Medium", "Strong"];
  return { host, systemsAnalyzed: 8 + (hash % 19), riskScore: 64 + (hash % 32), opportunity: bands[hash % bands.length] ?? "High", changeSignals: 2 + (hash % 7) };
}

function phaseLabel(phase: ScanPhase): string {
  if (phase === "ready") return "Profile ready";
  if (phase === "demo") return "Live demo";
  return "Sample profile";
}

export function HomeInteractive() {
  const [draftUrl, setDraftUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<ScanPhase>("sample");
  const [profile, setProfile] = useState<IntelligenceProfile>(SAMPLE_PROFILE);

  function commitProfile(next: IntelligenceProfile, nextPhase: Exclude<ScanPhase, "sample">) {
    setProfile(next);
    setPhase(nextPhase);
    setDraftUrl(next.host);
    setError(null);
  }

  function handleScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const host = normalizePublicHost(draftUrl);
    if (!host) {
      setError("Enter a public domain such as stripe.com or https://example.com.");
      return;
    }
    commitProfile(profileForHost(host), "ready");
  }

  function handleDemo() {
    commitProfile(SAMPLE_PROFILE, "demo");
  }

  return <>
    <section className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="shell relative">
       
        <div className="grid gap-12 pb-6 pt-16 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16 lg:pb-4 lg:pt-20">
          <div><HeroCopy draftUrl={draftUrl} error={error} onChange={(value) => { setDraftUrl(value); if (error) setError(null); }} onScan={handleScan} onDemo={handleDemo} phase={phase} /></div>
          <HeroPreview />
        </div>
      </div>
    </section>
    <section aria-live="polite" className="shell relative pb-24 sm:pb-28"><ProfileSummary phase={phase} profile={profile} /></section>
  </>;
}

type HeroCopyProps = { draftUrl: string; error: string | null; phase: ScanPhase; onChange: (value: string) => void; onScan: (event: FormEvent<HTMLFormElement>) => void; onDemo: () => void };

function HeroCopy({ draftUrl, error, phase, onChange, onScan, onDemo }: HeroCopyProps) {
  const primaryLabel = phase === "sample" ? "Generate Profile" : "New Scan";
  return <>
    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/80 bg-emerald-950/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981]" /></span>Website Intelligence &amp; Automated Audits</div>
    <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-[4.65rem]">Turn any public business website into an <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">actionable intelligence profile</span>.</h1>
    <p className="muted-copy mt-7 max-w-xl text-base sm:text-lg">Webintel scans public domains to uncover change intelligence, application insights, risk and compliance gaps, and performance opportunities in seconds.</p>
    <div className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"><form id="scan" onSubmit={onScan} className="flex flex-1 flex-col gap-2 rounded-2xl border border-emerald-500/20 bg-[#060E09]/80 p-2 shadow-[0_0_40px_-18px_rgba(16,185,129,0.55)] backdrop-blur sm:flex-row sm:items-center"><label htmlFor="website-url" className="sr-only">Public website URL</label><input id="website-url" name="website" type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="Enter a public website URL (e.g., stripe.com)" value={draftUrl} onChange={(event) => onChange(event.target.value)} className="h-12 w-full flex-1 rounded-xl border border-transparent bg-transparent px-4 font-mono text-sm text-white outline-none placeholder:text-zinc-500 focus:border-emerald-500/30" /><button type="submit" className="h-12 shrink-0 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-[#030805] shadow-[0_0_24px_-4px_rgba(16,185,129,0.9)] transition hover:bg-emerald-400">{primaryLabel}</button></form><button type="button" onClick={onDemo} className="h-14 rounded-2xl border border-emerald-500/20 bg-transparent px-5 text-sm font-medium text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-500/10 sm:h-auto">View Live Demo</button></div>
    {error ? <p role="alert" className="mt-3 text-sm text-amber-200/90">{error}</p> : <p className="mt-3 font-mono text-[11px] tracking-wide text-zinc-500">Public pages only · No login required</p>}
    <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-500/70"><Icon name="lock" width={13} height={13} />No credentials required</div>
  </>;
}


function HeroPreview() {
  return (
    <div className="panel relative overflow-hidden p-3 shadow-glow sm:p-4">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative flex items-center justify-between border-b border-emerald-950/80 px-2 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
            Performance Intelligence
          </span>
        </div>

        <span className="font-mono text-[10px] text-zinc-600">
          WEB-0248 / 00:00:04
        </span>
      </div>

      <div className="relative grid grid-cols-2 gap-2 py-4">
        <Metric value="14" label="Systems analyzed" />
        <Metric value="0.5s" label="Performance gap" />
      </div>

      <div className="relative overflow-hidden rounded-xl border border-emerald-900/70 bg-[#030805] p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_55%)]" />

        <div className="relative h-[220px] sm:h-[260px]">
          <NetworkAccent />
        </div>

        <div className="relative flex items-center gap-2 px-1 pt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-500/80">
          <Icon name="radar" width={14} height={14} />
          Signal topology / public surface
        </div>
      </div>
    </div>
  );
}

function ProfileSummary({ phase, profile }: { phase: ScanPhase; profile: IntelligenceProfile }) {
  return <div className="panel mx-auto max-w-5xl overflow-hidden p-4 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.45)] backdrop-blur sm:p-6"><div className="flex flex-col gap-4 border-b border-emerald-950/80 pb-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400/80">Domain scan summary</p><p className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">{profile.host}</p></div><div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />{phaseLabel(phase)}</div></div><div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]"><div className="grid gap-3 sm:grid-cols-3"><ProfileMetric label="Systems analyzed" value={String(profile.systemsAnalyzed)} helper="Public systems mapped" /><ProfileMetric label="Risk & compliance score" value={String(profile.riskScore)} tone="emerald" progress={profile.riskScore} /><ProfileMetric label="Performance opportunity" value={profile.opportunity} helper={`${profile.changeSignals} change signals on the public site`} /></div><div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#030805] p-3"><p className="px-1 text-left font-mono text-[11px] uppercase tracking-wide text-emerald-400/80">Signal map</p><div className="mt-1 h-36"><NetworkAccent /></div></div></div></div>;
}

function NetworkAccent() {
  const nodes = new Map(NETWORK_NODES.map((node) => [node.id, node]));
  return <svg viewBox="0 0 176 140" className="h-full w-full" aria-hidden="true">{NETWORK_LINKS.map(([fromId, toId]) => { const from = nodes.get(fromId); const to = nodes.get(toId); if (!from || !to) return null; return <line key={`${fromId}-${toId}`} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy} stroke="rgb(16 185 129 / 0.35)" strokeWidth="1" />; })}{NETWORK_NODES.map((node) => <g key={node.id}>{node.hot ? <circle cx={node.cx} cy={node.cy} r="7" fill="rgb(16 185 129 / 0.16)" /> : null}<circle cx={node.cx} cy={node.cy} r={node.hot ? 2.6 : 1.7} fill={node.hot ? "#34d399" : "#064e3b"} /></g>)}</svg>;
}

function Metric({ value, label }: { value: string; label: string }) { return <div className="rounded-lg border border-emerald-950/80 bg-[#06100A] p-3"><p className="text-xl font-semibold text-white">{value}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-600">{label}</p></div>; }
function ProfileMetric({ label, value, helper, tone = "white", progress }: { label: string; value: string; helper?: string; tone?: "white" | "emerald"; progress?: number }) { return <article className="rounded-2xl border border-emerald-950/80 bg-[#030805]/80 p-4 text-left"><p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">{label}</p><p className={`mt-3 text-2xl font-semibold ${tone === "emerald" ? "text-emerald-400" : "text-white"}`}>{value}</p>{typeof progress === "number" ? <div className="mt-3 h-1 overflow-hidden rounded-full bg-emerald-950"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${progress}%` }} /></div> : <p className="mt-1 text-xs text-zinc-400">{helper}</p>}</article>; }
