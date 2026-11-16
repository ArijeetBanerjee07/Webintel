"use client";

import { useMemo, useState } from "react";

type SchemaStatus = "Valid" | "Missing properties" | "Malformed JSON";

type SchemaItem = {
  id: number;
  sourceUrl: string;
  type: string;
  format: "JSON-LD" | "Microdata";
  status: SchemaStatus;
  requiredProperties: string[];
  detectedProperties: string[];
  code: string;
};

const schemaItems: SchemaItem[] = [
  {
    id: 1,
    sourceUrl: "https://example.com/",
    type: "Organization",
    format: "JSON-LD",
    status: "Valid",
    requiredProperties: ["@context", "@type", "name", "url"],
    detectedProperties: [
      "@context",
      "@type",
      "name",
      "url",
      "logo",
      "sameAs",
    ],
    code: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Northstar Labs",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/northstar-labs"
  ]
}`,
  },
  {
    id: 2,
    sourceUrl: "https://example.com/products/audit-suite",
    type: "Product",
    format: "JSON-LD",
    status: "Missing properties",
    requiredProperties: ["@context", "@type", "name", "image", "offers"],
    detectedProperties: ["@context", "@type", "name"],
    code: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Audit Suite"
}`,
  },
  {
    id: 3,
    sourceUrl: "https://example.com/blog/technical-seo",
    type: "Article",
    format: "JSON-LD",
    status: "Malformed JSON",
    requiredProperties: [
      "@context",
      "@type",
      "headline",
      "author",
      "datePublished",
    ],
    detectedProperties: ["@context", "@type", "headline"],
    code: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Technical SEO checklist",
  "author": {
    "@type": "Person",
    "name": "Editorial team"
  },
  "datePublished": "2026-11-16",
}`,
  },
  {
    id: 4,
    sourceUrl: "https://example.com/products/audit-suite",
    type: "BreadcrumbList",
    format: "JSON-LD",
    status: "Valid",
    requiredProperties: ["@context", "@type", "itemListElement"],
    detectedProperties: ["@context", "@type", "itemListElement"],
    code: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Audit Suite"
    }
  ]
}`,
  },
  {
    id: 5,
    sourceUrl: "https://example.com/contact",
    type: "LocalBusiness",
    format: "Microdata",
    status: "Missing properties",
    requiredProperties: ["name", "address", "telephone"],
    detectedProperties: ["name", "telephone"],
    code: `<div itemscope itemtype="https://schema.org/LocalBusiness">
  <span itemprop="name">Northstar Labs</span>
  <a itemprop="telephone" href="tel:+15550102020">
    +1 555 010 2020
  </a>
</div>`,
  },
];

const statusStyles: Record<
  SchemaStatus,
  { badge: string; dot: string }
> = {
  Valid: {
    badge: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
    dot: "bg-emerald-300",
  },
  "Missing properties": {
    badge: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    dot: "bg-amber-300",
  },
  "Malformed JSON": {
    badge: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    dot: "bg-rose-400",
  },
};

function StatusBadge({ status }: { status: SchemaStatus }) {
  const styles = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}

function CodeViewer({
  code,
  format,
}: {
  code: string;
  format: SchemaItem["format"];
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  }

  return (
    <div className="card-terminal overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <span className="font-mono text-xs text-[#8e9e94]">
          {format === "JSON-LD"
            ? "script[type='application/ld+json']"
            : "microdata.html"}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="font-mono text-xs text-[#8e9e94] transition hover:text-emerald-300"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-xs leading-6 text-[#d6dfd9] sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ValidationMessage({ item }: { item: SchemaItem }) {
  const missingProperties = item.requiredProperties.filter(
    (property) => !item.detectedProperties.includes(property)
  );

  if (item.status === "Malformed JSON") {
    return (
      <div className="border-t border-white/[0.08] pt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-300">
          Validation error
        </p>

        <p className="text-sm leading-6 text-[#d6dfd9]">
          The JSON-LD block could not be parsed. Check for trailing commas,
          missing quotes, or invalid brackets.
        </p>
      </div>
    );
  }

  if (missingProperties.length === 0) {
    return (
      <div className="border-t border-white/[0.08] pt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
          Validation passed
        </p>

        <p className="text-sm leading-6 text-[#d6dfd9]">
          Required properties were detected for this {item.type} schema.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/[0.08] pt-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
        Missing required properties
      </p>

      <div className="flex flex-wrap gap-2">
        {missingProperties.map((property) => (
          <span
            key={property}
            className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 font-mono text-xs text-amber-200"
          >
            {property}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MetadataSchemaPage() {
  const [activeFormat, setActiveFormat] = useState<
    "All" | SchemaItem["format"]
  >("All");

  const filteredItems = useMemo(() => {
    if (activeFormat === "All") {
      return schemaItems;
    }

    return schemaItems.filter((item) => item.format === activeFormat);
  }, [activeFormat]);

  const validCount = schemaItems.filter(
    (item) => item.status === "Valid"
  ).length;

  const issueCount = schemaItems.length - validCount;

  return (
    <main className="min-h-screen bg-[var(--forest-950)] text-[#e6eae7]">
      <div className="shell py-10 sm:py-14">
        <header className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Technical SEO / Structured data</p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Metadata &amp; Schema
            </h1>

            <p className="muted-copy mt-4 max-w-2xl text-base">
              Inspect structured data found in JSON-LD and Microdata blocks,
              validate syntax, and identify missing schema properties.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="button-secondary">
              Export findings
            </button>

            <button type="button" className="button-primary">
              Re-scan metadata
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Schema blocks</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {schemaItems.length}
            </p>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Valid blocks</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {validCount}
            </p>
          </div>

          <div className="panel panel-hover p-5">
            <p className="text-sm text-[#92a297]">Validation issues</p>
            <p className="mt-5 text-3xl font-semibold text-white">
              {issueCount}
            </p>
          </div>
        </section>

        <section className="panel mb-8 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-2">Detected schema types</p>
              <h2 className="text-xl font-semibold text-white">
                Structured data coverage
              </h2>
              <p className="muted-copy mt-1">
                Schema types discovered during the latest metadata scan.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Organization",
                "Product",
                "Article",
                "BreadcrumbList",
                "LocalBusiness",
              ].map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Metadata inspection</p>
            <h2 className="text-2xl font-semibold text-white">
              Detected structured data
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "JSON-LD", "Microdata"] as const).map((format) => (
              <button
                key={format}
                type="button"
                onClick={() => setActiveFormat(format)}
                className={
                  activeFormat === format
                    ? "rounded-lg border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-2 text-sm font-medium text-emerald-300"
                    : "button-secondary px-3 py-2"
                }
              >
                {format}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          {filteredItems.map((item) => (
            <article key={item.id} className="panel panel-hover p-5 sm:p-6">
              <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {item.type}
                    </h3>

                    <StatusBadge status={item.status} />

                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-[#92a297]">
                      {item.format}
                    </span>
                  </div>

                  <p className="break-all text-sm text-[#92a297]">
                    {item.sourceUrl}
                  </p>
                </div>

                <button type="button" className="button-secondary self-start">
                  Inspect page
                </button>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
                <CodeViewer code={item.code} format={item.format} />

                <div className="panel p-5">
                  <p className="eyebrow mb-4">Property validation</p>

                  <p className="mb-2 text-xs text-[#92a297]">
                    Detected properties
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {item.detectedProperties.map((property) => (
                      <span
                        key={property}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#d6dfd9]"
                      >
                        {property}
                      </span>
                    ))}
                  </div>

                  <p className="mb-2 text-xs text-[#92a297]">
                    Required properties
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.requiredProperties.map((property) => {
                      const isPresent = item.detectedProperties.includes(
                        property
                      );

                      return (
                        <span
                          key={property}
                          className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
                            isPresent
                              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-300"
                              : "border-amber-300/20 bg-amber-300/10 text-amber-200"
                          }`}
                        >
                          {property}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <ValidationMessage item={item} />
              </div>
            </article>
          ))}
        </section>

        {filteredItems.length === 0 && (
          <div className="panel p-10 text-center">
            <p className="text-sm text-[#92a297]">
              No schema blocks found for this format.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
