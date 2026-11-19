'use client';

import Link from 'next/link';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';

const AI_CRAWLERS = [
  { engine: 'ChatGPT / SearchGPT', share: '41.2%', citations: '18,420 / mo', topCited: '/docs/api, /pricing', trend: '+22.4%' },
  { engine: 'Perplexity AI', share: '28.6%', citations: '12,790 / mo', topCited: '/docs/webhooks, /connect', trend: '+19.8%' },
  { engine: 'Claude / Anthropic', share: '16.4%', citations: '7,340 / mo', topCited: '/docs/libraries, /docs/api', trend: '+31.2%' },
  { engine: 'Google AI Overviews', share: '13.8%', citations: '6,180 / mo', topCited: '/pricing, /payments', trend: '+11.5%' },
];

export default function AiIndexReportPage() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`${CARD_STYLE} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            {MOCK_TRAFFIC_DATA.domain} · LLM Citation & Crawl Telemetry
          </span>
          <h1 className="text-lg font-semibold text-white mt-1">AI Index & LLM Citation Report</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Visibility share, documentation citation frequency, and answer-engine referral attribution
          </p>
        </div>

        <Link
          href="/traffic-intelligence/TopPages"
          className="px-3.5 py-2 rounded-lg bg-[#08120e] border border-emerald-900/60 text-xs font-medium text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          ← Back to Top Pages
        </Link>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Citation Share of Voice</span>
          <div className="mt-2 text-2xl font-bold text-white">68.4%</div>
          <div className="mt-1 text-xs text-emerald-400 font-mono">Rank #1 in Payment APIs</div>
        </div>
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Monthly LLM Referrals</span>
          <div className="mt-2 text-2xl font-bold text-white">44,730</div>
          <div className="mt-1 text-xs text-emerald-400 font-mono">↗ +21.4% MoM</div>
        </div>
        <div className={CARD_STYLE}>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">llms.txt & Docs Readiness</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400">96 / 100</div>
          <div className="mt-1 text-xs text-slate-400">Clean markdown & schema coverage</div>
        </div>
      </div>

      {/* AI Engine Breakdown Table */}
      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">LLM & Answer Engine Citation Breakdown</h2>
          <span className="text-xs font-mono text-slate-400">Updated {MOCK_TRAFFIC_DATA.lastUpdated}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">AI Engine / Platform</th>
                <th className="px-6 py-3 text-right">Citation Share</th>
                <th className="px-6 py-3 text-right">Monthly Citations</th>
                <th className="px-6 py-3">Top Cited Endpoints</th>
                <th className="px-6 py-3 text-right">MoM Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {AI_CRAWLERS.map((row) => (
                <tr key={row.engine} className="hover:bg-[#0e2019] transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-white">{row.engine}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-emerald-400 font-semibold">{row.share}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-slate-200">{row.citations}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-300">{row.topCited}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-emerald-400">{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}