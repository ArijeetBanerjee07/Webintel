import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";

const SERVICES = [
  {
    index: "01",
    icon: "layers" as IconName,
    title: "Surface Inventory & DNS Topology",
    description:
      "Map all public subdomains, apex records, load-balancer endpoints, and third-party origins across your organizational domain estate.",
    tags: ["Subdomain Discovery", "DNS Health", "Edge Routing"],
  },
  {
    index: "02",
    icon: "radar" as IconName,
    title: "Continuous Release & DOM Diffs",
    description:
      "Track production deployments, script mutations, and structural DOM shifts with high-precision timestamped snapshots.",
    tags: ["Visual Diffs", "Release Fingerprints", "Regression Alerts"],
  },
  {
    index: "03",
    icon: "code" as IconName,
    title: "Technology Stack Fingerprinting",
    description:
      "Identify frontend frameworks, CMS engines, analytics scripts, payment SDKs, and build tools via signature matching.",
    tags: ["Framework Detection", "Package Signatures", "Dependency Drift"],
  },
  {
    index: "04",
    icon: "shield" as IconName,
    title: "Security Headers & Compliance Audit",
    description:
      "Inspect CSP directives, HSTS preload compliance, SSL certificate expirations, and missing security flags across endpoints.",
    tags: ["CSP & HSTS", "SSL Lifecycle", "Security Scorecard"],
  },
  {
    index: "05",
    icon: "activity" as IconName,
    title: "Edge Latency & Core Web Vitals",
    description:
      "Measure worldwide TTFB, asset payload weights, and client-side performance benchmarks from distributed edge nodes.",
    tags: ["TTFB Latency", "Payload Profiling", "Edge Benchmarks"],
  },
  {
    index: "06",
    icon: "zap" as IconName,
    title: "Automated Tech Debt & Opportunity Engine",
    description:
      "Flag outdated legacy libraries, uncompressed assets, third-party performance hogs, and high-impact technical optimizations.",
    tags: ["Modernization Score", "Debt Flags", "Exportable Reports"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="shell scroll-mt-20 py-24 sm:py-32">
      {/* Center-aligned Section Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
          <Icon name="spark" width={13} height={13} />
          <span>Core Capabilities</span>
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Six Continuous Lenses on Public Infrastructure
        </h2>

        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          WebIntel turns raw network packets, HTTP headers, DOM assets, and DNS records into
          actionable engineering telemetry.
        </p>
      </div>

      {/* Bento Grid Matrix */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="panel panel-hover group relative flex flex-col justify-between p-6 sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400 transition group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                  <Icon name={service.icon} width={20} height={20} />
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500">
                  {service.index}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {service.title}
              </h3>

              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                {service.description}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center Section Footer Action */}
      <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
        <Link href="/services" className="button-secondary text-xs">
          <span>Read Comprehensive Architecture Specs</span>
          <Icon name="arrow-up-right" width={13} height={13} />
        </Link>
        <Link href="/contact" className="button-primary text-xs">
          <span>Get Started with WebIntel</span>
          <Icon name="arrow-up-right" width={13} height={13} />
        </Link>
      </div>
    </section>
  );
}
