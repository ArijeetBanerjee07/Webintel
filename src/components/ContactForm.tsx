"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) return <div className="panel min-h-[420px] p-8 sm:p-10"><div className="flex h-full min-h-[340px] flex-col items-start justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300"><Icon name="check" width={24} height={24} /></span><p className="eyebrow mt-7">Request received</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">We&apos;ll bring the signal.</h2><p className="muted-copy mt-4 max-w-md">Thanks for reaching out. A member of the Webintel team will follow up with a tailored intelligence walkthrough.</p><button type="button" onClick={() => setSubmitted(false)} className="button-secondary mt-7">Send another request</button></div></div>;

  return <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" placeholder="Avery Morgan" required /><Field label="Work email" name="email" type="email" placeholder="avery@company.com" required /></div><Field label="Target website URL" name="website" placeholder="https://yourcompany.com" required /><div><label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Message</label><textarea id="message" name="message" rows={5} placeholder="What would you like to understand better?" className="w-full resize-none rounded-lg border border-emerald-950/80 bg-[#050c08] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-emerald-500/60" /></div><div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-[250px] text-[11px] leading-5 text-zinc-600">By submitting, you&apos;re asking for a product conversation—not adding yourself to a newsletter.</p><button className="button-primary" type="submit"><Icon name="arrow-up-right" width={16} height={16} />Request a demo</button></div></form>;
}

type FieldProps = { label: string; name: string; placeholder: string; type?: string; required?: boolean };

function Field({ label, name, placeholder, type = "text", required = false }: FieldProps) {
  return <div><label htmlFor={name} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">{label}</label><input id={name} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-lg border border-emerald-950/80 bg-[#050c08] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-emerald-500/60" /></div>;
}
