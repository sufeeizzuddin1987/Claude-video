import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { POPPINS } from "../ApiExplainer/theme";
import { Backdrop } from "../ApiExplainer/Chrome";
import { TitleScene } from "../ApiExplainer/TitleScene";
import { EndScene } from "../ApiExplainer/EndScene";
import { StageV } from "./StageV";
import { EngineV } from "./EngineV";
import { HeaderV } from "./Chrome2";
import { WhyV } from "./WhyV";

export const VISUAL_FPS = 30;
export const VISUAL_DURATION_S = 87;
const f = (s: number) => Math.round(s * VISUAL_FPS);

// Scene times inside the components are "design time" = absolute time - 1s (the title is 6s, not 5s).
export const ApiVisual: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: POPPINS }}>
    <Backdrop />
    <Sequence durationInFrames={f(6)} name="Title">
      <TitleScene />
    </Sequence>
    <Sequence from={f(6)} durationInFrames={f(66)} name="Stage">
      <StageV />
    </Sequence>
    <Sequence from={f(6)} durationInFrames={f(76)} name="Header">
      <HeaderV />
    </Sequence>
    <Sequence from={f(27)} durationInFrames={f(20)} name="Inside the engine">
      <EngineV />
    </Sequence>
    <Sequence from={f(72)} durationInFrames={f(10)} name="Why">
      <WhyV />
    </Sequence>
    <Sequence from={f(82)} durationInFrames={f(5)} name="End">
      <EndScene />
    </Sequence>
  </AbsoluteFill>
);
