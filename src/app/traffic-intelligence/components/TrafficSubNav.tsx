'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/traffic-intelligence', label: 'Traffic Estimates' },
  { href: '/traffic-intelligence/channel-mix', label: 'Channel Mix' },
  { href: '/traffic-intelligence/top-pages', label: 'Top Pages' },
  { href: '/traffic-intelligence/geography', label: 'Geography' },
  { href: '/traffic-intelligence/audience-overlap', label: 'Audience Overlap' },
  { href: '/traffic-intelligence/referral-sources', label: 'Referral Sources' },
];

export function TrafficSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-emerald-950/80 pb-3">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0d1f18]'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}