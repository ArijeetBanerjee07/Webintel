"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  FileText,
  ShieldCheck,
  Layers,
  Zap,
  Smartphone,
  Code2,
  Target,
  Crosshair,
  GitCompare,
  Key,
  FileQuestion,
  Link as LinkIcon,
  Files,
  Search,
  TrendingUp,
  Eye,
  ExternalLink,
  Star,
  Terminal,
  BarChart3,
  LineChart,
  PieChart,
  Compass,
  MapPin,
  Share2,
  Cpu,
  ShoppingCart,
  Tag,
  History,
  BookOpen,
  Newspaper,
  Network,
  Calendar,
  Gauge,
  Lightbulb,
  Megaphone,
  LayoutTemplate,
  Share,
  MessageSquare,
  MousePointerClick,
  Mail,
  Bell,
  Bookmark,
  BellRing,
  BadgeDollarSign,
  FilePlus,
  FileX,
  Briefcase,
  GitCommit,
  FileBarChart,
  Save,
  Clock4,
  Download,
  Award,
  Sparkles,
  Filter,
  Flame,
  ListPlus,
  ArrowUpRight,
  Settings,
  Folder,
  Users,
  Boxes,
  Database,
  CreditCard,
  SlidersHorizontal,
  ChevronDown,
  PlusCircle,
  PanelLeftClose,
  Crown,
} from "lucide-react";
import { sidebarNavigation, SidebarSection } from "@/data/sidebarData";

// Icon mapping for every feature listed in WebIntel Product Guide PDF
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "layout-grid": LayoutDashboard,
  globe: Globe,
  "file-text": FileText,
  "shield-check": ShieldCheck,
  layers: Layers,
  zap: Zap,
  smartphone: Smartphone,
  code: Code2,
  target: Target,
  crosshair: Crosshair,
  "git-compare": GitCompare,
  key: Key,
  "file-question": FileQuestion,
  link: LinkIcon,
  "link-2-off": LinkIcon,
  files: Files,
  search: Search,
  "key-round": Key,
  "trending-up": TrendingUp,
  eye: Eye,
  "external-link": ExternalLink,
  "globe-2": Globe,
  star: Star,
  terminal: Terminal,
  "bar-chart-3": BarChart3,
  "line-chart": LineChart,
  "pie-chart": PieChart,
  compass: Compass,
  "map-pin": MapPin,
  "users-2": Users,
  "share-2": Share2,
  cpu: Cpu,
  "search-code": Code2,
  "shopping-cart": ShoppingCart,
  tag: Tag,
  history: History,
  "book-open": BookOpen,
  "file-search": FileText,
  newspaper: Newspaper,
  network: Network,
  calendar: Calendar,
  gauge: Gauge,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  "layout-template": LayoutTemplate,
  share: Share,
  "message-square": MessageSquare,
  "mouse-pointer-click": MousePointerClick,
  mail: Mail,
  bell: Bell,
  bookmark: Bookmark,
  "bell-ring": BellRing,
  "badge-dollar-sign": BadgeDollarSign,
  "file-plus": FilePlus,
  "file-x": FileX,
  briefcase: Briefcase,
  "git-commit": GitCommit,
  "file-bar-chart": FileBarChart,
  save: Save,
  "clock-4": Clock4,
  download: Download,
  award: Award,
  sparkles: Sparkles,
  filter: Filter,
  flame: Flame,
  "list-plus": ListPlus,
  "arrow-up-right": ArrowUpRight,
  settings: Settings,
  folder: Folder,
  users: Users,
  boxes: Boxes,
  database: Database,
  "credit-card": CreditCard,
  "sliders-horizontal": SlidersHorizontal,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  // Find which section holds the current active route
  const defaultOpenSections = ["Overview", "Website Intelligence"];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    defaultOpenSections.reduce((acc, title) => ({ ...acc, [title]: true }), {})
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-[#0d2816] bg-[#020603] text-white z-20">
      {/* Top Header / Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#0d2816]/80">
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
          className="text-white/40 hover:text-white transition p-1 rounded-md hover:bg-white/5 cursor-pointer"
        >
          <PanelLeftClose size={17} />
        </button>
      </div>

      {/* New Scan Button */}
      <div className="px-4 pt-3.5 pb-2">
        <Link
          href="/scanner"
          className="flex items-center gap-2.5 w-full py-2.5 px-3.5 rounded-xl bg-[#082212] hover:bg-[#0e331c] border border-emerald-500/30 text-white font-medium text-xs tracking-wide transition shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <PlusCircle size={16} className="text-emerald-400" />
          <span>New Scan</span>
        </Link>
      </div>

      {/* Navigation List - PDF Section 3 Features */}
      <nav className="flex-1 px-3 overflow-y-auto py-2 space-y-1.5 scrollbar-thin scrollbar-thumb-emerald-950 scrollbar-track-transparent">
        {sidebarNavigation.map((section: SidebarSection) => {
          const SectionIcon = iconMap[section.icon] || LayoutDashboard;
          const isOpen = !!openSections[section.title];
          const hasActiveItem = section.items.some((item) => pathname === item.href);

          return (
            <div key={section.title} className="rounded-xl overflow-hidden">
              {/* Section Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer group ${
                  hasActiveItem || isOpen
                    ? "text-emerald-300 bg-[#06180d]/80"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <SectionIcon
                    size={15}
                    className={
                      hasActiveItem || isOpen ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"
                    }
                  />
                  <span className="font-semibold truncate">{section.title}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  {section.items.length > 1 && (
                    <span className="text-[10px] text-slate-400/60 font-mono">
                      {section.items.length}
                    </span>
                  )}
                  <ChevronDown
                    size={13}
                    className={`text-slate-400/70 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Sub-items (Exact features from PDF Page 3) */}
              {isOpen && (
                <div className="mt-1 ml-3.5 pl-2 border-l border-emerald-500/20 space-y-0.5 py-0.5">
                  {section.items.map((item) => {
                    const ItemIcon = iconMap[item.icon] || LayoutDashboard;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] transition group ${
                          isActive
                            ? "bg-emerald-500/15 text-white font-semibold border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                            : "text-slate-400 hover:text-white hover:bg-emerald-500/10"
                        }`}
                      >
                        <ItemIcon
                          size={13}
                          className={isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"}
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Upgrade to Premium Card */}
      <div className="p-3 border-t border-[#0d2816]/80 mt-auto">
        <div className="rounded-2xl p-3 bg-[#06180d] border border-emerald-500/20 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#0e2f1b] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Crown size={13} />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              Upgrade to premium
            </span>
          </div>

          <p className="text-[10px] text-slate-400/80 leading-relaxed mb-2">
            Seamless automation and responsive AI built to adapt to your needs.
          </p>

          <button
            type="button"
            className="w-full py-1.5 rounded-xl bg-[#0d2f19] hover:bg-[#134223] border border-emerald-500/30 text-emerald-300 hover:text-white text-[11px] font-semibold transition text-center shadow-[0_0_12px_rgba(16,185,129,0.1)] cursor-pointer"
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
