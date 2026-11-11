import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { C, POPPINS } from "./theme";
import { p, useT, vis } from "./anim";

export const Backdrop: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.bg,
      backgroundImage: `radial-gradient(${C.dot} 2.5px, transparent 3px)`,
      backgroundSize: "48px 48px",
    }}
  />
);

// ---- Headline per phase (absolute seconds) -------------------------------------------------
const HEADERS = [
  { from: 6, to: 14, title: "One connection. Two systems.", sub: "AirAsia runs flights and booking. Tune Protect runs insurance pricing and products." },
  { from: 14, to: 19, title: "Passenger picks a flight", sub: "The booking platform already holds the full trip context." },
  { from: 19, to: 31, title: "AirAsia sends one quote request", sub: "Route, dates, passengers, fare, channel, market. Nothing is re-keyed." },
  { from: 31, to: 48, title: "Tune Protect's engine prices the trip", sub: "Eligibility, then pricing, then packaging. Real time, per request." },
  { from: 48, to: 62, title: "One response, many products", sub: "Every eligible product comes back priced for this exact trip." },
  { from: 62, to: 74, title: "Confirm once, policies issued", sub: "One bind call. Policy numbers flow back into the booking." },
  { from: 74, to: 86, title: "Why one connection matters", sub: "Same engine behind every product, price and channel." },
] as const;

export const Header: React.FC = () => {
  const t = useT(6);
  return (
    <>
      {HEADERS.map((h) => {
        const o = vis(t, h.from, h.to, 0.45);
        if (o <= 0) return null;
        const y = (1 - p(t, h.from, h.from + 0.7)) * 20;
        return (
          <div
            key={h.from}
            style={{ position: "absolute", left: 96, top: 92, width: 1728, opacity: o, transform: `translateY(${y}px)`, fontFamily: POPPINS }}
          >
            <div style={{ fontSize: 72, fontWeight: 800, color: C.ink, lineHeight: 1.1, letterSpacing: -1 }}>{h.title}</div>
            <div style={{ fontSize: 30, fontWeight: 400, color: C.grey, marginTop: 8 }}>{h.sub}</div>
          </div>
        );
      })}
    </>
  );
};

// ---- Step tracker ---------------------------------------------------------------------------
const STEPS = ["Pick flight", "Quote request", "Price", "Offer", "Issue"];
const stepIndex = (t: number): number => (t < 14 ? -1 : t < 19 ? 0 : t < 31 ? 1 : t < 48 ? 2 : t < 62 ? 3 : 4);

export const Tracker: React.FC = () => {
  const t = useT(6);
  const idx = stepIndex(t);
  const kick = vis(t, 74, 86, 0.45);
  const tracker = 1 - p(t, 73.6, 74.1, Easing.linear);
  return (
    <>
      <div style={{ position: "absolute", left: 96, top: 40, display: "flex", alignItems: "center", gap: 14, opacity: tracker, fontFamily: POPPINS }}>
        {STEPS.map((label, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <React.Fragment key={label}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: active ? C.red : done ? C.ink : "transparent",
                    border: `2.5px solid ${active ? C.red : done ? C.ink : C.line}`,
                    color: active || done ? "#fff" : C.grey,
                    fontSize: 20,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: 24, fontWeight: active ? 600 : 400, color: active ? C.ink : C.grey }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 40, height: 3, borderRadius: 2, background: done ? C.ink : C.line }} />}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 96, top: 44, fontFamily: POPPINS, fontSize: 24, fontWeight: 600, letterSpacing: 4, color: C.red, opacity: kick }}>
        WHAT IT UNLOCKS
      </div>
      <div style={{ position: "absolute", right: 96, top: 46, fontFamily: POPPINS, fontSize: 22, fontWeight: 400, color: C.grey }}>
        Illustrative flow and sample prices
      </div>
    </>
  );
};

// ---- Narration captions ---------------------------------------------------------------------
export const CAPTIONS: { from: number; to: number; text: string }[] = [
  { from: 6.4, to: 14, text: "AirAsia sells flights. Tune Protect runs the insurance engine. One secure API links them." },
  { from: 14, to: 19, text: "A passenger picks a flight. AirAsia already holds the route, dates, passengers and fare." },
  { from: 19, to: 31, text: "That trip context goes to Tune Protect as a single quote request over the API." },
  { from: 31, to: 35.5, text: "Tune Protect runs the trip context through three steps, in real time." },
  { from: 35.5, to: 39.5, text: "Eligibility rules filter the catalogue, so only products that fit this trip stay in." },
  { from: 39.5, to: 43.5, text: "The pricing engine rates each product for this exact trip, market and channel." },
  { from: 43.5, to: 48, text: "Offers are ranked and packaged, ready to drop into the booking page." },
  { from: 48, to: 58, text: "One response returns every eligible product, priced, inside AirAsia's booking flow." },
  { from: 58, to: 62, text: "The passenger adds what they want. The basket updates instantly." },
  { from: 62, to: 68, text: "At payment, AirAsia sends one bind request with the selected products." },
  { from: 68, to: 74, text: "Policies are issued. Policy numbers flow back into the booking and confirmation email." },
  { from: 74, to: 80, text: "With the engine behind one API, new products and price changes happen in one place." },
  { from: 80, to: 86, text: "The levers: take-up rate, revenue per passenger and speed to market." },
];

export const Captions: React.FC = () => {
  const t = useT(0);
  const active = CAPTIONS.find((c) => t >= c.from && t < c.to);
  if (!active) return null;
  const o = vis(t, active.from, active.to, 0.3);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center", opacity: o }}>
      <div
        style={{
          maxWidth: 1760,
          padding: "16px 36px",
          borderRadius: 22,
          background: "rgba(22,22,22,0.93)",
          color: "#fff",
          fontFamily: POPPINS,
          fontSize: 34,
          fontWeight: 500,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {active.text}
      </div>
    </div>
  );
};
