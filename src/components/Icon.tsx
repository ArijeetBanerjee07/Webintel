import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "activity"
  | "arrow-up-right"
  | "bar-chart"
  | "check"
  | "chevron-right"
  | "clock"
  | "code"
  | "globe"
  | "layers"
  | "lock"
  | "mail"
  | "menu"
  | "plus"
  | "radar"
  | "search"
  | "server"
  | "shield"
  | "spark"
  | "terminal"
  | "x"
  | "zap";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, ReactNode> = {
    activity: <><path {...common} d="M3 12h4l2.2-7 4.1 14L15.5 12H21" /></>,
    "arrow-up-right": <><path {...common} d="M7 17 17 7M8 7h9v9" /></>,
    "bar-chart": <><path {...common} d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
    check: <><path {...common} d="m5 12 4 4L19 6" /></>,
    "chevron-right": <><path {...common} d="m9 5 7 7-7 7" /></>,
    clock: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M12 7v5l3 2" /></>,
    code: <><path {...common} d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
    globe: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" /></>,
    layers: <><path {...common} d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
    lock: <><rect {...common} x="5" y="10" width="14" height="10" rx="2" /><path {...common} d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    mail: <><rect {...common} x="3" y="5" width="18" height="14" rx="2" /><path {...common} d="m3 7 9 6 9-6" /></>,
    menu: <><path {...common} d="M4 7h16M4 12h16M4 17h16" /></>,
    plus: <><path {...common} d="M12 5v14M5 12h14" /></>,
    radar: <><circle {...common} cx="12" cy="12" r="8" /><path {...common} d="M12 4v8l5 5M4.6 7.6A9 9 0 0 0 12 21M19.4 7.6A9 9 0 0 0 12 3" /></>,
    search: <><circle {...common} cx="10.5" cy="10.5" r="6.5" /><path {...common} d="m16 16 5 5" /></>,
    server: <><rect {...common} x="3" y="4" width="18" height="6" rx="2" /><rect {...common} x="3" y="14" width="18" height="6" rx="2" /><path {...common} d="M7 7h.01M7 17h.01" /></>,
    shield: <><path {...common} d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3Z" /><path {...common} d="m8.5 12 2.2 2.2 4.8-5" /></>,
    spark: <><path {...common} d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3Z" /><path {...common} d="m19 3 .4 1.6L21 5l-1.6.4L19 7l-.4-1.6L17 5l1.6-.4L19 3Z" /></>,
    terminal: <><rect {...common} x="3" y="4" width="18" height="16" rx="2" /><path {...common} d="m7 9 3 3-3 3M13 15h4" /></>,
    x: <><path {...common} d="m6 6 12 12M18 6 6 18" /></>,
    zap: <><path {...common} d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" /></>
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" {...props}>{paths[name]}</svg>;
}
