import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RouteHero } from "@/components/RouteHero";

const pipelineSteps = [
  {
    step: "01",
    title: "Distributed Edge Resolution",
    body: "Our probing nodes query global DNS resolvers to map apex records, CNAME delegations, and SSL certificate chains without touching proprietary infrastructure.",
  },
  {
    step: "02",
    title: "Passive HTTP & Protocol Handshake",
    body: "We inspect raw transport headers, protocol negotiations (HTTP/2 vs HTTP/3), security flags (HSTS, CSP, X-Frame-Options), and compression algorithms.",
  },
  {
    step: "03",
    title: "DOM Signature & Framework Classifier",
    body: "Client-side headless parsers evaluate script tags, meta directives, global window objects, and CSS asset bundles to identify 500+ modern web technologies.",
  },
  {
    step: "04",
    title: "Multi-Vector Scoring & Opportunity Synthesis",
    body: "Findings are normalized into a unified risk, compliance, and performance index, pinpointing actionable technical debt for engineering teams.",
  },
];

const principles = [
  {
    icon: "globe" as const,
    title: "100% Public Signals",
    body: "We analyze exclusively what the public internet can inspect. No tokens, no repository access, and zero intrusive probes required.",
  },
  {
    icon: "terminal" as const,
    title: "Deterministic & Timestamped",
    body: "Every scan produces immutable, cryptographic evidence with timestamped status codes and raw header readouts.",
  },
  {
    icon: "shield" as const,
    title: "Privacy & Zero Fingerprint",
    body: "Our probes adhere to standard crawl etiquette, respect robots.txt limits, and introduce zero performance overhead to target origins.",
  },
];

export default function AboutPage() {
  return (
    <>
      <RouteHero
        eyebrow="Company & Engineering Architecture"
        title="Making the Public Web Perimeter Legible."
        body="WebIntel was built to give engineering, security, and operations teams a continuous, automated readout of their public attack surface and technology stack."
      />

      {/* Engineering Architecture Pipeline */}
      <section className="shell py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">The Telemetry Engine</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How WebIntel Probes and Analyzes Surfaces
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Unlike legacy vulnerability scanners that rely on intrusive brute-force attacks, WebIntel
            uses passive network reconnaissance and high-precision DOM signature classification.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pipelineSteps.map((item) => (
            <div key={item.step} className="panel p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {item.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Principles */}
      <section className="border-t border-white/[0.08] bg-[#050806] py-20 sm:py-28">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Operating Principles</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered with Integrity and Precision
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="panel p-6 sm:p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                  <Icon name={p.icon} width={20} height={20} />
                </span>
                <h3 className="mt-6 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 card-terminal p-8 sm:p-10 border-white/[0.08] bg-[#070c09] flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Ready to inspect your domain estate?</h3>
              <p className="mt-1.5 text-xs text-zinc-400">
                Experience automated surface intelligence on any public website in under 60 seconds.
              </p>
            </div>
            <Link href="/contact" className="button-primary text-xs shrink-0">
              <span>Get Started with WebIntel</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
