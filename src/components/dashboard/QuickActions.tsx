
"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
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
    color: "text-sky-400",
    background: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
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
    color: "text-violet-400",
    background: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
    action: "Manage Websites",
  },
];




export default function QuickActions() {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const selectedAction = quickActions.find(
    (action) => action.id === activeAction
  );

  return (
    <section className="mt-8 space-y-5">
      {/* Heading */}
      <div>
        <div className="flex items-center gap-2">
          <Zap size={21} className="text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">
            Quick Actions
          </h2>
        </div>

        
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`group flex flex-col rounded-xl border border-white/10 bg-[#101A22] p-5 transition duration-200 ${item.border} items-center justify-center`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.background}`}
              >
                <Icon size={21} className={item.color} />
              </div>

              

              <button
                type="button"
                onClick={() => setActiveAction(item.id)}
                className={`mt-5 flex items-center gap-2 text-xs font-semibold ${item.color} transition group-hover:gap-3`}
              >
                {item.action}
               
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Preview Modal */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#101A22] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedAction.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {selectedAction.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveAction(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity size={17} />
                <span className="text-sm font-medium">
                  Workflow setup pending
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                This action will be connected to its respective
                page and backend API when we implement the
                WebIntel operations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveAction(null)}
              className="mt-5 w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#050505] transition hover:bg-emerald-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
