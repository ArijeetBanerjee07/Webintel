"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";

export function ScanBar() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setMessage("Add a public domain to begin your scan.");
      return;
    }
    setMessage(`Scan queued for ${trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "")}.`);
  }

  return <div id="scan" className="w-full max-w-xl"><form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-xl border border-emerald-800/70 bg-[#07110B] p-2 shadow-glow sm:flex-row"><label htmlFor="scan-url" className="sr-only">Public website URL</label><div className="flex min-w-0 flex-1 items-center gap-2 px-3"><Icon name="globe" width={17} height={17} className="shrink-0 text-emerald-500" /><input id="scan-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Enter a public website URL (e.g., stripe.com)" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-zinc-600" /></div><button type="submit" className="button-primary shrink-0 px-4"><Icon name="spark" width={16} height={16} />New Scan</button></form>{message && <p className="mt-2 font-mono text-[11px] text-emerald-400/90">{message}</p>}</div>;
}
