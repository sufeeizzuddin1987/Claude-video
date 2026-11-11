import { loadFont as loadMono } from "@remotion/google-fonts/RobotoMono";

export { POPPINS } from "../lib/fonts";

export const { fontFamily: MONO } = loadMono("normal", {
  weights: ["500"],
  subsets: ["latin"],
});

export const C = {
  bg: "#FAF7F4",
  dot: "#E9E3DD",
  ink: "#161616",
  grey: "#6B6B6B",
  line: "#E4DED8",
  card: "#FFFFFF",
  red: "#FE0000",
  redSoft: "#FFE9E9",
  tp: "#1B3F9B",
  tpSoft: "#E6ECFA",
  green: "#12A150",
  greenSoft: "#E3F6EC",
} as const;

export const SHADOW = "0 18px 50px rgba(22,22,22,0.10), 0 2px 6px rgba(22,22,22,0.06)";
