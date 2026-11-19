"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";

export function AuthModal() {
  const { isOpen, mode, closeAuth, setMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeAuth();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAuth]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeAuth();
      }, 1500);
    }, 800);
  };

  const handleOAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeAuth();
      }, 1500);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={closeAuth}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070c09] p-7 sm:p-8 shadow-2xl z-10 transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuth}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
          aria-label="Close dialog"
        >
          <Icon name="x" width={16} height={16} />
        </button>

        {/* Top Header */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Brand />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {mode === "signup" ? "Get Started with WebIntel" : "Welcome Back"}
          </h3>

          <p className="mt-1 text-xs text-zinc-400">
            {mode === "signup"
              ? "Start continuous surface intelligence for your domain estate."
              : "Enter your work credentials to access your telemetry dashboard."}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md py-1.5 transition ${
                mode === "signup"
                  ? "bg-emerald-500 text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-md py-1.5 transition ${
                mode === "signin"
                  ? "bg-emerald-500 text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {success ? (
          <div className="mt-8 flex flex-col items-center justify-center py-8 text-center animate-pulse">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Icon name="check" width={24} height={24} />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">
              {mode === "signup" ? "Account Initialized" : "Authenticated Successfully"}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Redirecting to your active telemetry workbench...
            </p>
          </div>
        ) : (
          <>
            {/* Social OAuth Buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleOAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 text-xs font-medium text-white transition hover:bg-white/[0.06] hover:border-white/20 disabled:opacity-50"
              >
                {/* Google Multi-Color SVG Icon */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleOAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 text-xs font-medium text-white transition hover:bg-white/[0.06] hover:border-white/20 disabled:opacity-50"
              >
                {/* GitHub Mark SVG Icon */}
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                Or with work email
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="auth-name"
                    className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                  >
                    Full Name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="auth-email"
                  className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                >
                  Work Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="auth-password"
                    className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                  >
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 transition"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    aria-label="Toggle password visibility"
                  >
                    <Icon name={showPassword ? "x" : "shield"} width={14} height={14} />
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="auth-company"
                    className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                  >
                    Primary Domain / Company (Optional)
                  </label>
                  <input
                    id="auth-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="company.com"
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="button-primary mt-2 w-full justify-center text-xs disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Icon name="radar" width={13} height={13} className="animate-spin" />
                    <span>Processing...</span>
                  </span>
                ) : mode === "signup" ? (
                  <span>Create Free Account →</span>
                ) : (
                  <span>Sign In to Dashboard →</span>
                )}
              </button>
            </form>

            {/* Bottom Toggle Note */}
            <div className="mt-5 text-center text-xs text-zinc-400">
              {mode === "signup" ? (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Need an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
                  >
                    Create one free
                  </button>
                </span>
              )}
            </div>

            {/* Security Footnote */}
            <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/[0.06] pt-4 font-mono text-[10px] text-zinc-500">
              <Icon name="lock" width={11} height={11} className="text-emerald-400" />
              <span>TLS 1.3 256-bit Encrypted • Zero Token Storage</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
