'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';
const SUB_CARD_STYLE = 'rounded-lg bg-[#08120e] border border-emerald-950 p-3';

type FilterTab = 'ALL' | 'E-commerce' | 'Developer Platforms' | 'SaaS & Accounting';
type SortField = 'visits' | 'mom';

interface ReferralRow {
  domain: string;
  category: string;
  tabGroup: 'E-commerce' | 'Developer Platforms' | 'SaaS & Accounting';
  visitsNum: number;
  visitsStr: string;
  share: string;
  momStr: string;
  momVal: number;
  pathway: string;
  bounce: string;
  duration: string;
  intent: string;
}

const DOMAIN_METADATA: Record<
  string,
  {
    tabGroup: 'E-commerce' | 'Developer Platforms' | 'SaaS & Accounting';
    momStr: string;
    momVal: number;
    pathway: string;
    bounce: string;
    duration: string;
    intent: string;
  }
> = {
  'github.com': {
    tabGroup: 'Developer Platforms',
    momStr: '+7.8%',
    momVal: 7.8,
    pathway: '/docs/libraries',
    bounce: '21.2%',
    duration: '5m 48s',
    intent: 'Dev IC (96)',
  },
  'stackoverflow.com': {
    tabGroup: 'Developer Platforms',
    momStr: '+5.1%',
    momVal: 5.1,
    pathway: '/questions/tagged/stripe-payments',
    bounce: '24.6%',
    duration: '4m 52s',
    intent: 'Dev IC (91)',
  },
};

const EXTRA_REFERRING_DOMAINS: ReferralRow[] = [
  { domain: 'shopify.com', category: 'E-Commerce Platform', tabGroup: 'E-commerce', visitsNum: 1_240_000, visitsStr: '1,240,000', share: '25.7%', momStr: '+4.2%', momVal: 4.2, pathway: '/payments/partners', bounce: '26.4%', duration: '4m 18s', intent: 'High Intent (94)' },
  { domain: 'vercel.com', category: 'Developer Platform', tabGroup: 'Developer Platforms', visitsNum: 680_000, visitsStr: '680,000', share: '14.1%', momStr: '+14.4%', momVal: 14.4, pathway: '/docs/integrations/vercel', bounce: '17.8%', duration: '6m 45s', intent: 'Developer IC (98)' },
  { domain: 'woocommerce.com', category: 'E-Commerce Plugin', tabGroup: 'E-commerce', visitsNum: 390_000, visitsStr: '390,000', share: '8.1%', momStr: '+1.9%', momVal: 1.9, pathway: '/plugins/woocommerce-stripe', bounce: '31.8%', duration: '3m 38s', intent: 'Commercial (85)' },
  { domain: 'supabase.com', category: 'Developer Backend', tabGroup: 'Developer Platforms', visitsNum: 260_000, visitsStr: '260,000', share: '5.4%', momStr: '+24.1%', momVal: 24.1, pathway: '/docs/guides/auth-stripe', bounce: '15.0%', duration: '7m 58s', intent: 'High Growth (85)' },
  { domain: 'webflow.com', category: 'CMS & No-Code', tabGroup: 'SaaS & Accounting', visitsNum: 210_000, visitsStr: '210,000', share: '4.4%', momStr: '+3.2%', momVal: 3.2, pathway: '/ecommerce/stripe-checkout', bounce: '29.5%', duration: '3m 15s', intent: 'Creator/SMB (83)' },
  { domain: 'xero.com', category: 'Accounting & Invoicing', tabGroup: 'SaaS & Accounting', visitsNum: 185_000, visitsStr: '185,000', share: '3.8%', momStr: '+3.3%', momVal: 3.3, pathway: '/integrations/stripe-invoicing', bounce: '27.2%', duration: '4m 48s', intent: 'Commercial (89)' },
];

const REFERRAL_CATEGORIES = [
  { category: 'E-Commerce Platforms (Shopify, WooCommerce, ...)', visits: '2.14M (44.4%)', trend: '+4.2%', width: '44%' },
  { category: 'Developer Tooling & Cloud Platforms (Vercel, GitHub, ...)', visits: '1.38M (28.6%)', trend: '+18.2%', width: '28%' },
  { category: 'SaaS Billing & Invoicing Ecosystems (Subscript, Char, ...)', visits: '684K (14.2%)', trend: '+2.8%', width: '14%' },
  { category: 'Fintech & Banking Gateways (Brex, Mercury, Ramp)', visits: '390K (8.1%)', trend: '+0.4%', width: '8%' },
  { category: 'Web Builders & CMS (Webflow, WordPress, Squaresp...)', visits: '226K (4.7%)', trend: '+1.2%', width: '5%' },
];

const QUALITY_SLICES = [
  { label: 'Dev Ecosystem Tier-1', score: '94% API test visit rate', duration: '7m 12s avg', bounce: '17.4% bounce' },
  { label: 'E-Commerce Platforms Tier-2', score: '72% merchant onboarding', duration: '3m 45s avg', bounce: '32.1% bounce' },
  { label: 'SaaS / Billing Systems Tier-3', score: '68% dashboard auth', duration: '4m 02s avg', bounce: '21.6% bounce' },
  { label: 'Directories & Aggregators Tier-4', score: '22% secondary click', duration: '1m 50s avg', bounce: '54.2% bounce' },
];

const ANCHOR_LINKS = [
  { source: 'shopify.com/admin/settings/payments', target: 'Target: stripe.com/connect/oauth/authorize', visits: '804K visits (16.6%)', yield: '92.4% Auth Yield' },
  { source: 'vercel.com/docs/storage/stripe', target: 'Target: stripe.com/docs/building-plugins/vercel-quickstart', visits: '412K visits (8.5%)', target2: '80.1% API Provision' },
  { source: 'github.com/stripe/stripe-node/blob/master/README.md', target: 'Target: stripe.com/docs/api', visits: '348K visits (7.2%)', target2: '91.3% Doc Readership' },
];

const FILTER_TABS: FilterTab[] = ['ALL', 'E-commerce', 'Developer Platforms', 'SaaS & Accounting'];

export default function ReferralSourcesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('visits');

  const totalDomainVisits = MOCK_TRAFFIC_DATA.metrics?.monthlyVisits ?? 48_200_000;
  const referralSharePct = MOCK_TRAFFIC_DATA.channelMix?.referral ?? 9.8;
  const totalReferralVisits = Math.round((totalDomainVisits * referralSharePct) / 100);

  const allReferrers: ReferralRow[] = useMemo(() => {
    const mockRows: ReferralRow[] = (MOCK_TRAFFIC_DATA.referralSources ?? []).map((item) => {
      const meta = DOMAIN_METADATA[item.referringDomain] ?? {
        tabGroup: 'Developer Platforms' as const,
        momStr: '+4.0%',
        momVal: 4.0,
        pathway: '/docs',
        bounce: '25.0%',
        duration: '4m 30s',
        intent: 'High Intent (90)',
      };

      return {
        domain: item.referringDomain,
        category: item.category,
        tabGroup: meta.tabGroup,
        visitsNum: item.estimatedReferrals,
        visitsStr: item.estimatedReferrals.toLocaleString(),
        share: `${item.trafficShare.toFixed(1)}%`,
        momStr: meta.momStr,
        momVal: meta.momVal,
        pathway: meta.pathway,
        bounce: meta.bounce,
        duration: meta.duration,
        intent: meta.intent,
      };
    });

    const seen = new Set(mockRows.map((r) => r.domain));
    return [...mockRows, ...EXTRA_REFERRING_DOMAINS.filter((r) => !seen.has(r.domain))];
  }, []);

  const filteredAndSortedReferrers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allReferrers
      .filter((row) => {
        const matchesTab = activeTab === 'ALL' || row.tabGroup === activeTab;
        const matchesQuery =
          !query ||
          row.domain.toLowerCase().includes(query) ||
          row.category.toLowerCase().includes(query) ||
          row.pathway.toLowerCase().includes(query);

        return matchesTab && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'mom') return b.momVal - a.momVal;
        return b.visitsNum - a.visitsNum;
      });
  }, [allReferrers, activeTab, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* 1. Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Referral Volume</span>
            <span className="text-xs text-emerald-400 font-mono">↗ +5.4%</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">
            {(totalReferralVisits / 1_000_000).toFixed(2)}M
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {referralSharePct}% of total {(totalDomainVisits / 1_000_000).toFixed(1)}M {MOCK_TRAFFIC_DATA.domain} traffic
          </div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-mono">{MOCK_TRAFFIC_DATA.confidence} Confidence</span>
            <span className="text-slate-500">Updated {MOCK_TRAFFIC_DATA.lastUpdated}</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Top Referral Category</span>
            <span className="text-xs text-emerald-400 font-mono">⚡ B2B</span>
          </div>
          <div className="mt-3 text-xl font-bold text-white">E-Commerce & SaaS</div>
          <div className="mt-2 text-xs text-slate-400">2.14M visits (44.4% category share)</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-medium">High Intent</span>
            <span className="text-slate-500">Marketplace APIs</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Partner Conversion Propensity</span>
            <span className="text-xs text-emerald-400 font-mono">Index 92/100</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">3.6x</span>
            <span className="text-xs text-slate-400">vs baseline</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Converts to API activation at 3.6x organic rate</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400">Ecosystem Synergy</span>
            <span className="text-slate-500">-12.4m API Elev</span>
          </div>
        </div>

        <div className={`${CARD_STYLE} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Referring Domains</span>
            <span className="text-xs text-emerald-400 font-mono">+58 New MoM</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-white">1,420</div>
          <div className="mt-2 text-xs text-slate-400">88.4% commercial partner retention</div>
          <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400">Low Churn Corridor</span>
            <span className="text-slate-500">98.8% Uptime</span>
          </div>
        </div>
      </div>

      {/* 2. Category Distribution & Quality Slices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Inbound Referral Category Distribution & Velocity</h2>
            <p className="text-xs text-slate-400 mt-0.5">Segmented volume share and monthly inbound traffic momentum</p>
          </div>

          <div className="space-y-3.5">
            {REFERRAL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-medium truncate pr-2">{cat.category}</span>
                  <div className="flex items-center gap-2 font-mono shrink-0">
                    <span className="text-slate-300">{cat.visits}</span>
                    <span className="text-emerald-400">{cat.trend}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: cat.width }} />
                </div>
              </div>
            ))}
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/50 text-xs text-slate-300`}>
            <span className="text-emerald-400 font-semibold">Developer Platform Referrals</span> (+18.2% MoM) represent the fastest-growing corridor, with Vercel and Supabase integration guides driving high-velocity API key creation and immediate test-mode checkout completions.
          </div>
        </div>

        <div className={`lg:col-span-5 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Downstream Referral Quality</h2>
              <p className="text-xs text-slate-400 mt-0.5">Post-click intent, session depth, and conversion yields</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">Tier-4 Lead Gen</span>
          </div>

          <div className="rounded-lg bg-[#07110d] border border-emerald-950 p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Overall Referral Intent Score</div>
              <div className="text-2xl font-bold text-white mt-0.5">89 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/30">
              Optimal Liquidity
            </span>
          </div>

          <div className="space-y-3">
            {QUALITY_SLICES.map((q) => (
              <div key={q.label} className="flex items-center justify-between text-xs py-1 border-b border-emerald-950/60">
                <div>
                  <span className="font-medium text-white block">{q.label}</span>
                  <span className="text-[11px] text-slate-500">{q.score}</span>
                </div>
                <div className="text-right font-mono">
                  <div className="text-slate-200">{q.duration}</div>
                  <div className="text-emerald-400 text-[10px]">{q.bounce}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Interactive Referring Domains Ledger Table */}
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
                {tab === 'ALL' ? `All Referrers (${allReferrers.length})` : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter domain or pathway..."
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 w-52"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              aria-label="Sort referrers"
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="visits">Sort: Referral Visits</option>
              <option value="mom">Sort: MoM Growth</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Referring Source</th>
                <th className="px-6 py-3 text-right">Referral Visits</th>
                <th className="px-6 py-3 text-right">Traffic Share</th>
                <th className="px-6 py-3 text-right">MoM Growth</th>
                <th className="px-6 py-3">Primary Inbound Pathway</th>
                <th className="px-6 py-3 text-right">Bounce Rate</th>
                <th className="px-6 py-3 text-right">Avg Duration</th>
                <th className="px-6 py-3 text-right">Intent Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredAndSortedReferrers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-xs text-slate-400">
                    No matching referring domains found for &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredAndSortedReferrers.map((row) => (
                  <tr key={row.domain} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-white">{row.domain}</div>
                      <div className="text-xs text-slate-500">{row.category}</div>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-200">{row.visitsStr}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-emerald-400 font-semibold">{row.share}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-emerald-400">{row.momStr}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-300">{row.pathway}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-400">{row.bounce}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">{row.duration}</td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {row.intent}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-[#07110d] border-t border-emerald-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredAndSortedReferrers.length} of {allReferrers.length} benchmark domains</span>
          <span className="font-mono text-emerald-400">1,420 total active referrers · 98.4% precision</span>
        </div>
      </div>

      {/* 4. Anchor Links & Co-Marketing Synergy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CARD_STYLE} p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Top Inbound Anchor Links & Referral Pathways</h2>
              <p className="text-xs text-slate-400 mt-0.5">Highest volume referring URL parameters and destination matching</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">Live Ingestion</span>
          </div>

          <div className="space-y-3">
            {ANCHOR_LINKS.map((link, idx) => (
              <div key={idx} className={`${SUB_CARD_STYLE} space-y-1.5`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400">{link.source}</span>
                  <span className="font-mono font-bold text-white">{link.visits}</span>
                </div>
                <div className="text-xs text-slate-300 font-mono truncate">↳ {link.target}</div>
                <div className="text-[11px] text-emerald-400 font-mono">{link.yield || link.target2}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-950/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>Aggregated from 42,000 active inbound URLs</span>
            <Link
              href="/traffic-intelligence/anchor-map"
              className="text-emerald-400 font-medium hover:underline cursor-pointer"
            >
              View Complete Anchor Map →
            </Link>
          </div>
        </div>

        <div className={`${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Partner Co-Marketing Synergy</h2>
            <p className="text-xs text-slate-400 mt-0.5">App Marketplace vs Unmanaged Organic Mentions</p>
          </div>

          <div className="space-y-4">
            <div className={`${SUB_CARD_STYLE} p-4 space-y-2`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  CERTIFIED MARKETPLACE APPS <span className="text-slate-400 font-normal block">Pre-built OAuth and embedded setup</span>
                </span>
                <span className="text-xl font-bold text-emerald-400 font-mono">94.2%</span>
              </div>
              <div className="text-[11px] text-slate-500">12-Mo Retention</div>
            </div>

            <div className={`${SUB_CARD_STYLE} p-4 space-y-2`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  UNMANAGED ORGANIC MENTIONS <span className="text-slate-400 font-normal block">Raw blog backlinks & community QA</span>
                </span>
                <span className="text-xl font-bold text-white font-mono">51.8%</span>
              </div>
              <div className="text-[11px] text-slate-500">12-Mo Retention</div>
            </div>
          </div>

          <div className={`${SUB_CARD_STYLE} text-xs text-slate-300`}>
            <span className="text-emerald-400 font-semibold">MARKETPLACE ADVANTAGE:</span> Certified ecosystem partnerships generate 1.82x higher net revenue retention than non-partnered inbound traffic corridors, primarily driven by rapid webhook completion and merchant activation.
          </div>
        </div>
      </div>
    </div>
  );
}