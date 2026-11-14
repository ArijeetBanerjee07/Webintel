import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, body, align = "left", children }: SectionHeadingProps) {
  const centered = align === "center";
  return <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>{body && <p className="muted-copy mt-4 max-w-xl">{body}</p>}{children}</div>;
}
