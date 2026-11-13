import React from "react";

export function SupportAssistanceBox() {
  return (
    <section
      aria-labelledby="support-heading"
      className="rounded-2xl border border-[#10B981]/25 bg-linear-to-r from-[#0B1410] via-[#0D1914] to-[#0B1410] p-6 sm:p-8"
    >
      <div className="grid gap-8 md:grid-cols-3 md:items-center">
        {/* Left: Quick Contacts */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
            Direct Assistance
          </span>
          <h3 className="mt-1 text-base font-semibold text-white">
            Quick Contacts
          </h3>
          <ul className="mt-3 space-y-2 text-xs text-zinc-400">
            <li>&#9742; +1 (800) 542-8921 (Mon–Sun 24/7)</li>
            <li>&#9993; support@webintel.io (&lt; 1hr reply)</li>
            <li className="flex items-center gap-2 text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              Live Chat Online
            </li>
          </ul>
        </div>

        {/* Center: Still Need Help CTA */}
        <div className="border-y border-zinc-800/80 py-6 md:border-x md:border-y-0 md:px-8 md:py-0">
          <h2 id="support-heading" className="text-lg font-bold text-white">
            Still need help?
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
            Can&apos;t find the guide you&apos;re looking for? Our dedicated
            solutions engineers are ready to assist with custom pipeline
            integrations.
          </p>
          <a
            href="mailto:support@webintel.io"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 text-xs font-semibold text-[#080C0A] transition hover:bg-[#34D399]"
          >
            Contact Support &rarr;
          </a>
        </div>

        {/* Right: Support Center Links */}
        <div>
          <h3 className="text-base font-semibold text-white">Support Center</h3>
          <ul className="mt-3 space-y-2 text-xs text-zinc-400">
            <li>
              <a href="#support-hub" className="hover:text-[#10B981]">
                Support Center Hub
              </a>
            </li>
            <li>
              <a href="#request-feature" className="hover:text-[#10B981]">
                Request Feature
              </a>
            </li>
            <li>
              <a href="#api-docs" className="hover:text-[#10B981]">
                Developer API Docs
              </a>
            </li>
            <li className="flex items-center gap-2 text-[#10B981]">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              System Status (99.98% Uptime)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}