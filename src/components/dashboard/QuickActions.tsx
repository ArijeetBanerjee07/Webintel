"use client";

import { useState } from "react";
import {
  Activity,
  Globe,
  Plus,
  Search,
  ShieldAlert,
  X,
  Zap,
} from "lucide-react";

const quickActions = [
  {
    id: "scan",
    title: "Start New Scan",
    description: "Analyze a website's SEO, performance and technical health.",
    icon: Search,
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    action: "Start Scan",
  },
  {
    id: "competitor",
    title: "Add Competitor",
    description: "Add a competitor website to your tracking portfolio.",
    icon: Plus,
    color: "text-emerald-300",
    background: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    action: "Add Competitor",
  },
  {
    id: "issues",
    title: "View Critical Issues",
    description: "Review important website problems that need attention.",
    icon: ShieldAlert,
    color: "text-red-400",
    background: "bg-red-500/10",
    border: "hover:border-red-500/40",
    action: "Review Issues",
  },
  {
    id: "websites",
    title: "Manage Websites",
    description: "Review and organize your monitored website portfolio.",
    icon: Globe,
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    action: "Manage Websites",
  },
];

export default function QuickActions() {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const selectedAction = quickActions.find(
    (action) => action.id === activeAction
  );

  return (
    <section className="mt-6 space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <Zap size={18} className="text-emerald-400" />
        <h2 className="text-lg font-bold text-white tracking-wide">
          Quick Operations
        </h2>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`group flex flex-col rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4 transition duration-200 ${item.border} items-center justify-center hover:bg-[#082012]`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.background} border border-emerald-500/20`}
              >
                <Icon size={18} className={item.color} />
              </div>

              <button
                type="button"
                onClick={() => setActiveAction(item.id)}
                className={`mt-3.5 flex items-center gap-1.5 text-xs font-semibold ${item.color} transition cursor-pointer hover:underline`}
              >
                {item.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Preview Modal */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-[#06180d] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {selectedAction.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-300">
                  {selectedAction.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveAction(null)}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-[#041208] p-3.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity size={15} />
                <span className="text-xs font-medium">
                  Workflow pipeline ready
                </span>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                Connected to WebIntel live telemetry backend.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveAction(null)}
              className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
