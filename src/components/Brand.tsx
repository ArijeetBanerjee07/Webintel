import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="WebIntel home">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-300 shadow-glow">
        <span className="absolute inset-1 rounded-full border border-emerald-400/20" />
        <span className="text-sm font-black leading-none">✦</span>
      </span>

      {!compact && (
        <span className="text-[17px] font-semibold tracking-[-0.04em] text-white">
          Web<span className="text-emerald-400">Intel</span>
        </span>
      )}
    </Link>
  );
}
