import { dashboardStats } from "@/data/dashboardData";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {dashboardStats.map((stat) => (
        <div
          key={stat.title}
          className="
            group
            rounded-2xl
            border border-white/10
            bg-[#101A22]
            p-5
            shadow-lg shadow-black/20
            backdrop-blur-xl
            transition-all duration-300
            hover:-translate-y-1
            hover:border-cyan-400/30
            hover:bg-white/[0.07]
          "
        >
          <p className="text-sm font-medium text-gray-400">
            {stat.title}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            {stat.value}
          </h2>

          <div className="mt-4 flex flex-col items-start gap-2">
            <div className="text-sm font-semibold text-emerald-400">
              {stat.change}
            </div>

            <div className="text-xs text-gray-500">
              {stat.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}