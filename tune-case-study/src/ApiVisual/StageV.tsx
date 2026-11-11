import React from "react";
import { Easing } from "remotion";
import { C, POPPINS, SHADOW } from "../ApiExplainer/theme";
import { Icon } from "../ApiExplainer/icons";
import { PRODUCTS } from "../ApiExplainer/data";
import { keys, money, p, pop, useT, vis } from "../ApiExplainer/anim";
import { ab, Confetti, EngineMachine, ENG, Parcel, PH, Passenger, PhoneFrame, PriceTag, TapRipple, Tile } from "./art";

const SEL = [54.6, 55.7, 56.8];
const TAPS: { x: number; y: number; at: number }[] = [
  { x: 520, y: 439, at: 16.0 },
  { x: 436, y: 563, at: 54.5 },
  { x: 604, y: 563, at: 55.6 },
  { x: 436, y: 729, at: 56.7 },
  { x: 605, y: 868, at: 58.0 },
];
const PIPE_X = 720;
const PIPE_W = 550;
const GATE_X = 995;

// ---- Phone screen (coordinates inside the 352x672 screen) -------------------------------------
const PhoneScreen: React.FC<{ t: number }> = ({ t }) => {
  const picked = t >= 16.05;
  const frac = (t * 0.45) % 1;
  const skeleton = p(t, 7.6, 8.4) * (1 - p(t, 20.6, 21, Easing.linear));
  const waiting = p(t, 21, 21.6) * (1 - p(t, 51.0, 51.4, Easing.linear));
  const total = PRODUCTS.slice(0, 3).reduce((sum, pr, i) => sum + pr.price * p(t, SEL[i], SEL[i] + 0.5), 0);
  const paying = t >= 58.0 && t < 67.8;
  const done = t >= 67.8;
  const dots = [0, 1, 2].map((i) => 0.3 + 0.7 * Math.abs(Math.sin(t * 5 - i * 0.9)));
  return (
    <>
      {/* app bar */}
      <div style={{ ...ab(0, 0, 352, 84), background: C.red, color: "#fff", fontFamily: POPPINS, fontSize: 38, fontWeight: 800, padding: "30px 26px 0", lineHeight: 1 }}>AirAsia</div>

      {/* flight card */}
      <div style={{ ...ab(16, 100, 320, 120), borderRadius: 24, background: C.redSoft, border: `3px solid ${picked ? C.red : "transparent"}` }}>
        <div style={ab(20, 10)}><Icon name="pin" size={44} color={C.red} /></div>
        <div style={ab(250, 10)}><Icon name="pin" size={44} color={C.red} /></div>
        <div style={{ ...ab(14, 56), fontFamily: POPPINS, fontWeight: 600, fontSize: 22, color: C.ink }}>KUL</div>
        <div style={{ ...ab(246, 56), fontFamily: POPPINS, fontWeight: 600, fontSize: 22, color: C.ink }}>BKI</div>
        <div style={{ ...ab(80, 30, 164, 0), borderTop: `4px dotted ${C.red}88` }} />
        <div style={{ ...ab(80 + 130 * frac, 14) }}><Icon name="plane" size={34} color={C.red} stroke={3.5} /></div>
        <div style={ab(20, 82)}><Icon name="people" size={28} color={C.grey} stroke={4} /></div>
        <div style={{ ...ab(52, 82), fontFamily: POPPINS, fontWeight: 600, fontSize: 24, color: C.ink }}>2</div>
        <div style={{ ...ab(112, 80, 100, 32), borderRadius: 16, background: picked ? C.green : C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {picked ? <Icon name="check" size={22} color="#fff" stroke={8} /> : <span style={{ color: "#fff", fontFamily: POPPINS, fontWeight: 600, fontSize: 20 }}>Select</span>}
        </div>
        <div style={ab(236, 82)}><Icon name="coin" size={28} color={C.grey} stroke={4} /></div>
        <div style={{ ...ab(268, 82), fontFamily: POPPINS, fontWeight: 600, fontSize: 24, color: C.ink }}>189</div>
      </div>

      {/* skeleton */}
      <div style={{ opacity: skeleton }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ ...ab(16, 250 + i * 60, 320 - i * 70, 36), borderRadius: 12, background: "#F0EBE6" }} />
        ))}
      </div>

      {/* waiting placeholders */}
      <div style={{ opacity: waiting }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ ...ab(16 + (i % 2) * 168, 244 + Math.floor(i / 2) * 166, 152, 150), borderRadius: 22, border: `3px dashed ${C.line}`, background: "#FBF9F7" }} />
        ))}
        <div style={{ ...ab(0, 380, 352, 30), display: "flex", justifyContent: "center", gap: 14 }}>
          {dots.map((d, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: C.tp, opacity: d }} />
          ))}
        </div>
      </div>

      {/* product tiles */}
      {!done &&
        PRODUCTS.map((pr, i) => {
          const o = pop(t, 51.4 + i * 0.35);
          if (o <= 0) return null;
          const sel = i < 3 ? p(t, SEL[i], SEL[i] + 0.3) : 0;
          return (
            <div
              key={pr.id}
              style={{
                ...ab(16 + (i % 2) * 168, 244 + Math.floor(i / 2) * 166, 152, 150),
                borderRadius: 22,
                background: sel > 0.5 ? C.redSoft : "#fff",
                border: `3px solid ${sel > 0.5 ? C.red : C.line}`,
                transform: `scale(${o})`,
                opacity: Math.min(1, o * 1.5),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 70, height: 70, borderRadius: 20, background: C.tpSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={pr.icon} size={46} color={C.tp} />
              </div>
              <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 30, color: C.ink, lineHeight: 1 }}>{money(pr.price)}</div>
              <div style={{ ...ab(112, 8, 32, 32), borderRadius: 16, background: sel > 0.5 ? C.red : "transparent", border: `3px solid ${sel > 0.5 ? C.red : C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {sel > 0.5 && <Icon name="check" size={20} color="#fff" stroke={8} />}
              </div>
            </div>
          );
        })}

      {/* confirmation */}
      {done && (
        <div style={{ ...ab(0, 90, 352, 480), background: "#fff", opacity: p(t, 67.8, 68.2) }}>
          <div style={{ ...ab(116, 40, 120, 120), borderRadius: 60, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(t, 67.9)})` }}>
            <Icon name="check" size={74} color="#fff" stroke={7} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...ab(30 + i * 104, 220, 88, 112), borderRadius: 14, background: "#fff", border: `4px solid ${C.green}`, boxShadow: SHADOW, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(t, 68.3 + i * 0.25)})` }}>
              <Icon name="shield" size={54} color={C.green} stroke={4} />
            </div>
          ))}
          <div style={{ ...ab(0, 370, 352), display: "flex", justifyContent: "center", gap: 24, opacity: p(t, 69.2, 69.8) }}>
            <Icon name="heart" size={44} color={C.red} />
            <Icon name="heart" size={32} color={C.red} />
            <Icon name="heart" size={44} color={C.red} />
          </div>
        </div>
      )}

      {/* footer */}
      <div style={{ ...ab(0, 580, 352, 92), borderTop: `3px solid ${C.line}`, background: "#fff" }}>
        <div style={ab(22, 24)}><Icon name="coin" size={40} color={C.red} stroke={4} /></div>
        <div style={{ ...ab(72, 22), fontFamily: POPPINS, fontWeight: 800, fontSize: 36, color: C.ink, fontVariantNumeric: "tabular-nums" }}>{money(total)}</div>
        <div style={{ ...ab(186, 14, 150, 64), borderRadius: 32, background: done ? C.green : paying ? C.ink : C.red, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {done ? (
            <Icon name="check" size={32} color="#fff" stroke={7} />
          ) : paying ? (
            <div style={{ display: "flex", gap: 8 }}>
              {dots.map((d, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: "#fff", opacity: d }} />
              ))}
            </div>
          ) : (
            <>
              <span style={{ color: "#fff", fontFamily: POPPINS, fontWeight: 600, fontSize: 28 }}>Pay</span>
              <Icon name="arrowR" size={26} color="#fff" stroke={6} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

// ---- Pipe ---------------------------------------------------------------------------------------
const Pipe: React.FC<{ t: number }> = ({ t }) => {
  const draw = p(t, 7.2, 8.2);
  const flow = -t * 80;
  const busy = Math.max(vis(t, 21, 26, 0.3), vis(t, 46, 51.4, 0.3), vis(t, 58.2, 62.2, 0.3), vis(t, 64.6, 67.9, 0.3));
  return (
    <>
      <div style={{ ...ab(PIPE_X, 450, PIPE_W, 220), borderRadius: 110, background: "#fff", border: `3px solid ${C.line}`, boxShadow: SHADOW, transform: `scaleX(${draw})`, opacity: draw }} />
      <svg style={{ ...ab(PIPE_X, 450), opacity: draw }} width={PIPE_W} height={220}>
        <line x1={110} y1={60} x2={PIPE_W - 100} y2={60} stroke={C.red} strokeWidth={5} strokeLinecap="round" strokeDasharray="6 18" strokeDashoffset={flow} opacity={0.3 + 0.7 * busy} />
        <polygon points={`${PIPE_W - 96},48 ${PIPE_W - 70},60 ${PIPE_W - 96},72`} fill={C.red} />
        <line x1={100} y1={160} x2={PIPE_W - 110} y2={160} stroke={C.tp} strokeWidth={5} strokeLinecap="round" strokeDasharray="6 18" strokeDashoffset={-flow} opacity={0.3 + 0.7 * busy} />
        <polygon points="96,148 70,160 96,172" fill={C.tp} />
      </svg>
    </>
  );
};

const Gate: React.FC<{ t: number }> = ({ t }) => {
  const o = p(t, 7.6, 8.4);
  return (
    <div style={{ ...ab(GATE_X - 44, 425, 88, 270), borderRadius: 44, background: C.ink, opacity: o, zIndex: 7, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: SHADOW }}>
      <span style={{ color: "#fff", fontFamily: POPPINS, fontWeight: 800, fontSize: 34, letterSpacing: 1 }}>API</span>
      <Icon name="lock" size={40} color="#fff" stroke={4} />
    </div>
  );
};

// ---- Stage ------------------------------------------------------------------------------------------
export const StageV: React.FC = () => {
  const t = useT(5);
  const inEngine = p(t, 26, 26.8, Easing.linear) * (1 - p(t, 45.2, 46, Easing.linear));
  const o = Math.min(p(t, 5, 5.6, Easing.linear), 1 - p(t, 70.4, 71, Easing.linear)) * (1 - inEngine);
  const slideL = p(t, 5.2, 6.4);
  const slideR = p(t, 5.6, 6.8);
  const reach = Math.max(...TAPS.map((k) => Math.max(0, 1 - Math.abs(t - k.at - 0.1) / 0.5)));
  const happy = t >= 67.8 ? 1 : 0;

  // parcels
  const req = keys(t, [[20.0, 520, 439, 0.15], [20.9, 640, 470, 0.5], [21.4, 760, 510, 0.68], [25.6, 1235, 510, 0.68], [26.0, 1262, 510, 0.2]]);
  const reqO = p(t, 20, 20.3) * (1 - p(t, 25.6, 26.0, Easing.linear));
  const resp = keys(t, [[46.0, 1262, 610, 0.2], [46.5, 1225, 610, 0.68], [50.0, 775, 610, 0.68], [50.8, 640, 640, 0.5], [51.4, 540, 560, 0.9]]);
  const respO = p(t, 46, 46.3) * (1 - p(t, 51.2, 51.6, Easing.linear));
  const bind = keys(t, [[58.2, 605, 868, 0.15], [59.0, 700, 600, 0.5], [59.6, 760, 510, 0.68], [61.8, 1235, 510, 0.68], [62.2, 1262, 510, 0.2]]);
  const bindO = p(t, 58.2, 58.5) * (1 - p(t, 61.8, 62.2, Easing.linear));
  const pol = keys(t, [[64.6, 1262, 610, 0.2], [65.0, 1225, 610, 0.68], [67.0, 775, 610, 0.68], [67.5, 650, 600, 0.5], [67.9, 540, 520, 0.2]]);
  const polO = p(t, 64.6, 64.9) * (1 - p(t, 67.5, 67.9, Easing.linear));

  const lit = [0, 1, 2].map((i) => {
    const a = Math.max(vis(t, 24.5, 26.2, 0.2), vis(t, 45.2, 47, 0.3), vis(t, 62, 64.8 + i * 0.01, 0.3));
    return i === 2 ? Math.max(a, 0) : a;
  });
  const printer = p(t, 63.2, 65.6, Easing.linear) * 3;

  // teaser: product tiles ride the pipe (intro)
  const teaser = PRODUCTS.map((pr, i) => {
    const s = 9.4 + i * 0.9;
    const [x, y] = keys(t, [[s, 1120, 330], [s + 0.5, 1110, 610], [s + 3.0, 770, 610]]);
    const op = vis(t, s, s + 3.1, 0.3);
    return { pr, x, y, op, i };
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, isolation: "isolate", fontFamily: POPPINS }}>
      <Pipe t={t} />

      <div style={{ ...ab(30 - (1 - slideL) * 80, 380), opacity: slideL, zIndex: 2 }}>
        <Passenger t={t} happy={happy} reach={reach} />
      </div>
      <div style={{ opacity: slideL, transform: `translateX(${(1 - slideL) * -80}px)`, position: "absolute", inset: 0, zIndex: 3 }}>
        <PhoneFrame>
          <PhoneScreen t={t} />
        </PhoneFrame>
      </div>
      <div style={{ opacity: slideR, transform: `translateX(${(1 - slideR) * 80}px)`, position: "absolute", inset: 0, zIndex: 3 }}>
        <EngineMachine t={t} lit={lit} printer={printer} />
      </div>
      <Gate t={t} />

      {/* teaser tiles */}
      {teaser.map(({ pr, x, y, op, i }) =>
        op > 0 ? (
          <div key={pr.id} style={{ position: "absolute", left: x - 45, top: y - 45, opacity: op, zIndex: 5 }}>
            <Tile icon={pr.icon} size={90} />
            <PriceTag text={money(pr.price)} scale={0.8} style={{ position: "absolute", right: -14, top: -16, opacity: i >= 0 ? 1 : 0 }} />
          </div>
        ) : null,
      )}

      <Parcel color={C.red} icons={["pin", "calendar", "people", "card"]} x={req[0]} y={req[1]} scale={req[2]} opacity={reqO} />
      <Parcel color={C.tp} icons={["shieldPlane", "bag", "clock", "ticketX"]} x={resp[0]} y={resp[1]} scale={resp[2]} opacity={respO} />
      <Parcel color={C.red} icons={["shieldPlane", "bag", "clock", "check"]} x={bind[0]} y={bind[1]} scale={bind[2]} opacity={bindO} />
      <Parcel color={C.tp} icons={["policy", "policy", "policy", "check"]} x={pol[0]} y={pol[1]} scale={pol[2]} opacity={polO} />

      {TAPS.map((k) => (
        <TapRipple key={k.at} t={t} x={k.x} y={k.y} at={k.at} />
      ))}
      <Confetti t={t} at={68.0} cx={ENG.x - 560} cy={PH.y + 80} />
      <Confetti t={t} at={68.1} cx={PH.x + 300} cy={PH.y + 40} />
    </div>
  );
};
