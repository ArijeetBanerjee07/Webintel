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

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openAuth } = useAuth();

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
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-300 transition hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#060c08] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5">
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
            <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
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
