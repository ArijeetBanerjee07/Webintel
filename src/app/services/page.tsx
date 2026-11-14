import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { RouteHero } from "@/components/RouteHero";

const modules: Array<{
  index: string;
  icon: IconName;
  title: string;
  description: string;
  details: string[];
  tags: string[];
}> = [
  {
    index: "01",
    icon: "layers",
    title: "Surface Inventory & DNS Topology",
    description:
      "Automated discovery of root domains, apex records, public subdomains, and CDN edges across global routing infrastructure.",
    details: [
      "Enumerates DNS A, AAAA, CNAME, and MX record chains",
      "Flags dangling CNAME records and potential subdomain takeover vulnerabilities",
      "Maps origin infrastructure behind reverse proxies (Cloudflare, Fastly, AWS CloudFront)",
    ],
    tags: ["DNS Topology", "Subdomain Discovery", "Edge Origin"],
  },
  {
    index: "02",
    icon: "radar",
    title: "Continuous Release & DOM Mutation Engine",
    description:
      "Deep structural diffing between consecutive crawls to detect code deployments, content mutations, and tracking script additions.",
    details: [
      "Computes SHA-256 integrity hashes across all referenced JavaScript bundles",
      "Identifies unannounced production releases and frontend framework version bumps",
      "Timestamped visual and DOM-tree diffing with granular change classifications",
    ],
    tags: ["Script Checksums", "DOM Tree Diffs", "Release Cadence"],
  },
  {
    index: "03",
    icon: "code",
    title: "Technology Stack & Dependency Fingerprinting",
    description:
      "Signature-based technology classification identifying frameworks, state managers, analytics SDKs, and payment gateways.",
    details: [
      "Matches against 500+ curated technology signatures across DOM, headers, and window globals",
      "Extracts exact package versions from meta tags, bundle comments, and runtime variables",
      "Maps third-party telemetry dependencies and external vendor script injection",
    ],
    tags: ["Framework Detection", "Version Extraction", "Vendor Mapping"],
  },
  {
    index: "04",
    icon: "shield",
    title: "Security Headers & Cryptographic Posture",
    description:
      "Comprehensive evaluation of HTTP security headers, TLS cipher suites, and modern browser defense directives.",
    details: [
      "Validates Content-Security-Policy (CSP) syntax, script nonces, and unsafe-inline directives",
      "Verifies HSTS max-age, includeSubDomains, and Chromium preload status",
      "Audits SSL/TLS certificate validity, issuer authority, and days until expiration",
    ],
    tags: ["CSP Validator", "HSTS Preload", "TLS Handshake"],
  },
  {
    index: "05",
    icon: "activity",
    title: "Edge Latency & Core Web Vitals Center",
    description:
      "Distributed synthetic probes measuring worldwide time-to-first-byte (TTFB), asset weights, and performance budgets.",
    details: [
      "Simulates real client connections from edge nodes across US, EU, and APAC",
      "Measures raw TCP connection time, TLS negotiation overhead, and TTFB latency",
      "Tracks total asset payload sizes, Brotli vs. Gzip compression ratios, and unminified bundles",
    ],
    tags: ["TTFB Benchmarks", "Payload Budget", "Edge Probing"],
  },
  {
    index: "06",
    icon: "zap",
    title: "Automated Tech Debt & Opportunity Matrix",
    description:
      "Algorithmic scoring that synthesizes technical findings into actionable, prioritize-by-impact engineering roadmaps.",
    details: [
      "Calculates multi-dimensional health scores (Technical, Security, SEO, Performance)",
      "Highlights revenue opportunities such as missing mobile viewports or deprecated payment forms",
      "Generates exportable, audit-grade JSON telemetry feeds and stakeholder reports",
    ],
    tags: ["Scoring Engine", "Tech Debt Flags", "Audit Reports"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <RouteHero
        eyebrow="Platform Capabilities & Architecture"
        title="Six Engineering Lenses on Every Public Surface."
        body="WebIntel runs non-intrusive, automated network and DOM inspections to extract high-confidence operational intelligence without requiring internal access or credentials."
      />

      {/* Module Specifications Grid */}
      <section className="shell py-20 sm:py-28">
        <div className="space-y-6">
          {modules.map((module) => (
            <article
              key={module.title}
              className="panel p-6 sm:p-8 transition hover:border-emerald-500/30"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                      <Icon name={module.icon} width={18} height={18} />
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      Module {module.index}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                    {module.title}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {module.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                    {module.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 md:max-w-[200px] md:justify-end">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Enterprise Integration Ecosystem */}
      <section className="border-t border-white/[0.08] bg-[#050806] py-20 sm:py-28">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Continuous Pipeline Integration</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              Connect Telemetry Directly Into Your Engineering Stack
            </h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
              WebIntel hooks into existing DevOps and security workflows, routing timestamped perimeter changes
              to the exact teams responsible.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="panel p-6 flex flex-col justify-between">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                  <Icon name="terminal" width={18} height={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">CI/CD Quality Gates</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Automatically verify security headers and bundle integrity before releasing to production.
                </p>
              </div>
              <span className="mt-6 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">GitHub Actions / GitLab</span>
            </div>

            <div className="panel p-6 flex flex-col justify-between">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                  <Icon name="radar" width={18} height={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">Instant Incident Routing</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Dispatch real-time webhooks on CSP regressions, expired certificates, or DNS record drift.
                </p>
              </div>
              <span className="mt-6 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Slack / Discord / PagerDuty</span>
            </div>

            <div className="panel p-6 flex flex-col justify-between">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                  <Icon name="server" width={18} height={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">SIEM &amp; Telemetry Stream</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Ingest structured findings into your central security data lake with immutable timestamped evidence.
                </p>
              </div>
              <span className="mt-6 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Datadog / Splunk / Elastic</span>
            </div>

            <div className="panel p-6 flex flex-col justify-between">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-emerald-400">
                  <Icon name="shield" width={18} height={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">Audit &amp; Compliance Decks</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  One-click export executive compliance scorecards and tech debt registers for SOC2 and ISO reviews.
                </p>
              </div>
              <span className="mt-6 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Exportable PDF / JSON</span>
            </div>
          </div>

          <div className="mt-14 card-terminal p-8 sm:p-10 border-white/[0.08] bg-[#070c09] flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Explore custom integration programs</h3>
              <p className="mt-1.5 text-xs text-zinc-400">
                Talk with our solutions engineers about custom rate limits, VPC peering, and dedicated crawl schedules.
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
