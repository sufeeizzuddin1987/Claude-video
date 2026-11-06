import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import {
  BURNED_CAPTIONS_FROM_S,
  BURNED_CAPTIONS_TO_S,
  DURATION_IN_FRAMES,
  END_CARD_FROM_S,
  RESULTS_FROM_S,
  RESULTS_TO_S,
  SOURCE_FILE,
  SOURCE_H,
  SOURCE_W,
  s,
} from "./lib/constants";
import { POPPINS } from "./lib/fonts";
import { ResultsScene } from "./ResultsScene";
import type { CaseStudyProps } from "./lib/schema";

const FADE_OUT_FRAMES = 20;

/**
 * 1920x1080 "stage": the v17 video with burned-in captions covered, the results slide
 * rebuilt, and an optional CTA on the end card. Layout wrappers scale this into 16:9 / 1:1 / 9:16.
 */
export const Stage: React.FC<CaseStudyProps> = ({ takeUpUplift, rppUplift, resultsNote, ctaText }) => {
  return (
    <AbsoluteFill style={{ width: SOURCE_W, height: SOURCE_H, backgroundColor: "#fff" }}>
      <Video
        src={staticFile(SOURCE_FILE)}
        volume={(f) =>
          interpolate(f, [DURATION_IN_FRAMES - FADE_OUT_FRAMES, DURATION_IN_FRAMES], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Cover the burned-in caption band (captions sit at y~1000-1040; content ends ~y<=950) */}
      <Sequence
        from={s(BURNED_CAPTIONS_FROM_S)}
        durationInFrames={s(BURNED_CAPTIONS_TO_S - BURNED_CAPTIONS_FROM_S)}
        name="Cover burned-in captions"
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 140,
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 35%)",
          }}
        />
      </Sequence>

      {/* Rebuilt results slide: opaque, replaces the placeholder slide */}
      <Sequence from={s(RESULTS_FROM_S)} durationInFrames={s(RESULTS_TO_S - RESULTS_FROM_S)} name="Results">
        <ResultsScene takeUpUplift={takeUpUplift} rppUplift={rppUplift} note={resultsNote} />
      </Sequence>

      {/* Optional CTA over the end card */}
      {ctaText ? (
        <Sequence from={s(END_CARD_FROM_S + 0.8)} name="CTA">
          <CtaLine text={ctaText} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

const CtaLine: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 760,
        textAlign: "center",
        fontFamily: POPPINS,
        fontWeight: 600,
        fontSize: 44,
        color: "#fff",
        opacity,
      }}
    >
      {text}
    </div>
  );
};
