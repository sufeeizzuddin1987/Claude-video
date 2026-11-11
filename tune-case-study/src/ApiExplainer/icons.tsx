import React from "react";

export type IconName =
  | "plane" | "shield" | "shieldPlane" | "bag" | "clock" | "ticketX" | "medical"
  | "catalog" | "funnel" | "tag" | "policy" | "pin" | "calendar" | "people" | "card"
  | "device" | "globe" | "lock" | "arrowR" | "arrowL" | "check" | "cross"
  | "coin" | "stopwatch" | "pie" | "envelope" | "box" | "plug" | "plus" | "heart" | "desktop" | "arrowUp" | "arrowDown" | "bolt";

const SHIELD = "M32 6 L54 14 V32 C54 46 44 55 32 59 C20 55 10 46 10 32 V14 Z";

const shapes: Record<IconName, React.ReactNode> = {
  plane: (
    <>
      <polygon points="56,8 8,28 26,36 34,56" />
      <line x1="26" y1="36" x2="56" y2="8" />
    </>
  ),
  shield: (
    <>
      <path d={SHIELD} />
      <path d="M22 32 L29 39 L43 25" />
    </>
  ),
  shieldPlane: (
    <>
      <path d={SHIELD} />
      <polygon points="44,22 20,32 29,36 33,46" />
      <line x1="29" y1="36" x2="44" y2="22" />
    </>
  ),
  bag: (
    <>
      <rect x="14" y="22" width="36" height="32" rx="6" />
      <path d="M25 22 V16 a4 4 0 0 1 4 -4 h6 a4 4 0 0 1 4 4 V22" />
      <path d="M24 22 V54 M40 22 V54" />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="32" r="22" />
      <path d="M32 18 V32 L42 39" />
    </>
  ),
  ticketX: (
    <>
      <rect x="8" y="18" width="48" height="28" rx="6" />
      <path d="M27 26 L37 38 M37 26 L27 38" />
    </>
  ),
  medical: <path d="M26 10 h12 v16 h16 v12 h-16 v16 h-12 v-16 h-16 v-12 h16 z" />,
  catalog: (
    <>
      <rect x="10" y="10" width="44" height="14" rx="4" />
      <rect x="10" y="28" width="44" height="14" rx="4" />
      <rect x="10" y="46" width="44" height="10" rx="4" />
    </>
  ),
  funnel: <path d="M8 12 H56 L38 32 V50 L26 56 V32 Z" />,
  tag: (
    <>
      <path d="M10 12 H32 L54 34 L34 54 L10 30 Z" />
      <circle cx="21" cy="22" r="3.5" />
    </>
  ),
  policy: (
    <>
      <path d="M16 8 H38 L50 20 V56 H16 Z" />
      <path d="M38 8 V20 H50" />
      <path d="M24 40 L30 46 L42 32" />
    </>
  ),
  pin: (
    <>
      <path d="M32 58 C20 44 14 36 14 26 a18 18 0 0 1 36 0 c0 10 -6 18 -18 32 z" />
      <circle cx="32" cy="26" r="6" />
    </>
  ),
  calendar: (
    <>
      <rect x="10" y="14" width="44" height="40" rx="6" />
      <path d="M10 28 H54 M22 8 V18 M42 8 V18" />
    </>
  ),
  people: (
    <>
      <circle cx="24" cy="22" r="8" />
      <path d="M8 52 a16 16 0 0 1 32 0" />
      <circle cx="44" cy="26" r="6" />
      <path d="M44 40 a12 12 0 0 1 12 12" />
    </>
  ),
  card: (
    <>
      <rect x="8" y="16" width="48" height="32" rx="6" />
      <path d="M8 26 H56 M16 38 H28" />
    </>
  ),
  device: (
    <>
      <rect x="18" y="8" width="28" height="48" rx="6" />
      <path d="M28 49 H36" />
    </>
  ),
  globe: (
    <>
      <circle cx="32" cy="32" r="22" />
      <ellipse cx="32" cy="32" rx="10" ry="22" />
      <path d="M10 32 H54" />
    </>
  ),
  lock: (
    <>
      <rect x="16" y="28" width="32" height="26" rx="5" />
      <path d="M22 28 V22 a10 10 0 0 1 20 0 V28" />
    </>
  ),
  arrowR: <path d="M8 32 H54 M40 18 L54 32 L40 46" />,
  arrowL: <path d="M56 32 H10 M24 18 L10 32 L24 46" />,
  check: <path d="M12 34 L26 48 L52 20" />,
  cross: <path d="M16 16 L48 48 M48 16 L16 48" />,
  coin: (
    <>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="13" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="32" cy="36" r="20" />
      <path d="M32 36 L40 27 M26 8 H38 M32 8 V16" />
    </>
  ),
  pie: (
    <>
      <circle cx="32" cy="32" r="22" />
      <path d="M32 32 V10 M32 32 L48 48" />
    </>
  ),
  envelope: (
    <>
      <rect x="8" y="16" width="48" height="32" rx="5" />
      <path d="M8 20 L32 38 L56 20" />
    </>
  ),
  box: (
    <>
      <path d="M8 22 L32 10 L56 22 V46 L32 58 L8 46 Z" />
      <path d="M8 22 L32 34 L56 22 M32 34 V58" />
    </>
  ),
  plug: (
    <>
      <path d="M24 8 V22 M40 8 V22" />
      <rect x="16" y="22" width="32" height="16" rx="6" />
      <path d="M32 38 V56" />
    </>
  ),
  plus: <path d="M32 12 V52 M12 32 H52" />,
  heart: <path d="M32 54 C10 38 8 20 20 14 C27 10 32 16 32 20 C32 16 37 10 44 14 C56 20 54 38 32 54 Z" />,
  desktop: (
    <>
      <rect x="8" y="12" width="48" height="32" rx="4" />
      <path d="M24 56 H40 M32 44 V56" />
    </>
  ),
  arrowUp: <path d="M32 54 V12 M18 26 L32 12 L46 26" />,
  arrowDown: <path d="M32 10 V52 M18 38 L32 52 L46 38" />,
  bolt: <path d="M36 6 L14 36 H30 L26 58 L50 26 H34 Z" />,
};

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number }> = ({
  name,
  size = 48,
  color = "#161616",
  stroke = 3.5,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    {shapes[name]}
  </svg>
);
