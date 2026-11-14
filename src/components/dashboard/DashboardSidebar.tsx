"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  AlertTriangle,
  GitBranch,
  Sliders,
  ShieldCheck,
  Activity,
  Code2,
  Send,
  Clock,
  Users,
  Boxes,
  Settings,
  PlusCircle,
  Crown,
  PanelLeftClose,
  Sparkles,
} from "lucide-react";
import { sidebarNavigation } from "@/data/sidebarData";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "layout-grid": LayoutDashboard,
  layers: Layers,
  "alert-triangle": AlertTriangle,
  "git-branch": GitBranch,
  sliders: Sliders,
  "shield-check": ShieldCheck,
  "heart-pulse": Activity,
  code: Code2,
  send: Send,
  clock: Clock,
  users: Users,
  boxes: Boxes,
  settings: Settings,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-[#0d2816] bg-[#020603] text-white z-20">
      {/* Top Header / Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#0d2816]/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#0a2714] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform">
            <Sparkles size={16} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Web<span className="text-emerald-400 font-semibold">Intel</span>
          </span>
        </Link>

        <button
          type="button"
          title="Toggle Sidebar"
          className="text-white/40 hover:text-white transition p-1 rounded-md hover:bg-white/5"
        >
          <PanelLeftClose size={17} />
        </button>
      </div>

      {/* New Scan Button (Image 2 style) */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/dashboard#new-scan"
          className="flex items-center gap-2.5 w-full py-2.5 px-3.5 rounded-xl bg-[#082212] hover:bg-[#0e331c] border border-emerald-500/30 text-white font-medium text-xs tracking-wide transition shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <PlusCircle size={16} className="text-emerald-400" />
          <span>New Scan</span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-4 py-2 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
        {sidebarNavigation.map((section) => (
          <div key={section.title} className="space-y-1">
            {/* Section Header */}
            <div className="px-2 text-[11px] font-semibold text-slate-400/70 tracking-wider">
              {section.title}
            </div>

            {/* Section Items with exact icons */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition ${
                      isActive
                        ? "bg-[#0a2314] text-white font-semibold border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.12)]"
                        : "text-slate-400 hover:text-white hover:bg-[#07190d]/60"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white"}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Upgrade to Premium Card (Image 2 style) */}
      <div className="p-3 border-t border-[#0d2816]/80">
        <div className="rounded-2xl p-3.5 bg-[#06180d] border border-emerald-500/20 relative overflow-hidden">
          {/* Subtle ambient corner glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Crown badge */}
          <div className="w-7 h-7 rounded-lg bg-[#0e2f1b] border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Crown size={15} />
          </div>

          <div className="text-xs font-bold text-white tracking-wide">
            Upgrade to premium
          </div>

          <p className="text-[10px] text-slate-400/80 leading-relaxed mt-1 mb-2.5">
            Boost productivity with seamless automation and responsive AI built to adapt to your needs.
          </p>

          <button
            type="button"
            className="w-full py-1.5 rounded-xl bg-[#0d2f19] hover:bg-[#134223] border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-semibold transition text-center shadow-[0_0_12px_rgba(16,185,129,0.1)] cursor-pointer"
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
