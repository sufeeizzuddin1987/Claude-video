import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { INK } from "./lib/constants";
import { POPPINS } from "./lib/fonts";

export type Cue = { startMs: number; endMs: number; text: string };

const CueView: React.FC<{
  text: string;
  top: number;
  height: number;
  fontSize: number;
  maxWidth: number;
  durationInFrames: number;
}> = ({ text, top, height, fontSize, maxWidth, durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(frame, [0, 4, durationInFrames - 3, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 400,
          fontSize,
          lineHeight: 1.25,
          color: INK,
          textAlign: "center",
          maxWidth,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Editable caption layer. Cues are data (src/captions/*.json), so a BM cut is one JSON file. */
export const Captions: React.FC<{
  cues: Cue[];
  top: number;
  height: number;
  fontSize: number;
  maxWidth: number;
}> = ({ cues, top, height, fontSize, maxWidth }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {cues.map((cue, i) => {
        const from = Math.round((cue.startMs / 1000) * fps);
        const durationInFrames = Math.max(1, Math.round(((cue.endMs - cue.startMs) / 1000) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames} name={`cue ${i + 1}`}>
            <CueView
              text={cue.text}
              top={top}
              height={height}
              fontSize={fontSize}
              maxWidth={maxWidth}
              durationInFrames={durationInFrames}
            />
          </Sequence>
        );
      })}
    </>
  );
};
