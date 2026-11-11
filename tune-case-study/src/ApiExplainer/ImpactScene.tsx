import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "./theme";
import { easeInOut, p, useT, usePop } from "./anim";
import { Icon } from "./icons";

const FROM = 74;
const CARD_W = 540;
const CARD_H = 470;
const XS = [96, 690, 1284];
const Y = 262;

const Card: React.FC<{ i: number; t: number; title: string; desc: string; children: React.ReactNode }> = ({ i, t, title, desc, children }) => {
  const o = p(t, 74.6 + i * 0.4, 75.4 + i * 0.4);
  return (
    <div
      style={{
        position: "absolute",
        left: XS[i],
        top: Y + (1 - o) * 40,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 28,
        background: "#fff",
        border: `2px solid ${C.line}`,
        boxShadow: SHADOW,
        opacity: o,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: CARD_W, height: 290, background: "#F7F4F1" }}>{children}</div>
      <div style={{ position: "absolute", left: 30, top: 312, width: CARD_W - 60, fontSize: 36, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{title}</div>
      <div style={{ position: "absolute", left: 30, top: 366, width: CARD_W - 60, fontSize: 26, color: C.grey, lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
};

// 1. add a product once ---------------------------------------------------------------------
const AddProduct: React.FC<{ t: number }> = ({ t }) => {
  const rows = [
    { icon: "shieldPlane", name: "Travel Protect" },
    { icon: "bag", name: "Baggage Protect" },
    { icon: "clock", name: "Flight Delay" },
  ] as const;
  const n = p(t, 76.4, 77.2);
  const pop = usePop(t, 77.2);
  return (
    <>
      {rows.map((r, i) => (
        <div key={r.name} style={{ position: "absolute", left: 30, top: 24 + i * 62, width: CARD_W - 60, height: 52, borderRadius: 14, background: "#fff", border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 14, padding: "0 16px" }}>
          <Icon name={r.icon} size={28} color={C.tp} />
          <span style={{ fontSize: 24, fontWeight: 600, color: C.ink }}>{r.name}</span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 30 + (1 - n) * 60,
          top: 24 + 3 * 62,
          width: CARD_W - 60,
          height: 52,
          borderRadius: 14,
          background: C.redSoft,
          border: `2px solid ${C.red}`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 16px",
          opacity: n,
        }}
      >
        <Icon name="medical" size={28} color={C.red} />
        <span style={{ fontSize: 24, fontWeight: 600, color: C.ink, flex: 1 }}>Sports cover</span>
        <span style={{ fontSize: 20, fontWeight: 800, background: C.red, color: "#fff", padding: "2px 12px", borderRadius: 999, transform: `scale(${pop})` }}>NEW</span>
      </div>
    </>
  );
};

// 2. reprice without a release ---------------------------------------------------------------
const Reprice: React.FC<{ t: number }> = ({ t }) => {
  const tags = [
    { x: 40, label: "Variant A", price: "9.90", bar: 0.42, color: C.grey },
    { x: 290, label: "Variant B", price: "7.90", bar: 0.66, color: C.red },
  ];
  const win = usePop(t, 80.4);
  return (
    <>
      {tags.map((tg, i) => {
        const o = p(t, 76.2 + i * 0.5, 77 + i * 0.5);
        const bar = p(t, 78 + i * 0.3, 80, easeInOut) * tg.bar;
        return (
          <div key={tg.label} style={{ position: "absolute", left: tg.x, top: 28, width: 210, opacity: o, transform: `translateY(${(1 - o) * 20}px)` }}>
            <div style={{ height: 96, borderRadius: 18, background: "#fff", border: `3px solid ${tg.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: C.grey }}>{tg.label}</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: C.ink, lineHeight: 1.1 }}>
                <span style={{ fontSize: 20, fontWeight: 600 }}>MYR </span>
                {tg.price}
              </div>
            </div>
            <div style={{ marginTop: 22, fontSize: 20, color: C.grey }}>Take-up</div>
            <div style={{ marginTop: 6, height: 26, borderRadius: 13, background: "#E9E3DD", overflow: "hidden" }}>
              <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 13, background: tg.color }} />
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 290, top: 228, display: "flex", alignItems: "center", gap: 8, transform: `scale(${win})`, transformOrigin: "left center" }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="check" size={20} color="#fff" stroke={7} />
        </div>
        <span style={{ fontSize: 24, fontWeight: 600, color: C.green }}>Roll out B</span>
      </div>
      <div style={{ position: "absolute", left: 40, top: 238, fontSize: 20, color: C.grey, opacity: p(t, 80, 80.8) }}>Illustrative test</div>
    </>
  );
};

// 3. one engine, every channel ---------------------------------------------------------------
const HUB = { x: CARD_W / 2, y: 145 };
const CHIPS = [
  { label: "In-path", x: 16, y: 20 },
  { label: "Manage booking", x: CARD_W - 16 - 210, y: 20 },
  { label: "App", x: 16, y: 226 },
  { label: "OTA & offline", x: CARD_W - 16 - 210, y: 226 },
];

const Channels: React.FC<{ t: number }> = ({ t }) => {
  const hub = usePop(t, 76.4);
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={CARD_W} height={290}>
        {CHIPS.map((c, i) => {
          const cx = c.x + 105;
          const cy = c.y + 22;
          const o = p(t, 77 + i * 0.4, 77.6 + i * 0.4);
          const ph = (t * 0.7 + i * 0.25) % 1;
          return (
            <g key={c.label} opacity={o}>
              <line x1={HUB.x} y1={HUB.y} x2={cx} y2={cy} stroke={C.tp} strokeWidth={3} strokeDasharray="4 10" strokeLinecap="round" />
              <circle cx={HUB.x + (cx - HUB.x) * ph} cy={HUB.y + (cy - HUB.y) * ph} r={8} fill={C.red} />
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: HUB.x - 62, top: HUB.y - 62, width: 124, height: 124, borderRadius: 62, background: C.tp, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${hub})`, boxShadow: SHADOW }}>
        <Icon name="shieldPlane" size={70} color="#fff" stroke={3.5} />
      </div>
      {CHIPS.map((c, i) => {
        const o = p(t, 77 + i * 0.4, 77.6 + i * 0.4);
        return (
          <div key={c.label} style={{ position: "absolute", left: c.x, top: c.y, width: 210, height: 44, borderRadius: 22, background: "#fff", border: `2px solid ${C.tp}`, fontSize: 22, fontWeight: 600, color: C.tp, textAlign: "center", lineHeight: "40px", opacity: o }}>
            {c.label}
          </div>
        );
      })}
    </>
  );
};

export const ImpactScene: React.FC = () => {
  const t = useT(FROM);
  const o = Math.min(p(t, 74, 74.6, Easing.linear), 1 - p(t, 85.4, 86, Easing.linear));
  const strip = p(t, 81, 82);
  const kpis = [
    { label: "Take-up rate (TUR)", arrow: "↑" },
    { label: "Revenue per passenger (RPP)", arrow: "↑" },
    { label: "Time to market", arrow: "↓" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: POPPINS }}>
      <Card i={0} t={t} title="Add a product once" desc="Launch it in the catalogue. Every connected channel can offer it.">
        <AddProduct t={t} />
      </Card>
      <Card i={1} t={t} title="Reprice without a release" desc="Test price variants in the engine. No airline code change needed.">
        <Reprice t={t} />
      </Card>
      <Card i={2} t={t} title="One engine, any channel" desc="Same product and pricing rules wherever the passenger shops.">
        <Channels t={t} />
      </Card>
      {kpis.map((k, i) => (
        <div
          key={k.label}
          style={{ position: "absolute", left: XS[i], top: 774, width: CARD_W, height: 76, borderRadius: 38, background: C.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontSize: 28, fontWeight: 600, opacity: strip, transform: `translateY(${(1 - strip) * 20}px)` }}
        >
          {k.label}
          <span style={{ color: "#4ADE80", fontWeight: 800, fontSize: 40, lineHeight: 1 }}>{k.arrow}</span>
        </div>
      ))}
    </div>
  );
};
