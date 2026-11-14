"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

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
  }

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
    <div className="min-h-screen bg-[#080C0A] px-4 py-14 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/help"
          className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Help Center</span>
        </Link>

        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <MessageSquare className="h-3.5 w-3.5" />
            Support & Engineering
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get in touch with WebIntel
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Have a question about crawl thresholds, custom webhook integrations,
            or white-label enterprise plans? Reach out and our team will get
            back to you shortly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Contact Info */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-zinc-800 bg-[#0B120F] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Direct Channels
              </h2>

              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Email Support</p>
                    <a
                      href="mailto:support@webintel.io"
                      className="mt-0.5 block text-zinc-400 transition hover:text-emerald-400"
                    >
                      support@webintel.io
                    </a>
                    <span className="mt-1 inline-block text-xs text-emerald-400">
                      {"Average reply time: < 1 hour"}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Phone Line</p>
                    <a
                      href="tel:+18005428921"
                      className="mt-0.5 block text-zinc-400 transition hover:text-emerald-400"
                    >
                      +91 542-8921
                    </a>
                    <span className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="h-3 w-3" />
                      Mon–Sun, 24/7 Priority Line
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Headquarters</p>
                    <p className="mt-0.5 text-zinc-400">
                      548 Market St, Suite 41200
                      <br />
                      San Francisco, CA 94104
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#0B120F] p-6">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-sm font-semibold text-white">
                  Custom Pipeline Assistance
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Need help configuring headless Chromium edge nodes, HMAC-signed
                webhooks, or custom CNAME white-label reports? Select{" "}
                <span className="font-medium text-zinc-200">
                  Pipeline & API Integration
                </span>{" "}
                in the form to route your ticket directly to a solutions
                engineer.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-[#0B120F] p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-white">
                    Message received
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                    {`Thanks, ${form.name}. We've logged your request and sent a confirmation to ${form.email}. A team member will respond shortly.`}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-zinc-300"
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
                        placeholder="Full name"
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#080C0A] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-zinc-300"
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
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#080C0A] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Company or Domain
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="example.com"
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#080C0A] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="topic"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Inquiry Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#080C0A] px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-emerald-500"
                      >
                        <option value="general">General Support</option>
                        <option value="pipeline">
                          Pipeline & API Integration
                        </option>
                        <option value="enterprise">
                          Enterprise & White-Labeling
                        </option>
                        <option value="billing">Billing & Workspace Limits</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      How can we help? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your setup, target domain, or question..."
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#080C0A] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-zinc-500">
                      Protected by standard workspace privacy policies.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-[#080C0A] transition hover:bg-emerald-400"
                    >
                      <span>Send Message</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}