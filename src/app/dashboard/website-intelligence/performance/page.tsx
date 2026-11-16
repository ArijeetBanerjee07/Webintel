import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PerformanceHeader from "@/components/performance/PerformanceHeader";
import WebsiteAnalysisControls from "@/components/performance/WebsiteAnalysisControls";

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-[#020603] text-white selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
          {/* Top Header Bar (Model Selector & Controls matching Image 2) */}
          <DashboardHeader />
    
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        <PerformanceHeader />
        {/*<WebsiteAnalysisControls />*/}

      </div>
    </div>
  );
}
