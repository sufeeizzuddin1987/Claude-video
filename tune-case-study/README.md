# Tune Protect x AirAsia case study: Remotion edit of v17

Base: `Tune Protect x AirAsia Case Study v17.mp4` (Drive, 1920x1080, 30fps, 2:28).
Not committed (107 MB). Put it at `public/src/v17.mp4` before running Studio or rendering.

## What changed vs v17
| Change | Why |
|---|---|
| "The results" slide rebuilt (`src/ResultsScene.tsx`) | v17 shipped literal `[+X%]` / `[+Y%]` placeholders |
| Burned-in captions covered and replaced by an editable layer (`src/captions/en.json`) | Captions were baked into pixels, so no edits, no SRT, no BM cut |
| Trimmed to 146.0s, 0.7s audio fade-out | Source ends with 2.2s of dead air |
| Optional CTA line on end card (`ctaText`) | End card has no action |
| 1:1 and 9:16 compositions | Social formats; video is letterboxed, captions set larger below |

## Before rendering
Results figures are **required props** (`takeUpUplift` shown as `3.2x` via `takeUpFormat: "multiple"`; set `showRpp: false` for a single-KPI slide). Rendering throws until both are set (by design):

    npx remotion render CaseStudy-16x9 out/case-study-16x9.mp4 \
      --props='{"takeUpUplift":0,"rppUplift":0,"resultsNote":"","ctaText":""}'

(Replace the zeros with the real figures. Studio: edit them in the Props panel.)

Compositions: `CaseStudy-16x9`, `CaseStudy-1x1`, `CaseStudy-9x16`.

## Captions
- Edit `src/captions/en.json` (`startMs`, `endMs`, `text`). A BM cut = add `ms.json` and point `CaseStudy.tsx` at it.
- `npm run captions:srt` writes `out/captions.en.srt`.
- Text verified against OCR of the burned-in captions; timings from whisper.cpp word timestamps.

## Commands
    npm run dev      # Studio
    npm run lint     # eslint + tsc
