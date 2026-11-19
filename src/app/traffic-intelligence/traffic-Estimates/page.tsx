import Link from 'next/link';
import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

const CARD_STYLE = 'rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5';
const SUB_CARD_STYLE = 'rounded-lg bg-[#08120e] border border-emerald-950/90';

const DURATION_BUCKETS = [
  { label: '< 1 min', desc: '(Quick bounce / API doc reference)', pct: 24.5 },
  { label: '1–3 min', desc: '(Product & pricing evaluation)', pct: 31.2 },
  { label: '3–5 min', desc: '(Developer docs reading)', pct: 22.8 },
  { label: '5–10 min', desc: '(Dashboard & checkout setup)', pct: 14.1 },
  { label: '10+ min', desc: '(Deep integration / portal usage)', pct: 7.4 },
];

const TRAJECTORY_POINTS = [
  { month: 'Nov 2024', label: '41.2M', x: 40, y: 125 },
  { month: 'Dec 2024', label: '41.8M', x: 200, y: 118 },
  { month: 'Jan 2025', label: '43.5M', x: 360, y: 102 },
  { month: 'Feb 2025', label: '44.9M', x: 520, y: 88 },
  { month: 'Mar 2025', label: '45.9M', x: 680, y: 74 },
  { month: 'Apr 2025', label: '48.2M', x: 840, y: 45 },
]

function formatCompactVisits(visits: number): string {
  if (visits >= 1_000_000) return `${(visits / 1_000_000).toFixed(1)}M`;
  if (visits >= 1_000) return `${Math.round(visits / 1_000)}K`;
  return visits.toLocaleString();
}

function formatDuration(seconds: number): string {
  const safeSec = Math.max(0, Math.round(seconds));
  const mins = Math.floor(safeSec / 60);
  const secs = safeSec % 60;
  return `${mins}m ${String(secs).padStart(2, '0')}s`;
}

export default function TrafficEstimatesPage() {
  const { metrics, channelMix } = MOCK_TRAFFIC_DATA;

  const totalVisits = metrics?.monthlyVisits ?? 48_200_000;
  const calcChannelVisits = (sharePct: number) =>
    formatCompactVisits(Math.round((totalVisits * sharePct) / 100));

  const organicShare = channelMix?.organicSearch ?? 46.5;
  const directShare = channelMix?.direct ?? 34.2;
  const referralShare = channelMix?.referral ?? 9.8;
  const paidSearchShare = channelMix?.paidSearch ?? 5.1;
  const socialShare = channelMix?.social ?? 2.6;
  const emailShare = channelMix?.email ?? 1.1;
  const displayShare = channelMix?.display ?? 0.7;

  const combinedCoreShare = (organicShare + directShare).toFixed(1);
  const formattedAvgDuration = formatDuration(metrics?.avgVisitDurationSeconds ?? 215);

  const primaryChannels = [
    { label: 'Organic Search', visits: `~${calcChannelVisits(organicShare)} visits`, value: organicShare },
    { label: 'Direct Navigation', visits: `~${calcChannelVisits(directShare)} visits`, value: directShare },
    { label: 'Referral Network', visits: `~${calcChannelVisits(referralShare)} visits`, value: referralShare },
    { label: 'Paid Search (SEM)', visits: `~${calcChannelVisits(paidSearchShare)} visits`, value: paidSearchShare },
    { label: 'Social & Community (GitHub/X)', visits: `~${calcChannelVisits(socialShare)} visits`, value: socialShare },
  ];

  const kpiCards = [
    {
      title: 'Total Monthly Visits',
      icon: '↗',
      iconColor: 'text-emerald-400',
      value: `${formatCompactVisits(totalVisits)}`,
      badge: `↗ +${metrics?.monthlyVisitsChange ?? 4.8}%`,
      badgeStyle: 'bg-emerald-500/15 text-emerald-400',
      footerLeft: 'vs. 45.9M prev. 30d',
      footerRight: (
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-1 h-1.5 bg-emerald-500/40 rounded-xs" />
          <span className="w-1 h-2 bg-emerald-500/60 rounded-xs" />
          <span className="w-1 h-2.5 bg-emerald-500/80 rounded-xs" />
          <span className="w-1 h-3 bg-emerald-400 rounded-xs" />
        </div>
      ),
    },
    {
      title: 'Unique Visitors',
      icon: '👤',
      iconColor: 'text-slate-400',
      value: '15.1M',
      badge: '↗ +3.1%',
      badgeStyle: 'bg-emerald-500/15 text-emerald-400',
      footerLeft: '31.3% penetration rate',
      footerRight: (
        <div className="w-16 h-1.5 bg-[#060e0b] rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-emerald-500 rounded-full" />
        </div>
      ),
    },
    {
      title: 'Pages / Visit',
      icon: '📄',
      iconColor: 'text-slate-400',
      value: metrics?.pagesPerVisit.toFixed(2) ?? '3.40',
      badge: '+0.20 Stable',
      badgeStyle: 'bg-emerald-950 text-emerald-300 border border-emerald-800/50',
      footerLeft: 'Industry avg: 2.80',
      footerRight: (
        <div className="flex items-end gap-1 h-3">
          <span className="w-1 h-1.5 bg-slate-600 rounded-xs" />
          <span className="w-1 h-2 bg-slate-600 rounded-xs" />
          <span className="w-1 h-2.5 bg-emerald-500 rounded-xs" />
          <span className="w-1 h-3 bg-emerald-400 rounded-xs" />
        </div>
      ),
    },
    {
      title: 'Bounce Rate',
      icon: '◎',
      iconColor: 'text-slate-400',
      value: `${metrics?.bounceRate ?? 38.2}%`,
      badge: '↘ -1.4%',
      badgeStyle: 'bg-emerald-500/15 text-emerald-400',
      footerLeft: 'Top decile in Fintech',
      footerRight: <span className="text-emerald-400 font-medium">✓ Optimal</span>,
    },
  ];

  const linePath = TRAJECTORY_POINTS.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
  const firstPt = TRAJECTORY_POINTS[0];
  const lastPt = TRAJECTORY_POINTS[TRAJECTORY_POINTS.length - 1];
  const areaPath = `${linePath} L ${lastPt.x} 150 L ${firstPt.x} 150 Z`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.title} className={`${CARD_STYLE} flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
              <span className={`${kpi.iconColor} text-xs`}>{kpi.icon}</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-3xl font-bold text-white">{kpi.value}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${kpi.badgeStyle}`}>{kpi.badge}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-950/70 flex items-center justify-between text-xs text-slate-500">
              <span>{kpi.footerLeft}</span>
              {kpi.footerRight}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-7 ${CARD_STYLE} p-6 flex flex-col justify-between space-y-5`}>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Acquisition Channel Mix</h2>
              <Link
                href="/traffic-intelligence/channel-mix"
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Detailed Matrix →
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Organic Search and Direct represent <span className="text-emerald-400 font-medium">{combinedCoreShare}%</span> of total acquisition volume.
            </p>
          </div>

          <div className="space-y-4">
            {primaryChannels.map((ch) => (
              <div key={ch.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200 font-medium">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{ch.visits}</span>
                    <span className="font-mono font-semibold text-white w-11 text-right">{ch.value}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#060e0b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${ch.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className={`${SUB_CARD_STYLE} px-3.5 py-2.5 flex items-center justify-between text-xs`}>
              <span className="text-slate-400">✉ Email</span>
              <span className="font-mono text-slate-200">
                {emailShare}% <span className="text-slate-500">({calcChannelVisits(emailShare)})</span>
              </span>
            </div>
            <div className={`${SUB_CARD_STYLE} px-3.5 py-2.5 flex items-center justify-between text-xs`}>
              <span className="text-slate-400">▣ Display</span>
              <span className="font-mono text-slate-200">
                {displayShare}% <span className="text-slate-500">({calcChannelVisits(displayShare)})</span>
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className={`${CARD_STYLE} p-6 space-y-4 flex-1`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Visit Duration Distribution</h2>
                <p className="text-xs text-slate-400 mt-0.5">Session length breakdown across portal and documentation</p>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Engaged
              </span>
            </div>

            <div className="flex items-end justify-between border-b border-emerald-950/80 pb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Average Duration</div>
                <div className="text-2xl font-bold text-white mt-0.5">{formattedAvgDuration}</div>
              </div>
              <div className="text-right text-xs">
                <div className="text-emerald-400 font-medium">↑ +12s MoM</div>
                <div className="text-slate-500">Fintech Avg: 3m 05s</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {DURATION_BUCKETS.map((b) => (
                <div key={b.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-200 font-medium shrink-0">{b.label}</span>
                    <span className="text-slate-500 truncate">{b.desc}</span>
                  </div>
                  <span className="font-mono text-slate-200 shrink-0">{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${CARD_STYLE} space-y-3`}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-slate-400">Device Split</span>
              <span className="text-emerald-400">Developer Core: Desktop Dominant</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`${SUB_CARD_STYLE} p-3`}>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>🖥 Desktop</span>
                  <span className="text-emerald-400">+1.1%</span>
                </div>
                <div className="text-xl font-bold text-white mt-1">68.4%</div>
              </div>
              <div className={`${SUB_CARD_STYLE} p-3`}>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>📱 Mobile</span>
                  <span className="text-slate-500">-1.1%</span>
                </div>
                <div className="text-xl font-bold text-white mt-1">31.6%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${CARD_STYLE} p-6 space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-semibold text-white">Monthly Traffic Trajectory</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-[#08120e] text-slate-400 border border-emerald-950">
                Last 6 Months
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Comparative volume tracking against SaaS & Fintech peer averages</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> {MOCK_TRAFFIC_DATA.domain} (Observed)
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-0.5 border-t border-dashed border-slate-500 inline-block" /> Fintech Median Index
            </span>
          </div>
        </div>

        <div className="relative pt-4">
          <svg viewBox="0 0 880 175" className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="trafficAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[40, 85, 130].map((yPos) => (
              <line key={yPos} x1="20" y1={yPos} x2="860" y2={yPos} stroke="#0f291e" strokeWidth="1" />
            ))}

            <path
              d="M 40 142 L 200 140 L 360 137 L 520 135 L 680 132 L 840 128"
              fill="none"
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            <path d={areaPath} fill="url(#trafficAreaGrad)" />
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" />

            {TRAJECTORY_POINTS.map((pt) => (
              <g key={pt.month}>
                <circle cx={pt.x} cy={pt.y} r="4.5" fill="#07110d" stroke="#10b981" strokeWidth="2.5" />
                <text x={pt.x} y="168" textAnchor="middle" className="fill-slate-400 text-[11px] font-mono">
                  {pt.month} ({pt.label})
                </text>
              </g>
            ))}

            <g transform="translate(650, 8)">
              <rect width="175" height="32" rx="6" fill="#081510" stroke="#10b981" strokeOpacity="0.4" />
              <text x="10" y="13" className="fill-emerald-400 text-[9px] font-semibold">
                {lastPt.month} Peak
              </text>
              <text x="10" y="25" className="fill-white text-[10px] font-mono">
                {lastPt.label} Total Visits (+{metrics?.monthlyVisitsChange ?? 4.8}%)
              </text>
            </g>
          </svg>
        </div>

        <div className="pt-2 border-t border-emerald-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>⚡ Telemetry calibration applied for seasonal developer cycle fluctuations.</span>
          <span className="font-mono">Exported Node: ID-8942-US · Raw TSV Feed</span>
        </div>
      </div>
    </div>
  )
}