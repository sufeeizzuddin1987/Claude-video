import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "../ApiExplainer/theme";
import { Icon, type IconName } from "../ApiExplainer/icons";
import { PRODUCTS } from "../ApiExplainer/data";
import { keys, money, p, pop, useT, vis } from "../ApiExplainer/anim";
import { ab, Gear, Parcel, PriceTag, Tile } from "./art";

const CX = 96;
const CY = 190;
const CW = 1728;
const CH = 800;

const BELT_Y = 560;
const V = 190; // belt speed px/s
const X0 = 100;
const TILE = 96;
const SPAWN0 = 29.6;
const GATE_C = 470;
const PRESS_C = 890;
const CRATE_X = 1290;

type Item = { icon: IconName; price: number | null; spawn: number; reject: boolean; slot: number };
const ITEMS: Item[] = [
  { icon: "shieldPlane", price: PRODUCTS[0].price, spawn: SPAWN0, reject: false, slot: 0 },
  { icon: "medical", price: null, spawn: SPAWN0 + 0.8, reject: true, slot: -1 },
  { icon: "bag", price: PRODUCTS[1].price, spawn: SPAWN0 + 1.6, reject: false, slot: 1 },
  { icon: "clock", price: PRODUCTS[2].price, spawn: SPAWN0 + 2.4, reject: false, slot: 2 },
  { icon: "ticketX", price: PRODUCTS[3].price, spawn: SPAWN0 + 3.2, reject: false, slot: 3 },
];
const arrive = (it: Item, x: number) => it.spawn + (x - X0) / V;
const bump = (t: number, at: number, dur: number): number => {
  const k = (t - at) / dur;
  return k < 0 || k > 1 ? 0 : Math.sin(k * Math.PI);
};

const Badge: React.FC<{ x: number; icon: IconName; label: string; on: number; t: number }> = ({ x, icon, label, on, t }) => {
  const a = p(t, 27, 27.8);
  return (
    <div style={{ ...ab(x - 90, 16, 180, 118), opacity: a, textAlign: "center" }}>
      <div style={{ margin: "0 auto", width: 76, height: 76, borderRadius: 38, background: on > 0.1 ? C.tp : "#fff", border: `5px solid ${C.tp}`, boxShadow: on > 0.1 ? `0 0 ${30 * on}px ${C.tp}88` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={40} color={on > 0.1 ? "#fff" : C.tp} stroke={4} />
      </div>
      <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 30, color: C.tp, marginTop: 6 }}>{label}</div>
    </div>
  );
};

export const EngineV: React.FC = () => {
  const t = useT(26);
  const enter = p(t, 26, 26.8);
  const o = Math.min(enter, 1 - p(t, 45.2, 46, Easing.linear));

  const actA = vis(t, arrive(ITEMS[0], 380), arrive(ITEMS[4], 560), 0.3);
  const actB = vis(t, arrive(ITEMS[0], 740), arrive(ITEMS[4], 1040), 0.3);
  const actC = vis(t, arrive(ITEMS[0], CRATE_X), 41.0, 0.3);

  const rollers = Array.from({ length: 24 }).map((_, i) => 40 + ((i * 70 + t * V) % 1648));

  // gate light
  const passFlash = Math.max(...ITEMS.filter((i) => !i.reject).map((i) => bump(t, arrive(i, GATE_C) - 0.25, 0.5)));
  const rejectFlash = Math.max(...ITEMS.filter((i) => i.reject).map((i) => bump(t, arrive(i, 440) - 0.1, 0.9)));
  const press = Math.max(...ITEMS.filter((i) => !i.reject).map((i) => bump(t, arrive(i, PRESS_C) - 0.3, 0.6)));
  const closeLid = p(t, 40.2, 41.0);
  const crateO = 1 - p(t, 41.0, 41.4, Easing.linear);
  const exit = keys(t, [[41.4, 1410, 470, 0.85], [42.2, 1410, 470, 0.85], [44.8, 1850, 470, 0.85]]);
  const exitO = p(t, 41.0, 41.5);
  const inParcel = keys(t, [[26.4, -80, 470, 0.8], [28.2, 100, 470, 0.8]]);
  const inParcelO = p(t, 26.4, 26.8) * (1 - p(t, 29.6, 30.4, Easing.linear));
  const parcelPulse = 1 + 0.12 * bump(t, 28.6, 0.7);

  const ctxIcons: IconName[] = ["pin", "calendar", "people", "device", "globe"];
  const dash = -t * 60;

  return (
    <div
      style={{
        ...ab(CX, CY, CW, CH),
        borderRadius: 36,
        background: C.card,
        border: `2px solid ${C.line}`,
        boxShadow: SHADOW,
        opacity: o,
        transform: `scale(${0.95 + 0.05 * enter})`,
        overflow: "hidden",
        fontFamily: POPPINS,
      }}
    >
      <Badge x={GATE_C} icon="funnel" label="Eligible" on={actA} t={t} />
      <Badge x={PRESS_C} icon="tag" label="Price" on={actB} t={t} />
      <Badge x={1410} icon="box" label="Pack" on={actC} t={t} />

      <div style={{ ...ab(0, 60, CW, CH - 60) }}>
      {/* belt */}
      <div style={{ ...ab(40, BELT_Y, 1648, 40), borderRadius: 20, background: "#2B3048" }} />
      <svg style={ab(0, BELT_Y)} width={CW} height={40}>
        {rollers.map((x, i) => (
          <circle key={i} cx={x} cy={20} r={9} fill="#4A5170" />
        ))}
      </svg>

      {/* Station A: eligibility gate */}
      <div style={{ ...ab(GATE_C - 90 - 14, 290, 28, 270), borderRadius: 10, background: C.tp }} />
      <div style={{ ...ab(GATE_C + 90 - 14, 290, 28, 270), borderRadius: 10, background: C.tp }} />
      <div style={{ ...ab(GATE_C - 110, 232, 220, 70), borderRadius: 24, background: C.tp, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <Icon name="funnel" size={44} color="#fff" stroke={4} />
        <div style={{ width: 28, height: 28, borderRadius: 14, background: rejectFlash > 0.1 ? C.red : passFlash > 0.1 ? C.green : "#7C93D6", boxShadow: rejectFlash > 0.1 ? `0 0 20px ${C.red}` : passFlash > 0.1 ? `0 0 20px ${C.green}` : "none" }} />
      </div>

      {/* Station B: pricing booth */}
      {ctxIcons.map((ic, i) => {
        const cx = PRESS_C - 120 + i * 60;
        return (
          <React.Fragment key={ic}>
            <svg style={ab(0, 0)} width={CW} height={300}>
              <line x1={cx} y1={206} x2={cx} y2={236} stroke={C.red} strokeWidth={4} strokeLinecap="round" strokeDasharray="4 8" strokeDashoffset={dash} opacity={0.3 + 0.7 * actB} />
            </svg>
            <div style={{ ...ab(cx - 26, 150, 52, 52), borderRadius: 26, background: C.redSoft, border: `3px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: p(t, 27.6 + i * 0.15, 28.2 + i * 0.15) }}>
              <Icon name={ic} size={28} color={C.red} stroke={4} />
            </div>
          </React.Fragment>
        );
      })}
      <div style={{ ...ab(PRESS_C - 150, 240, 300, 200), borderRadius: 30, background: C.tp }}>
        <div style={ab(20, 24)}><Gear size={120} rot={t * (30 + 60 * actB)} color="#7C93D6" teeth={10} hole={C.tp} /></div>
        <div style={ab(150, 56)}><Gear size={96} rot={-t * (30 + 60 * actB) * 1.25 + 15} color="#A9BAEA" teeth={8} hole={C.tp} /></div>
        <div style={ab(236, 22)}><Icon name="tag" size={46} color="#fff" stroke={4} /></div>
      </div>
      <div style={{ ...ab(PRESS_C - 150, 440, 36, 120), background: C.tp, borderRadius: 8 }} />
      <div style={{ ...ab(PRESS_C + 114, 440, 36, 120), background: C.tp, borderRadius: 8 }} />
      <div style={{ ...ab(PRESS_C - 5, 440, 10, 12 + 34 * press), background: "#A9BAEA" }} />
      <div style={{ ...ab(PRESS_C - 44, 440 + 12 + 34 * press, 88, 26), borderRadius: 10, background: C.red }} />

      {/* Station C: crate */}
      <div style={{ ...ab(CRATE_X, 410, 240, 150), borderRadius: 20, background: "#F3F6FF", border: `6px solid ${C.tp}`, opacity: crateO }}>
        {[1, 2].map((k) => (
          <div key={k} style={{ ...ab(0, k * 48, 228, 4), background: `${C.tp}33` }} />
        ))}
      </div>
      {ITEMS.filter((i) => !i.reject).map((it) => {
        const arrived = p(t, arrive(it, CRATE_X) + 0.6, arrive(it, CRATE_X) + 0.9);
        return (
          <div key={it.slot} style={{ ...ab(CRATE_X + 14 + it.slot * 54, 484, 50, 50), opacity: arrived * crateO, transform: `scale(${0.6 + 0.4 * arrived})` }}>
            <Tile icon={it.icon} size={50} style={{ boxShadow: "none", borderWidth: 2 }} />
          </div>
        );
      })}
      <div style={{ ...ab(CRATE_X - 6, 200 + 180 * closeLid, 252, 90), borderRadius: 16, background: C.tp, opacity: closeLid * crateO }}>
        <div style={{ ...ab(113, 0, 26, 90), background: "rgba(255,255,255,0.4)" }} />
      </div>
      <Parcel color={C.tp} icons={["shieldPlane", "bag", "clock", "ticketX"]} x={exit[0]} y={exit[1]} scale={exit[2]} opacity={exitO} />

      {/* incoming request parcel */}
      <Parcel color={C.red} icons={["pin", "calendar", "people", "card"]} x={inParcel[0]} y={inParcel[1]} scale={0.8 * parcelPulse} opacity={inParcelO} />

      {/* tiles on the belt */}
      {ITEMS.map((it, idx) => {
        if (t < it.spawn) return null;
        const born = pop(t, it.spawn);
        let x = X0 + V * (t - it.spawn);
        let y = BELT_Y - TILE;
        let rot = 0;
        let op = Math.min(1, born * 1.5);
        let sc = born;
        let x0 = x;
        if (it.reject) {
          const tr = arrive(it, 440);
          const u = Math.min(1, Math.max(0, (t - tr) / 1.1));
          x0 = Math.min(x, 440) + 70 * u;
          y = y - 210 * u + 760 * u * u;
          rot = 40 * u;
          op = op * (1 - p(u, 0.75, 1, Easing.linear));
          x = x0;
        } else {
          const td = arrive(it, CRATE_X);
          const u = Math.min(1, Math.max(0, (t - td) / 0.7));
          if (u > 0) {
            x = CRATE_X + (1410 - CRATE_X) * u + 0;
            y = BELT_Y - TILE + 60 * u - 80 * Math.sin(u * Math.PI);
            sc = born * (1 - 0.45 * u);
            op = op * (1 - p(u, 0.85, 1, Easing.linear));
          }
        }
        const tagAt = arrive(it, PRESS_C) + 0.1;
        const tag = it.price !== null ? pop(t, tagAt) : 0;
        return (
          <div key={idx} style={{ ...ab(x - TILE / 2, y, TILE, TILE), opacity: op, transform: `rotate(${rot}deg) scale(${sc})`, zIndex: 5 }}>
            <Tile icon={it.icon} size={TILE} border={it.reject && rejectFlash > 0.1 ? C.red : C.tp} />
            {it.price !== null && tag > 0 && <PriceTag text={money(it.price)} scale={0.78} style={{ position: "absolute", right: -26, top: -22, transform: `scale(${tag})` }} />}
            {it.reject && t >= arrive(it, 440) + 0.1 && (
              <div style={{ ...ab(TILE - 34, -16, 44, 44), borderRadius: 22, background: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="cross" size={26} color="#fff" stroke={8} />
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};
