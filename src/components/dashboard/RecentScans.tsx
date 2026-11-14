
"use client";

import { useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { recentScansData } from "@/data/dashboardData";

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Running: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function RecentScans() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredScans =
    selectedStatus === "All"
      ? recentScansData
      : recentScansData.filter(
          (scan) => scan.status === selectedStatus
        );

  const completedCount = recentScansData.filter(
    (scan) => scan.status === "Completed"
  ).length;

  const failedCount = recentScansData.filter(
    (scan) => scan.status === "Failed"
  ).length;

  const totalIssues = recentScansData
    .filter((scan) => scan.status === "Completed")
    .reduce((total, scan) => total + scan.issues, 0);

  return (
    <section className="mt-8 space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={21} className="text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">
              Recent Scans
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Review your latest website and competitor scan history.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#050505] transition hover:bg-emerald-400"
        >
          <RefreshCw size={16} />
          New Scan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#101A22] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Completed Scans</p>
            <CheckCircle2 size={19} className="text-emerald-400" />
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {completedCount}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Successfully completed
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101A22] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Failed Scans</p>
            <XCircle size={19} className="text-red-400" />
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {failedCount}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Scans that need attention
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101A22] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Issues Detected</p>
            <Activity size={19} className="text-amber-400" />
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {totalIssues}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Across completed scans
          </p>
        </div>
      </div>

      {/* Scan History Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101A22]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Scan History
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Your latest website scan records
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#17232D] px-3 py-2 text-sm text-gray-300 outline-none focus:border-emerald-400"
            >
              <option value="All">All Scans</option>
              <option value="Completed">Completed</option>
              <option value="Running">Running</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-medium">Website</th>
                <th className="px-5 py-4 font-medium">Scan Type</th>
                <th className="px-5 py-4 font-medium">Date & Time</th>
                <th className="px-5 py-4 font-medium">Health Score</th>
                <th className="px-5 py-4 font-medium">Issues</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => (
                  <tr
                    key={scan.id}
                    className="border-b border-white/5 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Globe size={15} className="text-emerald-400" />
                        <span className="text-sm font-medium text-white">
                          {scan.website}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {scan.scanType}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-sm text-gray-300">
                          <CalendarDays size={13} />
                          {scan.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock size={12} />
                          {scan.time}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {scan.status === "Completed" ? (
                        <span
                          className={`text-sm font-semibold ${
                            scan.healthScore >= 80
                              ? "text-emerald-400"
                              : scan.healthScore >= 60
                                ? "text-amber-400"
                                : "text-red-400"
                          }`}
                        >
                          {scan.healthScore}%
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          --
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-300">
                      {scan.status === "Completed"
                        ? scan.issues
                        : "--"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                          statusStyles[
                            scan.status as keyof typeof statusStyles
                          ]
                        }`}
                      >
                        {scan.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        disabled={scan.status !== "Completed"}
                        className="flex items-center gap-1 text-xs font-medium text-emerald-400 transition hover:text-emerald-300 disabled:cursor-not-allowed disabled:text-gray-600"
                      >
                        View
                        <ExternalLink size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No scans found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-center text-xs text-gray-500">
            Showing {filteredScans.length} of {recentScansData.length} scans
          </p>
        </div>
      </div>
    </section>
  );
}
