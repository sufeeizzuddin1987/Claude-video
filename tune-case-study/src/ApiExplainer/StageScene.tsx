import React from "react";
import { Easing, interpolate } from "remotion";
import { C, MONO, POPPINS, SHADOW } from "./theme";
import { easeInOut, money, p, useT, vis } from "./anim";
import { Icon, type IconName } from "./icons";
import { BASE_FARE, PRODUCTS } from "./data";

const FROM = 6; // Sequence start (seconds)

const abs = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width: w,
  height: h,
});

// ---- Cursor ---------------------------------------------------------------------------------
type Key = { t: number; x: number; y: number };
const Cursor: React.FC<{ t: number; keys: Key[]; clicks: number[]; show: [number, number] }> = ({ t, keys, clicks, show }) => {
  const o = vis(t, show[0], show[1], 0.3);
  if (o <= 0) return null;
  const times = keys.map((k) => k.t);
  const opts = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut } as const;
  const x = interpolate(t, times, keys.map((k) => k.x), opts);
  const y = interpolate(t, times, keys.map((k) => k.y), opts);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none", opacity: o }}>
      {clicks.map((c) => {
        const r = p(t, c, c + 0.5);
        if (r <= 0 || r >= 1) return null;
        return (
          <div
            key={c}
            style={{ position: "absolute", left: x - 34 * r, top: y - 34 * r, width: 68 * r, height: 68 * r, borderRadius: "50%", border: `4px solid ${C.red}`, opacity: 1 - r }}
          />
        );
      })}
      <svg width="34" height="40" viewBox="0 0 24 34" style={{ position: "absolute", left: x - 2, top: y - 2, filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.3))" }}>
        <path d="M2 2 L2 28 L9 22 L14 33 L19 31 L14 20 L23 20 Z" fill={C.ink} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ---- Left: AirAsia booking window -----------------------------------------------------------
const WX = 96;
const WY = 262;
const WW = 600;
const WH = 630;

const AirAsiaWindow: React.FC<{ t: number }> = ({ t }) => {
  const appear = p(t, 6.2, 7.2);
  const picked = p(t, 16.0, 16.4);
  const waiting = vis(t, 21.8, 51.5, 0.4);
  const skeleton = 1 - p(t, 21.5, 22, Easing.linear);
  const sectionOn = p(t, 22, 22.6);
  const total =
    BASE_FARE +
    PRODUCTS.reduce((sum, pr) => sum + (pr.selectAt === null ? 0 : pr.price * p(t, pr.selectAt, pr.selectAt + 0.5)), 0);
  const processing = vis(t, 62.1, 64.2, 0.2);
  const confirmed = p(t, 68.6, 69.2);
  const dots = [0, 1, 2].map((i) => 0.35 + 0.65 * Math.abs(Math.sin(t * 5 - i * 0.9)));

  return (
    <div style={{ ...abs(WX - (1 - appear) * 60, WY, WW, WH), opacity: appear }}>
      <div style={{ ...abs(0, 0, WW, WH), background: C.card, borderRadius: 28, border: `2px solid ${C.line}`, boxShadow: SHADOW, overflow: "hidden" }}>
        {/* chrome */}
        <div style={{ ...abs(0, 0, WW, 54), background: C.red, color: "#fff", fontSize: 24, fontWeight: 600, padding: "11px 28px" }}>
          AirAsia booking platform
        </div>

        {/* flight card */}
        <div style={{ ...abs(28, 72, 544, 124), borderRadius: 20, background: C.redSoft, border: `2px solid ${picked > 0.5 ? C.red : "transparent"}` }}>
          <div style={{ ...abs(22, 22) }}>
            <Icon name="plane" size={44} color={C.red} />
          </div>
          <div style={{ ...abs(84, 16), fontSize: 38, fontWeight: 800, color: C.ink }}>KUL → BKI</div>
          <div style={{ ...abs(84, 68), fontSize: 22, color: C.grey, whiteSpace: "nowrap" }}>2 passengers · MYR {BASE_FARE}</div>
          <div
            style={{
              ...abs(404, 40, 120, 46),
              borderRadius: 23,
              background: picked > 0.5 ? C.green : C.red,
              color: "#fff",
              fontSize: 24,
              fontWeight: 600,
              textAlign: "center",
              lineHeight: "46px",
            }}
          >
            {picked > 0.5 ? "Selected" : "Select"}
          </div>
        </div>

        {/* skeleton (before request) */}
        <div style={{ opacity: skeleton * p(t, 7.4, 8.2) }}>
          <div style={{ ...abs(28, 226), fontSize: 26, fontWeight: 600, color: C.grey }}>Passenger details</div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...abs(28, 276 + i * 62, 544 - i * 90, 38), borderRadius: 12, background: "#F0EBE6" }} />
          ))}
        </div>

        {/* add-ons section */}
        <div style={{ opacity: sectionOn }}>
          <div style={{ ...abs(28, 214), fontSize: 28, fontWeight: 600, color: C.ink }}>Protect your trip</div>
          <div style={{ ...abs(300, 218), fontSize: 20, fontWeight: 600, color: C.tp, background: C.tpSoft, padding: "3px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>Powered by Tune Protect</div>
        </div>

        {/* waiting */}
        <div style={{ ...abs(28, 262, 544, 260), borderRadius: 20, border: `3px dashed ${C.line}`, opacity: waiting, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {dots.map((d, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: C.tp, opacity: d }} />
            ))}
          </div>
          <div style={{ fontSize: 26, color: C.grey }}>Waiting for offers…</div>
        </div>

        {/* product rows */}
        {PRODUCTS.map((pr, i) => {
          const at = 50.6 + i * 0.4;
          const o = p(t, at, at + 0.6);
          const sel = pr.selectAt === null ? 0 : p(t, pr.selectAt, pr.selectAt + 0.35);
          const issued = pr.policy !== null && t >= 68.4 ? p(t, 68.4 + i * 0.35, 68.9 + i * 0.35) : 0;
          return (
            <div
              key={pr.id}
              style={{
                ...abs(28 + (1 - o) * 40, 252 + i * 74, 544, 66),
                opacity: o,
                borderRadius: 16,
                background: sel > 0.5 ? C.redSoft : "#fff",
                border: `2px solid ${sel > 0.5 ? C.red : C.line}`,
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 12,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.tpSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={pr.icon} size={30} color={C.tp} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 26, fontWeight: 600, color: C.ink, lineHeight: 1.15 }}>{pr.name}</div>
                <div style={{ fontSize: 20, color: issued > 0.5 ? C.green : C.grey, fontFamily: issued > 0.5 ? MONO : POPPINS, lineHeight: 1.2 }}>
                  {issued > 0.5 ? `${pr.policy} · Issued` : pr.sub}
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: C.ink }}>{money(pr.price)}</div>
              <div style={{ width: 56, height: 32, borderRadius: 16, background: sel > 0.5 ? C.red : "#D9D3CD", position: "relative" }}>
                <div style={{ position: "absolute", top: 4, left: 4 + 24 * sel, width: 24, height: 24, borderRadius: 12, background: "#fff" }} />
              </div>
            </div>
          );
        })}

        {/* footer */}
        <div style={{ ...abs(0, 550, WW, 80), borderTop: `2px solid ${C.line}`, background: "#fff" }}>
          <div style={{ ...abs(28, 3), fontSize: 20, color: C.grey }}>Total (MYR)</div>
          <div style={{ ...abs(28, 22), fontSize: 34, fontWeight: 800, color: C.ink, fontVariantNumeric: "tabular-nums" }}>{money(total)}</div>
          <div
            style={{
              ...abs(330, 13, 242, 54),
              borderRadius: 27,
              background: confirmed > 0.5 ? C.green : processing > 0 ? C.ink : C.red,
              color: "#fff",
              fontSize: 23,
              fontWeight: 600,
              textAlign: "center",
              lineHeight: "54px",
              whiteSpace: "nowrap",
            }}
          >
            {confirmed > 0.5 ? "Booking confirmed" : processing > 0 || t >= 62.1 ? "Confirming…" : "Continue"}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Right: Tune Protect engine -------------------------------------------------------------
const RX = 1224;
const MODULES: { name: string; sub: string; icon: IconName; windows: [number, number][] }[] = [
  { name: "Product catalogue", sub: "Travel, baggage, delay, flex", icon: "catalog", windows: [[27.0, 28.2], [48.0, 49.4]] },
  { name: "Eligibility rules", sub: "Age, route, trip length", icon: "funnel", windows: [[28.2, 29.6], [48.0, 49.4]] },
  { name: "Pricing engine", sub: "Rates by trip, market, channel", icon: "tag", windows: [[29.6, 31.2], [48.0, 49.4]] },
  { name: "Policy issuance", sub: "Policy numbers and documents", icon: "policy", windows: [[66.4, 68.8]] },
];

const TuneProtectEngine: React.FC<{ t: number }> = ({ t }) => {
  const appear = p(t, 6.2, 7.2);
  return (
    <div style={{ ...abs(RX + (1 - appear) * 60, WY, WW, WH), opacity: appear }}>
      <div style={{ ...abs(0, 0, WW, WH), background: C.card, borderRadius: 28, border: `2px solid ${C.tp}33`, boxShadow: SHADOW, overflow: "hidden" }}>
        <div style={{ ...abs(0, 0, WW, 54), background: C.tp, color: "#fff", fontSize: 24, fontWeight: 600, padding: "11px 28px", whiteSpace: "nowrap" }}>
          Tune Protect pricing & product engine
        </div>
        {MODULES.map((m, i) => {
          const active = m.windows.reduce((a, w) => Math.max(a, vis(t, w[0], w[1], 0.2)), 0);
          return (
            <div
              key={m.name}
              style={{
                ...abs(28, 76 + i * 132, 544, 120),
                borderRadius: 20,
                background: active > 0.05 ? C.tpSoft : "#fff",
                border: `3px solid ${active > 0.05 ? C.tp : C.line}`,
                boxShadow: active > 0.05 ? `0 0 ${28 * active}px ${C.tp}55` : "none",
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "0 22px",
              }}
            >
              <div style={{ width: 70, height: 70, borderRadius: 18, background: active > 0.05 ? C.tp : C.tpSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon} size={40} color={active > 0.05 ? "#fff" : C.tp} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 30, fontWeight: 600, color: C.ink, lineHeight: 1.15 }}>{m.name}</div>
                <div style={{ fontSize: 22, color: C.grey, lineHeight: 1.3 }}>{m.sub}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: active > 0.05 ? C.green : C.line }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---- Middle: the API bridge -----------------------------------------------------------------
const PX = 716; // pipe left
const PW = 488;
const LANE_RIGHT = 410;
const LANE_LEFT = 454;

const Packet: React.FC<{ t: number; label: string; from: number; to: number; dir: "r" | "l"; w: number }> = ({ t, label, from, to, dir, w }) => {
  const k = p(t, from, to, easeInOut);
  const o = vis(t, from, to, 0.35);
  if (o <= 0) return null;
  const range = PW - 16 - w;
  const x = PX + 8 + (dir === "r" ? k : 1 - k) * range;
  const y = dir === "r" ? LANE_RIGHT : LANE_LEFT;
  return (
    <div
      style={{
        ...abs(x, y - 20, w, 40),
        borderRadius: 20,
        background: dir === "r" ? C.red : C.tp,
        color: "#fff",
        fontSize: 22,
        fontWeight: 600,
        textAlign: "center",
        lineHeight: "40px",
        opacity: o,
        boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
        zIndex: 3,
      }}
    >
      {label}
    </div>
  );
};

const TOKEN = /("[^"]*"|[A-Za-z]+(?=:)|\d+(?:\.\d+)?|POST|200 OK)/g;
const Colorize: React.FC<{ line: string }> = ({ line }) => (
  <>
    {line.split(TOKEN).map((part, i) => {
      if (!part) return null;
      let color: string = C.ink;
      if (part.charAt(0) === '"') color = C.red;
      else if (/^\d/.test(part)) color = C.green;
      else if (part === "POST" || part === "200 OK") color = C.tp;
      else if (/^[A-Za-z]+$/.test(part) && line.includes(`${part}:`)) color = C.tp;
      return (
        <span key={i} style={{ color }}>
          {part}
        </span>
      );
    })}
  </>
);

const PAYLOADS: { from: number; to: number; tag: string; dir: "r" | "l"; lines: string[] }[] = [
  {
    from: 19.6, to: 31.2, tag: "POST /quote", dir: "r",
    lines: ["{", '  route:   "KUL-BKI",', '  trip:    "return",', "  pax:     2,", "  fare:    189.00,", '  channel: "web",', '  market:  "MY"', "}"],
  },
  {
    from: 48.2, to: 62.3, tag: "200 OK", dir: "l",
    lines: ["{", '  quoteId: "Q-8841",', "  offers: [", "    TRAVEL   24.90,", "    BAGGAGE   9.90,", "    DELAY     7.90,", "    FLEX     15.90", "  ]", "}"],
  },
  {
    from: 62.5, to: 68.2, tag: "POST /bind", dir: "r",
    lines: ["{", '  quoteId: "Q-8841",', "  select: [", "    TRAVEL,", "    BAGGAGE,", "    DELAY", "  ],", '  payment: "confirmed"', "}"],
  },
  {
    from: 68.2, to: 74, tag: "200 OK", dir: "l",
    lines: ["{", '  status: "ISSUED",', "  policies: [", '    "TP-100245",', '    "TP-100246",', '    "TP-100247"', "  ]", "}"],
  },
];

const LEGEND: { dir: "r" | "l"; title: string; sub: string }[] = [
  { dir: "r", title: "Quote request", sub: "Trip context goes out" },
  { dir: "l", title: "Offers", sub: "Priced products come back" },
  { dir: "r", title: "Bind request", sub: "Selected products go out" },
  { dir: "l", title: "Policies", sub: "Issued confirmation returns" },
];

const Bridge: React.FC<{ t: number }> = ({ t }) => {
  const pipe = p(t, 7.4, 8.4);
  const label = p(t, 7.8, 8.6);
  const flight = Math.max(vis(t, 22, 27, 0.2), vis(t, 48, 52, 0.2), vis(t, 63, 66.5, 0.2), vis(t, 66.5, 70, 0.2));
  const offset = -t * 60;
  return (
    <>
      <div style={{ ...abs(PX, 282, PW), textAlign: "center", opacity: label }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: C.ink, lineHeight: 1.1 }}>One API connection</div>
        <div style={{ fontSize: 22, color: C.grey, marginTop: 4 }}>REST · JSON · secured</div>
      </div>

      {/* pipe */}
      <div style={{ ...abs(PX, 372, PW, 120), borderRadius: 60, background: "#fff", border: `2px solid ${C.line}`, boxShadow: SHADOW, transform: `scaleX(${pipe})`, opacity: pipe }} />
      <svg style={{ ...abs(PX, 372), opacity: pipe }} width={PW} height={120}>
        <line x1={24} y1={LANE_RIGHT - 372} x2={PW - 36} y2={LANE_RIGHT - 372} stroke={C.red} strokeWidth={4} strokeLinecap="round" strokeDasharray="4 14" strokeDashoffset={offset} opacity={0.35 + 0.65 * flight} />
        <polygon points={`${PW - 30},${LANE_RIGHT - 372 - 9} ${PW - 14},${LANE_RIGHT - 372} ${PW - 30},${LANE_RIGHT - 372 + 9}`} fill={C.red} />
        <line x1={36} y1={LANE_LEFT - 372} x2={PW - 24} y2={LANE_LEFT - 372} stroke={C.tp} strokeWidth={4} strokeLinecap="round" strokeDasharray="4 14" strokeDashoffset={-offset} opacity={0.35 + 0.65 * flight} />
        <polygon points={`30,${LANE_LEFT - 372 - 9} 14,${LANE_LEFT - 372} 30,${LANE_LEFT - 372 + 9}`} fill={C.tp} />
      </svg>

      <Packet t={t} label="Quote request" from={22} to={27} dir="r" w={190} />
      <Packet t={t} label="Offers" from={48} to={52} dir="l" w={110} />
      <Packet t={t} label="Bind request" from={63} to={66.5} dir="r" w={176} />
      <Packet t={t} label="Policies" from={66.5} to={70} dir="l" w={124} />

      {/* gate */}
      <div style={{ ...abs(PX + PW / 2 - 26, 357, 52, 150), borderRadius: 26, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", opacity: pipe, zIndex: 4 }}>
        <Icon name="lock" size={30} color="#fff" stroke={4} />
      </div>

      {/* legend (intro) */}
      <div style={{ ...abs(PX, 530, PW, 360), borderRadius: 24, background: "#fff", border: `2px solid ${C.line}`, boxShadow: SHADOW, opacity: vis(t, 8.4, 19.3, 0.5) }}>
        <div style={{ ...abs(26, 16), fontSize: 24, fontWeight: 600, color: C.grey, letterSpacing: 1 }}>FOUR MESSAGES, ONE CONNECTION</div>
        {LEGEND.map((l, i) => {
          const o = p(t, 9.2 + i * 0.9, 9.9 + i * 0.9);
          return (
            <div key={l.title} style={{ ...abs(26, 68 + i * 68, PW - 52, 60), opacity: o, transform: `translateX(${(1 - o) * 20}px)`, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 44, borderRadius: 22, background: l.dir === "r" ? C.red : C.tp, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={l.dir === "r" ? "arrowR" : "arrowL"} size={28} color="#fff" stroke={5} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 600, color: C.ink, lineHeight: 1.1 }}>{l.title}</div>
                <div style={{ fontSize: 22, color: C.grey, lineHeight: 1.25 }}>{l.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* payload cards */}
      {PAYLOADS.map((pl) => {
        const o = vis(t, pl.from, pl.to, 0.4);
        if (o <= 0) return null;
        return (
          <div key={pl.from} style={{ ...abs(PX, 530, PW, 360), borderRadius: 24, background: "#fff", border: `2px solid ${C.line}`, boxShadow: SHADOW, opacity: o, overflow: "hidden" }}>
            <div style={{ ...abs(0, 0, PW, 52), background: pl.dir === "r" ? C.redSoft : C.tpSoft }}>
              <span
                style={{
                  ...abs(24, 11),
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 500,
                  color: pl.dir === "r" ? C.red : C.tp,
                  whiteSpace: "nowrap",
                }}
              >
                {pl.tag}
              </span>
              <span style={{ ...abs(PW - 24 - 200, 16, 200), textAlign: "right", fontSize: 20, fontWeight: 600, color: C.grey, whiteSpace: "nowrap" }}>
                {pl.dir === "r" ? "to Tune Protect" : "to AirAsia"}
              </span>
            </div>
            <div style={{ ...abs(24, 62), fontFamily: MONO, fontSize: 22, lineHeight: "29px", whiteSpace: "pre" }}>
              {pl.lines.map((line, i) => {
                const lo = p(t, pl.from + 0.3 + i * 0.16, pl.from + 0.6 + i * 0.16);
                return (
                  <div key={i} style={{ opacity: lo }}>
                    <Colorize line={line} />
                  </div>
                );
              })}
            </div>
            <div style={{ ...abs(24, 332), fontSize: 18, color: C.grey }}>Illustrative payload</div>
          </div>
        );
      })}
    </>
  );
};

export const StageScene: React.FC = () => {
  const t = useT(FROM);
  const o = Math.min(p(t, 6, 6.5, Easing.linear), 1 - p(t, 73.4, 74, Easing.linear));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: POPPINS, isolation: "isolate" }}>
      <AirAsiaWindow t={t} />
      <TuneProtectEngine t={t} />
      <Bridge t={t} />
      <Cursor
        t={t}
        show={[14.2, 17.2]}
        keys={[{ t: 14.2, x: 540, y: 640 }, { t: 15.8, x: 606, y: 396 }, { t: 17.2, x: 640, y: 450 }]}
        clicks={[16.0]}
      />
      <Cursor
        t={t}
        show={[57.6, 64.2]}
        keys={[
          { t: 57.6, x: 520, y: 700 },
          { t: 58.3, x: 640, y: 550 },
          { t: 59.3, x: 640, y: 624 },
          { t: 60.3, x: 640, y: 698 },
          { t: 61.9, x: 566, y: 850 },
          { t: 64.2, x: 600, y: 880 },
        ]}
        clicks={[58.4, 59.4, 60.4, 62.0]}
      />
    </div>
  );
};

