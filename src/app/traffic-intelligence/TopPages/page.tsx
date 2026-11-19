'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';
const SUB_CARD_STYLE = 'rounded-lg bg-[#08120e] border border-emerald-950 p-3';

type RouteCategory = 'Developer API' | 'Core Product' | 'Commercial' | 'Onboarding';
type FilterTab = 'ALL' | RouteCategory;
type SortField = 'rank' | 'visits' | 'mom';

interface RouteRow {
  rank: number;
  url: string;
  sub: string;
  category: RouteCategory;
  visits: number;
  share: string;
  mom: number;
  orgPct: number;
  dirPct: number;
  duration: string;
  bounce: string;
  keyword: string;
}

const KPI_CARDS = [
  {
    title: 'Top 10 Pages Traffic Share',
    main: '61.4%',
    accent: '+2.1%',
    accentClass: 'text-xs text-emerald-400 font-mono',
    desc: '29.6M of 48.2M total monthly visits',
    footerLeft: 'Heavy Concentration',
    footerRight: 'Docs & Checkout Dominated',
    footerRightHighlight: true,
  },
  {
    title: 'Primary Power Subdomain',
    main: 'docs',
    accent: '.stripe.com',
    accentClass: 'text-sm text-slate-400 font-mono',
    desc: '18.4M visits/mo (38.2% domain share)',
    footerLeft: '+7.9% MoM',
    footerLeftHighlight: true,
    footerRight: '14,210 routes indexed',
  },
  {
    title: 'Highest Velocity Route',
    main: '/docs/api/ch...',
    isMonoMain: true,
    desc: '1.42M visits · Direct developer index',
    footerLeft: '↗ +16.2% MoM',
    footerLeftHighlight: true,
    footerRight: 'v2 Migration Influx',
  },
  {
    title: 'Session Depth on Top Pages',
    main: '4.12',
    accent: 'pages / visit',
    accentClass: 'text-xs text-slate-400',
    desc: 'Bounce Rate: 28.4% (Industry avg 44%)',
    footerLeft: 'Superior Doc Stickiness',
    footerLeftHighlight: true,
    footerRight: 'Avg 04m 38s duration',
  },
];

const SUBDOMAINS = [
  { host: 'docs.stripe.com', desc: 'API, SDKs, quickstarts, webhooks', visits: '18.4M', share: 38.2, trend: '↑', barColor: 'bg-emerald-400' },
  { host: 'stripe.com (Root & Marketing)', desc: 'Pricing, enterprise, atlas, core', visits: '13.7M', share: 28.4, trend: '→', barColor: 'bg-emerald-500' },
  { host: 'dashboard.stripe.com', desc: 'Merchant auth, logs, payouts', visits: '10.3M', share: 21.4, trend: '↑', barColor: 'bg-emerald-700' },
  { host: 'connect.stripe.com', desc: 'Marketplace onboarding, KYC flow', visits: '3.3M', share: 6.8, trend: '↑', barColor: 'bg-emerald-800' },
  { host: 'billing.stripe.com & Portals', desc: 'Customer invoice management', visits: '2.5M', share: 5.2, trend: '↑', barColor: 'bg-emerald-950' },
];

const INTENT_BUCKETS = [
  { label: '<> Technical Docs & API Reference', sub: 'High-intent · Deep code inspection', share: 44.6, visits: '21.5M visits' },
  { label: '📦 Product Landing & Pricing', sub: 'Commercial evaluation & quotes', share: 27.2, visits: '13.1M visits' },
  { label: '🔐 Auth & Merchant Operations', sub: 'Active merchant operations & logs', share: 20.8, visits: '10.0M visits' },
  { label: '📰 Blog, Research & Changelog', sub: 'Top-of-funnel thought leadership', share: 7.4, visits: '3.6M visits' },
];

const ROUTE_LEDGER: RouteRow[] = [
  { rank: 1, url: 'stripe.com/docs', sub: 'Stripe Documentation: Developer Knowledge Hub', category: 'Developer API', visits: 7_820_000, share: '16.2%', mom: 8.4, orgPct: 68, dirPct: 32, duration: '05m 48s', bounce: '24.1%', keyword: '"stripe docs"' },
  { rank: 2, url: 'stripe.com/pricing', sub: 'Stripe Pricing & Interchange Fee Architecture', category: 'Commercial', visits: 5_140_000, share: '10.7%', mom: 5.1, orgPct: 66, dirPct: 24, duration: '03m 14s', bounce: '36.8%', keyword: '"stripe pricing"' },
  { rank: 3, url: 'stripe.com/docs/api', sub: 'Full REST API Reference & SDK Parameters', category: 'Developer API', visits: 4_690_000, share: '9.7%', mom: 14.8, orgPct: 42, dirPct: 49, duration: '08m 22s', bounce: '19.2%', keyword: '"create payment"' },
  { rank: 4, url: 'stripe.com/payments', sub: 'Online Payment Processing & Checkout Solutions', category: 'Core Product', visits: 3_250_000, share: '6.7%', mom: 1.8, orgPct: 71, dirPct: 19, duration: '02m 45s', bounce: '39.1%', keyword: '"online payment"' },
  { rank: 5, url: 'stripe.com/docs/connect', sub: 'Stripe Connect: Platform, Marketplace Onboarding & Routing', category: 'Developer API', visits: 2_880_000, share: '5.9%', mom: 11.2, orgPct: 48, dirPct: 38, duration: '06m 12s', bounce: '23.8%', keyword: '"stripe connect"' },
  { rank: 6, url: 'stripe.com/atlas', sub: 'Delaware C-Corp Startup Legal Incorporation Platform', category: 'Onboarding', visits: 1_940_000, share: '4.0%', mom: -1.4, orgPct: 52, dirPct: 26, duration: '04m 02s', bounce: '33.6%', keyword: '"incorporate startup"' },
  { rank: 7, url: 'stripe.com/billing', sub: 'SaaS Subscription Management & Invoicing Automation', category: 'Core Product', visits: 1_610_000, share: '3.3%', mom: 6.9, orgPct: 61, dirPct: 26, duration: '03m 50s', bounce: '31.8%', keyword: '"saas billing"' },
];

const ENTRY_PAGES = [
  { path: '/docs (All Guides)', share: '34.2%', desc: 'Chief landing page for organic search' },
  { path: '/ (Homepage Root)', share: '21.4%', desc: 'Brand queries & direct navigation' },
  { path: '/pricing', share: '14.1%', desc: 'High-intent SaaS buyer searches' },
];

const EXIT_ENDPOINTS = [
  { path: 'dashboard.stripe.com', share: '42.4%', desc: 'Seamless funnel handoff to logged-in app' },
  { path: '/docs/api/* (Completed)', share: '18.6%', desc: 'Engineers copy code snippets and depart' },
  { path: 'support.stripe.com', share: '9.1%', desc: 'Self-service ticket resolution transfer' },
];

const AI_CITATIONS = [
  { engine: 'Perplexity Rank', metric: '#1 Citation', highlight: false },
  { engine: 'ChatGPT Search', metric: '88.4% Pick', highlight: true },
  { engine: 'Claude Artifacts', metric: '96.1% Match', highlight: true },
];

const FILTER_TABS: FilterTab[] = ['ALL', 'Developer API', 'Core Product', 'Commercial', 'Onboarding'];

export default function TopPagesPage() {
  const [activeCategory, setActiveCategory] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('rank');

  const filteredAndSortedRoutes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ROUTE_LEDGER.filter((route) => {
      const matchesCategory = activeCategory === 'ALL' || route.category === activeCategory;
      const matchesQuery =
        !query ||
        route.url.toLowerCase().includes(query) ||
        route.sub.toLowerCase().includes(query) ||
        route.keyword.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'visits') return b.visits - a.visits;
      if (sortBy === 'mom') return b.mom - a.mom;
      return a.rank - b.rank;
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.title} className={`${CARD_STYLE} flex flex-col justify-between`}>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`${kpi.isMonoMain ? 'text-2xl font-mono truncate' : 'text-3xl'} font-bold text-white`}>
                {kpi.main}
              </span>
              {kpi.accent && <span className={kpi.accentClass}>{kpi.accent}</span>}
            </div>
            <p className="mt-3 text-xs text-slate-400">{kpi.desc}</p>
            <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px] text-slate-500">
              <span className={kpi.footerLeftHighlight ? 'text-emerald-400 font-mono' : ''}>{kpi.footerLeft}</span>
              <span className={kpi.footerRightHighlight ? 'text-emerald-400' : ''}>{kpi.footerRight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-5`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Subdomain Traffic Allocation</h2>
              <p className="text-xs text-slate-400 mt-0.5">Telemetry clustered by structural enterprise subdomain partitions</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">100% Normalized</span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 bg-[#060e0b]">
            {SUBDOMAINS.map((sub) => (
              <div key={sub.host} className={`h-full ${sub.barColor}`} style={{ width: `${sub.share}%` }} />
            ))}
          </div>

          <div className="space-y-3 pt-1">
            {SUBDOMAINS.map((sub) => (
              <div key={sub.host} className="flex items-center justify-between text-xs py-1 border-b border-emerald-950/60">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className={`w-2 h-2 rounded-full ${sub.barColor} shrink-0`} />
                  <span className="font-semibold text-white shrink-0">{sub.host}</span>
                  <span className="text-slate-500 truncate">{sub.desc}</span>
                </div>
                <div className="flex items-center gap-4 font-mono shrink-0">
                  <span className="text-slate-300">{sub.visits}</span>
                  <span className="text-emerald-400 w-12 text-right">{sub.share}%</span>
                  <span className="text-emerald-400">{sub.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-5 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Page Intent Classification</h2>
            <p className="text-xs text-slate-400 mt-0.5">Algorithmic intent breakdown of URL paths</p>
          </div>

          <div className="space-y-3.5">
            {INTENT_BUCKETS.map((b) => (
              <div key={b.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">{b.label}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{b.share}%</span>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, b.share * 1.8)}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>{b.sub}</span>
                  <span className="font-mono">{b.visits}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-950/70 text-[11px] text-emerald-400">
            ⚡ Developer intent represents 65.4% of total qualified sessions.
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${activeCategory === tab
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#08120e] text-slate-400 hover:text-slate-200'
                  }`}
              >
                {tab === 'ALL' ? `All Pages (${ROUTE_LEDGER.length})` : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter route URL or keyword..."
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 w-52"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              aria-label="Sort routes"
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="rank">Sort: Default Rank</option>
              <option value="visits">Sort: Est. Visits</option>
              <option value="mom">Sort: MoM Velocity</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Rank & Target Route</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-right">Est. Visits</th>
                <th className="px-6 py-3 text-right">MoM</th>
                <th className="px-6 py-3">Acquisition Split</th>
                <th className="px-6 py-3 text-right">Avg Duration</th>
                <th className="px-6 py-3 text-right">Bounce</th>
                <th className="px-6 py-3">Primary Inbound</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredAndSortedRoutes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-xs text-slate-400">
                    No matching routes found for &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredAndSortedRoutes.map((r) => (
                  <tr key={r.url} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-500">
                          #{String(r.rank).padStart(2, '0')}
                        </span>
                        <span className="font-semibold text-white">{r.url}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 pl-6">{r.sub}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {r.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono">
                      <div className="text-white font-semibold">{r.visits.toLocaleString()}</div>
                      <div className="text-[11px] text-emerald-400">{r.share}</div>
                    </td>
                    <td className={`px-6 py-3.5 text-right font-mono ${r.mom < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {r.mom > 0 ? `+${r.mom.toFixed(1)}%` : `${r.mom.toFixed(1)}%`}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{r.orgPct}% Org</span>
                        <span>{r.dirPct}% Dir</span>
                      </div>
                      <div className="w-24 h-1.5 bg-[#060e0b] rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-400" style={{ width: `${r.orgPct}%` }} />
                        <div className="h-full bg-emerald-700" style={{ width: `${r.dirPct}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">{r.duration}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-400">{r.bounce}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-emerald-300">{r.keyword}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-[#07110d] border-t border-emerald-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredAndSortedRoutes.length} of {ROUTE_LEDGER.length} core benchmark routes</span>
          <span className="font-mono text-emerald-400">42,810 total indexed URLs · 98.4% precision</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CARD_STYLE} p-6 space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Top Entry Points vs. Exit Funnel</h2>
            <p className="text-xs text-slate-400 mt-0.5">Flow mechanics showing routing from external discovery to checkout</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">→ Primary Entry Pages</div>
              {ENTRY_PAGES.map((item) => (
                <div key={item.path} className={SUB_CARD_STYLE}>
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>{item.path}</span>
                    <span className="font-mono text-emerald-400">{item.share}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">← Primary Exit Endpoints</div>
              {EXIT_ENDPOINTS.map((item) => (
                <div key={item.path} className={SUB_CARD_STYLE}>
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>{item.path}</span>
                    <span className="font-mono text-emerald-400">{item.share}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Generative AI Citation Velocity</h2>
              <p className="text-xs text-slate-400 mt-0.5">LLM Search (Perplexity, ChatGPT, Claude) ingestion indexing</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">+42.8% MoM</span>
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/60 p-4 space-y-2`}>
            <div className="text-sm font-semibold text-emerald-300">✦ Stripe Docs Rank: #1 in FinTech</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Over 840,000 algorithmic search sessions per week now resolve directly through generative answer engines referencing{' '}
              <span className="font-mono text-emerald-400">docs.stripe.com</span>. The{' '}
              <span className="font-mono text-emerald-400">/api/tokens</span> and{' '}
              <span className="font-mono text-emerald-400">/checkout/sessions</span> endpoints boast a 94.6% snippet capture rate.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {AI_CITATIONS.map((ai) => (
              <div key={ai.engine} className={SUB_CARD_STYLE}>
                <div className="text-[11px] text-slate-400">{ai.engine}</div>
                <div className={`text-sm font-bold mt-1 ${ai.highlight ? 'text-emerald-400' : 'text-white'}`}>
                  {ai.metric}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-950/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>🤖 LLM Crawler Access: Allowed (robots.txt permissive)</span>
            <Link
              href="/traffic-intelligence/ai-index"
              className="text-emerald-400 font-medium hover:underline cursor-pointer"
            >
              View full AI index report →
            </Link>          </div>
        </div>
      </div>
    </div>
  )
}