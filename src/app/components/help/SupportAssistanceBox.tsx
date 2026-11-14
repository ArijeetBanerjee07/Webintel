import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Code2,
  Activity,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export function SupportAssistanceBox() {
  return (
    <section
      aria-labelledby="support-heading"
      className="group relative isolate overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#102019] via-[#0B1410] to-[#080E0B] p-6 shadow-xl shadow-black/10 sm:p-8"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/[0.08] blur-[90px] transition duration-700 group-hover:bg-emerald-500/[0.13]" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-32 w-64 rounded-full bg-teal-500/[0.04] blur-[70px]" />

      <div className="grid gap-8 md:grid-cols-3 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Direct Assistance
            </span>
          </div>

          <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
            Quick Contacts
          </h3>

          <div className="mt-4 space-y-3.5">
            <a
              href="tel:+91356777"
              className="group/contact flex items-center gap-3 text-xs text-zinc-400 transition hover:text-emerald-400"
            >
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>+91 356777</span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover/contact:opacity-100" />
            </a>

            <a
              href="mailto:support@webintel.io"
              className="group/contact flex items-center gap-3 text-xs text-zinc-400 transition hover:text-emerald-400"
            >
              <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="break-all">support@webintel.io</span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover/contact:opacity-100" />
            </a>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/30" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live Chat Online
              <span className="ml-auto text-[10px] font-medium text-emerald-400">
                Available
              </span>
            </div>
          </div>

          <p className="mt-5 flex items-center gap-1.5 text-[10px] text-zinc-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Mon–Sun · 24/7 Priority Support
          </p>
        </div>

        <div className="relative border-y border-white/[0.07] py-7 md:border-x md:border-y-0 md:px-8 md:py-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
            <Activity className="h-3 w-3" />
            We&apos;re here to help
          </span>

          <h2
            id="support-heading"
            className="mt-4 text-xl font-semibold tracking-tight text-white"
          >
            Still need help?
          </h2>

          <p className="mt-2 text-xs leading-6 text-zinc-400">
            Can&apos;t find the answer you&apos;re looking for? Our solutions
            engineers are ready to help with technical questions,
            custom integrations, and enterprise requirements.
          </p>

          <Link
            href="/help/contact"
            className="group/button mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-semibold text-[#061009] shadow-lg shadow-emerald-500/10 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/20"
          >
            Contact Support
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-1" />
          </Link>

          <p className="mt-3 text-[10px] text-zinc-600">
            Typically responds in under 1 hour
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">
              Support Center
            </h3>
          </div>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Explore resources and get more out of WebIntel.
          </p>

          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="#support-hub"
                className="group/link flex items-center justify-between text-xs text-zinc-400 transition hover:text-emerald-400"
              >
                <span>Support Center Hub</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover/link:opacity-100" />
              </a>
            </li>

            <li>
              <a
                href="#request-feature"
                className="group/link flex items-center justify-between text-xs text-zinc-400 transition hover:text-emerald-400"
              >
                <span>Request a Feature</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover/link:opacity-100" />
              </a>
            </li>

            <li>
              <a
                href="#api-docs"
                className="group/link flex items-center justify-between text-xs text-zinc-400 transition hover:text-emerald-400"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5" />
                  Developer API Docs
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover/link:opacity-100" />
              </a>
            </li>
          </ul>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[11px] font-medium text-emerald-400">
                All Systems Operational
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">
              99.98%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
