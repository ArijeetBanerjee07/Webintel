'use client';

import { useMemo, useState } from 'react';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';
const SUB_CARD_STYLE = 'rounded-lg bg-[#08120e] border border-emerald-950 p-3';

type OverlapTab = 'ALL' | 'Direct Competitors' | 'Dev Ecosystem Partners';
type SortField = 'shared' | 'trend';

interface OverlapRow {
  domain: string;
  sub: string;
  category: string;
  tabGroup: 'Direct Competitors' | 'Dev Ecosystem Partners';
  sharedNum: number;
  sharedStr: string;
  sharePct: string;
  onlyPct: number;
  sharedPct: number;
  trendNum: number;
  trendStr: string;
  freq: string;
  persona: string;
  threat: string;
}

const DOMAIN_META: Record<
  string,
  {
    sub: string;
    tabGroup: 'Direct Competitors' | 'Dev Ecosystem Partners';
    trendNum: number;
    trendStr: string;
    freq: string;
    persona: string;
    threat: string;
  }
> = {
  'paypal.com': {
    sub: 'PayPal Inc.',
    tabGroup: 'Direct Competitors',
    trendNum: -0.4,
    trendStr: '-0.4%',
    freq: '2.7 days',
    persona: 'Retail Merchants',
    threat: 'Core Contested',
  },
  'shopify.com': {
    sub: 'Shopify Inc.',
    tabGroup: 'Dev Ecosystem Partners',
    trendNum: 4.8,
    trendStr: '+4.8%',
    freq: '3.8 days',
    persona: 'E-com Founders & Ops',
    threat: 'High Synergy',
  },
};

const EXTRA_OVERLAP_DOMAINS: OverlapRow[] = [
  {
    domain: 'github.com',
    sub: 'Microsoft GitHub',
    category: 'Developer Ecosystem',
    tabGroup: 'Dev Ecosystem Partners',
    sharedNum: 22_400_000,
    sharedStr: '22.4M',
    sharePct: '46.5% of Stripe',
    onlyPct: 53,
    sharedPct: 47,
    trendNum: 6.1,
    trendStr: '+6.1%',
    freq: '1.1 days',
    persona: 'Dev & Engineers',
    threat: 'High Partner',
  },
  {
    domain: 'vercel.com',
    sub: 'Vercel Inc.',
    category: 'Developer Infra',
    tabGroup: 'Dev Ecosystem Partners',
    sharedNum: 11_800_000,
    sharedStr: '11.8M',
    sharePct: '24.5% of Stripe',
    onlyPct: 75,
    sharedPct: 25,
    trendNum: 14.2,
    trendStr: '+14.2%',
    freq: '1.2 days',
    persona: 'Full-Stack Devs & CTOs',
    threat: 'High Synergy',
  },
  {
    domain: 'brex.com',
    sub: 'Brex Inc.',
    category: 'Corporate Spend',
    tabGroup: 'Dev Ecosystem Partners',
    sharedNum: 5_200_000,
    sharedStr: '5.2M',
    sharePct: '10.8% of Stripe',
    onlyPct: 89,
    sharedPct: 11,
    trendNum: 3.4,
    trendStr: '+3.4%',
    freq: '3.8 days',
    persona: 'Startups & CFOs',
    threat: 'High Partner',
  },
  {
    domain: 'adyen.com',
    sub: 'Adyen N.V.',
    category: 'PSP Competitor',
    tabGroup: 'Direct Competitors',
    sharedNum: 4_100_000,
    sharedStr: '4.1M',
    sharePct: '8.5% of Stripe',
    onlyPct: 91,
    sharedPct: 9,
    trendNum: 1.2,
    trendStr: '+1.2%',
    freq: '3.4 days',
    persona: 'Enterprise Processors',
    threat: 'Core Contested',
  },
];

const CROSS_VISITATION = [
  { sector: 'Cloud & Developer Infrastructure', sub: 'AWS, Cloudflare, Vercel, GitHub', pct: '54.2%', index: '3.8x', badge: 'Very High Affinity' },
  { sector: 'E-Commerce Platforms', sub: 'Shopify, BigCommerce, WooCommerce', pct: '32.6%', index: '2.9x', badge: 'High Affinity' },
  { sector: 'Neobanks & Accounting', sub: 'Brex, Ramp, QuickBooks, Xero', pct: '24.8%', index: '3.1x', badge: 'High Affinity' },
  { sector: 'SaaS & Billing Tooling', sub: 'Paddle, Chargebee, Recurly', pct: '18.1%', index: '4.4x', badge: 'Moderate Affinity' },
];

const JOURNEY_STEPS = [
  {
    step: '01 · Technical Discovery & Inspiration',
    share: '34% Share',
    desc: 'Arrive from Developer Hubs including GitHub, StackOverflow, and X/Twitter engineering threads.',
  },
  {
    step: '02 · Documentation Benchmarking',
    share: '41% Share',
    desc: 'Compare Stripe Docs directly against Adyen, Braintree, and PayPal Developer API schemas.',
  },
  {
    step: '03 · Dashboard Onboarding & Key Generation',
    share: '19% Share',
    desc: 'Direct transition to Dashboard sign-up or immediate API test-mode secret key creation.',
  },
];

const INTEREST_COMPOSITION = [
  { label: 'Software Development & Cloud APIs', lift: '+410% vs baseline', sub: 'Core origin: Full-stack developers, DevOps leads, system architects', pct: '92%' },
  { label: 'Fintech & Embedded Finance', lift: '+380% vs baseline', sub: 'Banking infrastructure, pricing protocols, ledger accounting integrations', pct: '85%' },
  { label: 'Venture Capital & Angel Investing', lift: '+240% vs baseline', sub: 'Early-stage startup founders incorporating via Stripe Atlas', pct: '68%' },
  { label: 'SaaS Operations & Product-Led Growth', lift: '+195% vs baseline', sub: 'Usage-based billing engines, subscription lifecycle analytics', pct: '58%' },
];

const FILTER_TABS: OverlapTab[] = ['ALL', 'Direct Competitors', 'Dev Ecosystem Partners'];

export default function AudienceOverlapPage() {
  const [activeTab, setActiveTab] = useState<OverlapTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('shared');

  const baseVisits = MOCK_TRAFFIC_DATA.metrics?.monthlyVisits ?? 48_200_000;
  const baseMillions = (baseVisits / 1_000_000).toFixed(1);

  const allOverlapDomains: OverlapRow[] = useMemo(() => {
    const mockRows: OverlapRow[] = (MOCK_TRAFFIC_DATA.audienceOverlap ?? []).map((item) => {
      const meta = DOMAIN_META[item.domain] ?? {
        sub: item.domain,
        tabGroup: 'Dev Ecosystem Partners' as const,
        trendNum: 2.0,
        trendStr: '+2.0%',
        freq: '3.0 days',
        persona: 'Tech & Ops',
        threat: 'High Synergy',
      };

      const sharedPct = Math.round((item.sharedVisitorsEstimate / baseVisits) * 100);
      const onlyPct = Math.max(0, 100 - sharedPct);

      return {
        domain: item.domain,
        sub: meta.sub,
        category: item.category,
        tabGroup: meta.tabGroup,
        sharedNum: item.sharedVisitorsEstimate,
        sharedStr: `${(item.sharedVisitorsEstimate / 1_000_000).toFixed(1)}M`,
        sharePct: `${((item.sharedVisitorsEstimate / baseVisits) * 100).toFixed(1)}% of ${MOCK_TRAFFIC_DATA.domain}`,
        onlyPct,
        sharedPct,
        trendNum: meta.trendNum,
        trendStr: meta.trendStr,
        freq: meta.freq,
        persona: meta.persona,
        threat: meta.threat,
      };
    });

    const seen = new Set(mockRows.map((r) => r.domain));
    return [...mockRows, ...EXTRA_OVERLAP_DOMAINS.filter((r) => !seen.has(r.domain))];
  }, [baseVisits]);

  const filteredAndSortedDomains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allOverlapDomains
      .filter((d) => {
        const matchesTab = activeTab === 'ALL' || d.tabGroup === activeTab;
        const matchesQuery =
          !q ||
          d.domain.toLowerCase().includes(q) ||
          d.sub.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.persona.toLowerCase().includes(q);
        return matchesTab && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'trend') return b.trendNum - a.trendNum;
        return b.sharedNum - a.sharedNum;
      });
  }, [allOverlapDomains, activeTab, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* 1. Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Exclusive Audience Share</span>
            <span className="text-xs text-emerald-400 font-mono">+1.2%</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">58.4%</div>
          <div className="mt-2 text-xs text-slate-400">28.1M unshared visitors who do not visit direct payment rivals</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Retention Moat:</span>
            <span className="text-emerald-400 font-medium">High Tech Lock-In</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Primary Shared Competitor</span>
            <span className="text-xs text-emerald-400 font-mono">14.2M</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">29.5%</span>
            <span className="text-xs text-slate-400">paypal.com</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Financial services & checkout dual-ecosystem traversal</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Co-Visitation Type:</span>
            <span className="text-emerald-400 font-medium">PSP Cross-Eval</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Dev Tools Co-Visit Propensity</span>
            <span className="text-xs text-emerald-400 font-mono">4.8x</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">4.8x</div>
          <div className="mt-2 text-xs text-slate-400">Visitors 4.8x more likely to frequent GitHub, Vercel & AWS</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Audience Alignment:</span>
            <span className="text-emerald-400 font-medium">Developer-Centric</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Fintech Contested Audience</span>
            <span className="text-xs text-slate-400 font-mono">Active 7d</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">14.2%</div>
          <div className="mt-2 text-xs text-slate-400">Actively cross-evaluating Adyen, PayPal Developer & Square</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Churn Risk Level:</span>
            <span className="text-emerald-400 font-medium">Moderate (In-Flight)</span>
          </div>
        </div>
      </div>

      {/* 2. Venn Ecosystem & Cross-Visitation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Audience Overlap Ecosystem Venn & Cross-Traffic Intersect</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Intersection vectors calculated against {baseMillions}M {MOCK_TRAFFIC_DATA.domain} unique active sessions
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <svg viewBox="0 0 460 190" className="w-full max-w-md h-44">
              <circle cx="155" cy="70" r="46" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.4" />
              <text x="135" y="65" textAnchor="middle" className="fill-slate-300 text-[10px] font-semibold">Shopify</text>
              <text x="135" y="78" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">23.9%</text>

              <circle cx="305" cy="70" r="42" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.4" />
              <text x="325" y="65" textAnchor="middle" className="fill-slate-300 text-[10px] font-semibold">Square</text>
              <text x="325" y="78" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">12.9%</text>

              <circle cx="155" cy="125" r="44" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.4" />
              <text x="135" y="125" textAnchor="middle" className="fill-slate-300 text-[10px] font-semibold">PayPal</text>
              <text x="135" y="138" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">29.5%</text>

              <circle cx="305" cy="125" r="38" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.4" />
              <text x="325" y="125" textAnchor="middle" className="fill-slate-300 text-[10px] font-semibold">Adyen</text>
              <text x="325" y="138" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">8.5%</text>

              <circle cx="230" cy="96" r="54" fill="#061610" stroke="#10b981" strokeWidth="2" />
              <text x="230" y="92" textAnchor="middle" className="fill-white text-xs font-bold">{MOCK_TRAFFIC_DATA.domain}</text>
              <text x="230" y="106" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">{baseMillions}M Base</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="rounded bg-[#08120e] p-2 border border-emerald-950">
              <div className="text-slate-400 text-[10px]">PayPal / Braintree</div>
              <div className="font-mono font-bold text-white">14.2M Shared</div>
            </div>
            <div className="rounded bg-[#08120e] p-2 border border-emerald-950">
              <div className="text-slate-400 text-[10px]">Shopify Ecom</div>
              <div className="font-mono font-bold text-white">11.5M Shared</div>
            </div>
            <div className="rounded bg-[#08120e] p-2 border border-emerald-950">
              <div className="text-slate-400 text-[10px]">Square / Block</div>
              <div className="font-mono font-bold text-white">6.2M Shared</div>
            </div>
            <div className="rounded bg-[#08120e] p-2 border border-emerald-950">
              <div className="text-slate-400 text-[10px]">Adyen Enterprise</div>
              <div className="font-mono font-bold text-white">4.1M Shared</div>
            </div>
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/50 text-xs text-slate-300`}>
            <span className="text-emerald-400 font-semibold">Shared Developer Corridors:</span> 42% of Stripe + Adyen overlapping users consult API Reference documentation within the same browsing session.
          </div>
        </div>

        <div className={`lg:col-span-5 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Audience Cross-Visitation Intensity</h2>
            <p className="text-xs text-slate-400 mt-0.5">Audience co-visitation affinity across adjacent tech verticals</p>
          </div>

          <div className="space-y-4">
            {CROSS_VISITATION.map((item) => (
              <div key={item.sector} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-white">{item.sector}</span>
                  <span className="font-mono text-emerald-400">{item.pct} · {item.index}</span>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.pct }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>{item.sub}</span>
                  <span className="text-emerald-400">{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-950/70 flex items-center justify-between text-xs">
            <span className="text-slate-400">Dual-Ecosystem Penetration Index</span>
            <span className="font-mono font-bold text-emerald-400">8.4 / 10</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Overlapping Domains Ledger */}
      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#08120e] text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'ALL' ? `All Overlapping Domains (${allOverlapDomains.length})` : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter domain or persona..."
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 w-52"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              aria-label="Sort overlapping domains"
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="shared">Sort: Shared Audience</option>
              <option value="trend">Sort: Overlap Trend</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Domain & Entity</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-right">Shared Audience</th>
                <th className="px-6 py-3">Target Exclusivity</th>
                <th className="px-6 py-3 text-right">Overlap Trend</th>
                <th className="px-6 py-3 text-right">Co-Visit Freq</th>
                <th className="px-6 py-3">Persona Affinity</th>
                <th className="px-6 py-3 text-right">Threat / Synergy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredAndSortedDomains.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-xs text-slate-400">
                    No matching overlapping domains found for &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredAndSortedDomains.map((d) => (
                  <tr key={d.domain} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-white">{d.domain}</div>
                      <div className="text-xs text-slate-500">{d.sub}</div>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-slate-300">{d.category}</td>
                    <td className="px-6 py-3.5 text-right font-mono">
                      <div className="text-white font-semibold">{d.sharedStr}</div>
                      <div className="text-[11px] text-slate-500">{d.sharePct}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{d.onlyPct}% Only</span>
                        <span>{d.sharedPct}% Shared</span>
                      </div>
                      <div className="w-24 h-1.5 bg-[#060e0b] rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-400" style={{ width: `${d.onlyPct}%` }} />
                        <div className="h-full bg-emerald-800" style={{ width: `${d.sharedPct}%` }} />
                      </div>
                    </td>
                    <td className={`px-6 py-3.5 text-right font-mono ${d.trendNum < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {d.trendStr}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">{d.freq}</td>
                    <td className="px-6 py-3.5 text-xs text-slate-300">{d.persona}</td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {d.threat}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Cross-Browsing Journey & Industry Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CARD_STYLE} p-6 space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Cross-Browsing Journey Sequence (Path to Conversion)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sequential navigation progression within identical multi-tab co-browsing windows</p>
          </div>

          <div className="space-y-3">
            {JOURNEY_STEPS.map((j) => (
              <div key={j.step} className={`${SUB_CARD_STYLE} p-3.5`}>
                <div className="flex justify-between text-xs font-semibold text-white">
                  <span>{j.step}</span>
                  <span className="font-mono text-emerald-400">{j.share}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Audience Interest & Industry Composition</h2>
            <p className="text-xs text-slate-400 mt-0.5">Cross-indexed category affinity relative to baseline enterprise internet sample</p>
          </div>

          <div className="space-y-3.5">
            {INTEREST_COMPOSITION.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-medium">{item.label}</span>
                  <span className="font-mono text-emerald-400">{item.lift}</span>
                </div>
                <div className="w-full h-1.5 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.pct }} />
                </div>
                <div className="text-[11px] text-slate-500">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/50 text-xs text-slate-300`}>
            Stripe maintains an unmatched enterprise builder index (<span className="text-emerald-400 font-mono">9.1/10</span>), with 72% of audience possessing direct code deployment authority.
          </div>
        </div>
      </div>
    </div>
  );
}