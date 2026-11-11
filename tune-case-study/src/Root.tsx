import React from "react";
import { Composition } from "remotion";
import { CaseStudy, layoutSize } from "./CaseStudy";
import { API_DURATION_S, API_FPS, ApiExplainer } from "./ApiExplainer";
import { DURATION_IN_FRAMES, FPS } from "./lib/constants";
import { caseStudySchema, defaultCaseStudyProps, type CaseStudyProps } from "./lib/schema";

const Wide: React.FC<CaseStudyProps> = (p) => <CaseStudy {...p} layout="16x9" />;
const Square: React.FC<CaseStudyProps> = (p) => <CaseStudy {...p} layout="1x1" />;
const Tall: React.FC<CaseStudyProps> = (p) => <CaseStudy {...p} layout="9x16" />;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ApiExplainer-16x9"
      component={ApiExplainer}
      durationInFrames={API_DURATION_S * API_FPS}
      fps={API_FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="CaseStudy-16x9"
      component={Wide}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      {...layoutSize("16x9")}
      schema={caseStudySchema}
      defaultProps={defaultCaseStudyProps}
    />
    <Composition
      id="CaseStudy-1x1"
      component={Square}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      {...layoutSize("1x1")}
      schema={caseStudySchema}
      defaultProps={defaultCaseStudyProps}
    />
    <Composition
      id="CaseStudy-9x16"
      component={Tall}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      {...layoutSize("9x16")}
      schema={caseStudySchema}
      defaultProps={defaultCaseStudyProps}
    />
  </>
);
