"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/#services", label: "Capabilities" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/help", label: "Docs" },
  { href: "/contact", label: "Contact" },
];

const websiteIntelligenceLinks = [
  {
    href: "/audit",
    label: "Website Audit",
    icon: "shield" as const,
  },
  {
    href: "/metadata-schema",
    label: "Metadata & Schema",
    icon: "code" as const,
  },
  {
    href: "/broken-links",
    label: "Broken Links",
    icon: "link" as const,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [websiteIntelligenceOpen, setWebsiteIntelligenceOpen] =
    useState(false);

  const { openAuth } = useAuth();

  const isWebsiteIntelligenceActive = websiteIntelligenceLinks.some(
    (link) => pathname === link.href
  );

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#040806]/80 backdrop-blur-xl transition-all">
      <div className="shell flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-10">
          <Brand />

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Website Intelligence Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setWebsiteIntelligenceOpen((current) => !current)
                }
                aria-expanded={websiteIntelligenceOpen}
                aria-haspopup="menu"
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  isWebsiteIntelligenceActive || websiteIntelligenceOpen
                    ? "bg-white/[0.06] text-emerald-300"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>Website Intelligence</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`h-3.5 w-3.5 transition-transform ${
                    websiteIntelligenceOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {websiteIntelligenceOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-white/[0.08] bg-[#050806] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                >
                  <div className="mb-2 border-b border-white/[0.08] px-3 py-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                      Website Intelligence
                    </p>
                  </div>

                  {websiteIntelligenceLinks.map((link) => {
                    const active = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setWebsiteIntelligenceOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition ${
                          active
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center ${
                            active ? "text-emerald-400" : "text-zinc-400"
                          }`}
                        >
                          <Icon name={link.icon} width={16} height={16} />
                        </span>

                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => openAuth("signin")}
            className="rounded-lg px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:text-white"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-[#030805] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
          >
            <span>Get Started</span>
            <Icon name="arrow-up-right" width={14} height={14} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-[#030805]"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-300 transition hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon
              name={mobileMenuOpen ? "x" : "menu"}
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#060c08] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Website Intelligence Section */}
            <div className="border-t border-white/[0.06] pt-2">
              <button
                type="button"
                onClick={() =>
                  setWebsiteIntelligenceOpen((current) => !current)
                }
                aria-expanded={websiteIntelligenceOpen}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  isWebsiteIntelligenceActive || websiteIntelligenceOpen
                    ? "bg-white/[0.04] text-emerald-300"
                    : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center text-emerald-400">
                    <Icon name="globe" width={17} height={17} />
                  </span>

                  <span>Website Intelligence</span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`h-4 w-4 transition-transform ${
                    websiteIntelligenceOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {websiteIntelligenceOpen && (
                <div className="ml-5 mt-1 space-y-1 border-l border-white/[0.08] pl-3">
                  {websiteIntelligenceLinks.map((link) => {
                    const active = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setWebsiteIntelligenceOpen(false);
                        }}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span
                          className={
                            active ? "text-emerald-400" : "text-zinc-400"
                          }
                        >
                          <Icon name={link.icon} width={17} height={17} />
                        </span>

                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Auth Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth("signin");
                }}
                className="rounded-lg border border-white/[0.08] py-2 text-xs font-medium text-zinc-300"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth("signup");
                }}
                className="rounded-lg bg-emerald-500 py-2 text-xs font-semibold text-[#030805]"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
