import { Icon, type IconName } from "@/components/Icon";

const TECH_ITEMS: Array<{ name: string; category: string; icon: IconName }> = [
  { name: "Next.js 16", category: "Fullstack Framework", icon: "code" },
  { name: "Cloudflare Edge", category: "WAF & CDN", icon: "shield" },
  { name: "PostgreSQL & Supabase", category: "Database Layer", icon: "server" },
  { name: "Tailwind CSS", category: "Design System", icon: "spark" },
  { name: "Stripe Infrastructure", category: "Billing & Surface", icon: "lock" },
  { name: "Google Analytics 4", category: "Telemetry & Signals", icon: "activity" },
  { name: "Vercel Platform", category: "Edge Delivery", icon: "globe" },
  { name: "Prisma ORM", category: "Schema & Types", icon: "terminal" },
  { name: "Meta Pixel", category: "Marketing Tracker", icon: "radar" },
  { name: "Shopify / Headless", category: "Commerce Engine", icon: "layers" },
];

export function TechStackMarquee() {
  return (
    <section className="border-y border-white/[0.08] bg-[#050806] py-5 overflow-hidden">
      <div className="shell mb-2.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Automated Technology Fingerprinting
        </span>
        <span className="hidden sm:inline text-zinc-500">
          500+ Curated Signatures Cataloged
        </span>
      </div>

      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <div className="flex animate-marquee shrink-0 items-center gap-3 py-1">
          {TECH_ITEMS.concat(TECH_ITEMS).map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 transition hover:border-emerald-500/40 hover:bg-white/[0.04]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400">
                <Icon name={tech.icon} width={12} height={12} />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{tech.name}</p>
                <p className="font-mono text-[9px] text-zinc-500">
                  {tech.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
