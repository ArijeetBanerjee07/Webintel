type BrokenLink = {
  id: number;
  brokenUrl: string;
  sourceUrl: string;
  anchorText: string;
  status: "404 Not Found" | "Redirect chain";
  lastCrawled: string;
  chain?: string[];
  isLoop?: boolean;
};

const brokenLinks: BrokenLink[] = [
  {
    id: 1,
    brokenUrl: "https://example.com/resources/seo-guide",
    sourceUrl: "https://example.com/blog/technical-seo-checklist",
    anchorText: "Read our technical SEO guide",
    status: "404 Not Found",
    lastCrawled: "2 minutes ago",
  },
  {
    id: 2,
    brokenUrl: "https://example.com/pricing/enterprise",
    sourceUrl: "https://example.com/solutions/enterprise",
    anchorText: "View enterprise pricing",
    status: "404 Not Found",
    lastCrawled: "5 minutes ago",
  },
  {
    id: 3,
    brokenUrl: "https://example.com/old-case-study",
    sourceUrl: "https://example.com/customers",
    anchorText: "Read the Acme case study",
    status: "Redirect chain",
    lastCrawled: "8 minutes ago",
    chain: ["301", "301", "302", "301"],
    isLoop: true,
  },
  {
    id: 4,
    brokenUrl: "https://example.com/downloads/report.pdf",
    sourceUrl: "https://example.com/reports",
    anchorText: "Download the annual report",
    status: "404 Not Found",
    lastCrawled: "11 minutes ago",
  },
  {
    id: 5,
    brokenUrl: "https://example.com/contact-sales",
    sourceUrl: "https://example.com/platform",
    anchorText: "Talk to our sales team",
    status: "Redirect chain",
    lastCrawled: "14 minutes ago",
    chain: ["301", "301", "200"],
    isLoop: false,
  },
];

function StatusBadge({ status }: { status: BrokenLink["status"] }) {
  const isChain = status === "Redirect chain";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        isChain
          ? "border-amber-300/20 bg-amber-300/10 text-amber-200"
          : "border-rose-400/20 bg-rose-400/10 text-rose-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isChain ? "bg-amber-300" : "bg-rose-400"
        }`}
      />
      {status}
    </span>
  );
}

function ChainNode({
  value,
  isLast,
}: {
  value: string;
  isLast: boolean;
}) {
  const isSuccess = value === "200";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-9 min-w-14 items-center justify-center rounded-lg border px-3 text-xs font-bold ${
          isSuccess
            ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-300"
            : "border-amber-300/25 bg-amber-300/10 text-amber-200"
        }`}
      >
        {value}
      </div>

      {!isLast && (
        <span className="text-[#63746a]">→</span>
      )}
    </div>
  );
}

function RedirectChain({
  chain,
  isLoop,
}: {
  chain: string[];
  isLoop?: boolean;
}) {
  return (
    <div className="panel mt-5 p-4">
      <div className="mb-4">
        <p className="eyebrow">Redirect path</p>
        <p className="mt-1 text-sm text-[#d6dfd9]">
          {isLoop
            ? "This URL keeps redirecting without reaching a final destination."
            : "This URL resolves through unnecessary redirect hops."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-9 items-center rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 text-xs font-semibold text-rose-300">
          URL
        </div>

        <span className="text-[#63746a]">→</span>

        {chain.map((status, index) => (
          <ChainNode
            key={`${status}-${index}`}
            value={status}
            isLast={index === chain.length - 1}
          />
        ))}

        {isLoop && (
          <span className="text-xs font-medium text-amber-200">
            loops back
          </span>
        )}
      </div>
    </div>
  );
}

export default function BrokenLinksPage() {
  const notFoundCount = brokenLinks.filter(
    (link) => link.status === "404 Not Found"
  ).length;

  const redirectCount = brokenLinks.filter(
    (link) => link.status === "Redirect chain"
  ).length;

  return (
    <main className="min-h-screen bg-[var(--forest-950)] text-[#e6eae7]">
      <div className="shell py-10 sm:py-14">
        <header className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Technical SEO / Crawl health</p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Broken Links
            </h1>

            <p className="muted-copy mt-4 max-w-2xl text-base">
              Find broken internal links, inspect their source pages, and
              remove redirect chains that waste crawl budget.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="button-secondary">
              Export report
            </button>

            <button type="button" className="button-secondary">
              Crawl again
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Broken URLs</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {brokenLinks.length}
            </p>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">404 errors</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {notFoundCount}
            </p>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Redirect chains</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {redirectCount}
            </p>
          </div>
        </section>

        <section className="panel mb-8 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              placeholder="Search broken URLs, source pages, or anchor text"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-[#63746a] focus:border-[#10b981]/50 lg:max-w-xl"
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-2 text-sm font-medium text-emerald-300"
              >
                All issues
              </button>

              <button type="button" className="button-secondary px-3 py-2">
                404 errors
              </button>

              <button type="button" className="button-secondary px-3 py-2">
                Redirect chains
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="eyebrow mb-2">Crawl findings</p>
            <h2 className="text-2xl font-semibold text-white">
              Broken link details
            </h2>
          </div>

          <div className="space-y-4">
            {brokenLinks.map((link) => (
              <article key={link.id} className="panel panel-hover p-5 sm:p-6">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          Broken destination
                        </h3>
                        <StatusBadge status={link.status} />
                      </div>

                      <p className="break-all text-sm font-medium text-rose-300">
                        {link.brokenUrl}
                      </p>

                      <p className="mt-2 text-xs text-[#63746a]">
                        Last crawled {link.lastCrawled}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="button-secondary self-start"
                    >
                      Open source page
                    </button>
                  </div>

                  <div className="grid gap-4 border-t border-white/[0.08] pt-5 lg:grid-cols-2">
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="eyebrow mb-2">Source page URL</p>
                      <p className="break-all text-sm leading-6 text-[#d6dfd9]">
                        {link.sourceUrl}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="eyebrow mb-2">Anchor text</p>
                      <p className="text-sm leading-6 text-[#d6dfd9]">
                        “{link.anchorText}”
                      </p>
                    </div>
                  </div>

                  {link.chain && (
                    <RedirectChain
                      chain={link.chain}
                      isLoop={link.isLoop}
                    />
                  )}

                  <div className="border-t border-white/[0.08] pt-5">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#10b981]">
                      Recommended action
                    </p>

                    <p className="text-sm leading-6 text-[#d6dfd9]">
                      {link.status === "404 Not Found"
                        ? "Update the source link to a valid destination or remove it."
                        : link.isLoop
                          ? "Replace the source link with the final canonical URL and remove the redirect loop."
                          : "Link directly to the final destination to reduce redirects."}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
