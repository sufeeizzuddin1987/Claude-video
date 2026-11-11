import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "./theme";
import { p, useT, usePop } from "./anim";
import { Icon, type IconName } from "./icons";

const ORBIT: { icon: IconName; angle: number }[] = [
  { icon: "shieldPlane", angle: -45 },
  { icon: "bag", angle: 45 },
  { icon: "clock", angle: 135 },
  { icon: "ticketX", angle: 225 },
];

const Bubble: React.FC<{ t: number; i: number }> = ({ t, i }) => {
  const pop = usePop(t, 1.3 + i * 0.35);
  const a = ((ORBIT[i].angle + t * 5) * Math.PI) / 180;
  const R = 290;
  const x = 380 + R * Math.cos(a);
  const y = 380 + R * Math.sin(a);
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={760} height={760}>
        <line x1={380} y1={380} x2={380 + (x - 380) * pop} y2={380 + (y - 380) * pop} stroke={C.tp} strokeWidth={3} strokeDasharray="4 12" strokeLinecap="round" opacity={0.5} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: x - 66,
          top: y - 66,
          width: 132,
          height: 132,
          borderRadius: 66,
          background: "#fff",
          boxShadow: SHADOW,
          border: `3px solid ${C.tp}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pop})`,
        }}
      >
        <Icon name={ORBIT[i].icon} size={64} color={C.tp} />
      </div>
    </>
  );
};

export const TitleScene: React.FC = () => {
  const t = useT(0);
  const o = Math.min(p(t, 0, 0.5, Easing.linear), 1 - p(t, 5.4, 6, Easing.linear));
  const kick = p(t, 0.2, 0.9);
  const l1 = p(t, 0.4, 1.2);
  const l2 = p(t, 0.8, 1.6);
  const sub = p(t, 1.6, 2.4);
  const centre = usePop(t, 0.6);
  // paper plane flying around the ring (clockwise)
  const th = ((-100 + t * 55) * Math.PI) / 180;
  const px = 380 + 290 * Math.cos(th);
  const py = 380 + 290 * Math.sin(th);
  const rot = (Math.atan2(Math.cos(th), -Math.sin(th)) * 180) / Math.PI + 45;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: POPPINS }}>
      <div style={{ position: "absolute", left: 96, top: 270, opacity: kick, transform: `translateY(${(1 - kick) * 16}px)`, fontSize: 30, fontWeight: 600, letterSpacing: 5, color: C.red }}>
        AIRASIA × TUNE PROTECT
      </div>
      <div style={{ position: "absolute", left: 96, top: 330, fontSize: 124, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, color: C.ink }}>
        <div style={{ opacity: l1, transform: `translateY(${(1 - l1) * 40}px)` }}>One connection.</div>
        <div style={{ opacity: l2, transform: `translateY(${(1 - l2) * 40}px)`, color: C.red }}>Many products.</div>
      </div>
      <div style={{ position: "absolute", left: 96, top: 640, width: 800, opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`, fontSize: 40, lineHeight: 1.35, color: C.grey }}>
        How the pricing and product engine works over API.
      </div>

      <div style={{ position: "absolute", left: 1020, top: 160, width: 760, height: 760 }}>
        <svg style={{ position: "absolute", left: 0, top: 0 }} width={760} height={760}>
          <circle cx={380} cy={380} r={290} fill="none" stroke={C.line} strokeWidth={3} strokeDasharray="3 14" strokeLinecap="round" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 380 - 125,
            top: 380 - 125,
            width: 250,
            height: 250,
            borderRadius: 125,
            background: C.tpSoft,
            border: `4px solid ${C.tp}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${centre})`,
            boxShadow: SHADOW,
          }}
        >
          <Icon name="shieldPlane" size={140} color={C.tp} stroke={3} />
        </div>
        {ORBIT.map((_, i) => (
          <Bubble key={i} t={t} i={i} />
        ))}
        <div style={{ position: "absolute", left: px - 34, top: py - 34, transform: `rotate(${rot}deg)`, opacity: p(t, 0.5, 1.2) }}>
          <Icon name="plane" size={68} color={C.red} stroke={4} />
        </div>
      </div>
    </div>
  );
};
