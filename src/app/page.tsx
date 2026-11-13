import HelpPage from "./help/HelpPage";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              W
            </div>
            <span className="font-semibold text-lg tracking-tight">Webintel</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              CI Ready
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">Environment:</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs">
              staging / production
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Team Development &amp; Git Workflow Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Engineered for Resilient Team Collaboration
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Webintel enforces protected branch integrity, automated continuous integration,
            strict PR verification gates, and zero-downtime release pipelines.
          </p>
        </div>

        {/* Branch Flow Diagram */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-12 shadow-2xl backdrop-blur">
          <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
            <span>Branching &amp; Release Flow</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1: Feature */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 relative group hover:border-indigo-500/50 transition">
              <div className="text-xs font-mono text-indigo-400 mb-2">STEP 01 • ACTIVE CODING</div>
              <h3 className="text-lg font-bold text-white mb-2">feature/*</h3>
              <p className="text-sm text-slate-400 mb-4">
                Branch created off staging. Dedicated to single feature or task:
              </p>
              <div className="bg-slate-900 rounded p-2.5 font-mono text-xs text-indigo-300 border border-slate-800">
                git checkout -b feature/auth-system
              </div>
            </div>

            {/* Step 2: Staging */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 relative group hover:border-amber-500/50 transition">
              <div className="text-xs font-mono text-amber-400 mb-2">STEP 02 • INTEGRATION</div>
              <h3 className="text-lg font-bold text-white mb-2">staging</h3>
              <p className="text-sm text-slate-400 mb-4">
                Pull request target. Automated CI checks run, code review &amp; team sign-off required:
              </p>
              <div className="bg-slate-900 rounded p-2.5 font-mono text-xs text-amber-300 border border-slate-800">
                PR: feature/* ➔ staging
              </div>
            </div>

            {/* Step 3: Main */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 relative group hover:border-emerald-500/50 transition">
              <div className="text-xs font-mono text-emerald-400 mb-2">STEP 03 • PRODUCTION</div>
              <h3 className="text-lg font-bold text-white mb-2">main (Untouchable)</h3>
              <p className="text-sm text-slate-400 mb-4">
                Protected branch. Zero direct pushes. Only promoted via approved PR from staging:
              </p>
              <div className="bg-slate-900 rounded p-2.5 font-mono text-xs text-emerald-300 border border-slate-800">
                PR: staging ➔ main
              </div>
            </div>
          </div>
        </div>

        {/* PR Automated CI Gates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold mb-4">
                TS
              </div>
              <h4 className="text-base font-semibold text-white mb-1">TypeScript Typecheck</h4>
              <p className="text-sm text-slate-400 mb-4">
                Strict type safety verified on every PR commit using the TypeScript compiler without emitting JS.
              </p>
            </div>
            <code className="text-xs bg-slate-950 p-2 rounded text-slate-300 border border-slate-800 font-mono">
              npm run typecheck
            </code>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-mono font-bold mb-4">
                ES
              </div>
              <h4 className="text-base font-semibold text-white mb-1">ESLint Analysis</h4>
              <p className="text-sm text-slate-400 mb-4">
                Code quality, architectural conventions, and static code styling rules automatically enforced.
              </p>
            </div>
            <code className="text-xs bg-slate-950 p-2 rounded text-slate-300 border border-slate-800 font-mono">
              npm run lint
            </code>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold mb-4">
                NB
              </div>
              <h4 className="text-base font-semibold text-white mb-1">Production Build</h4>
              <p className="text-sm text-slate-400 mb-4">
                Full production Next.js build verification ensuring zero runtime bundle or prerender errors.
              </p>
            </div>
            <code className="text-xs bg-slate-950 p-2 rounded text-slate-300 border border-slate-800 font-mono">
              npm run build
            </code>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/30 py-6 text-center text-xs text-slate-500">
        Webintel • Team Workflow &amp; Protected CI Pipeline Setup
      </footer>
    </div>
  );
}
