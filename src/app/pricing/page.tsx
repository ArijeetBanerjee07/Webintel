import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RouteHero } from "@/components/RouteHero";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever free",
    description: "Instant surface visibility and baseline health checks for individual websites and side projects.",
    features: [
      "1 public domain profile",
      "Weekly automated surface scans",
      "Core SSL certificate & expiry tracking",
      "Baseline HTTP security header audits",
      "Technology & framework detection",
      "Standard community support",
    ],
    action: "Get Started Free",
    highlighted: false,
    href: "/contact",
  },
  {
    name: "Pro Intelligence",
    price: "$249",
    cadence: "per month / billed annually",
    description: "The continuous surface operating layer built for engineering, DevOps, and security teams.",
    features: [
      "Up to 25 monitored domain profiles",
      "Daily automated change & release crawling",
      "DOM & visual regression diff engine",
      "Detailed security headers & CSP validator",
      "Automated tech debt & opportunity flags",
      "Slack & Discord webhook notifications",
      "Exportable PDF & JSON audit reports",
      "Priority email & technical chat support",
    ],
    action: "Get Started with Pro",
    highlighted: true,
    href: "/contact",
  },
  {
    name: "Enterprise Fleet",
    price: "Custom",
    cadence: "tailored program",
    description: "Comprehensive perimeter monitoring, dedicated infrastructure probes, and SLA guarantees.",
    features: [
      "Unlimited domain & subdomain portfolios",
      "Custom hourly crawl schedules & rate limits",
      "Dedicated egress IP proxy clusters",
      "Full REST API access & raw telemetry firehose",
      "Custom SIEM & webhook ingestion endpoints",
      "SSO, SAML & role-based team permissions",
      "SOC2 Type II documentation & security audits",
      "Dedicated technical account engineer & SLA",
    ],
    action: "Talk to Enterprise Desk",
    highlighted: false,
    href: "/contact",
  },
];

const faqs = [
  [
    "What defines a monitored domain?",
    "A single domain profile encompasses the apex domain and its associated publicly discoverable subdomains (e.g. app.domain.com, docs.domain.com) within our standard crawl depth limits.",
  ],
  [
    "Does WebIntel require any credentials or private code access?",
    "No. WebIntel operates strictly on external, publicly accessible network signals, DNS records, HTTP responses, and client-side DOM assets. Zero credentials or repository permissions required.",
  ],
  [
    "How quickly does an initial scan complete?",
    "A standard domain audit completes in under 60 seconds, during which our nodes perform DNS resolution, TLS handshake evaluation, header inspection, and DOM framework matching.",
  ],
  [
    "Can we integrate WebIntel alerts into our existing engineering workflow?",
    "Yes. Pro and Enterprise tiers include configurable webhooks that dispatch JSON payloads directly to Slack, Discord, PagerDuty, or internal security automation webhooks.",
  ],
];

export default function PricingPage() {
  return (
    <>
      <RouteHero
        eyebrow="Predictable & Transparent"
        title="Start Free. Scale with Your Domain Estate."
        body="Whether you are monitoring a single product surface or an enterprise portfolio across hundreds of subdomains, WebIntel provides clear, tiered pricing."
      />

      {/* 3 Tier Cards */}
      <section className="shell py-20 sm:py-28">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-xl border p-7 sm:p-8 ${
                plan.highlighted
                  ? "border-emerald-500/50 bg-[#09130d] shadow-[0_0_35px_-5px_rgba(16,185,129,0.3)]"
                  : "border-white/[0.08] bg-[#070b09]"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-emerald-500 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#030805]">
                  Most Popular
                </span>
              )}

              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {plan.name}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                  <span className="font-mono text-xs text-zinc-500">/{plan.cadence}</span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-zinc-400 min-h-[44px]">
                  {plan.description}
                </p>

                <div className="my-6 h-px bg-white/[0.06]" />

                <ul className="space-y-3 text-xs text-zinc-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={plan.highlighted ? "button-primary mt-8 w-full justify-center text-xs" : "button-secondary mt-8 w-full justify-center text-xs"}
              >
                <span>{plan.action}</span>
                <Icon name="arrow-up-right" width={13} height={13} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-white/[0.08] bg-[#050806] py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Common Technical Questions
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Have a specific question not covered here? Reach out to our solutions team directly.
            </p>
            <Link href="/contact" className="button-secondary mt-6 text-xs">
              <span>Contact Solutions Desk</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                  <span>{question}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.1] text-zinc-400 transition group-open:rotate-45">
                    <Icon name="plus" width={12} height={12} />
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400 max-w-xl">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
