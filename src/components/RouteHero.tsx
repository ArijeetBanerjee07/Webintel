type RouteHeroProps = { eyebrow: string; title: string; body: string };

export function RouteHero({ eyebrow, title, body }: RouteHeroProps) {
  return <section className="relative overflow-hidden border-b border-emerald-950/70"><div className="absolute left-1/2 top-0 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" /><div className="shell relative py-20 sm:py-28"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{title}</h1><p className="muted-copy mt-6 max-w-2xl text-base">{body}</p></div></section>;
}
