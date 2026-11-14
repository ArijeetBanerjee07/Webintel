
import DashboardStat from "@/components/dashboard/DashboardStat";
import WebsiteHealth from "@/components/dashboard/WebsiteHealth";
import TrafficSources from "@/components/dashboard/TrafficSources";
import CompetitorComparison from "@/components/dashboard/CompetitorComparison";
import OpportunityFeed from "@/components/dashboard/OppurtunityFeed";
import MonitoringActivity from "@/components/dashboard/MonitoringActivity";
import RecentScans from "@/components/dashboard/RecentScans";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] p-6 text-white">

      {/* Dashboard Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Monitor website health, competitor intelligence, and opportunities.
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardStat />

      {/* Website Health and Traffic Sources */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="h-full min-w-0">
        <WebsiteHealth /></div>
        <div className="h-full min-w-0">
        <TrafficSources />
        <QuickActions />
        </div>
       
      </div>
       <CompetitorComparison />
       <OpportunityFeed />
       <MonitoringActivity />
       <RecentScans />
       

    </div>
  );
}
