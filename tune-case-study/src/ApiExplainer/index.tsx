import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { POPPINS } from "./theme";
import { Backdrop, Captions, Header, Tracker } from "./Chrome";
import { TitleScene } from "./TitleScene";
import { StageScene } from "./StageScene";
import { EngineScene } from "./EngineScene";
import { ImpactScene } from "./ImpactScene";
import { EndScene } from "./EndScene";

export const API_FPS = 30;
export const API_DURATION_S = 91;
const f = (s: number) => Math.round(s * API_FPS);

export const ApiExplainer: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: POPPINS }}>
    <Backdrop />
    <Sequence durationInFrames={f(6)} name="Title">
      <TitleScene />
    </Sequence>
    <Sequence from={f(6)} durationInFrames={f(68)} name="Booking and API stage">
      <StageScene />
    </Sequence>
    <Sequence from={f(6)} durationInFrames={f(80)} name="Headline and tracker">
      <Header />
      <Tracker />
    </Sequence>
    <Sequence from={f(31)} durationInFrames={f(17)} name="Inside the engine">
      <EngineScene />
    </Sequence>
    <Sequence from={f(74)} durationInFrames={f(12)} name="Why it matters">
      <ImpactScene />
    </Sequence>
    <Sequence from={f(86)} durationInFrames={f(5)} name="End card">
      <EndScene />
    </Sequence>
    <Captions />
  </AbsoluteFill>
);
