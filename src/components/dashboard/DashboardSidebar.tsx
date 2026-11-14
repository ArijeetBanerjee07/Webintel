"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import {
  LayoutDashboard,
  BrainCircuit,
  Workflow,
  Settings,
  Plus,
  ChevronDown,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { sidebarNavigation } from "@/data/sidebarData";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  "brain-circuit": BrainCircuit,
  workflow: Workflow,
  settings: Settings,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  const [expandedSection, setExpandedSection] = useState<string | null>(
    null
  );

  // Identify which section contains the current route
  const activeSection = sidebarNavigation.find((section) =>
    section.items.some((item) => item.href === pathname)
  )?.title;

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-[#101A22] text-white">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-radial from-emerald-400 from-40% to-emerald-50 flex items-center justify-center">
            <ScanLine size={21} className="text-white" />
          </div>

          <span className="text-2xl font-bold tracking-wide">
            Web<span className="text-emerald-400">Intel</span>
          </span>
        </Link>
      </div>

      {/* New Scan Button */}
      <div className="px-5 py-5">
        <Link
          href="/dashboard/scan"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl 
          bg-linear-to-br from-emerald-400 from-40% to-emerald-200 hover:bg-emerald-700 text-slate-950 font-semibold transition"
        >
          <Plus size={19} />
          New Scan
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-2">

        {sidebarNavigation.map((section) => {

          const Icon =
            iconMap[section.icon as keyof typeof iconMap];

          const isExpanded =
            expandedSection === null
              ? activeSection === section.title ||
                section.title === "Overview"
              : expandedSection === section.title;

          return (
            <div key={section.title}>

              {/* Main Menu */}
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(
                    isExpanded ? "" : section.title
                  )
                }
                className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition ${
                  isExpanded
                    ? "bg-white/10 text-emerald-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={19} />
                  <span className="text-sm font-medium">
                    {section.title}
                  </span>
                </span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Submenu */}
              {isExpanded && (
                <div className="ml-6 mt-2 pl-4 border-l border-white/10 space-y-1">

                  {section.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-2.5 rounded-lg text-sm transition ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-400 font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                </div>
              )}

            </div>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">

        <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 border border-emerald-400/20">

          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-sm font-semibold">
              Enterprise Security
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Protect your digital infrastructure with
            advanced intelligence.
          </p>

          <Link
            href="/dashboard/management/settings"
            className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <Sparkles size={14} />
            Explore features
          </Link>

        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          WebIntel © 2026
        </p>

      </div>

    </aside>
  );
}
