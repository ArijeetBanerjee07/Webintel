
export const sidebarNavigation = [
  {
    title: "Overview",
    icon: "layout-dashboard",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Website Portfolio", href: "/dashboard/portfolio" },
      { label: "Incident Center", href: "/dashboard/incidents" },
    ],
  },
  {
    title: "Intelligence",
    icon: "brain-circuit",
    items: [
      { label: "Change Intelligence", href: "/dashboard/intelligence/changes" },
      { label: "Application Insights", href: "/dashboard/intelligence/applications" },
      { label: "Risk & Compliance", href: "/dashboard/intelligence/risk" },
      { label: "Reliability Center", href: "/dashboard/intelligence/reliability" },
    ],
  },
  {
    title: "Operations",
    icon: "workflow",
    items: [
      { label: "Fix Workspace", href: "/dashboard/operations/fix" },
      { label: "Release Control", href: "/dashboard/operations/releases" },
      { label: "Activity & Audit Log", href: "/dashboard/operations/activity" },
    ],
  },
  {
    title: "Management",
    icon: "settings",
    items: [
      { label: "Team & Access", href: "/dashboard/management/team" },
      { label: "Integrations", href: "/dashboard/management/integrations" },
      { label: "Settings", href: "/dashboard/management/settings" },
    ],
  },
];
