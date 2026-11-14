export const dashboardStats = [
  {
    title: "Websites Scanned",
    value: "1,248",
    change: "+12.5%",
    description: "Compared to last month",
  },
  {
    title: "Competitors Tracked",
    value: "86",
    change: "+8.2%",
    description: "Compared to last month",
  },
  {
    title: "Critical Issues",
    value: "36",
    change: "-4.5%",
    description: "Compared to last month",
  },
 
  {
    title: "Keyword Gaps",
    value: "184",
    change: "+15.3%",
    description: "Compared to last month",
  },
  {
    title: "Technology Leads",
    value: "92",
    change: "+9.4%",
    description: "Compared to last month",
  },
  {
    title: "New Changes",
    value: "28",
    change: "+5.2%",
    description: "Detected recently",
  },
];

export const websiteHealthScores = [
  {
    title: "Overall Health",
    score: 82,
    color: "#34D399",
    description: "Good website health",
  },
  {
    title: "SEO Score",
    score: 76,
    color: "#38BDF8",
    description: "Search optimization",
  },
  {
    title: "Technical Score",
    score: 89,
    color: "#A78BFA",
    description: "Technical performance",
  },
  {
    title: "Content Score",
    score: 72,
    color: "#FBBF24",
    description: "Content quality",
  },
];

export const healthTrendData = [
  { month: "Jun", score: 62 },
  { month: "Jul", score: 68 },
  { month: "Aug", score: 65 },
  { month: "Sep", score: 74 },
  { month: "Oct", score: 78 },
  { month: "Nov", score: 82 },
];

export const trafficSourceData = [
  { name: "Organic Search", value: 42, color: "#34D399" },
  { name: "Direct Traffic", value: 25, color: "#38BDF8" },
  { name: "Referral", value: 18, color: "#A78BFA" },
  { name: "Social Media", value: 8, color: "#FBBF24" },
  { name: "Paid Search", value: 5, color: "#F87171" },
  { name: "Email", value: 2, color: "#FB923C" },
];


export const competitorSummary = [
  {
    title: "Competitors Tracked",
    value: 12,
    description: "Active competitor websites",
  },
  {
    title: "Keyword Gaps",
    value: 184,
    description: "Potential keyword opportunities",
  },
  {
    title: "Content Gaps",
    value: 36,
    description: "Topics you haven't covered",
  },
  {
    title: "New Changes",
    value: 8,
    description: "Recently detected changes",
  },
];

export const competitorVisibilityData = [
  { name: "Your Website", visibility: 72 },
  { name: "Competitor A", visibility: 85 },
  { name: "Competitor B", visibility: 64 },
  { name: "Competitor C", visibility: 56 },
  { name: "Competitor D", visibility: 43 },
];

export const competitorActivity = [
  {
    competitor: "Competitor A",
    activity: "Published 5 new blog articles",
    type: "Content Update",
    date: "2 hours ago",
    severity: "high",
  },
  {
    competitor: "Competitor B",
    activity: "Added new product pages",
    type: "New Pages",
    date: "5 hours ago",
    severity: "medium",
  },
  {
    competitor: "Competitor C",
    activity: "Updated website technology",
    type: "Technology Change",
    date: "Yesterday",
    severity: "low",
  },
];

export const opportunityData = [
  {
    id: 1,
    title: "Improve missing meta descriptions",
    category: "SEO",
    priority: "High",
    impact: "High",
    description:
      "Several important pages are missing meta descriptions, which may affect search result appearance and click-through rates.",
    action: "Add unique, keyword-focused meta descriptions to the affected pages.",
    affectedPages: 12,
  },
  {
    id: 2,
    title: "Create missing product landing pages",
    category: "Content",
    priority: "High",
    impact: "High",
    description:
      "Competitors are ranking for product-related search terms that your website does not currently target.",
    action: "Create dedicated landing pages for high-value product keywords.",
    affectedPages: 8,
  },
  {
    id: 3,
    title: "Fix broken internal links",
    category: "Technical",
    priority: "High",
    impact: "Medium",
    description:
      "Some internal links lead to unavailable pages, potentially affecting navigation and crawlability.",
    action: "Identify broken URLs and replace them with valid destinations.",
    affectedPages: 6,
  },
  {
    id: 4,
    title: "Target competitor keyword gaps",
    category: "Competitor",
    priority: "Medium",
    impact: "High",
    description:
      "Tracked competitors rank for relevant keywords that are not included in your current content strategy.",
    action: "Review keyword gaps and prioritize relevant search terms.",
    affectedPages: 15,
  },
  {
    id: 5,
    title: "Optimize mobile page performance",
    category: "Technical",
    priority: "Medium",
    impact: "Medium",
    description:
      "Some pages may have slow loading times or layout issues on mobile devices.",
    action: "Review image sizes, scripts, and responsive layouts.",
    affectedPages: 5,
  },
  {
    id: 6,
    title: "Refresh outdated blog content",
    category: "Content",
    priority: "Low",
    impact: "Medium",
    description:
      "Older articles may contain outdated information and missed opportunities for relevant keywords.",
    action: "Update statistics, examples, links, and supporting information.",
    affectedPages: 9,
  },
];
export const monitoringActivityData = [
  {
    id: 1,
    website: "Your Website",
    title: "Homepage content updated",
    description:
      "New content was detected in the homepage hero section.",
    type: "Content Change",
    severity: "High",
    date: "5 minutes ago",
  },
  {
    id: 2,
    website: "Competitor A",
    title: "New product page detected",
    description:
      "A new product landing page was discovered on the competitor website.",
    type: "New Page",
    severity: "Medium",
    date: "25 minutes ago",
  },
  {
    id: 3,
    website: "Your Website",
    title: "Page loading performance improved",
    description:
      "The average page loading time has decreased compared to the previous scan.",
    type: "Performance",
    severity: "Low",
    date: "1 hour ago",
  },
  {
    id: 4,
    website: "Competitor B",
    title: "Technology stack changed",
    description:
      "A change was detected in the technologies used by this website.",
    type: "Technology Change",
    severity: "Medium",
    date: "3 hours ago",
  },
  {
    id: 5,
    website: "Your Website",
    title: "Broken links detected",
    description:
      "Several internal links are returning unsuccessful responses.",
    type: "Technical Issue",
    severity: "High",
    date: "5 hours ago",
  },
  {
    id: 6,
    website: "Competitor C",
    title: "Pricing information updated",
    description:
      "Changes were detected in the pricing information on a product page.",
    type: "Pricing Change",
    severity: "Low",
    date: "Yesterday",
  },
];
export const recentScansData = [
  {
    id: 1,
    website: "yourwebsite.com",
    scanType: "Full Website Scan",
    date: "Nov 14, 2026",
    time: "08:30 AM",
    healthScore: 92,
    issues: 4,
    status: "Completed",
  },
  {
    id: 2,
    website: "competitora.com",
    scanType: "Competitor Scan",
    date: "Nov 14, 2026",
    time: "07:45 AM",
    healthScore: 85,
    issues: 8,
    status: "Completed",
  },
  {
    id: 3,
    website: "competitorb.com",
    scanType: "Full Website Scan",
    date: "Nov 13, 2026",
    time: "06:20 PM",
    healthScore: 76,
    issues: 15,
    status: "Completed",
  },
  {
    id: 4,
    website: "yourwebsite.com",
    scanType: "SEO Scan",
    date: "Nov 13, 2026",
    time: "02:15 PM",
    healthScore: 0,
    issues: 0,
    status: "Failed",
  },
  {
    id: 5,
    website: "competitorc.com",
    scanType: "Competitor Scan",
    date: "Nov 12, 2026",
    time: "11:00 AM",
    healthScore: 68,
    issues: 21,
    status: "Completed",
  },
];