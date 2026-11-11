import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "../ApiExplainer/theme";
import { Icon, type IconName } from "../ApiExplainer/icons";
import { PRODUCTS } from "../ApiExplainer/data";
import { easeInOut, p, pop, useT } from "../ApiExplainer/anim";
import { ab, PriceTag, Tile } from "./art";

const XS = [96, 690, 1284];
const CARD_W = 540;

const Card: React.FC<{ i: number; t: number; label: string; children: React.ReactNode }> = ({ i, t, label, children }) => {
  const o = p(t, 71.6 + i * 0.4, 72.4 + i * 0.4);
  return (
    <div style={{ ...ab(XS[i], 200 + (1 - o) * 40, CARD_W, 470), borderRadius: 32, background: "#fff", border: `2px solid ${C.line}`, boxShadow: SHADOW, opacity: o, overflow: "hidden" }}>
      <div style={{ ...ab(0, 0, CARD_W, 380), background: "#F7F4F1" }}>{children}</div>
      <div style={{ ...ab(0, 396, CARD_W), textAlign: "center", fontFamily: POPPINS, fontSize: 40, fontWeight: 800, color: C.ink }}>{label}</div>
    </div>
  );
};

// 1. add a product once -------------------------------------------------------------------------
const AddOnce: React.FC<{ t: number }> = ({ t }) => {
  const drop = keys2(t);
  const land = pop(t, 74.0);
  return (
    <>
      {PRODUCTS.map((pr, i) => (
        <div key={pr.id} style={ab(30 + i * 100, 130)}>
          <Tile icon={pr.icon} size={84} />
        </div>
      ))}
      <div style={{ ...ab(30 + 4 * 100 - 6, 124, 96, 96), borderRadius: 26, border: `4px dashed ${C.red}88` }} />
      <div style={{ ...ab(30 + 4 * 100, 130 + drop), opacity: p(t, 72.6, 73.0) }}>
        <Tile icon="medical" size={84} border={C.red} color={C.red} bg={C.redSoft} />
        <PriceTag text="NEW" scale={0.75} style={{ position: "absolute", right: -16, top: -18, transform: `scale(${land})` }} />
      </div>
      <div style={{ ...ab(190, 250, 160, 100), display: "flex", justifyContent: "center", opacity: p(t, 73.4, 74.2) }}>
        <Icon name="plug" size={96} color={C.tp} stroke={3.5} />
      </div>
    </>
  );
};
const keys2 = (t: number): number => {
  const u = p(t, 72.8, 74.0, easeInOut);
  return -260 * (1 - u);
};

// 2. test prices -------------------------------------------------------------------------------------
const TestPrices: React.FC<{ t: number }> = ({ t }) => {
  const draw = p(t, 74.4, 77.6, Easing.linear);
  const a = p(t, 72.4, 73.2);
  const win = pop(t, 77.6);
  return (
    <>
      <div style={{ ...ab(40, 26, 200, 96), borderRadius: 20, background: "#fff", border: `4px solid ${C.grey}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: POPPINS, fontWeight: 800, fontSize: 44, color: C.ink, opacity: a }}>9.90</div>
      <div style={{ ...ab(300, 26, 200, 96), borderRadius: 20, background: "#fff", border: `4px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: POPPINS, fontWeight: 800, fontSize: 44, color: C.ink, opacity: a }}>7.90</div>
      <div style={{ ...ab(246, 56, 48, 36), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="arrowR" size={36} color={C.grey} stroke={5} />
      </div>
      <svg style={ab(30, 150)} width={480} height={200}>
        <line x1={10} y1={180} x2={470} y2={180} stroke={C.line} strokeWidth={4} strokeLinecap="round" />
        <line x1={10} y1={10} x2={10} y2={180} stroke={C.line} strokeWidth={4} strokeLinecap="round" />
        <path d="M14 140 L120 128 L240 134 L350 120 L466 124" fill="none" stroke={C.grey} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        <path d="M14 150 L120 120 L240 90 L350 52 L466 22" fill="none" stroke={C.red} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      </svg>
      <div style={{ ...ab(390, 140, 96, 96), borderRadius: 48, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${win})` }}>
        <Icon name="check" size={56} color="#fff" stroke={7} />
      </div>
    </>
  );
};

// 3. any channel ----------------------------------------------------------------------------------------
const CH: { icon: IconName; x: number; y: number }[] = [
  { icon: "desktop", x: 70, y: 50 },
  { icon: "device", x: 400, y: 50 },
  { icon: "people", x: 70, y: 250 },
  { icon: "globe", x: 400, y: 250 },
];
const AnyChannel: React.FC<{ t: number }> = ({ t }) => {
  const hub = pop(t, 72.6);
  return (
    <>
      <svg style={ab(0, 0)} width={CARD_W} height={380}>
        {CH.map((c, i) => {
          const ph = (t * 0.7 + i * 0.25) % 1;
          const o = p(t, 73.2 + i * 0.35, 73.8 + i * 0.35);
          return (
            <g key={c.icon} opacity={o}>
              <line x1={270} y1={190} x2={c.x + 35} y2={c.y + 35} stroke={C.tp} strokeWidth={4} strokeDasharray="5 11" strokeLinecap="round" />
              <circle cx={270 + (c.x + 35 - 270) * ph} cy={190 + (c.y + 35 - 190) * ph} r={9} fill={C.red} />
            </g>
          );
        })}
      </svg>
      <div style={{ ...ab(270 - 66, 190 - 66, 132, 132), borderRadius: 66, background: C.tp, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${hub})`, boxShadow: SHADOW }}>
        <Icon name="shieldPlane" size={76} color="#fff" stroke={3.5} />
      </div>
      {CH.map((c, i) => {
        const pp = pop(t, 73.2 + i * 0.35);
        return (
          <div key={c.icon} style={{ ...ab(c.x, c.y, 70, 70), borderRadius: 22, background: "#fff", border: `4px solid ${C.tp}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pp})` }}>
            <Icon name={c.icon} size={40} color={C.tp} stroke={4} />
          </div>
        );
      })}
    </>
  );
};

const KPIS: { icon: IconName; arrow: IconName; label: string }[] = [
  { icon: "pie", arrow: "arrowUp", label: "Take-up (TUR)" },
  { icon: "coin", arrow: "arrowUp", label: "Revenue / pax (RPP)" },
  { icon: "stopwatch", arrow: "arrowDown", label: "Time to market" },
];

export const WhyV: React.FC = () => {
  const t = useT(71);
  const o = Math.min(p(t, 71, 71.6, Easing.linear), 1 - p(t, 80.4, 81, Easing.linear));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: POPPINS }}>
      <Card i={0} t={t} label="Add once"><AddOnce t={t} /></Card>
      <Card i={1} t={t} label="Test prices"><TestPrices t={t} /></Card>
      <Card i={2} t={t} label="Any channel"><AnyChannel t={t} /></Card>
      {KPIS.map((k, i) => {
        const pp = pop(t, 77.2 + i * 0.4);
        return (
          <div key={k.label} style={{ ...ab(XS[i], 706, CARD_W, 250), textAlign: "center", transform: `scale(${pp})`, opacity: Math.min(1, pp * 1.5) }}>
            <div style={{ position: "relative", margin: "0 auto", width: 150, height: 150, borderRadius: 75, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={k.icon} size={80} color="#fff" stroke={3.5} />
              <div style={{ ...ab(98, -8, 60, 60), borderRadius: 30, background: C.green, border: "5px solid #FAF7F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={k.arrow} size={32} color="#fff" stroke={7} />
              </div>
            </div>
            <div style={{ marginTop: 14, fontSize: 32, fontWeight: 600, color: C.ink }}>{k.label}</div>
          </div>
        );
      })}
    </div>
  );
};
