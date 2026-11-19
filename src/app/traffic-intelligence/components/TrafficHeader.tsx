interface TrafficHeaderProps {
  domain: string;
  sourceProvider: string;
  confidence: string;
}

export function TrafficHeader({ domain, sourceProvider, confidence }: TrafficHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-emerald-950/80 pb-5">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Traffic Intelligence</h1>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {domain}
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">Estimated acquisition volume, channel distribution, and audience reach</p>
      </div>
      <div className="flex items-center gap-3 bg-[#0c1a14] border border-emerald-900/60 rounded-lg px-3.5 py-2 text-xs">
        <div>
          <span className="text-slate-400">Data Source: </span>
          <span className="font-medium text-emerald-300">{sourceProvider}</span>
        </div>
        <span className="text-emerald-900">|</span>
        <div>
          <span className="text-slate-400">Confidence: </span>
          <span className="font-semibold text-emerald-400">{confidence}</span>
        </div>
      </div>
    </div>
  );
}