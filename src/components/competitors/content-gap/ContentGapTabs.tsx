
"use client";

interface ContentGapTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  {
    id: "topics",
    label: "Missing Topic Clusters",
  },
  {
    id: "landing-pages",
    label: "Weak Landing Pages",
  },
  {
    id: "outdated",
    label: "Outdated Content",
  },
  {
    id: "questions",
    label: "Unanswered Questions",
  },
];

export default function ContentGapTabs({
  activeTab,
  setActiveTab,
}: ContentGapTabsProps) {
  return (
    <div className="border-b border-emerald-500/20">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap border-b-2 px-2 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-emerald-400 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
