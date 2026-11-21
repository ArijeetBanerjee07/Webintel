
"use client";

import type { ReactNode } from "react";

interface CompetitorPageLayoutProps {
  children: ReactNode;
}

export default function CompetitorPageLayout({
  children,
}: CompetitorPageLayoutProps) {
  return <>{children}</>;
}
