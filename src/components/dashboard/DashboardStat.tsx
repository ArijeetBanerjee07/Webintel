"use client";

import { dashboardStats } from "@/data/dashboardData";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {dashboardStats.map((stat) => (
        <div
          key={stat.title}
          className="
            group
            rounded-2xl
            border border-emerald-500/20
            bg-[#05170d]
            p-4
            transition-all duration-200
            hover:border-emerald-500/40
            hover:bg-[#082012]
            hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]
          "
        >
          <p className="text-xs font-medium text-slate-400/90 truncate">
            {stat.title}
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
            {stat.value}
          </h2>

          <div className="mt-3 flex flex-col items-start gap-1">
            <span className="text-xs font-semibold text-emerald-400">
              {stat.change}
            </span>
            <span className="text-[10px] text-slate-400/70 truncate">
              {stat.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
