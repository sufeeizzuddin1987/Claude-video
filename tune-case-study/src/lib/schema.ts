import { z } from "zod";

export const layoutSchema = z.enum(["16x9", "1x1", "9x16"]);
export type Layout = z.infer<typeof layoutSchema>;

export const caseStudySchema = z.object({
  /** Take-up KPI value. With takeUpFormat "percent": uplift in %, e.g. 12.5 -> "+12.5%". With "multiple": multiplier, e.g. 3.2 -> "3.2x". null = not provided yet. */
  takeUpUplift: z.number().nullable(),
  takeUpFormat: z.enum(["percent", "multiple"]),
  /** false = single-KPI slide (take-up only). */
  showRpp: z.boolean(),
  /** Uplift in revenue per passenger, in percent. null = not provided yet. */
  rppUplift: z.number().nullable(),
  /** Optional basis line under the KPIs, e.g. "vs. control group, Jan-Mar 2026". */
  resultsNote: z.string(),
  /** Optional call-to-action on the end card, e.g. a URL or email. Empty = hidden. */
  ctaText: z.string(),
});

export type CaseStudyProps = z.infer<typeof caseStudySchema>;

export const defaultCaseStudyProps: CaseStudyProps = {
  takeUpUplift: 3.2, // supplied by user: 3.2x take-up (= +220% vs baseline)
  takeUpFormat: "multiple",
  showRpp: true,
  rppUplift: null,
  resultsNote: "",
  ctaText: "",
};
