"use client";

import React, { useState } from "react";
import { FaqItem } from "./helpData";

interface FaqAccordionProps {
  items: FaqItem[];
  searchQuery: string;
}

export function FaqAccordion({ items, searchQuery }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1])

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">
          Knowledge Clarifications
        </span>
        <h2 id="faq-heading" className="mt-1 text-2xl font-bold text-white">
          FAQ
        </h2>
        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
          Frequently asked questions about WebIntel scanning, data accuracy, and
          integrations.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="mt-6 space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={item.question}
                className="rounded-xl border border-zinc-800/90 bg-[#0B120F] transition hover:border-zinc-700"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={`text-sm font-medium sm:text-base ${
                      isOpen ? "text-[#10B981]" : "text-zinc-100"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-zinc-800/60 px-5 pb-4 pt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
       <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0B120F] p-8 text-center text-sm text-zinc-400">
  {`No FAQ answers matched "${searchQuery}".`}
</div>
      )}
    </section>
  );
}