import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "./theme";
import { money, p, useT, usePop } from "./anim";
import { Icon, type IconName } from "./icons";
import { PRODUCTS } from "./data";

const FROM = 31;
const CX = 96; // card origin on screen
const CY = 250;
const CW = 1728;
const CH = 650;

const INPUTS: { label: string; value: string; icon: IconName }[] = [
  { label: "ROUTE", value: "KUL → BKI", icon: "pin" },
  { label: "DATES", value: "5-day trip", icon: "calendar" },
  { label: "PASSENGERS", value: "2 adults", icon: "people" },
  { label: "FARE", value: "MYR 189", icon: "card" },
  { label: "CHANNEL", value: "In-path · web", icon: "device" },
  { label: "MARKET", value: "MY · MYR", icon: "globe" },
];

const STAGES: { n: number; title: string; desc: string; from: number; to: number }[] = [
  { n: 1, title: "Eligibility", desc: "Which products can this trip buy? Age, route, trip length.", from: 35.5, to: 39.5 },
  { n: 2, title: "Pricing", desc: "Base rate × trip risk × market and channel rules.", from: 39.5, to: 43.5 },
  { n: 3, title: "Packaging", desc: "Rank, bundle and set defaults for the booking page.", from: 43.5, to: 47.2 },
];

const IN_Y = (i: number) => 70 + 41 + i * 96; // chip centre y
const ST_Y = (i: number) => 70 + i * 198; // stage card top
const OUT_Y = (i: number) => 70 + i * 116; // output card top

const InputChip: React.FC<{ t: number; i: number }> = ({ t, i }) => {
  const pop = usePop(t, 32 + i * 0.5);
  const it = INPUTS[i];
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        top: IN_Y(i) - 41,
        width: 380,
        height: 82,
        borderRadius: 18,
        background: "#fff",
        border: `2px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 20px",
        opacity: Math.min(1, pop * 1.5),
        transform: `translateX(${(1 - pop) * -50}px) scale(${0.9 + 0.1 * pop})`,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: C.redSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={it.icon} size={30} color={C.red} />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 2, color: C.grey, lineHeight: 1.1 }}>{it.label}</div>
        <div style={{ fontSize: 30, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>{it.value}</div>
      </div>
    </div>
  );
};

const StageCard: React.FC<{ t: number; i: number }> = ({ t, i }) => {
  const st = STAGES[i];
  const appear = p(t, 32 + i * 0.3, 33 + i * 0.3);
  const active = t >= st.from && t < st.to;
  const done = t >= st.to;
  const fill = p(t, st.from, st.to, Easing.linear);
  return (
    <div
      style={{
        position: "absolute",
        left: 500,
        top: ST_Y(i),
        width: 520,
        height: 168,
        borderRadius: 24,
        background: active ? C.tpSoft : "#fff",
        border: `3px solid ${active ? C.tp : done ? `${C.tp}55` : C.line}`,
        boxShadow: active ? `0 0 36px ${C.tp}44` : "none",
        opacity: appear,
        transform: `translateY(${(1 - appear) * 20}px)`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 24, top: 22, width: 52, height: 52, borderRadius: 26, background: active || done ? C.tp : C.line, color: "#fff", fontSize: 28, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {done ? <Icon name="check" size={28} color="#fff" stroke={6} /> : st.n}
      </div>
      <div style={{ position: "absolute", left: 96, top: 18, fontSize: 38, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>{st.title}</div>
      <div style={{ position: "absolute", left: 96, top: 66, width: 400, fontSize: 24, color: C.grey, lineHeight: 1.35 }}>{st.desc}</div>
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: `${fill * 100}%`, background: C.tp }} />
    </div>
  );
};

const OutputCard: React.FC<{ t: number; i: number }> = ({ t, i }) => {
  const pr = PRODUCTS[i];
  const at = 44.2 + i * 0.5;
  const pop = usePop(t, at);
  const price = pr.price * p(t, at, at + 0.7);
  return (
    <div
      style={{
        position: "absolute",
        left: 1100,
        top: OUT_Y(i),
        width: 588,
        height: 100,
        borderRadius: 20,
        background: "#fff",
        border: `2px solid ${C.tp}`,
        boxShadow: SHADOW,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 20px",
        opacity: Math.min(1, pop * 1.5),
        transform: `translateX(${(1 - pop) * 50}px) scale(${0.92 + 0.08 * pop})`,
      }}
    >
      <div style={{ width: 62, height: 62, borderRadius: 16, background: C.tpSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={pr.icon} size={38} color={C.tp} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: C.ink, lineHeight: 1.15, whiteSpace: "nowrap" }}>{pr.name}</div>
        <div style={{ fontSize: 22, color: C.grey, whiteSpace: "nowrap" }}>{pr.sub}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: C.tp, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>MYR </span>
        {money(price)}
      </div>
    </div>
  );
};

export const EngineScene: React.FC = () => {
  const t = useT(FROM);
  const enter = p(t, 31, 32);
  const exit = 1 - p(t, 47.2, 48, Easing.linear);
  const o = Math.min(enter, exit);
  const dash = -t * 70;
  const ghost = p(t, 38.6, 39.4);
  const flowIn = p(t, 32.4, 33) * (t < 43.5 ? 1 : 0.3);
  const flowOut = p(t, 43.6, 44.2);

  return (
    <div
      style={{
        position: "absolute",
        left: CX,
        top: CY,
        width: CW,
        height: CH,
        borderRadius: 32,
        background: C.card,
        border: `2px solid ${C.line}`,
        boxShadow: SHADOW,
        opacity: o,
        transform: `scale(${0.94 + 0.06 * enter})`,
        fontFamily: POPPINS,
        overflow: "hidden",
      }}
    >
      {/* column labels */}
      {[
        { x: 40, text: "TRIP CONTEXT IN", color: C.red },
        { x: 500, text: "TUNE PROTECT ENGINE", color: C.tp },
        { x: 1100, text: "OFFERS OUT", color: C.tp },
      ].map((l) => (
        <div key={l.text} style={{ position: "absolute", left: l.x, top: 22, fontSize: 20, fontWeight: 600, letterSpacing: 3, color: l.color, opacity: enter }}>
          {l.text}
        </div>
      ))}

      {/* connectors */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={CW} height={CH}>
        {INPUTS.map((_, i) => (
          <path
            key={i}
            d={`M420,${IN_Y(i)} C460,${IN_Y(i)} 460,${ST_Y(0) + 84} 500,${ST_Y(0) + 84}`}
            fill="none"
            stroke={C.red}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="5 13"
            strokeDashoffset={dash}
            opacity={0.55 * flowIn * p(t, 32 + i * 0.5, 32.6 + i * 0.5)}
          />
        ))}
        {[0, 1].map((i) => (
          <path
            key={i}
            d={`M760,${ST_Y(i) + 170} L760,${ST_Y(i + 1) - 2}`}
            stroke={C.tp}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="5 11"
            strokeDashoffset={dash}
            opacity={p(t, STAGES[i].to - 0.3, STAGES[i].to + 0.3)}
          />
        ))}
        {PRODUCTS.map((_, i) => (
          <path
            key={i}
            d={`M1020,${ST_Y(2) + 84} C1060,${ST_Y(2) + 84} 1060,${OUT_Y(i) + 50} 1100,${OUT_Y(i) + 50}`}
            fill="none"
            stroke={C.tp}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="5 13"
            strokeDashoffset={dash}
            opacity={0.55 * flowOut * p(t, 44.2 + i * 0.5, 44.8 + i * 0.5)}
          />
        ))}
      </svg>

      {INPUTS.map((_, i) => (
        <InputChip key={i} t={t} i={i} />
      ))}
      {STAGES.map((_, i) => (
        <StageCard key={i} t={t} i={i} />
      ))}

      {/* output placeholders */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 1100,
            top: OUT_Y(i),
            width: 588,
            height: 100,
            borderRadius: 20,
            border: `3px dashed ${C.line}`,
            opacity: p(t, 32.5, 33.2),
          }}
        />
      ))}

      {PRODUCTS.map((_, i) => (
        <OutputCard key={i} t={t} i={i} />
      ))}

      {/* filtered-out product */}
      <div
        style={{
          position: "absolute",
          left: 1100,
          top: OUT_Y(4),
          width: 588,
          height: 100,
          borderRadius: 20,
          background: "#F4F1EE",
          border: `3px dashed ${C.grey}88`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 20px",
          opacity: ghost,
          transform: `translateX(${(1 - ghost) * 30}px)`,
        }}
      >
        <div style={{ width: 62, height: 62, borderRadius: 16, background: "#E6E1DC", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="medical" size={36} color={C.grey} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.grey, lineHeight: 1.15, textDecoration: "line-through" }}>Medical Plus</div>
          <div style={{ fontSize: 22, color: C.grey }}>Filtered out: not eligible</div>
        </div>
        <Icon name="cross" size={30} color={C.grey} stroke={5} />
      </div>
    </div>
  );
};
