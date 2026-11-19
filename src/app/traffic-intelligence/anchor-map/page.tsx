'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';

interface AnchorRow {
  sourceUrl: string;
  anchorText: string;
  targetPath: string;
  visitsNum: number;
  visitsStr: string;
  share: string;
  authYield: string;
  linkType: 'OAuth / App' | 'Docs Deep-Link' | 'Repository';
}

const ANCHOR_RECORDS: AnchorRow[] = [
  {
    sourceUrl: 'shopify.com/admin/settings/payments',
    anchorText: 'Activate Stripe Payments',
    targetPath: '/connect/oauth/authorize',
    visitsNum: 804_000,
    visitsStr: '804,000',
    share: '16.6%',
    authYield: '92.4%',
    linkType: 'OAuth / App',
  },
  {
    sourceUrl: 'vercel.com/docs/storage/stripe',
    anchorText: 'Stripe Vercel Quickstart Guide',
    targetPath: '/docs/building-plugins/vercel-quickstart',
    visitsNum: 412_000,
    visitsStr: '412,000',
    share: '8.5%',
    authYield: '80.1%',
    linkType: 'Docs Deep-Link',
  },
  {
    sourceUrl: 'github.com/stripe/stripe-node/blob/master/README.md',
    anchorText: 'Stripe API Reference',
    targetPath: '/docs/api',
    visitsNum: 348_000,
    visitsStr: '348,000',
    share: '7.2%',
    authYield: '91.3%',
    linkType: 'Repository',
  },
  {
    sourceUrl: 'supabase.com/docs/guides/auth/social-login/auth-stripe',
    anchorText: 'Configure Billing Webhooks',
    targetPath: '/docs/webhooks',
    visitsNum: 194_000,
    visitsStr: '194,000',
    share: '4.0%',
    authYield: '87.6%',
    linkType: 'Docs Deep-Link',
  },
  {
    sourceUrl: 'woocommerce.com/products/stripe',
    anchorText: 'Connect WooCommerce Account',
    targetPath: '/connect/oauth/woocommerce',
    visitsNum: 162_000,
    visitsStr: '162,000',
    share: '3.4%',
    authYield: '76.8%',
    linkType: 'OAuth / App',
  },
];

export default function AnchorMapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | AnchorRow['linkType']>('ALL');

  const filteredAnchors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ANCHOR_RECORDS.filter((row) => {
      const matchesType = selectedType === 'ALL' || row.linkType === selectedType;
      const matchesQuery =
        !q ||
        row.sourceUrl.toLowerCase().includes(q) ||
        row.anchorText.toLowerCase().includes(q) ||
        row.targetPath.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [searchQuery, selectedType]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`${CARD_STYLE} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              {MOCK_TRAFFIC_DATA.domain} · Referral Sub-Report
            </span>
          </div>
          <h1 className="text-lg font-semibold text-white mt-1">Complete Inbound Anchor Map</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated inbound anchor text, referral URL parameters, and destination landing yield across 42,000 active URLs
          </p>
        </div>

        <Link
          href="/traffic-intelligence/ReferralSource"
          className="px-3.5 py-2 rounded-lg bg-[#08120e] border border-emerald-900/60 text-xs font-medium text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          ← Back to Referral Sources
        </Link>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tracked Inbound URLs</span>
          <div className="mt-2 text-2xl font-bold text-white">42,000</div>
          <div className="mt-1 text-xs text-emerald-400 font-mono">98.4% destination match</div>
        </div>
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Top Anchor Corridor</span>
          <div className="mt-2 text-2xl font-bold text-white">OAuth Connect</div>
          <div className="mt-1 text-xs text-slate-400">92.4% avg auth completion</div>
        </div>
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Deep-Link Docs Share</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400">34.8%</div>
          <div className="mt-1 text-xs text-slate-400">Direct to /docs/* endpoints</div>
        </div>
      </div>

      {/* Filterable Anchor Table */}
      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {(['ALL', 'OAuth / App', 'Docs Deep-Link', 'Repository'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#08120e] text-slate-400 hover:text-slate-200'
                }`}
              >
                {type === 'ALL' ? `All Pathways (${ANCHOR_RECORDS.length})` : type}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search source URL, anchor, or target..."
            className="bg-[#08120e] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 w-60"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Referring URL</th>
                <th className="px-6 py-3">Anchor Text</th>
                <th className="px-6 py-3">Target Destination</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3 text-right">Monthly Visits</th>
                <th className="px-6 py-3 text-right">Auth / Conversion Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {filteredAnchors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-xs text-slate-400">
                    No matching anchor pathways found for &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredAnchors.map((row) => (
                  <tr key={row.sourceUrl} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-emerald-400">{row.sourceUrl}</td>
                    <td className="px-6 py-3.5 text-white font-medium text-xs">{row.anchorText}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-300">{row.targetPath}</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {row.linkType}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-200">
                      {row.visitsStr} <span className="text-slate-500 text-xs">({row.share})</span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-emerald-400 font-semibold">{row.authYield}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}