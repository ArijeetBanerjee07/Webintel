"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const { openAuth } = useAuth();

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-white/[0.08] bg-[#050906] py-24 sm:py-32">
      <div className="shell">
        {/* Center-aligned Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
            <Icon name="lock" width={12} height={12} />
            <span>Predictable Pricing</span>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Simple Tiers. Serious Intelligence.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Start with single-domain profiling at zero cost, or equip your team with continuous
            multi-domain surface tracking and automated alerting.
          </p>

          {/* Monthly / Annual Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                !annual ? "bg-emerald-500 text-black shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                annual ? "bg-emerald-500 text-black shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="rounded-full bg-emerald-950 px-1.5 py-0.2 text-[9px] font-bold uppercase text-emerald-300">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="panel flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">Starter</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">$0</span>
                <span className="text-xs text-zinc-500">/ forever</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-zinc-500">1 Monitored Domain</p>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                A focused audit for single sites needing quick stack analysis and baseline security checks.
              </p>

              <div className="my-6 h-px bg-white/[0.06]" />

              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>1 public domain profile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Weekly automated change scans</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Core SSL &amp; security header audit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Interactive DOM &amp; tech stack badges</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="button-secondary mt-8 w-full justify-center text-xs"
            >
              <span>Get Started Free</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </button>
          </div>

          {/* Pro Intelligence Plan (Featured) */}
          <div className="panel relative flex flex-col justify-between p-6 sm:p-8 border-emerald-500/40 bg-[#09120c] shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#030805]">
              Most Popular
            </span>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Pro Intelligence
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {annual ? "$199" : "$249"}
                </span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-emerald-400/80">Up to 25 Monitored Domains</p>

              <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                Continuous surface monitoring for engineering, DevOps, and security teams protecting critical web assets.
              </p>

              <div className="my-6 h-px bg-white/[0.08]" />

              <ul className="space-y-3 text-xs text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span className="font-medium text-white">25 monitored domain profiles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Daily change intelligence &amp; visual diffs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Automated tech debt &amp; opportunity detection</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Risk &amp; compliance continuous workbench</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Slack &amp; Discord webhook dispatch</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="button-primary mt-8 w-full justify-center text-xs"
            >
              <span>Get Started with Pro</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="panel flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">Enterprise Fleet</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">Custom</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-zinc-500">Unlimited Global Portfolio</p>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                Tailored continuous scanning programs, dedicated threat feeds, and SLA-backed monitoring for large enterprises.
              </p>

              <div className="my-6 h-px bg-white/[0.06]" />

              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Unlimited domain &amp; subdomain fleets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Custom hourly crawl cadences &amp; webhooks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>Incident timeline &amp; release tracking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="check" width={14} height={14} className="text-emerald-400 shrink-0" />
                  <span>SSO, SAML &amp; role-based access control</span>
                </li>
              </ul>
            </div>

            <Link href="/contact" className="button-secondary mt-8 w-full justify-center text-xs">
              <span>Talk to Enterprise Desk</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </Link>
          </div>
        </div>

        {/* View Full Pricing Table Link */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>Compare detailed feature specifications &amp; FAQs</span>
            <Icon name="chevron-right" width={13} height={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
