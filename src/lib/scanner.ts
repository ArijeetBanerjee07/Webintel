export interface ScanResult {
  domain: string;
  canonicalUrl: string;
  statusCode: number;
  responseLatencyMs: number;
  title: string | null;
  description: string | null;
  h1: string | null;
  canonical: string | null;
  wordCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  hasSchemaOrg: boolean;
  hasOpenGraph: boolean;
  isHttps: boolean;
  scores: {
    overall: number;
    seo: number;
    technical: number;
    content: number;
    performance: number;
  };
  technologies: Array<{
    name: string;
    category: "CMS" | "Ecommerce" | "Framework" | "Analytics" | "CDN" | "UI" | "Marketing";
    confidence: "HIGH" | "MEDIUM";
    evidence: string;
  }>;
  findings: Array<{
    category: "SEO" | "Technical" | "Content" | "Performance" | "Security";
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
    issue: string;
    evidence: string;
    recommendation: string;
  }>;
  opportunities: Array<{
    type: string;
    reason: string;
    impact: "HIGH" | "MEDIUM" | "LOW";
  }>;
}

export function cleanDomain(input: string): { domain: string; url: string } {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)/, "");
  cleaned = cleaned.replace(/\/.*$/, "");
  
  return {
    domain: cleaned,
    url: `https://${cleaned}`,
  };
}

export async function analyzeWebsite(targetDomainOrUrl: string): Promise<ScanResult> {
  const { domain, url } = cleanDomain(targetDomainOrUrl);
  const startTime = Date.now();

  let html = "";
  let statusCode = 200;
  let headers: Headers = new Headers();
  let resolvedUrl = url;
  let responseLatencyMs = 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WebIntelBot/1.0; +https://webintel.io)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    statusCode = res.status;
    headers = res.headers;
    resolvedUrl = res.url;
    responseLatencyMs = Date.now() - startTime;
    html = await res.text();
  } catch {
    responseLatencyMs = Date.now() - startTime;
    // Fallback if HTTPS fails, try HTTP
    try {
      const httpRes = await fetch(`http://${domain}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; WebIntelBot/1.0; +https://webintel.io)",
        },
        redirect: "follow",
      });
      statusCode = httpRes.status;
      headers = httpRes.headers;
      resolvedUrl = httpRes.url;
      html = await httpRes.text();
    } catch {
      statusCode = 500;
      html = "";
    }
  }

  const isHttps = resolvedUrl.startsWith("https://");

  // DOM Parsing
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : null;

  const hasSchemaOrg = /<script[^>]*type=["']application\/ld\+json["']/i.test(html);
  const hasOpenGraph = /<meta[^>]*property=["']og:/i.test(html);

  // Content extraction & word count
  const cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;

  // Link analysis
  const hrefMatches = html.match(/href=["'](https?:\/\/[^"']+|\/[^"']*)["']/gi) || [];
  let internalLinksCount = 0;
  let externalLinksCount = 0;
  hrefMatches.forEach((h) => {
    if (h.includes(domain) || h.startsWith('href="/')) {
      internalLinksCount++;
    } else {
      externalLinksCount++;
    }
  });

  // Technology Detection
  const technologies: ScanResult["technologies"] = [];

  // CMS & Ecommerce
  if (/wp-content|wp-includes|wordpress/i.test(html)) {
    technologies.push({ name: "WordPress", category: "CMS", confidence: "HIGH", evidence: "wp-content asset paths detected" });
  }
  if (/cdn\.shopify\.com|Shopify\.theme/i.test(html)) {
    technologies.push({ name: "Shopify", category: "Ecommerce", confidence: "HIGH", evidence: "Shopify CDN and theme signatures" });
  }
  if (/woocommerce/i.test(html)) {
    technologies.push({ name: "WooCommerce", category: "Ecommerce", confidence: "HIGH", evidence: "WooCommerce classes in DOM" });
  }
  if (/webflow\.com|data-wf-page/i.test(html)) {
    technologies.push({ name: "Webflow", category: "CMS", confidence: "HIGH", evidence: "Webflow data attributes in markup" });
  }

  // Frameworks
  if (/_next\/static|__NEXT_DATA__/i.test(html) || headers.get("x-powered-by")?.includes("Next.js")) {
    technologies.push({ name: "Next.js", category: "Framework", confidence: "HIGH", evidence: "_next asset chunks detected" });
  }
  if (/data-reactroot|react-dom|_react/i.test(html) || /_next/i.test(html)) {
    technologies.push({ name: "React", category: "Framework", confidence: "HIGH", evidence: "React virtual DOM markers" });
  }
  if (/tailwind|tw-/i.test(html) || html.includes("tailwindcss")) {
    technologies.push({ name: "Tailwind CSS", category: "UI", confidence: "HIGH", evidence: "Tailwind utility styling markers" });
  }

  // Analytics & Marketing
  if (/googletagmanager\.com\/gtm\.js|gtag\(/i.test(html)) {
    technologies.push({ name: "Google Tag Manager", category: "Analytics", confidence: "HIGH", evidence: "gtm.js script injection" });
  }
  if (/google-analytics\.com|gtag\(["']config["'],\s*["']G-/i.test(html)) {
    technologies.push({ name: "Google Analytics 4 (GA4)", category: "Analytics", confidence: "HIGH", evidence: "GA4 measurement ID tag" });
  }
  if (/connect\.facebook\.net|fbevents\.js|fbq\(/i.test(html)) {
    technologies.push({ name: "Meta Pixel", category: "Marketing", confidence: "HIGH", evidence: "Facebook Pixel SDK" });
  }
  if (/hotjar\.com/i.test(html)) {
    technologies.push({ name: "Hotjar", category: "Analytics", confidence: "HIGH", evidence: "Hotjar tracking script" });
  }

  // CDN & Hosting
  const serverHeader = headers.get("server") || "";
  if (headers.get("cf-ray") || /cloudflare/i.test(serverHeader)) {
    technologies.push({ name: "Cloudflare", category: "CDN", confidence: "HIGH", evidence: "cf-ray response header" });
  }
  if (headers.get("x-vercel-id") || /vercel/i.test(serverHeader)) {
    technologies.push({ name: "Vercel", category: "CDN", confidence: "HIGH", evidence: "x-vercel-id edge gateway header" });
  }

  // Findings & Issue Detection
  const findings: ScanResult["findings"] = [];
  const opportunities: ScanResult["opportunities"] = [];

  // Security checks
  if (!isHttps) {
    findings.push({
      category: "Security",
      severity: "CRITICAL",
      issue: "Website does not enforce HTTPS encryption",
      evidence: `Resolved to unencrypted ${resolvedUrl}`,
      recommendation: "Install an SSL/TLS certificate and force 301 redirects to HTTPS.",
    });
    opportunities.push({
      type: "SSL & Security Modernization",
      reason: "Unencrypted traffic damages browser trust and Google SEO ranking.",
      impact: "HIGH",
    });
  }

  // SEO checks
  if (!title) {
    findings.push({
      category: "SEO",
      severity: "CRITICAL",
      issue: "Missing HTML <title> tag",
      evidence: "No title tag found in <head>",
      recommendation: "Add an informative, keyword-relevant title between 30 and 60 characters.",
    });
  } else if (title.length < 20 || title.length > 70) {
    findings.push({
      category: "SEO",
      severity: "MEDIUM",
      issue: "Suboptimal Title length",
      evidence: `Title is ${title.length} characters ("${title.slice(0, 40)}...")`,
      recommendation: "Target title length between 30 and 60 characters for optimal SERP display.",
    });
  }

  if (!description) {
    findings.push({
      category: "SEO",
      severity: "HIGH",
      issue: "Missing meta description",
      evidence: "No meta[name='description'] tag detected",
      recommendation: "Craft an engaging meta description between 120 and 160 characters.",
    });
    opportunities.push({
      type: "SERP CTR Enhancement",
      reason: "Missing meta descriptions cause search engines to display arbitrary text snippets.",
      impact: "HIGH",
    });
  }

  if (!h1) {
    findings.push({
      category: "SEO",
      severity: "HIGH",
      issue: "Missing primary <h1> heading",
      evidence: "No <h1> element found on homepage",
      recommendation: "Include a single, descriptive <h1> defining the primary value proposition.",
    });
  }

  if (!canonical) {
    findings.push({
      category: "SEO",
      severity: "LOW",
      issue: "Missing canonical tag",
      evidence: "No link[rel='canonical'] tag found",
      recommendation: "Specify self-referencing canonical URLs to prevent duplicate content indexing.",
    });
  }

  if (!hasSchemaOrg) {
    findings.push({
      category: "SEO",
      severity: "LOW",
      issue: "No Schema.org structured data detected",
      evidence: "No application/ld+json script block located",
      recommendation: "Add Organization, WebSite, or LocalBusiness JSON-LD markup to unlock rich snippets.",
    });
    opportunities.push({
      type: "Rich Snippets & Structured Data",
      reason: "Adding JSON-LD boosts Google Knowledge Graph and Rich Result visibility.",
      impact: "MEDIUM",
    });
  }

  // Content checks
  if (wordCount < 150) {
    findings.push({
      category: "Content",
      severity: "MEDIUM",
      issue: "Thin content on landing page",
      evidence: `Only estimated ${wordCount} words extracted`,
      recommendation: "Expand core copy to provide clearer product explanations and context for search crawlers.",
    });
  }

  // Performance checks
  if (responseLatencyMs > 1000) {
    findings.push({
      category: "Performance",
      severity: "HIGH",
      issue: "High server response latency",
      evidence: `Server took ${responseLatencyMs}ms to respond`,
      recommendation: "Leverage edge CDN caching or server optimization to achieve under 400ms TTFB.",
    });
    opportunities.push({
      type: "Performance & TTFB Acceleration",
      reason: "Slow server response degrades user retention and Core Web Vitals.",
      impact: "HIGH",
    });
  }

  // Multi-dimensional Scoring
  let technicalScore = 100;
  if (!isHttps) technicalScore -= 35;
  if (statusCode >= 400) technicalScore -= 40;
  if (responseLatencyMs > 800) technicalScore -= 15;
  if (!canonical) technicalScore -= 10;
  technicalScore = Math.max(20, Math.min(100, technicalScore));

  let seoScore = 100;
  if (!title) seoScore -= 30;
  else if (title.length < 20 || title.length > 70) seoScore -= 10;
  if (!description) seoScore -= 25;
  if (!h1) seoScore -= 20;
  if (!hasSchemaOrg) seoScore -= 10;
  if (!hasOpenGraph) seoScore -= 5;
  seoScore = Math.max(20, Math.min(100, seoScore));

  let contentScore = 100;
  if (wordCount < 100) contentScore -= 35;
  else if (wordCount < 250) contentScore -= 20;
  if (internalLinksCount < 3) contentScore -= 15;
  contentScore = Math.max(25, Math.min(100, contentScore));

  let performanceScore = 100;
  if (responseLatencyMs > 1200) performanceScore -= 35;
  else if (responseLatencyMs > 700) performanceScore -= 20;
  else if (responseLatencyMs > 400) performanceScore -= 10;
  performanceScore = Math.max(30, Math.min(100, performanceScore));

  const overall = Math.round(
    seoScore * 0.3 + technicalScore * 0.3 + contentScore * 0.2 + performanceScore * 0.2
  );

  return {
    domain,
    canonicalUrl: resolvedUrl,
    statusCode,
    responseLatencyMs,
    title,
    description,
    h1,
    canonical,
    wordCount,
    internalLinksCount,
    externalLinksCount,
    hasSchemaOrg,
    hasOpenGraph,
    isHttps,
    scores: {
      overall,
      seo: seoScore,
      technical: technicalScore,
      content: contentScore,
      performance: performanceScore,
    },
    technologies,
    findings,
    opportunities,
  };
}
