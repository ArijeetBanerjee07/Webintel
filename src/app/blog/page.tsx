import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RouteHero } from "@/components/RouteHero";

const articles = [
  {
    category: "Security Research",
    title: "Deconstructing Modern Subdomain Takeover Vectors",
    excerpt: "How dangling CNAME pointers and misconfigured CDN origins expose corporate perimeters, and how to automate passive detection before exploitation.",
    author: "Security Research Team",
    date: "Nov 12, 2026",
    read: "7 min read",
    tag: "Vulnerability Intel",
  },
  {
    category: "Architecture & CDN",
    title: "HTTP/3, QUIC, and the State of Global Edge Latency",
    excerpt: "Analyzing TTFB benchmarks and handshake latency across 10,000 public enterprise domains running Cloudflare, Fastly, and CloudFront.",
    author: "Telemetry Infrastructure",
    date: "Oct 29, 2026",
    read: "9 min read",
    tag: "Performance",
  },
  {
    category: "Compliance & CSP",
    title: "Why Content-Security-Policy Fails in Practice",
    excerpt: "An empirical audit of CSP headers across top SaaS domains: unsafe-inline frequency, script nonce implementation pitfalls, and strict-dynamic adoption.",
    author: "Application Security Desk",
    date: "Oct 14, 2026",
    read: "6 min read",
    tag: "Browser Security",
  },
  {
    category: "Frameworks & DOM",
    title: "Signature Fingerprinting Without False Positives",
    excerpt: "How WebIntel matches meta properties, script bundle chunks, and global window objects to detect 500+ frameworks with 99.8% precision.",
    author: "Ingestion Engine Team",
    date: "Sep 28, 2026",
    read: "8 min read",
    tag: "Technology Classification",
  },
  {
    category: "DevOps & SRE",
    title: "Detecting Silent Production Deployments via DOM Diffs",
    excerpt: "Using asset checksum mutations and script tag diffing to establish release velocity metrics across competitor and vendor ecosystems.",
    author: "Systems Architecture",
    date: "Sep 15, 2026",
    read: "5 min read",
    tag: "Change Intelligence",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <RouteHero
        eyebrow="WebIntel Research &amp; Field Notes"
        title="Technical Dispatches from the Public Perimeter."
        body="In-depth analyses, methodology writeups, and empirical research on internet surface telemetry, browser security policies, and edge infrastructure."
      />

      <section className="shell py-20 sm:py-28">
        {/* Featured Article */}
        <div className="panel p-7 sm:p-10 border-white/[0.1] bg-[#070c09] transition hover:border-emerald-500/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
              Featured Research
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {featured.category}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl max-w-3xl">
            {featured.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {featured.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="text-zinc-300">{featured.author}</span>
              <span>•</span>
              <span>{featured.date}</span>
              <span>•</span>
              <span>{featured.read}</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <span>Read technical whitepaper</span>
              <Icon name="arrow-up-right" width={13} height={13} />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <div className="mt-16">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <h3 className="text-xl font-bold text-white">Recent Dispatches</h3>
            <span className="font-mono text-xs text-zinc-500">
              {rest.length} articles published
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <article
                key={post.title}
                className="panel p-6 flex flex-col justify-between transition hover:border-white/20"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                      {post.category}
                    </span>
                    <span className="rounded bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                      {post.tag}
                    </span>
                  </div>

                  <h4 className="mt-3 text-lg font-semibold text-white">
                    {post.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                  <span>{post.date}</span>
                  <span>{post.read}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / RSS Callout */}
      <section className="border-t border-white/[0.08] bg-[#050806] py-16">
        <div className="shell flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Subscribe to WebIntel Security Dispatches</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Receive quarterly technical telemetry benchmarks and perimeter security reports.
            </p>
          </div>
          <Link href="/contact" className="button-primary text-xs shrink-0">
            <span>Get Started with WebIntel</span>
            <Icon name="arrow-up-right" width={13} height={13} />
          </Link>
        </div>
      </section>
    </>
  );
}
