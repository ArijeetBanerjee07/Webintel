type Severity = "Critical" | "Warning" | "Notice";

type AuditIssue = {
  id: number;
  severity: Severity;
  title: string;
  affectedPages: string;
  description: string;
  recommendation: string;
  progress: number;
};

const auditIssues: AuditIssue[] = [
  {
    id: 1,
    severity: "Critical",
    title: "Duplicate page titles",
    affectedPages: "12 affected pages",
    description:
      "Multiple pages are using the same title tag, making it harder for search engines to understand page relevance.",
    recommendation:
      "Create a unique, keyword-focused title for every indexable page.",
    progress: 18,
  },
  {
    id: 2,
    severity: "Critical",
    title: "Missing meta descriptions",
    affectedPages: "8 affected pages",
    description:
      "Several important pages do not have meta descriptions for search engine result previews.",
    recommendation:
      "Add a concise 140–160 character description that explains the page value.",
    progress: 34,
  },
  {
    id: 3,
    severity: "Warning",
    title: "Missing image alt text",
    affectedPages: "27 affected images",
    description:
      "Images without alternative text reduce accessibility and provide less context to search engines.",
    recommendation:
      "Add descriptive alt text to meaningful images and empty alt attributes to decorative assets.",
    progress: 52,
  },
  {
    id: 4,
    severity: "Warning",
    title: "Oversized image assets",
    affectedPages: "19 affected assets",
    description:
      "Large image files are increasing page weight and may be slowing down the user experience.",
    recommendation:
      "Compress images, use WebP or AVIF, and serve responsive image dimensions.",
    progress: 68,
  },
  {
    id: 5,
    severity: "Notice",
    title: "Crawl depth greater than 3 clicks",
    affectedPages: "6 affected pages",
    description:
      "Some pages are several navigation steps away from the homepage and may receive less crawl attention.",
    recommendation:
      "Add contextual internal links and surface important pages closer to the main navigation.",
    progress: 82,
  },
];

const severityStyles: Record<
  Severity,
  { badge: string; dot: string; icon: string }
> = {
  Critical: {
    badge: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    dot: "bg-rose-400",
    icon: "text-rose-300",
  },
  Warning: {
    badge: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    dot: "bg-amber-300",
    icon: "text-amber-200",
  },
  Notice: {
    badge: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
    dot: "bg-emerald-300",
    icon: "text-emerald-300",
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles = severityStyles[severity];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {severity}
    </span>
  );
}

function IssueIcon({ severity }: { severity: Severity }) {
  const styles = severityStyles[severity];

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] ${styles.icon}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        {severity === "Notice" ? (
          <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 10.5v5M12 7.5h.01" />
          </>
        ) : (
          <>
            <path d="M12 3 2.8 20h18.4L12 3Z" />
            <path d="M12 9v4.5M12 17h.01" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function WebsiteAuditPage() {
  const criticalCount = auditIssues.filter(
    (issue) => issue.severity === "Critical"
  ).length;

  const warningCount = auditIssues.filter(
    (issue) => issue.severity === "Warning"
  ).length;

  const noticeCount = auditIssues.filter(
    (issue) => issue.severity === "Notice"
  ).length;

  return (
    <main className="min-h-screen bg-[var(--forest-950)] text-[#e6eae7]">
      <div className="shell py-10 sm:py-14">
        <header className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Technical SEO / Website audit</p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Website Audit
            </h1>

            <p className="muted-copy mt-4 max-w-2xl text-base">
              Review technical SEO issues affecting crawlability, accessibility,
              page relevance, and organic search performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="button-secondary">
              Export report
            </button>

            <button type="button" className="button-primary">
              Run audit again
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Critical issues</p>
            <div className="mt-5 flex items-end justify-between">
              <p className="text-3xl font-semibold text-white">
                {criticalCount}
              </p>
              <span className="text-xs text-rose-300">Needs attention</span>
            </div>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Warnings</p>
            <div className="mt-5 flex items-end justify-between">
              <p className="text-3xl font-semibold text-white">
                {warningCount}
              </p>
              <span className="text-xs text-amber-200">
                Optimization available
              </span>
            </div>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Notices</p>
            <div className="mt-5 flex items-end justify-between">
              <p className="text-3xl font-semibold text-white">
                {noticeCount}
              </p>
              <span className="text-xs text-emerald-300">
                Review when ready
              </span>
            </div>
          </div>
        </section>

        <section className="panel mb-8 p-5 sm:p-6">
          <p className="eyebrow mb-2">Audit status</p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                62% of technical checks passed
              </h2>
              <p className="muted-copy mt-1">
                5 issues found across 73 checked pages and assets.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/[0.08] sm:w-44">
                <div className="h-full w-[62%] rounded-full bg-emerald-400" />
              </div>
              <span className="text-sm font-medium text-emerald-300">62%</span>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="eyebrow mb-2">Action items</p>
            <h2 className="text-2xl font-semibold text-white">
              Technical SEO issues
            </h2>
          </div>

          <div className="space-y-4">
            {auditIssues.map((issue) => (
              <article key={issue.id} className="panel panel-hover p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <IssueIcon severity={issue.severity} />

                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {issue.title}
                        </h3>
                        <SeverityBadge severity={issue.severity} />
                      </div>

                      <p className="mb-2 text-sm text-[#92a297]">
                        {issue.affectedPages}
                      </p>

                      <p className="muted-copy max-w-3xl">
                        {issue.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button-secondary self-start"
                  >
                    View affected pages
                  </button>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#10b981]">
                    Recommended fix
                  </p>

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm leading-6 text-[#d6dfd9]">
                      {issue.recommendation}
                    </p>

                    <button
                      type="button"
                      className="button-primary shrink-0"
                    >
                      Start fix
                    </button>
                  </div>

                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className={`h-full rounded-full ${
                        issue.severity === "Critical"
                          ? "bg-rose-400"
                          : issue.severity === "Warning"
                            ? "bg-amber-300"
                            : "bg-emerald-400"
                      }`}
                      style={{ width: `${issue.progress}%` }}
                    />
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
