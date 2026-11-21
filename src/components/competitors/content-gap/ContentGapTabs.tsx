
"use client";

import {
  Layers3,
  FileWarning,
  ClockAlert,
  MessageCircleQuestion,
} from "lucide-react";

interface ContentGapTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  {
    id: "topics",
    label: "Missing Topic Clusters",
    icon: Layers3,
  },
  {
    id: "landing-pages",
    label: "Weak Landing Pages",
    icon: FileWarning,
  },
  {
    id: "outdated",
    label: "Outdated Content",
    icon: ClockAlert,
  },
  {
    id: "questions",
    label: "Unanswered Questions",
    icon: MessageCircleQuestion,
  },
];

export default function ContentGapTabs({
  activeTab,
  setActiveTab,
}: ContentGapTabsProps) {
  return (
    <div className="border-b border-emerald-500/20">
      
      <div className="flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain sm:gap-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              aria-label={tab.label}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center justify-center gap-2 border-b-2 px-3 py-4 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Icon size={17} />

              <span className="hidden sm:inline">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
