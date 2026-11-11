import React from "react";
import { Easing } from "remotion";
import { C, POPPINS } from "../ApiExplainer/theme";
import { Icon, type IconName } from "../ApiExplainer/icons";
import { p, useT, vis } from "../ApiExplainer/anim";

const HEADS: { from: number; to: number; title: string }[] = [
  { from: 5, to: 14, title: "One API connection" },
  { from: 14, to: 20, title: "Passenger books" },
  { from: 20, to: 26, title: "One quote request" },
  { from: 26, to: 46, title: "Inside the engine" },
  { from: 46, to: 58, title: "Many products back" },
  { from: 58, to: 71, title: "Confirm. Policies issued." },
  { from: 71, to: 81, title: "Why it matters" },
];

const STEPS: { icon: IconName; from: number; to: number }[] = [
  { icon: "plane", from: 14, to: 20 },
  { icon: "envelope", from: 20, to: 26 },
  { icon: "tag", from: 26, to: 46 },
  { icon: "catalog", from: 46, to: 58 },
  { icon: "policy", from: 58, to: 71 },
];

export const HeaderV: React.FC = () => {
  const t = useT(5);
  const trackerO = p(t, 5.5, 6.2, Easing.linear) * (1 - p(t, 70.6, 71.2, Easing.linear));
  return (
    <>
      <div style={{ position: "absolute", left: 96, top: 36, display: "flex", alignItems: "center", gap: 14, opacity: trackerO }}>
        {STEPS.map((s, i) => {
          const active = t >= s.from && t < s.to;
          const done = t >= s.to;
          return (
            <React.Fragment key={s.icon}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: active ? C.red : done ? C.ink : "transparent", border: `3px solid ${active ? C.red : done ? C.ink : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${active ? 1.12 : 1})` }}>
                <Icon name={s.icon} size={32} color={active || done ? "#fff" : C.grey} stroke={4} />
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 44, height: 4, borderRadius: 2, background: done ? C.ink : C.line }} />}
            </React.Fragment>
          );
        })}
      </div>
      {HEADS.map((h) => {
        const o = vis(t, h.from, h.to, 0.45);
        if (o <= 0) return null;
        return (
          <div key={h.from} style={{ position: "absolute", left: 96, top: 108, opacity: o, transform: `translateY(${(1 - p(t, h.from, h.from + 0.7)) * 18}px)`, fontFamily: POPPINS, fontSize: 68, fontWeight: 800, color: C.ink, letterSpacing: -1, lineHeight: 1.1 }}>
            {h.title}
          </div>
        );
      })}
      <div style={{ position: "absolute", right: 96, top: 52, fontFamily: POPPINS, fontSize: 22, color: C.grey, opacity: trackerO }}>Illustrative flow and sample prices</div>
    </>
  );
};
