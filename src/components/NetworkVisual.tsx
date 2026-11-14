import { Icon } from "@/components/Icon";

const dots = Array.from({ length: 126 }, (_, index) => ({
  id: index,
  x: (index * 37) % 100,
  y: (index * 61 + 12) % 100,
  active: index % 7 === 0 || index % 11 === 0
}));

const nodes = [
  { label: "stripe.com", x: "28%", y: "28%" },
  { label: "app layer", x: "63%", y: "20%" },
  { label: "edge / cdn", x: "70%", y: "69%" },
  { label: "risk node", x: "35%", y: "72%" }
];

export function NetworkVisual() {
  return <div className="relative h-[320px] overflow-hidden rounded-xl border border-emerald-900/70 bg-[#06100A] sm:h-[360px]"><div className="absolute inset-0 opacity-70 scan-grid" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_44%)]" /><svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none"><path d="M28 28 C45 42 50 18 63 20 M28 28 C41 51 55 66 70 69 M35 72 C48 54 54 42 63 20 M35 72 C46 69 56 76 70 69" fill="none" stroke="rgba(52,211,153,0.58)" strokeDasharray="2 2" /><circle cx="52" cy="48" r="16" fill="none" stroke="rgba(52,211,153,0.16)" /><circle cx="52" cy="48" r="24" fill="none" stroke="rgba(52,211,153,0.08)" /></svg>{dots.map((dot) => <span key={dot.id} className={`absolute h-1 w-1 rounded-full ${dot.active ? "bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.95)]" : "bg-emerald-800/70"}`} style={{ left: `${dot.x}%`, top: `${dot.y}%` }} />)}{nodes.map((node) => <div key={node.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md border border-emerald-600/40 bg-[#07160D]/90 px-2 py-1 font-mono text-[9px] text-emerald-200 shadow-glow" style={{ left: node.x, top: node.y }}><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{node.label}</div>)}<div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-500/80"><Icon name="radar" width={14} height={14} />Signal topology / public surface</div><div className="absolute right-4 top-4 rounded border border-emerald-900/80 bg-[#06100A]/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">live topology</div></div>;
}
