import Link from "next/link";
import { HomeInteractive } from "@/components/HomeInteractive";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { PricingSection } from "@/components/PricingSection";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

const capabilities = [
  {
    icon: "radar" as const,
    number: "01",
    title: "Change Intelligence",
    body: "Detect what shifted across a public domain, why it matters, and who needs to be alerted before the delta impacts customers.",
  },
  {
    icon: "shield" as const,
    number: "02",
    title: "Risk & Compliance",
    body: "Convert security headers, TLS lifecycles, and policy pages into an automated control layer that engineering can act on directly.",
  },
  {
    icon: "activity" as const,
    number: "03",
    title: "Reliability & Edge Latency",
    body: "Trace public performance dips, payload bloat, and release fingerprints back to the exact code changes and systems responsible.",
  },
];

const testimonials = [
  {
    quote:
      "WebIntel turned our weekly competitor audit into an automated telemetry feed we review before daily standup.",
    name: "Mina Patel",
    role: "Director of Product Ops",
    company: "Northstar Cloud",
    metric: "8 hrs → 12 min",
  },
  {
    quote:
      "The first automated crawl flagged two critical CSP regressions that had slipped through our staging deployment pipeline.",
    name: "Jonas Reed",
    role: "VP, Security Engineering",
    company: "Cinder Labs",
    metric: "2 critical gaps",
  },
  {
    quote:
      "Unlike noisy monitoring dashboards, WebIntel delivers a clear, actionable diff with ownership context.",
    name: "Camille Brooks",
    role: "Platform Lead",
    company: "Cohort Systems",
    metric: "42% faster triage",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Interactive Hero with Real Terminal Inspector */}
      <HomeInteractive />

      {/* Technology Fingerprinting Animated Marquee */}
      <TechStackMarquee />

      {/* Center-Aligned Services & Core Capabilities */}
      <ServicesSection />

      {/* Three Operational Lenses Detail */}
      <section className="shell py-24 sm:py-32 border-t border-white/[0.08]">
        <SectionHeading
          eyebrow="Continuous Surface Lenses"
          title="From raw network telemetry to timestamped decisions."
          body="WebIntel provides a common operational baseline for what a site runs, how its perimeter changes, and where hidden technical debt accumulates."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {capabilities.map((item) => (
            <Link
              href="/services"
              key={item.title}
              className="panel panel-hover group relative overflow-hidden p-6 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400 transition group-hover:bg-emerald-500/10">
                  <Icon name={item.icon} width={20} height={20} />
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500">
                  {item.number}
                </span>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3>
              <p className="muted-copy mt-2.5 text-xs">{item.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span>View architecture</span>
                <Icon name="arrow-up-right" width={13} height={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Centered Predictable Pricing Section */}
      <PricingSection />

      {/* Operational Stats Bar */}
      <section className="border-y border-white/[0.08] bg-[#050806]">
        <div className="shell grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-center sm:py-24">
          <SectionHeading
            eyebrow="Continuous Reliability"
            title="Built for the team meeting before the incident."
            body="A focused operating layer for public web signals that normally require dozens of ad-hoc terminal scripts and manual checks."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <MiniStat value="14.2k+" label="Domains indexed every month" />
            <MiniStat value="99.98%" label="Telemetry availability" />
            <MiniStat value="4.2×" label="Faster vulnerability triage" />
          </div>
        </div>
      </section>

      {/* Customer Signals & Field Testimonials */}
      <section className="shell py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Engineering Field Notes"
            title="Trusted by engineering and security teams."
            body="Real teams use WebIntel to arrive with validated context, not just an unvetted link."
          />
          <Link href="/contact" className="button-secondary self-start sm:self-end text-xs">
            <span>Speak with an engineer</span>
            <Icon name="arrow-up-right" width={13} height={13} />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="panel p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    Customer Signal
                  </span>
                  <span className="rounded bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    {testimonial.metric}
                  </span>
                </div>
                <blockquote className="mt-6 text-sm leading-relaxed text-zinc-200">
                  “{testimonial.quote}”
                </blockquote>
              </div>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="text-xs font-semibold text-white">{testimonial.name}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final Action Callout Banner */}
      <section className="shell pb-24 sm:pb-32">
        <div className="card-terminal p-8 sm:p-12 border-emerald-500/30 bg-gradient-to-br from-[#09140e] to-[#050906]">
          <div className="max-w-2xl">
            <p className="eyebrow">Start with your public perimeter</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Know what changed before someone asks in standup.
            </h2>
            <p className="muted-copy mt-3 text-zinc-300">
              Enter any public domain. Receive an automated technical readout covering frameworks,
              security headers, and edge performance in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="button-primary text-xs">
                <span>Get Started Free</span>
                <Icon name="arrow-up-right" width={13} height={13} />
              </Link>
              <Link href="/services" className="button-secondary text-xs">
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/[0.1] pl-4">
      <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{label}</p>
    </div>
  );
}
