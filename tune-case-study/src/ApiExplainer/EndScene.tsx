import React from "react";
import { Easing } from "remotion";
import { C, POPPINS } from "./theme";
import { p, useT, usePop } from "./anim";
import { Icon } from "./icons";

export const EndScene: React.FC = () => {
  const t = useT(86);
  const o = Math.min(p(t, 86, 86.6, Easing.linear), 1);
  const a = p(t, 86.3, 87.1);
  const b = p(t, 86.8, 87.6);
  const c = p(t, 87.4, 88.2);
  const pop = usePop(t, 86.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: POPPINS, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 34, transform: `scale(${pop})` }}>
        <div style={{ fontSize: 68, fontWeight: 800, color: C.red, letterSpacing: -1 }}>AirAsia</div>
        <Icon name="shieldPlane" size={96} color={C.tp} stroke={3} />
        <div style={{ fontSize: 68, fontWeight: 800, color: C.tp, letterSpacing: -1 }}>Tune Protect</div>
      </div>
      <div style={{ marginTop: 56, fontSize: 112, fontWeight: 800, color: C.ink, lineHeight: 1.05, letterSpacing: -3, opacity: a, transform: `translateY(${(1 - a) * 30}px)` }}>
        One API. Many products.
      </div>
      <div style={{ marginTop: 24, fontSize: 52, color: C.grey, opacity: b, transform: `translateY(${(1 - b) * 20}px)` }}>Priced for every trip, in real time.</div>
      <div style={{ marginTop: 70, fontSize: 24, color: C.grey, opacity: c * 0.9 }}>
        Illustrative flow, payloads and prices. Actual integration specs, rules and rates differ.
      </div>
    </div>
  );
};
