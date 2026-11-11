import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const clampOpts = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Absolute video time in seconds. `offsetS` is the start of the enclosing Sequence. */
export const useT = (offsetS = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps + offsetS;
};

/** 0 -> 1 between two times (seconds). */
export const p = (t: number, from: number, to: number, easing: (n: number) => number = easeOut): number =>
  interpolate(t, [from, to], [0, 1], { ...clampOpts, easing });

/** Fade in at `from`, fade out at `to`. */
export const vis = (t: number, from: number, to: number, fade = 0.35): number =>
  p(t, from, from + fade, Easing.linear) * (1 - p(t, to - fade, to, Easing.linear));

/** Springy pop-in starting at `at`. */
export const usePop = (t: number, at: number): number => {
  const { fps } = useVideoConfig();
  if (t < at) return 0;
  return spring({ frame: (t - at) * fps, fps, config: { damping: 13, stiffness: 150, mass: 0.7 } });
};

export const money = (n: number): string => n.toFixed(2);
