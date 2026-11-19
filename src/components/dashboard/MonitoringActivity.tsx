"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Zap,
} from "lucide-react";

import { monitoringActivityData } from "@/data/dashboardData";

const severityStyles = {
  High: {
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: "text-red-400",
  },
  Medium: {
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: "text-orange-400",
  },
  Low: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: "text-emerald-400",
  },
};

const typeIcons: Record<string, typeof Activity> = {
  "Content Change": Activity,
  "New Page": Globe,
  Performance: Zap,
  "Technology Change": Activity,
  "Technical Issue": AlertCircle,
  "Pricing Change": Activity,
};

export default function MonitoringActivity() {
  const [selectedSeverity, setSelectedSeverity] =
    useState("All");

  const filteredActivities =
    selectedSeverity === "All"
      ? monitoringActivityData
      : monitoringActivityData.filter(
          (item) => item.severity === selectedSeverity
        );

  const highCount = monitoringActivityData.filter(
    (item) => item.severity === "High"
  ).length;

  const mediumCount = monitoringActivityData.filter(
    (item) => item.severity === "Medium"
  ).length;

  const lowCount = monitoringActivityData.filter(
    (item) => item.severity === "Low"
  ).length;

  return (
    <section className="mt-8 space-y-6">
      {/* Section Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-400" size={21} />
            <h2 className="text-xl font-semibold text-white">
              Monitoring Activity
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Track recent changes detected across your websites
            and competitors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Monitoring Active
        </div>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-red-500/20 bg-[#05170d] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              High Severity
            </p>
            <AlertCircle className="text-red-400" size={19} />
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {highCount}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Requires attention
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-[#05170d] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Medium Severity
            </p>
            <AlertTriangle
              className="text-amber-400"
              size={19}
            />
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {mediumCount}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Worth reviewing
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Low Severity
            </p>
            <CheckCircle2
              className="text-emerald-400"
              size={19}
            />
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            {lowCount}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Informational updates
          </p>
        </div>
      </div>

      {/* Activity List */}
      <div className="rounded-2xl border border-emerald-500/20 bg-[#05170d] p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Recent Website Changes
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Latest events detected by WebIntel monitoring
            </p>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />

            <select
              value={selectedSeverity}
              onChange={(e) =>
                setSelectedSeverity(e.target.value)
              }
              className="rounded-lg border border-white/10 bg-[#17232D] px-3 py-2 text-sm text-gray-300 outline-none focus:border-emerald-400"
            >
              <option value="All">All Activities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => {
              const TypeIcon =
                typeIcons[item.type] || Activity;

              const severity =
                severityStyles[
                  item.severity as keyof typeof severityStyles
                ];

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border border-white/5 bg-[#0B141C] p-4 transition hover:border-white/10 sm:flex-row sm:items-start"
                >
                  {/* Activity Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <TypeIcon
                      size={19}
                      className={severity.icon}
                    />
                  </div>

                  {/* Activity Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-medium text-white">
                        {item.title}
                      </h4>

                      <span
                        className={`rounded-full border px-2 py-1 text-[10px] font-medium ${severity.badge}`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Globe size={13} />
                        {item.website}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {item.date}
                      </span>

                      <span className="rounded bg-white/5 px-2 py-1">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* View Details */}
                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-1 self-start text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    View Details
                    <ExternalLink size={13} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-white/10 py-10 text-center">
              <Activity
                size={28}
                className="mx-auto text-gray-500"
              />
              <p className="mt-3 text-sm text-gray-400">
                No activities found for this severity.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-gray-500">
            Showing {filteredActivities.length} of{" "}
            {monitoringActivityData.length} detected activities
          </p>
        </div>
      </div>
    </section>
  );
}
