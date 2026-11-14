export const sidebarNavigation = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "layout-grid" },
      { label: "Website Portfolio", href: "/dashboard/portfolio", icon: "layers" },
      { label: "Incident Center", href: "/dashboard/incidents", icon: "alert-triangle" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Change Intelligence", href: "/dashboard/intelligence/changes", icon: "git-branch" },
      { label: "Application Insights", href: "/dashboard/intelligence/applications", icon: "sliders" },
      { label: "Risk & Compliance", href: "/dashboard/intelligence/risk", icon: "shield-check" },
      { label: "Reliability Center", href: "/dashboard/intelligence/reliability", icon: "heart-pulse" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Fix Workspace", href: "/dashboard/operations/fix", icon: "code" },
      { label: "Release Control", href: "/dashboard/operations/releases", icon: "send" },
      { label: "Activity & Audit Log", href: "/dashboard/operations/activity", icon: "clock" },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Team & Access", href: "/dashboard/management/team", icon: "users" },
      { label: "Integrations", href: "/dashboard/management/integrations", icon: "boxes" },
      { label: "Settings", href: "/dashboard/management/settings", icon: "settings" },
    ],
  },
];
