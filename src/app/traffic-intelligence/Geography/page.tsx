'use client';

import { useMemo, useState } from 'react';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';
const SUB_CARD_STYLE = 'rounded-lg bg-[#08120e] border border-emerald-950 p-3';

type TierFilter = 'ALL' | 'Tier-1 Core' | 'High Growth';
type SortField = 'share' | 'visits' | 'mom';

interface CountryRow {
  rank: string;
  code: string;
  country: string;
  tier: 'Tier-1 Core' | 'High Growth';
  visitsNum: number;
  visitsStr: string;
  shareNum: number;
  shareStr: string;
  momNum: number;
  momStr: string;
  subdomain: string;
  duration: string;
  bounce: string;
  source: string;
}

const COUNTRY_METADATA: Record<
  string,
  {
    tier: 'Tier-1 Core' | 'High Growth';
    subdomain: string;
    duration: string;
    bounce: string;
    source: string;
  }
> = {
  US: { tier: 'Tier-1 Core', subdomain: 'docs.stripe.com · 41%', duration: '04m 45s', bounce: '26.2%', source: '58% Org' },
  GB: { tier: 'Tier-1 Core', subdomain: 'docs.stripe.com · 44%', duration: '04m 15s', bounce: '29.8%', source: '62% Dir/API' },
  DE: { tier: 'Tier-1 Core', subdomain: 'www.stripe.com · 52%', duration: '04m 00s', bounce: '31.4%', source: '65% Direct API' },
  CA: { tier: 'Tier-1 Core', subdomain: 'dashboard · 38%', duration: '03m 50s', bounce: '33.1%', source: '70% Direct API' },
  FR: { tier: 'Tier-1 Core', subdomain: 'connect · 31%', duration: '03m 40s', bounce: '36.5%', source: '74% Direct API' },
  IN: { tier: 'High Growth', subdomain: 'docs.stripe.com · 49%', duration: '05m 24s', bounce: '21.8%', source: '81% Org' },
  JP: { tier: 'Tier-1 Core', subdomain: 'billing · 31%', duration: '04m 10s', bounce: '26.8%', source: '71% Dir/API' },
  AU: { tier: 'Tier-1 Core', subdomain: 'dashboard · 36%', duration: '04m 18s', bounce: '35.0%', source: '57% Direct API' },
};

const EXTRA_MOCK_COUNTRIES = [
  { countryCode: 'CA', countryName: 'Canada', trafficShare: 8.4, estimatedVisits: 4_048_800, visitsChange: 4.2 },
  { countryCode: 'FR', countryName: 'France', trafficShare: 5.0, estimatedVisits: 2_410_000, visitsChange: 1.4 },
  { countryCode: 'IN', countryName: 'India', trafficShare: 2.7, estimatedVisits: 1_301_400, visitsChange: 11.8 },
  { countryCode: 'JP', countryName: 'Japan', trafficShare: 2.4, estimatedVisits: 1_156_800, visitsChange: 7.1 },
  { countryCode: 'AU', countryName: 'Australia', trafficShare: 2.1, estimatedVisits: 1_012_200, visitsChange: -1.2 },
];

const MACRO_REGIONS = [
  { region: 'North America', visits: '22.4M sessions', trend: '↗ +4.2% YoY (US 14.3M)', share: 68 },
  { region: 'Europe (EMEA)', visits: '13.7M sessions', trend: '↗ +3.1% YoY (UK 3.8M, DE 2.8M)', share: 42 },
  { region: 'Asia-Pacific (APAC)', visits: '8.1M sessions', trend: '↗ +12.4% YoY (IN 3.4M)', share: 25 },
  { region: 'Latin America (LATAM)', visits: '2.7M sessions', trend: '↗ +6.2% YoY (BR 1.4M)', share: 10 },
  { region: 'Middle East & Africa', visits: '1.3M sessions', trend: '↗ +1.8% YoY (UAE 650K)', share: 5 },
];

const AGE_COHORTS = [
  { range: '18-24', label: 'Student & Bootcamp', pct: 18.2 },
  { range: '25-34', label: 'Full-Stack & Senior', pct: 48.4 },
  { range: '35-44', label: 'Eng Leads / Tech Ops', pct: 22.1 },
  { range: '45-54', label: 'VPs & Founders', pct: 8.7 },
  { range: '55+', label: 'Enterprise Architects', pct: 2.6 },
];

const SENIORITIES = [
  { role: 'Developer / Engineering IC (Full-stack, Backend, Frontend)', pct: 41.2 },
  { role: 'Technical Leadership (CTO, VP Engineering, Lead Architect)', pct: 22.8 },
  { role: 'Product & Operations (PM, Founder, Growth)', pct: 18.5 },
  { role: 'Founders & C-Suite Executives (CEO, Managing Director)', pct: 12.3 },
  { role: 'Finance & Accounting (Treasury, Controller, Billing Ops)', pct: 5.2 },
];

const EDGE_NODES = [
  { region: 'Core Node (Americas)', location: 'Virginia / Oregon', latency: '99.9% Latency < 14ms' },
  { region: 'Core Node (EMEA)', location: 'Dublin / Frankfurt', latency: '99.8% Latency < 18ms' },
  { region: 'Core Node (APAC)', location: 'Tokyo / Singapore', latency: '99.6% Latency < 24ms' },
];

export default function GeographyPage() {
  const [selectedTier, setSelectedTier] = useState<TierFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('share');

  const monthlyVisits = MOCK_TRAFFIC_DATA.metrics?.monthlyVisits ?? 48_200_000;
  const topGeo = MOCK_TRAFFIC_DATA.geography?.[0];
  const topMarketMillions = topGeo
    ? `${(topGeo.estimatedVisits / 1_000_000).toFixed(1)}M`
    : '21.3M';
  const topMarketShare = topGeo ? `${topGeo.trafficShare.toFixed(1)}%` : '44.2%';

  const kpiCards = [
    {
      title: 'Domestic vs. Intl. Split',
      main: topMarketShare,
      subMain: `/ ${(100 - (topGeo?.trafficShare ?? 44.2)).toFixed(1)}%`,
      desc: `${topGeo?.countryCode ?? 'US'} / International volume ratio`,
      footerLeft: '↗ +1.4% MoM',
      footerRight: 'Global expansion',
    },
    {
      title: `Top Market (${topGeo?.countryName ?? 'United States'})`,
      main: topMarketMillions,
      desc: `${topMarketShare} of ${(monthlyVisits / 1_000_000).toFixed(1)}M monthly visits`,
      footerLeft: `↗ ${topGeo?.visitsChange ?? 3.2}% MoM`,
      footerRight: `${MOCK_TRAFFIC_DATA.domain} · ${MOCK_TRAFFIC_DATA.lastUpdated}`,
    },
    {
      title: 'Highest Velocity Region',
      main: 'EMEA',
      highlight: true,
      desc: 'UK & Ireland corridor 14.2M visits',
      footerLeft: '+11.5% MoM',
      footerRight: 'Dublin / Berlin',
    },
    {
      title: 'Developer Density Index',
      main: '78.4',
      subMain: '/100',
      desc: 'Avg bounce: 27.8% (Top 5 geos)',
      footerLeft: 'Top 10% arg/sec',
      footerRight: 'Dev API consumer',
    },
  ];

  const countryLedger: CountryRow[] = useMemo(() => {
    const baseList = MOCK_TRAFFIC_DATA.geography ?? [];
    const seenCodes = new Set(baseList.map((item) => item.countryCode));
    const merged = [
      ...baseList,
      ...EXTRA_MOCK_COUNTRIES.filter((item) => !seenCodes.has(item.countryCode)),
    ];

    return merged.map((item, index) => {
      const meta = COUNTRY_METADATA[item.countryCode] ?? {
        tier: 'Tier-1 Core' as const,
        subdomain: 'www.stripe.com · 40%',
        duration: '04m 05s',
        bounce: '30.0%',
        source: '60% Org',
      };

      return {
        rank: `#${String(index + 1).padStart(2, '0')}`,
        code: item.countryCode,
        country: item.countryName,
        tier: meta.tier,
        visitsNum: item.estimatedVisits,
        visitsStr: item.estimatedVisits.toLocaleString(),
        shareNum: item.trafficShare,
        shareStr: `${item.trafficShare.toFixed(1)}%`,
        momNum: item.visitsChange,
        momStr: `${item.visitsChange >= 0 ? '+' : ''}${item.visitsChange.toFixed(1)}%`,
        subdomain: meta.subdomain,
        duration: meta.duration,
        bounce: meta.bounce,
        source: meta.source,
      };
    });
  }, []);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return countryLedger
      .filter((c) => {
        const matchesTier = selectedTier === 'ALL' || c.tier === selectedTier;
        const matchesQuery =
          !q ||
          c.country.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.subdomain.toLowerCase().includes(q);
        return matchesTier && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'visits') return b.visitsNum - a.visitsNum;
        if (sortBy === 'mom') return b.momNum - a.momNum;
        return b.shareNum - a.shareNum;
      });
  }, [countryLedger, selectedTier, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.title} className={`${CARD_STYLE} flex flex-col justify-between`}>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={`text-3xl font-bold ${kpi.highlight ? 'text-emerald-400' : 'text-white'}`}>
                {kpi.main}
              </span>
              {kpi.subMain && <span className="text-sm text-slate-400">{kpi.subMain}</span>}
            </div>
            <p className="mt-2 text-xs text-slate-400">{kpi.desc}</p>
            <div className="mt-3 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-mono">{kpi.footerLeft}</span>
              <span className="text-slate-500">{kpi.footerRight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Geographic Heatmap & Territory Penetration</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time edge telemetry with coordinate density overlay</p>
          </div>

          <div className="rounded-xl bg-[#07110d] border border-emerald-950 p-5 flex flex-col items-center justify-center space-y-4">
            <div className="w-full h-32 rounded-lg bg-[#050c09] border border-emerald-950/80 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-16 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <div className="absolute top-8 left-16 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
              <span className="absolute top-3 left-12 text-[10px] font-mono text-emerald-300">United States</span>

              <div className="absolute top-10 right-36 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span className="absolute top-5 right-28 text-[10px] font-mono text-slate-400">EMEA (Frankfurt/Dublin)</span>

              <div className="absolute bottom-6 right-16 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              <span className="absolute bottom-2 right-12 text-[10px] font-mono text-slate-400">APAC (Tokyo/Singapore)</span>

              <span className="text-xs text-slate-500 font-mono tracking-wider">GLOBAL EDGE DENSITY NODES ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-xs">
              {EDGE_NODES.map((node) => (
                <div key={node.region} className={`${SUB_CARD_STYLE} text-center`}>
                  <div className="text-slate-400 text-[10px]">{node.region}</div>
                  <div className="font-mono text-emerald-400 font-semibold mt-0.5">{node.location}</div>
                  <div className="text-[10px] text-slate-500">{node.latency}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> High Density &bull; Moderate &bull; Emerging
            </span>
            <span className="font-mono text-emerald-400">184 Global PoPs</span>
          </div>
        </div>

        <div className={`lg:col-span-5 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-white">Macro-Regional Exposure</h2>
            <span className="text-xs text-slate-400 font-mono">Continental share & YoY</span>
          </div>

          <div className="space-y-4">
            {MACRO_REGIONS.map((m) => (
              <div key={m.region} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-white">{m.region}</span>
                  <span className="font-mono text-emerald-400">{m.visits}</span>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.share}%` }} />
                </div>
                <div className="text-[11px] text-slate-500">{m.trend}</div>
              </div>
            ))}
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/50 text-xs text-slate-300`}>
            <span className="text-emerald-400 font-semibold">Cross-Border Dynamics:</span> Non-US originated accounts increased 3.8 percentage points over the trailing 12 months, driven by European and Indian SaaS onboarding.
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {(['ALL', 'Tier-1 Core', 'High Growth'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#08120e] text-slate-400 hover:text-slate-200'
                }`}
              >
                {tier === 'ALL' ? `All Markets (${countryLedger.length})` : tier}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter country or code..."
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 w-48"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              aria-label="Sort countries"
              className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/60 cursor-pointer"
            >
              <option value="share">Sort: Traffic Share</option>
              <option value="visits">Sort: Monthly Visits</option>
              <option value="mom">Sort: MoM Trend</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Rank & Country</th>
                <th className="px-6 py-3">Market Tier</th>
                <th className="px-6 py-3 text-right">Est. Monthly Visits</th>
                <th className="px-6 py-3 text-right">MoM Trend</th>
                <th className="px-6 py-3">Top Subdomain Affinity</th>
                <th className="px-6 py-3 text-right">Avg Duration</th>
                <th className="px-6 py-3 text-right">Bounce Rate</th>
                <th className="px-6 py-3 text-right">Acquisition Split</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredCountries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-xs text-slate-400">
                    No matching countries found for &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredCountries.map((c) => (
                  <tr key={c.code} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-500">{c.rank}</span>
                        <span className="font-semibold text-white">{c.country}</span>
                        <span className="text-[11px] font-mono text-slate-500">({c.code})</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono">
                      <div className="text-white font-semibold">{c.visitsStr}</div>
                      <div className="text-[11px] text-emerald-400">{c.shareStr}</div>
                    </td>
                    <td className={`px-6 py-3.5 text-right font-mono ${c.momNum < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {c.momStr}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-300">{c.subdomain}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">{c.duration}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-400">{c.bounce}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-xs text-emerald-300">{c.source}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CARD_STYLE} p-6 space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Demographic Cohorts & Age Distribution</h2>
            <p className="text-xs text-slate-400 mt-0.5">Census-calibrated device ID graph and SDK demographics cross-tabs</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {AGE_COHORTS.map((a) => (
              <div key={a.range} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-medium">
                    Age {a.range} <span className="text-slate-500 ml-1">({a.label})</span>
                  </span>
                  <span className="font-mono text-emerald-400">{a.pct}%</span>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, a.pct * 1.8)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className={SUB_CARD_STYLE}>
              <div className="text-slate-400 text-[10px]">Gender Mix</div>
              <div className="font-bold text-white mt-0.5">71.4% Male</div>
              <div className="text-[10px] text-emerald-400">28.6% Female</div>
            </div>
            <div className={SUB_CARD_STYLE}>
              <div className="text-slate-400 text-[10px]">Tech Index</div>
              <div className="font-bold text-emerald-400 mt-0.5">94.0%</div>
              <div className="text-[10px] text-slate-500">Higher Ed</div>
            </div>
            <div className={SUB_CARD_STYLE}>
              <div className="text-slate-400 text-[10px]">Audience BG</div>
              <div className="font-bold text-white mt-0.5">CS / Eng</div>
              <div className="text-[10px] text-slate-500">Verified by CS</div>
            </div>
          </div>
        </div>

        <div className={`${CARD_STYLE} p-6 flex flex-col justify-between space-y-4`}>
          <div>
            <h2 className="text-base font-semibold text-white">Professional Seniority & Buying Roles</h2>
            <p className="text-xs text-slate-400 mt-0.5">Visitor distribution by technical responsibility and budget authority</p>
          </div>

          <div className="space-y-3.5">
            {SENIORITIES.map((s) => (
              <div key={s.role} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-medium truncate pr-2">{s.role}</span>
                  <span className="font-mono text-emerald-400 shrink-0">{s.pct}%</span>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, s.pct * 2)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={`${SUB_CARD_STYLE} border-emerald-900/50 text-xs text-slate-300`}>
            <span className="text-emerald-400 font-mono font-semibold">64.0%</span> of total inbound sessions are composed of hands-on technical stakeholders, validating Stripe&apos;s bottom-up developer adoption moat.
          </div>
        </div>
      </div>
    </div>
  )
}