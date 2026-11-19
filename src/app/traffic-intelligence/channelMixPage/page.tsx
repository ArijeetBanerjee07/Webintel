import { MOCK_TRAFFIC_DATA } from '../mockTrafficData';

export default function ChannelMixPage() {
  const { channelMix, metrics, lastUpdated } = MOCK_TRAFFIC_DATA;
  const totalVisits = metrics?.monthlyVisits ?? 48200000;

  const matrixRows = [
    {
      channel: 'Organic Search',
      type: 'Unpaid',
      share: channelMix?.organicSearch ?? 46.5,
      mom: '+5.4%',
      duration: '04m 12s',
      pagesPerVisit: 3.6,
      bounceRate: '34.8%',
    },
    {
      channel: 'Direct Navigation',
      type: 'Unpaid',
      share: channelMix?.direct ?? 34.2,
      mom: '+4.1%',
      duration: '04m 48s',
      pagesPerVisit: 3.9,
      bounceRate: '31.5%',
    },
    {
      channel: 'Referral Network',
      type: 'Unpaid',
      share: channelMix?.referral ?? 9.8,
      mom: '+6.2%',
      duration: '03m 50s',
      pagesPerVisit: 3.2,
      bounceRate: '39.0%',
    },
    {
      channel: 'Paid Search (SEM)',
      type: 'Paid',
      share: channelMix?.paidSearch ?? 5.1,
      mom: '+2.3%',
      duration: '02m 45s',
      pagesPerVisit: 2.5,
      bounceRate: '46.4%',
    },
    {
      channel: 'Social & Community',
      type: 'Unpaid',
      share: channelMix?.social ?? 2.6,
      mom: '+8.9%',
      duration: '02m 18s',
      pagesPerVisit: 2.1,
      bounceRate: '51.2%',
    },
    {
      channel: 'Email',
      type: 'Owned',
      share: channelMix?.email ?? 1.1,
      mom: '+1.2%',
      duration: '05m 10s',
      pagesPerVisit: 4.1,
      bounceRate: '28.9%',
    },
    {
      channel: 'Display Ads',
      type: 'Paid',
      share: channelMix?.display ?? 0.7,
      mom: '-1.8%',
      duration: '01m 35s',
      pagesPerVisit: 1.7,
      bounceRate: '61.0%',
    },
  ]

  const rowsWithVisits = matrixRows.map((row) => {
    const rawVisits = (totalVisits * row.share) / 100;
    const estVisits = Math.round(rawVisits)

    return {
      ...row,
      estVisits,
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Unpaid / Organic Share
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">94.2%</span>
            <span className="text-xs text-emerald-400">45.4M visits</span>
          </div>
        </div>
        <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Paid Acquisition Share
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">5.8%</span>
            <span className="text-xs text-slate-400">2.8M visits</span>
          </div>
        </div>
        <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 p-5">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Highest Engagement Channel
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">Email</span>
            <span className="text-xs text-slate-400">4.1 pages / visit</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#0b1813] border border-emerald-900/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-950/80 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Acquisition Channel Matrix</h2>
          <span className="text-xs text-slate-400">Updated {lastUpdated ?? 'N/A'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#08120e] text-xs uppercase text-slate-400 border-b border-emerald-950/80">
              <tr>
                <th className="px-6 py-3">Channel</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-right">Est. Visits</th>
                <th className="px-6 py-3 text-right">Share</th>
                <th className="px-6 py-3 text-right">MoM Change</th>
                <th className="px-6 py-3 text-right">Avg. Duration</th>
                <th className="px-6 py-3 text-right">Pages / Visit</th>
                <th className="px-6 py-3 text-right">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60">
              {rowsWithVisits.map((row) => {
                const isNegativeMom = row.mom.startsWith('-');

                return (
                  <tr key={row.channel} className="hover:bg-[#0e2019] transition-colors">
                    <td className="px-6 py-3.5 font-medium text-white">{row.channel}</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 text-xs rounded bg-[#08120e] text-slate-300 border border-emerald-900/50">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-200">
                      {row.estVisits.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-emerald-400">
                      {row.share}%
                    </td>
                    <td
                      className={`px-6 py-3.5 text-right font-mono ${
                        isNegativeMom ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {row.mom}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">
                      {row.duration}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-300">
                      {row.pagesPerVisit}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-slate-400">
                      {row.bounceRate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}