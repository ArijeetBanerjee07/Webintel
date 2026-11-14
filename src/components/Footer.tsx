"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";

const footerLinks = [
  { href: "/", label: "Overview" },
  { href: "/services", label: "Capabilities & Specs" },
  { href: "/pricing", label: "Pricing & Tiers" },
  { href: "/help", label: "Documentation" },
  { href: "/blog", label: "Research Dispatches" },
  { href: "/about", label: "Company Architecture" },
  { href: "/contact", label: "Contact Solutions Desk" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="border-t border-white/[0.08] bg-[#040705]">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-xs leading-6 text-zinc-400">
            The continuous intelligence layer for engineering, security, and operations teams
            monitoring public web perimeters.
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            All telemetry nodes operational
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-4">Platform</p>
          <div className="grid grid-cols-2 gap-y-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-400 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-4">Engineering Desk</p>
          <a
            href="mailto:support@webintel.io"
            className="flex items-center gap-2 text-xs text-zinc-300 transition hover:text-white"
          >
            <Icon name="mail" width={14} height={14} />
            support@webintel.io
          </a>
          <p className="mt-2.5 max-w-[200px] text-xs leading-5 text-zinc-500">
            Average response time: &lt; 1 hour on all technical inquiries.
          </p>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/[0.06] py-5 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 WebIntel Systems, Inc. All rights reserved.</span>
        <span className="font-mono uppercase tracking-wider text-zinc-500">
          Public signals. Structured clearly.
        </span>
      </div>
    </footer>
  );
}
