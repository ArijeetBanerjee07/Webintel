export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: "globe" | "crawl" | "analyze" | "compete" | "monitor" | "act";
}

export interface DocArticle {
  title: string;
  readTime: string;
  summary: string;
}

export interface DocModule {
  id: string;
  title: string;
  description: string;
  articlesCount: number;
  icon: "rocket" | "layout" | "radar" | "users" | "search" | "bell";
  relatedArticles: DocArticle[];
  guideSteps: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

export const QUICK_SEARCH_TAGS: string[] = [
  "Health Score",
  "Web Crawler",
  "API Keys",
  "Webhooks",
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Add Website",
    description: "Register target domain URL & define protocol scope.",
    icon: "globe",
  },
  {
    step: "02",
    title: "Crawl Public Pages",
    description: "Headless Chromium render at CDN edge nodes.",
    icon: "crawl",
  },
  {
    step: "03",
    title: "Analyze (Scores)",
    description: "Compute core vitals, stack signatures & safety.",
    icon: "analyze",
  },
  {
    step: "04",
    title: "Add Competitors",
    description: "Pair rival websites for real-time benchmark delta.",
    icon: "compete",
  },
  {
    step: "05",
    title: "Monitor (Changes)",
    description: "Differential telemetry watches DOM & DNS drifts.",
    icon: "monitor",
  },
  {
    step: "06",
    title: "Act (Lead & Report)",
    description: "Auto-dispatch PDF audits & trigger webhook hooks.",
    icon: "act",
  },
];

export const CORE_MODULES: DocModule[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Quick setup guides, workspace setup, role management, and verified domain configurations.",
    articlesCount: 3,
    icon: "rocket",
    relatedArticles: [
      {
        title: "Creating Your First Workspace",
        readTime: "3 min read",
        summary:
          "Set up team permissions, billing limits, and default scan regions in under five minutes.",
      },
      {
        title: "Verifying Domain Ownership via DNS",
        readTime: "4 min read",
        summary:
          "Add a TXT record to unlock deep crawl rates and white-label PDF audit exports.",
      },
      {
        title: "Inviting Team Members & Role Scopes",
        readTime: "2 min read",
        summary:
          "Assign Admin, Analyst, or Read-Only client viewer roles across projects.",
      },
    ],
    guideSteps: [
      "Open your WebIntel console and click + New Workspace in the top-left switcher.",
      "Enter your primary domain URL (e.g., https://example.com) and select your target crawl region.",
      "Copy the generated TXT verification token into your DNS provider to unlock full edge crawling.",
      "Click Run Initial Scan to generate your baseline Health Score within 45 seconds.",
    ],
  },
  {
    id: "dashboard-navigation",
    title: "Dashboard Navigation",
    description:
      "Master your multi-domain overview, real-time widgets, activity feeds, and filtering controls.",
    articlesCount: 3,
    icon: "layout",
    relatedArticles: [
      {
        title: "Customizing Telemetry KPI Widgets",
        readTime: "3 min read",
        summary:
          "Pin Health Score, Core Web Vitals, and Uptime cards to your primary command center.",
      },
      {
        title: "Using Global Tag & Severity Filters",
        readTime: "2 min read",
        summary:
          "Filter dozens of monitored domains by critical alerts, client tags, or last scan date.",
      },
      {
        title: "Understanding the Live Crawl Activity Feed",
        readTime: "4 min read",
        summary:
          "Inspect real-time edge node status codes, queue depth, and scan completion logs.",
      },
    ],
    guideSteps: [
      "Use the top-left Domain Selector to switch between single-site deep dives and portfolio views.",
      "Click Customize Layout on the top right of the dashboard to drag and reorder telemetry cards.",
      "Apply Severity Pills (Critical, Warning, Healthy) to isolate domains needing immediate fixes.",
      "Export any filtered dashboard snapshot directly to CSV or branded PDF.",
    ],
  },
  {
    id: "website-intelligence",
    title: "Website Intelligence",
    description:
      "Deep-dive into page rendering metrics, metadata scraping, technology stack detection, and security posture.",
    articlesCount: 3,
    icon: "radar",
    relatedArticles: [
      {
        title: "How Stack Fingerprinting Detects Frameworks",
        readTime: "5 min read",
        summary:
          "Learn how WebIntel identifies Next.js, React, CDNs, analytics tags, and server headers.",
      },
      {
        title: "Auditing SSL, CSP & Security Headers",
        readTime: "4 min read",
        summary:
          "Spot missing HSTS policies, expired certificates, and exposed staging subdomains.",
      },
      {
        title: "Inspecting DOM & Metadata Extraction",
        readTime: "3 min read",
        summary:
          "Review canonical tags, OpenGraph previews, and structured JSON-LD schema blocks.",
      },
    ],
    guideSteps: [
      "Select any scanned domain and open the Intelligence tab from the left sidebar.",
      "Review the Detected Stack matrix to inspect frontend frameworks, hosting providers, and third-party scripts.",
      "Switch to Security Posture to check TLS grade, HTTP response headers, and mixed-content warnings.",
      "Click Export Tech Report to share the full architectural breakdown with your engineering team.",
    ],
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    description:
      "Benchmark traffic shifts, tech stack migrations, pricing updates, and content changes across rival domains.",
    articlesCount: 3,
    icon: "users",
    relatedArticles: [
      {
        title: "Pairing Up to 5 Rival Domains per Project",
        readTime: "3 min read",
        summary:
          "Link direct competitors to compare Health Scores, page speed, and stack changes side-by-side.",
      },
      {
        title: "Tracking Competitor Pricing & Landing Page Edits",
        readTime: "4 min read",
        summary:
          "Receive visual DOM diffs whenever a rival updates pricing tiers or hero messaging.",
      },
      {
        title: "Benchmarking Core Web Vitals Against Industry Leaders",
        readTime: "3 min read",
        summary:
          "Measure LCP, CLS, and INP performance deltas across your competitive cohort.",
      },
    ],
    guideSteps: [
      "Open your project's Competitors tab and click + Add Rival Domain.",
      "Enter up to 5 competitor URLs and select which page paths (e.g., /pricing, /features) to watch.",
      "Review the Benchmark Delta table to compare your Health Score and load speed against rivals.",
      "Enable Weekly Digest to receive a summary of competitor stack or content changes every Monday.",
    ],
  },
  {
    id: "seo-technology",
    title: "SEO & Technology Intelligence",
    description:
      "Track Core Web Vitals, schema markup, CDN edge nodes, analytics tags, and indexability audits.",
    articlesCount: 3,
    icon: "search",
    relatedArticles: [
      {
        title: "Fixing Crawlability & Robots.txt Bottlenecks",
        readTime: "4 min read",
        summary:
          "Identify orphan pages, redirect loops, and accidental noindex directives.",
      },
      {
        title: "Validating JSON-LD Schema & Rich Snippets",
        readTime: "3 min read",
        summary:
          "Verify FAQ, Product, and Organization structured data across all crawled templates.",
      },
      {
        title: "Improving LCP & INP Using Edge Telemetry",
        readTime: "5 min read",
        summary:
          "Pinpoint render-blocking scripts and unoptimized assets slowing down mobile scores.",
      },
    ],
    guideSteps: [
      "Navigate to SEO & Tech Audits inside any active domain report.",
      "Filter issues by Impact Level to fix high-priority indexability and broken-link errors first.",
      "Inspect the Core Web Vitals breakdown to see field vs. headless Chromium lab metrics.",
      "Click Re-verify Fixes after deploying updates to confirm issue resolution.",
    ],
  },
  {
    id: "monitoring-alerts",
    title: "Monitoring & Alerts",
    description:
      "Configure custom webhook triggers, Slack/Teams notifications, weekly PDF digests, and threshold breaches.",
    articlesCount: 3,
    icon: "bell",
    relatedArticles: [
      {
        title: "Connecting Slack & Microsoft Teams Channels",
        readTime: "3 min read",
        summary:
          "Route real-time downtime, SSL expiry, and score-drop alerts directly to engineering channels.",
      },
      {
        title: "Setting Up Signed Webhook Payloads",
        readTime: "5 min read",
        summary:
          "Trigger custom CI/CD workflows or CRM updates using HMAC-verified JSON webhooks.",
      },
      {
        title: "Automating White-Label Client PDF Reports",
        readTime: "3 min read",
        summary:
          "Schedule branded weekly or monthly audit summaries via custom SMTP.",
      },
    ],
    guideSteps: [
      "Go to Settings > Alerts & Integrations in your workspace navigation bar.",
      "Choose a notification channel (Slack, Email, or Custom Webhook URL) and test the connection.",
      "Set threshold rules—such as alerting whenever Health Score drops by more than 5 points.",
      "Toggle Automated Weekly PDF Digest on to deliver scheduled executive reports.",
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    tag: "Scanning",
    question: "How do I add a new website scan?",
    answer:
      "Navigate to the Add Domain view from your console navigation bar. Input the root URL (e.g., https://example.com), calibrate your crawl depth thresholds (up to 2,500 subpages on Enterprise tiers), specify custom user-agent rotation policies, and click Initiate Pipeline. Initial telemetry indices typically populate in under 45 seconds.",
  },

  {
    tag: "Health Score",
    question: "Understanding Health Scores",
    answer:
      "Your WebIntel Health Score (0–100) is a weighted composite calculated from four real-time pillars: Core Web Vitals performance (30%), SSL/security header posture (25%), SEO crawlability & schema validity (25%), and uptime/DNS stability (20%).",
  },
  {
    tag: "SEO",
    question: "How do I run an SEO audit?",
    answer:
      "Open any registered domain in your dashboard, select the SEO & Technology tab, and click Run Full Crawl Audit. WebIntel renders pages via headless Chromium edge nodes to check canonical tags, meta descriptions, broken links, robots.txt rules, and structured schema.",
  },
  {
    tag: "Telemetry",
    question: "Understanding data estimates",
    answer:
      "Traffic and technology adoption estimates combine live DNS/HTTP header fingerprinting, public edge telemetry, and historical benchmark models. Differential change alerts reflect exact DOM and header snapshots captured during your scheduled crawl intervals.",
  },
]