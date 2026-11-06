export const FPS = 30;

// Source file facts (Tune Protect x AirAsia Case Study v17.mp4)
export const SOURCE_W = 1920;
export const SOURCE_H = 1080;
export const SOURCE_FILE = "src/v17.mp4";

// The source ends with 2.2s of dead air (silence starts 145.97s of 148.2s). Trim it.
export const TRIM_END_S = 146.0;
export const DURATION_IN_FRAMES = Math.round(TRIM_END_S * FPS);

// Burned-in captions exist in the source between these times. They are covered by
// a white patch and replaced with the editable caption layer.
export const BURNED_CAPTIONS_FROM_S = 7.0;
export const BURNED_CAPTIONS_TO_S = 133.2;

// The source "The results" slide (with [+X%] / [+Y%] placeholders) is replaced.
export const RESULTS_FROM_S = 133.2;
export const RESULTS_TO_S = 143.2;

export const END_CARD_FROM_S = RESULTS_TO_S;

export const s = (seconds: number) => Math.round(seconds * FPS);

export const BRAND_RED = "#FE0000";
export const INK = "#161616";
