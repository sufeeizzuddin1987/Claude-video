import React from "react";
import { C, POPPINS, SHADOW } from "../ApiExplainer/theme";
import { Icon, type IconName } from "../ApiExplainer/icons";

export const ab = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width: w,
  height: h,
});

// ---- Gear -------------------------------------------------------------------------------------
const gearPoints = (r: number, teeth: number, tooth: number): string => {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  const q = step / 4;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const add = (ang: number, rad: number) => pts.push(`${(Math.cos(ang) * rad).toFixed(2)},${(Math.sin(ang) * rad).toFixed(2)}`);
    add(a - q * 1.3, r);
    add(a - q * 0.7, r + tooth);
    add(a + q * 0.7, r + tooth);
    add(a + q * 1.3, r);
  }
  return pts.join(" ");
};

export const Gear: React.FC<{ size: number; rot: number; color: string; teeth?: number; hole?: string }> = ({ size, rot, color, teeth = 10, hole = "#fff" }) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ display: "block" }}>
    <g transform={`rotate(${rot})`}>
      <polygon points={gearPoints(34, teeth, 12)} fill={color} />
    </g>
    <circle r={14} fill={hole} />
  </svg>
);

// ---- Product tile / price tag ----------------------------------------------------------------
export const Tile: React.FC<{ icon: IconName; size?: number; border?: string; bg?: string; color?: string; style?: React.CSSProperties }> = ({
  icon,
  size = 90,
  border = C.tp,
  bg = "#fff",
  color = C.tp,
  style,
}) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: bg, border: `3px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOW, ...style }}>
    <Icon name={icon} size={size * 0.58} color={color} />
  </div>
);

export const PriceTag: React.FC<{ text: string; scale?: number; style?: React.CSSProperties }> = ({ text, scale = 1, style }) => (
  <div style={{ background: C.red, color: "#fff", fontFamily: POPPINS, fontWeight: 800, fontSize: 26 * scale, lineHeight: 1.2, padding: `${3 * scale}px ${12 * scale}px`, borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 4px 10px rgba(254,0,0,0.3)", ...style }}>
    {text}
  </div>
);

// ---- Parcel (a message travelling over the API) ----------------------------------------------
const CHIP_POS = [
  [30, 20],
  [116, 20],
  [30, 76],
  [116, 76],
];

export const Parcel: React.FC<{ color: string; icons: IconName[]; scale?: number; x?: number; y?: number; opacity?: number; rot?: number }> = ({ color, icons, scale = 1, x = 0, y = 0, opacity = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x - 100, top: y - 75, width: 200, height: 150, transform: `scale(${scale}) rotate(${rot}deg)`, opacity, zIndex: 6 }}>
    <div style={{ ...ab(0, 0, 200, 150), borderRadius: 22, background: color, boxShadow: "0 14px 30px rgba(0,0,0,0.22)" }} />
    <div style={{ ...ab(0, 0, 200, 30), borderRadius: "22px 22px 0 0", background: "rgba(0,0,0,0.16)" }} />
    <div style={{ ...ab(87, 0, 26, 150), background: "rgba(255,255,255,0.35)" }} />
    {icons.slice(0, 4).map((ic, i) => (
      <div key={i} style={{ ...ab(CHIP_POS[i][0], CHIP_POS[i][1] + 14, 54, 54), borderRadius: 27, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={ic} size={32} color={color} />
      </div>
    ))}
  </div>
);

// ---- Passenger -------------------------------------------------------------------------------
export const Passenger: React.FC<{ t: number; happy?: number; reach?: number }> = ({ t, happy = 0, reach = 0 }) => {
  const bob = Math.sin(t * 2.2) * 4;
  const hx = 262 + 26 * reach;
  const hy = 330 - 14 * reach;
  const JACKET = "#F5B301";
  const SKIN = "#E8B58A";
  return (
    <svg width={300} height={620} viewBox="0 0 300 620" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx={150} cy={604} rx={120} ry={12} fill="rgba(0,0,0,0.10)" />
      {/* suitcase */}
      <g>
        <rect x={214} y={510} width={70} height={90} rx={12} fill={C.red} />
        <rect x={236} y={494} width={26} height={22} rx={6} fill="none" stroke={C.ink} strokeWidth={6} />
        <rect x={214} y={540} width={70} height={8} fill="rgba(0,0,0,0.18)" />
        <circle cx={230} cy={604} r={6} fill={C.ink} />
        <circle cx={268} cy={604} r={6} fill={C.ink} />
      </g>
      <g transform={`translate(0 ${bob})`}>
        {/* legs */}
        <rect x={108} y={400} width={40} height={190} rx={18} fill="#27304D" />
        <rect x={154} y={400} width={40} height={190} rx={18} fill="#27304D" />
        <ellipse cx={124} cy={592} rx={30} ry={13} fill={C.ink} />
        <ellipse cx={176} cy={592} rx={30} ry={13} fill={C.ink} />
        {/* torso */}
        <rect x={82} y={212} width={136} height={206} rx={44} fill={JACKET} />
        <rect x={142} y={218} width={16} height={196} rx={8} fill="rgba(0,0,0,0.10)" />
        {/* left arm */}
        <line x1={96} y1={252} x2={80} y2={380} stroke={JACKET} strokeWidth={34} strokeLinecap="round" />
        <circle cx={80} cy={392} r={18} fill={SKIN} />
        {/* right arm toward phone */}
        <line x1={206} y1={252} x2={hx} y2={hy} stroke={JACKET} strokeWidth={34} strokeLinecap="round" />
        <circle cx={hx + 4} cy={hy - 2} r={19} fill={SKIN} />
        {/* neck + head */}
        <rect x={136} y={186} width={28} height={36} rx={10} fill={SKIN} />
        <circle cx={150} cy={140} r={54} fill={SKIN} />
        <path d="M96 136 C94 76 206 76 204 136 C196 108 104 108 96 136 Z" fill="#2B2118" />
        {/* face */}
        {happy > 0.5 ? (
          <>
            <path d="M124 146 Q133 136 142 146" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M158 146 Q167 136 176 146" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M128 164 Q150 196 172 164 Z" fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          </>
        ) : (
          <>
            <circle cx={132} cy={146} r={5} fill={C.ink} />
            <circle cx={168} cy={146} r={5} fill={C.ink} />
            <path d="M134 166 Q150 178 166 166" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
          </>
        )}
        <circle cx={118} cy={164} r={9} fill="#F29B8E" opacity={0.55} />
        <circle cx={182} cy={164} r={9} fill="#F29B8E" opacity={0.55} />
      </g>
    </svg>
  );
};

// ---- Phone shell -----------------------------------------------------------------------------
export const PH = { x: 330, y: 230, w: 380, h: 700 };

export const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ ...ab(PH.x, PH.y, PH.w, PH.h), borderRadius: 54, background: C.ink, boxShadow: SHADOW }}>
    <div style={{ ...ab(14, 14, 352, 672), borderRadius: 42, background: "#fff", overflow: "hidden" }}>{children}</div>
    <div style={{ ...ab(140, 22, 100, 22), borderRadius: 11, background: C.ink, zIndex: 3 }} />
  </div>
);

// ---- Tap ripple ------------------------------------------------------------------------------
export const TapRipple: React.FC<{ t: number; x: number; y: number; at: number }> = ({ t, x, y, at }) => {
  const k = (t - at) / 0.7;
  if (k < 0 || k > 1) return null;
  const e = 1 - Math.pow(1 - k, 3);
  return (
    <>
      <div style={{ position: "absolute", left: x - 44 * e, top: y - 44 * e, width: 88 * e, height: 88 * e, borderRadius: "50%", border: `5px solid ${C.red}`, opacity: 1 - k, zIndex: 9 }} />
      <div style={{ position: "absolute", left: x - 16 * (1 - k * 0.4), top: y - 16 * (1 - k * 0.4), width: 32 * (1 - k * 0.4), height: 32 * (1 - k * 0.4), borderRadius: "50%", background: "rgba(22,22,22,0.45)", zIndex: 9 }} />
    </>
  );
};

// ---- Confetti --------------------------------------------------------------------------------
const rnd = (i: number): number => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const CONF = [C.red, C.tp, "#F5B301", C.green, "#FF7AB6"];

export const Confetti: React.FC<{ t: number; at: number; cx: number; cy: number }> = ({ t, at, cx, cy }) => {
  const u = (t - at) / 2.6;
  if (u < 0 || u > 1) return null;
  return (
    <>
      {Array.from({ length: 46 }).map((_, i) => {
        const vx = (rnd(i) - 0.5) * 900;
        const vy = -300 - rnd(i + 99) * 500;
        const time = u * 2.6;
        const x = cx + vx * time * 0.7;
        const y = cy + vy * time + 900 * time * time;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: 14 + rnd(i + 7) * 10, height: 8 + rnd(i + 3) * 8, background: CONF[i % CONF.length], transform: `rotate(${u * 720 * (rnd(i + 5) + 0.3)}deg)`, opacity: 1 - Math.max(0, (u - 0.7) / 0.3), zIndex: 8 }} />
        );
      })}
    </>
  );
};

// ---- Tune Protect engine machine -------------------------------------------------------------
export const ENG = { x: 1260, y: 220, w: 600, h: 740 };
const WINDOWS: { icon: IconName; label: string }[] = [
  { icon: "funnel", label: "Eligible" },
  { icon: "tag", label: "Price" },
  { icon: "box", label: "Pack" },
];

export const EngineMachine: React.FC<{ t: number; lit: number[]; printer?: number }> = ({ t, lit, printer = 0 }) => (
  <div style={{ ...ab(ENG.x, ENG.y, ENG.w, ENG.h) }}>
    {/* antenna */}
    <div style={{ ...ab(296, 22, 8, 60), background: C.tp }} />
    <div style={{ ...ab(284, 0, 32, 32), borderRadius: 16, background: C.red, opacity: 0.55 + 0.45 * Math.sin(t * 5) }} />
    {/* body */}
    <div style={{ ...ab(0, 70, 600, 670), borderRadius: 56, background: C.tp, boxShadow: SHADOW }} />
    <div style={{ ...ab(40, 92, 520, 70), display: "flex", alignItems: "center", justifyContent: "center", gap: 18, color: "#fff", fontFamily: POPPINS, fontSize: 40, fontWeight: 800 }}>
      <Icon name="shieldPlane" size={52} color="#fff" stroke={3.5} />
      Tune Protect
    </div>
    <div style={{ ...ab(40, 176, 520, 520), borderRadius: 36, background: "#EAF0FF" }} />
    {WINDOWS.map((w, i) => {
      const on = lit[i] ?? 0;
      const cy = 270 + i * 160;
      return (
        <React.Fragment key={w.label}>
          <div style={{ ...ab(80, cy - 66, 132, 132), borderRadius: 66, background: "#fff", border: `7px solid ${on > 0.1 ? C.green : "#CBD6F2"}`, boxShadow: on > 0.1 ? `0 0 ${30 * on}px ${C.green}88` : "none", overflow: "hidden" }}>
            <div style={{ ...ab(2, 2) }}>
              <Gear size={118} rot={on > 0.1 ? t * 70 : t * 8} color="#D7E0F7" />
            </div>
            <div style={{ ...ab(0, 0, 118, 118), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={w.icon} size={50} color={C.tp} stroke={4} />
            </div>
          </div>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ ...ab(246 + k * 40, cy - 40, 22, 22), borderRadius: 11, background: on > 0.1 && Math.sin(t * 9 - k * 1.4) > -0.3 ? C.green : "#C9D3EE" }} />
          ))}
          <div style={{ ...ab(246, cy + 6, 270, 20), borderRadius: 10, background: "#C9D3EE", overflow: "hidden" }}>
            <div style={{ width: `${on * (55 + 35 * Math.abs(Math.sin(t * 2 + i)))}%`, height: "100%", background: C.tp, borderRadius: 10 }} />
          </div>
          <div style={{ ...ab(246, cy + 34), fontFamily: POPPINS, fontSize: 24, fontWeight: 600, color: C.tp }}>{w.label}</div>
        </React.Fragment>
      );
    })}
    {/* ports */}
    <div style={{ ...ab(-10, 262, 34, 56), borderRadius: 12, background: C.ink }} />
    <div style={{ ...ab(-10, 362, 34, 56), borderRadius: 12, background: C.ink }} />
    {/* policy printer */}
    <div style={{ ...ab(330, 640, 210, 24), borderRadius: 12, background: C.ink, zIndex: 3 }} />
    {[0, 1, 2].map((i) => {
      const o = Math.min(1, Math.max(0, printer - i));
      if (o <= 0) return null;
      return (
        <div key={i} style={{ ...ab(342 + i * 66, 650 + o * 70, 56, 74), borderRadius: 8, background: "#fff", border: `3px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <Icon name="shield" size={34} color={C.green} stroke={4} />
        </div>
      );
    })}
  </div>
);
