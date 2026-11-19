export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

export interface SidebarSection {
  title: string;
  icon: string;
  purpose: string;
  items: SidebarItem[];
}

export const sidebarNavigation: SidebarSection[] = [
  {
    title: "Overview",
    icon: "layout-grid",
    purpose: "Summary of scans, scores, competitor movement and opportunities.",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "layout-grid" },
    ],
  },
  {
    title: "Website Intelligence",
    icon: "globe",
    purpose: "Deep analysis of a single domain.",
    items: [
      { label: "Website Overview", href: "/dashboard/website-intelligence/overview", icon: "file-text" },
      { label: "Website Audit", href: "/dashboard/website-intelligence/audit", icon: "shield-check" },
      { label: "Page Explorer", href: "/dashboard/website-intelligence/pages", icon: "layers" },
      { label: "Performance", href: "/dashboard/website-intelligence/performance", icon: "zap" },
      { label: "Mobile & UX", href: "/dashboard/website-intelligence/mobile-ux", icon: "smartphone" },
      { label: "Metadata & Schema", href: "/dashboard/website-intelligence/schema", icon: "code" },
      { label: "Broken Links", href: "/dashboard/website-intelligence/broken-links", icon: "link-2-off" },
    ],
  },
  {
    title: "Competitor Intelligence",
    icon: "target",
    purpose: "Understand competitor positioning and gaps.",
    items: [
      { label: "Competitor Overview", href: "/dashboard/competitors/overview", icon: "crosshair" },
      { label: "Competitor Discovery", href: "/dashboard/competitors/discovery", icon: "radar" },
      { label: "Compare Domains", href: "/dashboard/competitors/compare", icon: "git-compare" },
      { label: "Keyword Gap", href: "/dashboard/competitors/keyword-gap", icon: "key" },
      { label: "Content Gap", href: "/dashboard/competitors/content-gap", icon: "file-question" },
      { label: "Backlink Gap", href: "/dashboard/competitors/backlink-gap", icon: "link" },
      { label: "Competitor Pages", href: "/dashboard/competitors/pages", icon: "files" },
    ],
  },
  {
    title: "SEO Intelligence",
    icon: "search",
    purpose: "Search visibility and SEO research.",
    items: [
      { label: "Organic Keywords", href: "/dashboard/seo/keywords", icon: "key-round" },
      { label: "Keyword Rankings", href: "/dashboard/seo/rankings", icon: "trending-up" },
      { label: "SERP Overview", href: "/dashboard/seo/serp", icon: "eye" },
      { label: "Backlink Profile", href: "/dashboard/seo/backlinks", icon: "external-link" },
      { label: "Referring Domains", href: "/dashboard/seo/domains", icon: "globe-2" },
      { label: "Top Pages", href: "/dashboard/seo/top-pages", icon: "star" },
      { label: "Technical SEO", href: "/dashboard/seo/technical", icon: "terminal" },
    ],
  },
  {
    title: "Traffic Intelligence",
    icon: "bar-chart-3",
    purpose: "Estimated traffic and acquisition mix, where data is available.",
    items: [
      { label: "Traffic Estimates", href: "/dashboard/traffic/estimates", icon: "line-chart" },
      { label: "Channel Mix", href: "/dashboard/traffic/channels", icon: "pie-chart" },
      { label: "Top Pages", href: "/dashboard/traffic/top-pages", icon: "compass" },
      { label: "Geography", href: "/dashboard/traffic/geography", icon: "map-pin" },
      { label: "Audience Overlap", href: "/dashboard/traffic/audience", icon: "users-2" },
      { label: "Referral Sources", href: "/dashboard/traffic/referrals", icon: "share-2" },
    ],
  },
  {
    title: "Technology Intelligence",
    icon: "cpu",
    purpose: "Identify technologies used by a website.",
    items: [
      { label: "Technology Lookup", href: "/dashboard/technology/lookup", icon: "search-code" },
      { label: "Tech Stack Profile", href: "/dashboard/technology/profile", icon: "layers" },
      { label: "CMS & E-commerce", href: "/dashboard/technology/cms-ecommerce", icon: "shopping-cart" },
      { label: "Analytics & Ads Tags", href: "/dashboard/technology/tags", icon: "tag" },
      { label: "Technology Change History", href: "/dashboard/technology/history", icon: "history" },
    ],
  },
  {
    title: "Content Intelligence",
    icon: "book-open",
    purpose: "Analyze content themes and content gaps.",
    items: [
      { label: "Content Explorer", href: "/dashboard/content/explorer", icon: "file-search" },
      { label: "Blog Analysis", href: "/dashboard/content/blog", icon: "newspaper" },
      { label: "Topic Clusters", href: "/dashboard/content/clusters", icon: "network" },
      { label: "Publishing Frequency", href: "/dashboard/content/frequency", icon: "calendar" },
      { label: "Content Performance", href: "/dashboard/content/performance", icon: "gauge" },
      { label: "Content Ideas", href: "/dashboard/content/ideas", icon: "lightbulb" },
    ],
  },
  {
    title: "Marketing Intelligence",
    icon: "megaphone",
    purpose: "Understand public marketing activity.",
    items: [
      { label: "Ads & Landing Pages", href: "/dashboard/marketing/ads", icon: "layout-template" },
      { label: "Social Links", href: "/dashboard/marketing/social", icon: "share" },
      { label: "Brand Mentions", href: "/dashboard/marketing/mentions", icon: "message-square" },
      { label: "Offer & CTA Analysis", href: "/dashboard/marketing/offers-cta", icon: "mouse-pointer-click" },
      { label: "Email Capture Forms", href: "/dashboard/marketing/forms", icon: "mail" },
    ],
  },
  {
    title: "Change Monitoring",
    icon: "bell",
    purpose: "Track changes over time.",
    items: [
      { label: "Watchlists", href: "/dashboard/monitoring/watchlists", icon: "bookmark" },
      { label: "Page Change Alerts", href: "/dashboard/monitoring/alerts", icon: "bell-ring" },
      { label: "Pricing Changes", href: "/dashboard/monitoring/pricing", icon: "badge-dollar-sign" },
      { label: "New Pages", href: "/dashboard/monitoring/new-pages", icon: "file-plus" },
      { label: "Removed Pages", href: "/dashboard/monitoring/removed-pages", icon: "file-x" },
      { label: "Job/Hiring Changes", href: "/dashboard/monitoring/jobs", icon: "briefcase" },
      { label: "Technology Changes", href: "/dashboard/monitoring/tech-changes", icon: "git-commit" },
    ],
  },
  {
    title: "Reports",
    icon: "file-bar-chart",
    purpose: "Create client-ready reports.",
    items: [
      { label: "Saved Reports", href: "/dashboard/reports/saved", icon: "save" },
      { label: "Scheduled Reports", href: "/dashboard/reports/scheduled", icon: "clock-4" },
      { label: "Export History", href: "/dashboard/reports/exports", icon: "download" },
      { label: "White-label Reports", href: "/dashboard/reports/white-label", icon: "award" },
    ],
  },
  {
    title: "Lead Generation",
    icon: "sparkles",
    purpose: "Convert website findings into prospects.",
    items: [
      { label: "Technology Leads", href: "/dashboard/leads/technology", icon: "filter" },
      { label: "Website Opportunity Leads", href: "/dashboard/leads/opportunities", icon: "flame" },
      { label: "Save to Lead List", href: "/dashboard/leads/list", icon: "list-plus" },
      { label: "Push to CRM", href: "/dashboard/leads/crm", icon: "arrow-up-right" },
    ],
  },
  {
    title: "Workspace",
    icon: "settings",
    purpose: "Manage access, integrations and usage.",
    items: [
      { label: "Projects", href: "/dashboard/workspace/projects", icon: "folder" },
      { label: "Team Members", href: "/dashboard/workspace/team", icon: "users" },
      { label: "Integrations", href: "/dashboard/workspace/integrations", icon: "boxes" },
      { label: "Data Sources", href: "/dashboard/workspace/data-sources", icon: "database" },
      { label: "Usage & Credits", href: "/dashboard/workspace/usage", icon: "credit-card" },
      { label: "Settings", href: "/dashboard/workspace/settings", icon: "sliders-horizontal" },
    ],
  },
];
