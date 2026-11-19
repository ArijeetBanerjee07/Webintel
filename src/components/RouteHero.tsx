type RouteHeroProps = { eyebrow: string; title: string; body: string };

export function RouteHero({ eyebrow, title, body }: RouteHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#050806] py-16 sm:py-24">
      <div className="shell relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}
