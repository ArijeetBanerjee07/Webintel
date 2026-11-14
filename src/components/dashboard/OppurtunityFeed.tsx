
"use client";

import { useState } from "react";

import {
  Search,
  FileText,
  Code,
  Users,
  ArrowUpRight,
  AlertTriangle,
  Target,
  Layers,
  ChevronDown,
} from "lucide-react";

import { opportunityData } from "@/data/dashboardData";

const categoryIcons = {
  SEO: Search,
  Content: FileText,
  Technical: Code,
  Competitor: Users,
};

const categoryColors = {
  SEO: "bg-sky-500/10 text-sky-400",
  Content: "bg-violet-500/10 text-violet-400",
  Technical: "bg-amber-500/10 text-amber-400",
  Competitor: "bg-emerald-500/10 text-emerald-400",
};

const priorityColors = {
  High: "bg-red-500/10 text-red-400",
  Medium: "bg-orange-500/10 text-orange-400",
  Low: "bg-yellow-500/10 text-yellow-400",
};

export default function OpportunityFeed() {
  // Track which recommendation cards are expanded
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Toggle individual recommendation cards
  const toggleRecommendation = (id: number) => {
    setExpandedItems((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  const highPriorityCount = opportunityData.filter(
    (item) => item.priority === "High"
  ).length;

  const totalAffectedPages = opportunityData.reduce(
    (total, item) => total + item.affectedPages,
    0
  );

  return (
    <section className="mt-8 space-y-6">

      {/* Section Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Opportunity Feed
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Discover actionable opportunities to improve your website.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
          <Target size={16} className="text-emerald-400" />

          <span className="text-xs font-medium text-emerald-400">
            {opportunityData.length} Opportunities Found
          </span>
        </div>

      </div>

      {/* Opportunity Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Opportunities */}
        <div className="rounded-xl border border-white/10 bg-[#101A22] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Total Opportunities
            </p>

            <Target size={19} className="text-emerald-400" />
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {opportunityData.length}
          </h3>

          <p className="mt-2 text-xs text-gray-500">
            Across all categories
          </p>
        </div>

        {/* High Priority */}
        <div className="rounded-xl border border-white/10 bg-[#101A22] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              High Priority
            </p>

            <AlertTriangle size={19} className="text-red-400" />
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {highPriorityCount}
          </h3>

          <p className="mt-2 text-xs text-gray-500">
            Require immediate attention
          </p>
        </div>

        {/* Affected Pages */}
        <div className="rounded-xl border border-white/10 bg-[#101A22] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Affected Pages
            </p>

            <Layers size={19} className="text-violet-400" />
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {totalAffectedPages}
          </h3>

          <p className="mt-2 text-xs text-gray-500">
            Across identified opportunities
          </p>
        </div>

      </div>

      {/* Recommended Actions */}
      <div className="rounded-xl border border-white/10 bg-[#101A22] p-5">

        <div className="mb-5">
          <h3 className="font-semibold text-white">
            Recommended Actions
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Explore opportunities and view recommended improvements.
          </p>
        </div>

        <div className="space-y-3">

          {opportunityData.map((item) => {
            const isExpanded = expandedItems.includes(item.id);

            const CategoryIcon =
              categoryIcons[
                item.category as keyof typeof categoryIcons
              ];

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0B141B] transition-colors hover:border-white/20"
              >

                {/* Always Visible: Title, Priority and Button */}
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* Title */}
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="rounded-lg bg-white/5 p-2">
                      <CategoryIcon
                        size={18}
                        className="text-emerald-400"
                      />
                    </div>

                    <h4 className="font-semibold text-white">
                      {item.title}
                    </h4>

                  </div>

                  {/* Priority and Toggle Button */}
                  
{/* Category, Priority and Toggle Button */}
<div className="flex shrink-0 flex-wrap items-center gap-3">

  {/* Category Badge */}
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      categoryColors[
        item.category as keyof typeof categoryColors
      ]
    }`}
  >
    {item.category}
  </span>

  {/* Priority Badge */}
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      priorityColors[
        item.priority as keyof typeof priorityColors
      ]
    }`}
  >
    {item.priority} Priority
  </span>

  {/* View Recommendation Button */}
  <button
    type="button"
    onClick={() => toggleRecommendation(item.id)}
    aria-expanded={isExpanded}
    className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
  >
    {isExpanded
      ? "Hide Recommendation"
      : "View Recommendation"}

    <ChevronDown
      size={15}
      className={`transition-transform duration-200 ${
        isExpanded ? "rotate-180" : ""
      }`}
    />
  </button>

</div>


                </div>

                {/* Expandable Recommendation Details */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4">

                    {/* Category and Description */}
                    <div className="mb-5">

                      <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        {item.description}
                      </p>

                    </div>

                    {/* Impact and Affected Pages */}
                    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs text-gray-500">
                          Potential Impact
                        </p>

                        <p className="mt-1 font-semibold text-white">
                          {item.impact}
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs text-gray-500">
                          Affected Pages
                        </p>

                        <p className="mt-1 font-semibold text-white">
                          {item.affectedPages} Pages
                        </p>
                      </div>

                    </div>

                    {/* Suggested Action */}
                    <div className="rounded-lg border border-emerald-400/10 bg-emerald-500/5 p-4">

                      <div className="flex items-center gap-2">
                        <Target
                          size={16}
                          className="text-emerald-400"
                        />

                        <h5 className="text-sm font-semibold text-emerald-400">
                          Suggested Action
                        </h5>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        {item.action}
                      </p>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
