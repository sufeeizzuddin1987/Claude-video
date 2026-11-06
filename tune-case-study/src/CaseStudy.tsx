import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Captions, type Cue } from "./Captions";
import { Stage } from "./Stage";
import {
  BURNED_CAPTIONS_FROM_S,
  BURNED_CAPTIONS_TO_S,
  END_CARD_FROM_S,
  SOURCE_H,
  SOURCE_W,
  s,
} from "./lib/constants";
import type { CaseStudyProps, Layout } from "./lib/schema";
import en from "./captions/en.json";

const cues = en as Cue[];

// Where the 1920x1080 stage and captions land in each output format.
const LAYOUTS: Record<
  Layout,
  {
    width: number;
    height: number;
    scale: number;
    x: number;
    y: number;
    captions: { top: number; height: number; fontSize: number; maxWidth: number };
  }
> = {
  // Captions sit in the same band as the original burned-in ones.
  "16x9": { width: 1920, height: 1080, scale: 1, x: 0, y: 0, captions: { top: 988, height: 56, fontSize: 36, maxWidth: 1700 } },
  // Social formats: video fitted to width, captions set larger in the free space below.
  "1x1": {
    width: 1080,
    height: 1080,
    scale: 1080 / SOURCE_W,
    x: 0,
    y: 190,
    captions: { top: 850, height: 170, fontSize: 46, maxWidth: 940 },
  },
  "9x16": {
    width: 1080,
    height: 1920,
    scale: 1080 / SOURCE_W,
    x: 0,
    y: 500,
    captions: { top: 1180, height: 260, fontSize: 56, maxWidth: 940 },
  },
};

export const layoutSize = (layout: Layout) => ({ width: LAYOUTS[layout].width, height: LAYOUTS[layout].height });

export const CaseStudy: React.FC<CaseStudyProps & { layout: Layout }> = ({ layout, ...props }) => {
  const L = LAYOUTS[layout];
  const inside = layout === "16x9";

  const captionLayer = (
    <Sequence
      from={s(BURNED_CAPTIONS_FROM_S)}
      durationInFrames={s(BURNED_CAPTIONS_TO_S - BURNED_CAPTIONS_FROM_S)}
      layout="none"
      name="Captions"
    >
      <Captions
        cues={cues.map((c) => ({
          ...c,
          startMs: c.startMs - BURNED_CAPTIONS_FROM_S * 1000,
          endMs: c.endMs - BURNED_CAPTIONS_FROM_S * 1000,
        }))}
        {...L.captions}
      />
    </Sequence>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", width: L.width, height: L.height }}>
      {/* End card is red full-bleed in the source; match the page behind a letterboxed stage */}
      {!inside ? (
        <Sequence from={s(END_CARD_FROM_S)} name="End card background">
          <AbsoluteFill style={{ background: "linear-gradient(90deg, rgb(252,40,39) 0%, rgb(159,11,9) 100%)" }} />
        </Sequence>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SOURCE_W,
          height: SOURCE_H,
          transformOrigin: "0 0",
          translate: `${L.x}px ${L.y}px`,
          scale: L.scale,
        }}
      >
        <Stage {...props} />
        {inside ? captionLayer : null}
      </div>
      {!inside ? captionLayer : null}
    </AbsoluteFill>
  );
};
