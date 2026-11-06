import React from "react";
import {
  AbsoluteFill,
  Easing,
  getRemotionEnvironment,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_RED, INK } from "./lib/constants";
import { POPPINS } from "./lib/fonts";

const COLUMN_W = 700;
const decimalsOf = (n: number) => (String(n).split(".")[1] ?? "").length;

const fmt = (n: number, decimals: number, format: "percent" | "multiple") =>
  format === "multiple" ? `${n.toFixed(decimals)}x` : `+${n.toFixed(decimals)}%`;

const Kpi: React.FC<{
  value: number;
  format: "percent" | "multiple";
  label: string;
  x: number;
  startFrame: number;
  columnW?: number;
  maxFont?: number;
}> = ({ value, format, label, x, startFrame, columnW = COLUMN_W, maxFont = 230 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const decimals = decimalsOf(value);
  const finalText = fmt(value, decimals, format);
  // Poppins ExtraBold digits ~0.6em wide; fit the widest figure inside the column.
  const fontSize = Math.min(maxFont, Math.floor(columnW / (finalText.length * 0.6)));
  const shown = interpolate(frame, [startFrame, startFrame + 1.7 * fps], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const labelOpacity = interpolate(frame, [startFrame + 0.5 * fps, startFrame + 1.0 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [startFrame - 0.2 * fps, startFrame + 0.5 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const numOpacity = interpolate(frame, [startFrame - 0.2 * fps, startFrame + 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: x, top: 430, width: columnW }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize,
          lineHeight: 1,
          color: BRAND_RED,
          opacity: numOpacity,
          translate: `0px ${rise}px`,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {fmt(shown, decimals, format)}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: POPPINS,
          fontWeight: 600,
          fontSize: 52,
          color: INK,
          opacity: labelOpacity,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/** Replacement for the source "The results" slide. Numbers come from props, never hard-coded. */
export const ResultsScene: React.FC<{
  takeUpUplift: number | null;
  takeUpFormat: "percent" | "multiple";
  showRpp: boolean;
  rppUplift: number | null;
  note: string;
}> = ({ takeUpUplift, takeUpFormat, showRpp, rppUplift, note }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const missing = takeUpUplift === null || (showRpp && rppUplift === null);

  if (missing && getRemotionEnvironment().isRendering) {
    throw new Error(
      "Results figures are missing. Set takeUpUplift and rppUplift in the props (Studio sidebar, " +
        "src/Root.tsx defaultProps, or --props) before rendering. Refusing to ship placeholders.",
    );
  }

  const ruleW = interpolate(frame, [0, 0.5 * fps], [0, 170], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const headOpacity = interpolate(frame, [0.15 * fps, 0.65 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const noteOpacity = interpolate(frame, [2.6 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crossfade in from the "One API" scene; fade out into the end card's white-to-red dissolve.
  const fadeIn = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", opacity: fadeIn }}>
      <div style={{ position: "absolute", left: 200, top: 250, width: ruleW, height: 10, background: BRAND_RED }} />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 292,
          fontFamily: POPPINS,
          fontWeight: 400,
          fontSize: 72,
          color: INK,
          opacity: headOpacity,
        }}
      >
        The results
      </div>
      {missing ? (
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 460,
            fontFamily: POPPINS,
            fontWeight: 600,
            fontSize: 44,
            color: BRAND_RED,
          }}
        >
          Studio only: enter takeUpUplift and rppUplift in the Props panel.
        </div>
      ) : (
        <>
          <Kpi
            value={takeUpUplift}
            format={takeUpFormat}
            label="take-up rate"
            x={200}
            startFrame={Math.round(0.8 * fps)}
            columnW={showRpp ? COLUMN_W : 1400}
            maxFont={showRpp ? 230 : 340}
          />
          {showRpp && rppUplift !== null ? (
            <Kpi value={rppUplift} format="percent" label="revenue per passenger" x={1000} startFrame={Math.round(1.1 * fps)} />
          ) : null}
        </>
      )}
      {note ? (
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 800,
            fontFamily: POPPINS,
            fontWeight: 400,
            fontSize: 34,
            color: "#6b6b6b",
            opacity: noteOpacity,
          }}
        >
          {note}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
