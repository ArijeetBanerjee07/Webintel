import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-950 scrollbar-track-transparent">
        {children}
      </main>
    </div>
  );
}
