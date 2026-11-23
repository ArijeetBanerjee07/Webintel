"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ExternalLink,
  Filter,
  Link2,
  Search,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

type SeoPage =
  | "keywords"
  | "rankings"
  | "serp"
  | "backlinks"
  | "domains"
  | "top-pages"
  | "technical";

type Metric = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  detail?: string;
};

const pageConfig: Record<SeoPage, { eyebrow: string; title: string; description: string }> = {
  keywords: {
    eyebrow: "SEO Intelligence / Search visibility",
    title: "Organic Keywords",
    description: "Estimate keyword coverage, search intent, ranking distribution, and pages competing for the same query.",
  },
  rankings: {
    eyebrow: "SEO Intelligence / Search visibility",
    title: "Keyword Rankings",
    description: "Track ranking movement across target queries, positions, landing pages, and search result opportunities.",
  },
  serp: {
    eyebrow: "SEO Intelligence / Search research",
    title: "SERP Overview",
    description: "Understand search result features, intent patterns, and the opportunities shaping each query.",
  },
  backlinks: {
    eyebrow: "SEO Intelligence / Authority",
    title: "Backlink Profile",
    description: "Review referring links, anchor text, link types, authority signals, and newly discovered changes.",
  },
  domains: {
    eyebrow: "SEO Intelligence / Authority",
    title: "Referring Domains",
    description: "Explore the domains linking to your site and identify the sources contributing the most authority.",
  },
  "top-pages": {
    eyebrow: "SEO Intelligence / Content performance",
    title: "Top Pages",
    description: "Find the pages capturing the most organic visibility and identify content that can be improved or expanded.",
  },
  technical: {
    eyebrow: "SEO Intelligence / Technical SEO",
    title: "Technical SEO",
    description: "Review on-page quality signals including metadata, headings, internal links, images, schema, and content depth.",
  },
};

const keywordRows = [
  { keyword: "technical seo audit", intent: "Commercial", volume: "8.1K", position: "3", change: "+2", page: "/services/seo-audit", feature: "Sitelinks" },
  { keyword: "website intelligence platform", intent: "Commercial", volume: "5.4K", position: "7", change: "+4", page: "/", feature: "—" },
  { keyword: "how to find broken links", intent: "Informational", volume: "3.2K", position: "11", change: "-1", page: "/blog/broken-links", feature: "People also ask" },
  { keyword: "schema validation tool", intent: "Transactional", volume: "2.6K", position: "14", change: "+6", page: "/metadata-schema", feature: "Review stars" },
  { keyword: "seo crawler software", intent: "Commercial", volume: "1.9K", position: "21", change: "+3", page: "/services/crawler", feature: "—" },
];

const rankingRows = [
  { keyword: "website audit software", position: 4, previous: 8, url: "/audit", volume: "12.4K", intent: "Commercial" },
  { keyword: "technical seo checklist", position: 8, previous: 6, url: "/blog/technical-seo", volume: "9.8K", intent: "Informational" },
  { keyword: "broken link checker", position: 12, previous: 19, url: "/broken-links", volume: "7.1K", intent: "Transactional" },
  { keyword: "json ld validator", position: 18, previous: 24, url: "/metadata-schema", volume: "4.6K", intent: "Transactional" },
  { keyword: "seo monitoring dashboard", position: 31, previous: 28, url: "/dashboard", volume: "2.2K", intent: "Commercial" },
];

const serpRows = [
  { keyword: "website audit software", intent: "Commercial", features: ["Sitelinks", "Reviews"], coverage: "Owned", opportunity: "Add comparison content" },
  { keyword: "technical seo checklist", intent: "Informational", features: ["Featured snippet", "PAA"], coverage: "Partial", opportunity: "Answer checklist questions" },
  { keyword: "broken link checker", intent: "Transactional", features: ["Video", "PAA"], coverage: "Missing", opportunity: "Publish product walkthrough" },
  { keyword: "schema validator", intent: "Transactional", features: ["Reviews"], coverage: "Partial", opportunity: "Strengthen product schema" },
];

const backlinkRows = [
  { source: "searchenginejournal.com", target: "/blog/technical-seo", type: "Editorial", anchor: "technical SEO guide", authority: "91", status: "New" },
  { source: "producthunt.com", target: "/", type: "Profile", anchor: "WebIntel", authority: "88", status: "Active" },
  { source: "growthweekly.co", target: "/services", type: "Editorial", anchor: "website intelligence", authority: "64", status: "New" },
  { source: "example-directory.com", target: "/contact", type: "Directory", anchor: "Visit website", authority: "42", status: "Lost" },
];

const domainRows = [
  { domain: "searchenginejournal.com", links: 14, authority: "91", firstSeen: "May 2026", status: "Growing" },
  { domain: "producthunt.com", links: 9, authority: "88", firstSeen: "Jun 2026", status: "Stable" },
  { domain: "growthweekly.co", links: 6, authority: "64", firstSeen: "Nov 2026", status: "New" },
  { domain: "example-directory.com", links: 3, authority: "42", firstSeen: "Jan 2026", status: "Declining" },
];

const topPageRows = [
  { path: "/blog/technical-seo", clicks: "18.4K", impressions: "242K", ctr: "7.6%", position: "6.2", trend: "+18%" },
  { path: "/services/seo-audit", clicks: "12.8K", impressions: "116K", ctr: "11.0%", position: "4.1", trend: "+9%" },
  { path: "/broken-links", clicks: "7.4K", impressions: "98K", ctr: "7.5%", position: "10.8", trend: "+24%" },
  { path: "/metadata-schema", clicks: "5.9K", impressions: "83K", ctr: "7.1%", position: "13.4", trend: "+31%" },
];

const technicalRows = [
  { page: "/", title: "Good", meta: "Good", headings: "Good", links: "Good", images: "Good", schema: "Organization", depth: "0" },
  { page: "/services/seo-audit", title: "Good", meta: "Missing", headings: "Good", links: "Good", images: "2 missing", schema: "Product", depth: "2" },
  { page: "/blog/technical-seo", title: "Duplicate", meta: "Good", headings: "Missing H1", links: "Low", images: "4 missing", schema: "Article", depth: "4" },
  { page: "/metadata-schema", title: "Good", meta: "Good", headings: "Good", links: "Good", images: "Good", schema: "Malformed", depth: "1" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const TrendIcon = metric.trend === "down" ? TrendingDown : TrendingUp;

  return (
    <div className="panel panel-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-[#92a297]">{metric.label}</span>
        {metric.trend && metric.trend !== "neutral" && (
          <TrendIcon className={metric.trend === "up" ? "h-4 w-4 text-emerald-300" : "h-4 w-4 text-rose-300"} />
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">{metric.value}</p>
      {metric.change && <p className="mt-2 text-xs text-emerald-300">{metric.change}</p>}
      {metric.detail && <p className="mt-2 text-xs text-[#63746a]">{metric.detail}</p>}
    </div>
  );
}

function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "good" | "warning" | "danger" | "neutral" }) {
  const tones = {
    good: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
    warning: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    danger: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    neutral: "border-white/[0.08] bg-white/[0.03] text-[#b5c0b9]",
  };

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>{children}</span>;
}

function PageHeader({ page }: { page: SeoPage }) {
  const config = pageConfig[page];

  return (
    <header className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow mb-3">{config.eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{config.title}</h1>
        <p className="muted-copy mt-3 max-w-2xl">{config.description}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" className="button-secondary">
          <Filter className="h-4 w-4" />
          Filters
        </button>
        <button type="button" className="button-primary">
          <Sparkles className="h-4 w-4" />
          Refresh data
        </button>
      </div>
    </header>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#63746a]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-[#63746a] focus:border-emerald-400/50"
      />
    </div>
  );
}

function TableShell({ children }: { children: ReactNode }) {
  return <div className="panel overflow-hidden">{children}</div>;
}

function TableHeader({ children }: { children: ReactNode }) {
  return <div className="hidden min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.08] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#63746a] md:grid">{children}</div>;
}

function TableCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 ${className}`}>{children}</div>;
}

function KeywordsPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => keywordRows.filter((row) => `${row.keyword} ${row.page}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <>
      <PageHeader page="keywords" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard metric={{ label: "Organic keywords", value: "4,826", change: "+12.4% vs. last scan", trend: "up" }} />
        <MetricCard metric={{ label: "Top 10 keywords", value: "386", change: "+28 this period", trend: "up" }} />
        <MetricCard metric={{ label: "Commercial intent", value: "41%", detail: "1,978 tracked keywords" }} />
        <MetricCard metric={{ label: "Cannibalization hints", value: "12", change: "Review recommended", trend: "down" }} />
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-5">
          <div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Ranking distribution</p><h2 className="mt-2 text-lg font-semibold text-white">Visibility by position</h2></div><Target className="h-5 w-5 text-emerald-300" /></div>
          <div className="mt-6 space-y-4">
            {[['Top 3', '18%', 'bg-emerald-300'], ['Positions 4–10', '32%', 'bg-emerald-500'], ['Positions 11–20', '27%', 'bg-amber-300'], ['Positions 21–50', '23%', 'bg-white/20']].map(([label, value, color]) => <div key={label}><div className="mb-2 flex justify-between text-xs"><span className="text-[#b5c0b9]">{label}</span><span className="text-white">{value}</span></div><div className="h-2 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${color}`} style={{ width: value }} /></div></div>)}
          </div>
        </div>
        <div className="panel p-5"><p className="eyebrow">Intent mix</p><h2 className="mt-2 text-lg font-semibold text-white">Search intent coverage</h2><div className="mt-5 grid grid-cols-2 gap-3">{[['Informational', '46%', 'emerald'], ['Commercial', '31%', 'amber'], ['Transactional', '17%', 'rose'], ['Navigational', '6%', 'slate']].map(([label, value, tone]) => <div key={label} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3"><p className="text-xs text-[#92a297]">{label}</p><p className={`mt-2 text-xl font-semibold ${tone === 'emerald' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-200' : tone === 'rose' ? 'text-rose-300' : 'text-white'}`}>{value}</p></div>)}</div></div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center"><SearchBar value={query} onChange={setQuery} placeholder="Search keywords or landing pages" /><button type="button" className="button-secondary shrink-0"><ChevronDown className="h-4 w-4" /> Intent: All</button></div>
      <TableShell><TableHeader><TableCell className="col-span-3">Keyword</TableCell><TableCell className="col-span-2">Intent</TableCell><TableCell className="col-span-1">Volume</TableCell><TableCell className="col-span-1">Position</TableCell><TableCell className="col-span-1">Change</TableCell><TableCell className="col-span-3">Landing page</TableCell><TableCell className="col-span-1">SERP</TableCell></TableHeader>{rows.map((row) => <div key={row.keyword} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-3 font-medium text-white">{row.keyword}</TableCell><TableCell className="col-span-2"><StatusPill tone={row.intent === 'Transactional' ? 'warning' : 'neutral'}>{row.intent}</StatusPill></TableCell><TableCell className="col-span-1 text-[#b5c0b9]">{row.volume}</TableCell><TableCell className="col-span-1 font-semibold text-emerald-300">{row.position}</TableCell><TableCell className={`col-span-1 ${row.change.startsWith('+') ? 'text-emerald-300' : 'text-rose-300'}`}>{row.change}</TableCell><TableCell className="col-span-3 truncate text-[#92a297]">{row.page}</TableCell><TableCell className="col-span-1 text-xs text-[#92a297]">{row.feature}</TableCell></div>)}</TableShell>
    </>
  );
}

function RankingsPage() {
  const [query, setQuery] = useState("");
  const rows = rankingRows.filter((row) => `${row.keyword} ${row.url}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader page="rankings" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Average position", value: "12.8", change: "Improved 1.6 positions", trend: "up" }} /><MetricCard metric={{ label: "Keywords improved", value: "684", change: "+14.8%", trend: "up" }} /><MetricCard metric={{ label: "Keywords declined", value: "128", change: "Monitor 23 pages", trend: "down" }} /><MetricCard metric={{ label: "Featured opportunities", value: "42", detail: "Queries in positions 4–10" }} /></div><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center"><SearchBar value={query} onChange={setQuery} placeholder="Search ranking keywords or URLs" /><button type="button" className="button-secondary shrink-0"><ChevronDown className="h-4 w-4" /> Country: Global</button><button type="button" className="button-secondary shrink-0"><ChevronDown className="h-4 w-4" /> Device: All</button></div><TableShell><TableHeader><TableCell className="col-span-3">Keyword</TableCell><TableCell className="col-span-1">Position</TableCell><TableCell className="col-span-1">Previous</TableCell><TableCell className="col-span-2">Movement</TableCell><TableCell className="col-span-3">Ranking URL</TableCell><TableCell className="col-span-2">Intent / volume</TableCell></TableHeader>{rows.map((row) => { const difference = row.previous - row.position; return <div key={row.keyword} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-3 font-medium text-white">{row.keyword}</TableCell><TableCell className="col-span-1 text-lg font-semibold text-emerald-300">{row.position}</TableCell><TableCell className="col-span-1 text-[#92a297]">{row.previous}</TableCell><TableCell className="col-span-2">{difference >= 0 ? <span className="inline-flex items-center gap-1 text-emerald-300"><ArrowUpRight className="h-4 w-4" /> +{difference}</span> : <span className="inline-flex items-center gap-1 text-rose-300"><ArrowDownRight className="h-4 w-4" /> {difference}</span>}</TableCell><TableCell className="col-span-3 truncate text-[#92a297]">{row.url}</TableCell><TableCell className="col-span-2"><p className="text-xs text-[#d6dfd9]">{row.intent}</p><p className="mt-1 text-xs text-[#63746a]">{row.volume} searches</p></TableCell></div>})}</TableShell></>;
}

function SerpPage() {
  return <><PageHeader page="serp" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Queries analyzed", value: "1,284", detail: "Across 6 countries" }} /><MetricCard metric={{ label: "SERP features", value: "9", change: "Detected in your market", trend: "up" }} /><MetricCard metric={{ label: "Feature ownership", value: "23%", change: "+4.2% this period", trend: "up" }} /><MetricCard metric={{ label: "Open opportunities", value: "74", detail: "Features without coverage" }} /></div><div className="panel mb-5 p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="eyebrow">SERP feature coverage</p><h2 className="mt-2 text-lg font-semibold text-white">Where your content appears</h2></div><button type="button" className="button-secondary self-start"><ExternalLink className="h-4 w-4" /> Open SERP sample</button></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Organic result', '86%', 'Owned', 'good'], ['People also ask', '34%', 'Partial', 'warning'], ['Featured snippet', '12%', 'Missing', 'danger'], ['Reviews', '18%', 'Partial', 'warning']].map(([label, value, status, tone]) => <div key={label} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4"><div className="flex items-center justify-between"><p className="text-sm text-[#b5c0b9]">{label}</p><StatusPill tone={tone as 'good' | 'warning' | 'danger'}>{status}</StatusPill></div><p className="mt-4 text-2xl font-semibold text-white">{value}</p></div>)}</div></div><TableShell><TableHeader><TableCell className="col-span-3">Keyword</TableCell><TableCell className="col-span-2">Intent</TableCell><TableCell className="col-span-2">Features</TableCell><TableCell className="col-span-2">Coverage</TableCell><TableCell className="col-span-3">Opportunity</TableCell></TableHeader>{serpRows.map((row) => <div key={row.keyword} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-3 font-medium text-white">{row.keyword}</TableCell><TableCell className="col-span-2 text-[#b5c0b9]">{row.intent}</TableCell><TableCell className="col-span-2 flex flex-wrap gap-1">{row.features.map((feature) => <span key={feature} className="rounded bg-white/[0.04] px-2 py-1 text-[10px] text-[#b5c0b9]">{feature}</span>)}</TableCell><TableCell className="col-span-2"><StatusPill tone={row.coverage === 'Owned' ? 'good' : row.coverage === 'Partial' ? 'warning' : 'danger'}>{row.coverage}</StatusPill></TableCell><TableCell className="col-span-3 text-[#92a297]">{row.opportunity}</TableCell></div>)}</TableShell></>;
}

function BacklinksPage() {
  return <><PageHeader page="backlinks" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Backlinks", value: "18.7K", change: "+8.4% this period", trend: "up" }} /><MetricCard metric={{ label: "Referring domains", value: "1,284", change: "+42 new domains", trend: "up" }} /><MetricCard metric={{ label: "New links", value: "326", detail: "Last 30 days" }} /><MetricCard metric={{ label: "Lost links", value: "74", change: "12 need review", trend: "down" }} /></div><div className="mb-5 grid gap-4 lg:grid-cols-3"><div className="panel p-5"><p className="eyebrow">Link types</p><h2 className="mt-2 text-lg font-semibold text-white">Follow vs. nofollow</h2><div className="mt-6 flex items-center gap-5"><div className="relative h-24 w-24 rounded-full" style={{ background: 'conic-gradient(#10b981 0 72%, #33453b 72% 100%)' }}><div className="absolute inset-3 flex items-center justify-center rounded-full bg-[#080d0a] text-lg font-semibold text-white">72%</div></div><div className="space-y-2 text-xs"><p className="text-emerald-300">● Follow 13.4K</p><p className="text-[#92a297]">● Nofollow 5.3K</p></div></div></div><div className="panel p-5 lg:col-span-2"><p className="eyebrow">Authority trend</p><h2 className="mt-2 text-lg font-semibold text-white">Domain authority movement</h2><div className="mt-6 flex h-24 items-end gap-2">{[34, 42, 38, 51, 47, 64, 59, 71, 68, 82, 77, 91].map((height, index) => <div key={index} className="flex-1 rounded-t bg-emerald-400/60" style={{ height: `${height}%` }} />)}</div><div className="mt-3 flex justify-between text-[10px] text-[#63746a]"><span>Dec 2025</span><span>Nov 2026</span></div></div></div><TableShell><TableHeader><TableCell className="col-span-3">Source domain</TableCell><TableCell className="col-span-2">Target URL</TableCell><TableCell className="col-span-2">Link type</TableCell><TableCell className="col-span-2">Anchor text</TableCell><TableCell className="col-span-1">Authority</TableCell><TableCell className="col-span-2">Status</TableCell></TableHeader>{backlinkRows.map((row) => <div key={`${row.source}-${row.target}`} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-3 font-medium text-white">{row.source}</TableCell><TableCell className="col-span-2 truncate text-[#92a297]">{row.target}</TableCell><TableCell className="col-span-2 text-[#b5c0b9]">{row.type}</TableCell><TableCell className="col-span-2 truncate text-[#92a297]">{row.anchor}</TableCell><TableCell className="col-span-1 font-semibold text-emerald-300">{row.authority}</TableCell><TableCell className="col-span-2"><StatusPill tone={row.status === 'Lost' ? 'danger' : row.status === 'New' ? 'good' : 'neutral'}>{row.status}</StatusPill></TableCell></div>)}</TableShell></>;
}

function DomainsPage() {
  const [query, setQuery] = useState("");
  const rows = domainRows.filter((row) => row.domain.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader page="domains" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Referring domains", value: "1,284", change: "+42 this month", trend: "up" }} /><MetricCard metric={{ label: "High-authority domains", value: "184", detail: "Authority score 70+" }} /><MetricCard metric={{ label: "New domains", value: "42", change: "+18.2%", trend: "up" }} /><MetricCard metric={{ label: "Declining domains", value: "17", change: "Review lost links", trend: "down" }} /></div><div className="mb-4 flex flex-col gap-3 sm:flex-row"><SearchBar value={query} onChange={setQuery} placeholder="Search referring domains" /><button type="button" className="button-secondary"><ChevronDown className="h-4 w-4" /> Sort: Authority</button></div><TableShell><TableHeader><TableCell className="col-span-4">Referring domain</TableCell><TableCell className="col-span-2">Backlinks</TableCell><TableCell className="col-span-2">Authority</TableCell><TableCell className="col-span-2">First seen</TableCell><TableCell className="col-span-2">Status</TableCell></TableHeader>{rows.map((row) => <div key={row.domain} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-4 flex items-center gap-2 font-medium text-white"><Link2 className="h-4 w-4 text-emerald-300" />{row.domain}</TableCell><TableCell className="col-span-2 text-[#b5c0b9]">{row.links}</TableCell><TableCell className="col-span-2 font-semibold text-emerald-300">{row.authority}</TableCell><TableCell className="col-span-2 text-[#92a297]">{row.firstSeen}</TableCell><TableCell className="col-span-2"><StatusPill tone={row.status === 'Declining' ? 'danger' : row.status === 'New' ? 'good' : 'neutral'}>{row.status}</StatusPill></TableCell></div>)}</TableShell></>;
}

function TopPagesPage() {
  return <><PageHeader page="top-pages" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Organic clicks", value: "44.5K", change: "+16.8%", trend: "up" }} /><MetricCard metric={{ label: "Impressions", value: "694K", change: "+11.4%", trend: "up" }} /><MetricCard metric={{ label: "Average CTR", value: "8.7%", detail: "Across tracked pages" }} /><MetricCard metric={{ label: "Average position", value: "9.4", change: "Improved 1.2 positions", trend: "up" }} /></div><TableShell><TableHeader><TableCell className="col-span-4">Landing page</TableCell><TableCell className="col-span-2">Clicks</TableCell><TableCell className="col-span-2">Impressions</TableCell><TableCell className="col-span-1">CTR</TableCell><TableCell className="col-span-1">Position</TableCell><TableCell className="col-span-2">Trend</TableCell></TableHeader>{topPageRows.map((row) => <div key={row.path} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-4 flex items-center gap-2 font-medium text-white"><ExternalLink className="h-4 w-4 text-emerald-300" />{row.path}</TableCell><TableCell className="col-span-2 text-[#b5c0b9]">{row.clicks}</TableCell><TableCell className="col-span-2 text-[#b5c0b9]">{row.impressions}</TableCell><TableCell className="col-span-1 text-[#b5c0b9]">{row.ctr}</TableCell><TableCell className="col-span-1 font-semibold text-emerald-300">{row.position}</TableCell><TableCell className="col-span-2 text-emerald-300">{row.trend}</TableCell></div>)}</TableShell></>;
}

function TechnicalPage() {
  return <><PageHeader page="technical" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard metric={{ label: "Technical score", value: "82/100", change: "+6 points", trend: "up" }} /><MetricCard metric={{ label: "Pages audited", value: "248", detail: "Latest crawl" }} /><MetricCard metric={{ label: "Critical issues", value: "7", change: "3 unresolved", trend: "down" }} /><MetricCard metric={{ label: "Schema coverage", value: "68%", change: "+12% this period", trend: "up" }} /></div><div className="mb-5 grid gap-4 lg:grid-cols-3"><div className="panel p-5 lg:col-span-2"><p className="eyebrow">On-page audit health</p><h2 className="mt-2 text-lg font-semibold text-white">Signal coverage</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{[['Title and metadata', '91%', 'good'], ['Heading structure', '84%', 'good'], ['Internal links', '73%', 'warning'], ['Image alt text', '64%', 'warning'], ['Schema markup', '68%', 'warning'], ['Content depth', '79%', 'good']].map(([label, value, tone]) => <div key={label} className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4"><div className="flex items-center justify-between"><span className="text-sm text-[#b5c0b9]">{label}</span><span className={tone === 'good' ? 'text-emerald-300' : 'text-amber-200'}>{value}</span></div><div className="mt-3 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${tone === 'good' ? 'bg-emerald-400' : 'bg-amber-300'}`} style={{ width: value }} /></div></div>)}</div></div><div className="panel p-5"><p className="eyebrow">Priority queue</p><h2 className="mt-2 text-lg font-semibold text-white">Needs attention</h2><div className="mt-5 space-y-3">{[['Duplicate titles', '12 pages', 'danger'], ['Missing alt text', '27 images', 'warning'], ['Depth > 3 clicks', '6 pages', 'warning'], ['Malformed schema', '2 pages', 'danger']].map(([label, count, tone]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3 last:border-0"><div className="flex items-center gap-2">{tone === 'danger' ? <CircleAlert className="h-4 w-4 text-rose-300" /> : <CircleAlert className="h-4 w-4 text-amber-200" />}<span className="text-sm text-[#d6dfd9]">{label}</span></div><span className="text-xs text-[#92a297]">{count}</span></div>)}</div></div></div><TableShell><TableHeader><TableCell className="col-span-3">Page</TableCell><TableCell className="col-span-1">Title</TableCell><TableCell className="col-span-1">Meta</TableCell><TableCell className="col-span-1">Headings</TableCell><TableCell className="col-span-1">Links</TableCell><TableCell className="col-span-2">Images / schema</TableCell><TableCell className="col-span-2">Depth</TableCell></TableHeader>{technicalRows.map((row) => <div key={row.page} className="grid min-w-[760px] grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-4 text-sm last:border-0"><TableCell className="col-span-3 font-medium text-white">{row.page}</TableCell><TableCell className="col-span-1"><CheckCell value={row.title} /></TableCell><TableCell className="col-span-1"><CheckCell value={row.meta} /></TableCell><TableCell className="col-span-1"><CheckCell value={row.headings} /></TableCell><TableCell className="col-span-1"><CheckCell value={row.links} /></TableCell><TableCell className="col-span-2 text-xs text-[#92a297]">{row.images}<br />{row.schema}</TableCell><TableCell className="col-span-2"><StatusPill tone={Number(row.depth) > 3 ? 'danger' : Number(row.depth) === 3 ? 'warning' : 'good'}>{row.depth} clicks</StatusPill></TableCell></div>)}</TableShell></>;
}

function CheckCell({ value }: { value: string }) {
  const good = value === "Good";
  const bad = value === "Missing" || value === "Duplicate" || value === "Malformed" || value === "Low";
  return <span className={`inline-flex items-center gap-1 text-xs ${good ? 'text-emerald-300' : bad ? 'text-amber-200' : 'text-[#92a297]'}`}>{good ? <CheckCircle2 className="h-3.5 w-3.5" /> : bad ? <XCircle className="h-3.5 w-3.5" /> : null}{value}</span>;
}

export default function SeoIntelligencePage({ page }: { page: SeoPage }) {
  return <main className="min-h-screen bg-[var(--forest-950)] text-[#e6eae7]"><div className="shell py-8 sm:py-10"><PageRenderer page={page} /></div></main>;
}

function PageRenderer({ page }: { page: SeoPage }) {
  switch (page) {
    case "keywords": return <KeywordsPage />;
    case "rankings": return <RankingsPage />;
    case "serp": return <SerpPage />;
    case "backlinks": return <BacklinksPage />;
    case "domains": return <DomainsPage />;
    case "top-pages": return <TopPagesPage />;
    case "technical": return <TechnicalPage />;
  }
}
