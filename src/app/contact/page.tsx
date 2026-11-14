"use client";

import React, { useState } from "react";
import { Icon } from "@/components/Icon";
import { RouteHero } from "@/components/RouteHero";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  topic: "general" | "enterprise" | "pipeline" | "billing";
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  topic: "general",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
  };

  return (
    <>
      <RouteHero
        eyebrow="Direct Intelligence Desk"
        title="Connect with the WebIntel Engineering & Solutions Team."
        body="Whether you need help scoping an enterprise crawl program, custom webhook routing, or have questions about surface telemetry, we are ready to assist."
      />

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Channels & Enterprise Info */}
          <div className="space-y-6 lg:col-span-5">
            <div className="panel p-6 sm:p-7 space-y-6 bg-[#06100B]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Icon name="radar" width={15} height={15} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                  Direct Response Channels
                </span>
              </div>

              <ul className="space-y-5 text-xs">
                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-950 bg-emerald-950/40 text-emerald-400">
                    <Icon name="mail" width={16} height={16} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Solutions Desk</p>
                    <a
                      href="mailto:support@webintel.io"
                      className="mt-0.5 block text-zinc-400 hover:text-emerald-300 transition"
                    >
                      support@webintel.io
                    </a>
                    <span className="mt-1 inline-block font-mono text-[10px] text-emerald-400">
                      Average response time: &lt; 1 hour
                    </span>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-950 bg-emerald-950/40 text-emerald-400">
                    <Icon name="activity" width={16} height={16} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Priority Technical Line</p>
                    <a
                      href="tel:+915428921"
                      className="mt-0.5 block text-zinc-400 hover:text-emerald-300 transition"
                    >
                      +91 542-8921
                    </a>
                    <span className="mt-1 flex items-center gap-1 font-mono text-[10px] text-zinc-500">
                      <Icon name="clock" width={11} height={11} />
                      24/7 On-Call Enterprise Dispatch
                    </span>
                  </div>
                </li>

                {/* HQ & Location */}
                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-950 bg-emerald-950/40 text-emerald-400">
                    <Icon name="globe" width={16} height={16} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Engineering HQ</p>
                    <p className="mt-0.5 text-zinc-400">
                      Bengaluru Hub &amp; Global Distributed Infrastructure
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* SLA & Security Card */}
            <div className="panel p-6 sm:p-7 space-y-4 border-emerald-900/60 bg-[#040C07]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400">
                  <Icon name="shield" width={14} height={14} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                  SLA &amp; Compliance Guarantee
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">
                All client scans and telemetry communications are protected under strict SOC2 Type II
                protocols and encrypted transmission standards. Zero user credentials ever requested.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Icon name="check" width={12} height={12} /> SOC2 Compliant
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Icon name="check" width={12} height={12} /> 99.98% Uptime
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Contact Form */}
          <div className="lg:col-span-7">
            <div className="panel p-7 sm:p-9 bg-[#06100B]">
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_24px_-4px_rgba(16,185,129,0.7)]">
                    <Icon name="check" width={28} height={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="mt-2.5 max-w-md text-xs leading-relaxed text-zinc-400">
                    Thank you, <span className="text-white font-medium">{form.name}</span>. Our team
                    has received your message regarding <span className="text-emerald-400">{form.topic}</span>{" "}
                    and will respond to <span className="text-white">{form.email}</span> within one business hour.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="button-secondary mt-8 text-xs"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-emerald-950 pb-4">
                    <h2 className="text-lg font-medium text-white">Send a Message</h2>
                    <p className="mt-1 text-xs text-zinc-400">
                      Fill out the form below and an engineer will review your inquiry.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Alex Rivera"
                        className="w-full rounded-lg border border-emerald-950 bg-[#030805] px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400"
                      >
                        Work Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full rounded-lg border border-emerald-950 bg-[#030805] px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                      />
                    </div>
                  </div>

                  {/* Company and Topic */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400"
                      >
                        Company or Target Domain
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="company.com"
                        className="w-full rounded-lg border border-emerald-950 bg-[#030805] px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="topic"
                        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400"
                      >
                        Inquiry Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-emerald-950 bg-[#030805] px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-emerald-500/60"
                      >
                        <option value="general">General Product Information</option>
                        <option value="pipeline">API &amp; Automated Pipeline Integration</option>
                        <option value="enterprise">Enterprise Fleet &amp; White-Labeling</option>
                        <option value="billing">Billing &amp; Monitored Surface Tiers</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400"
                    >
                      Inquiry Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your domain portfolio, monitoring questions, or deployment timeline..."
                      className="w-full resize-none rounded-lg border border-emerald-950 bg-[#030805] px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                    />
                  </div>

                  {/* Form Footer */}
                  <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-zinc-500">
                      Direct engineering communication. No sales spam.
                    </p>
                    <button type="submit" className="button-primary text-xs">
                      <span>Dispatch Inquiry</span>
                      <Icon name="arrow-up-right" width={14} height={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
