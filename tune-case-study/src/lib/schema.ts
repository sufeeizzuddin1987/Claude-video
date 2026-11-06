import { z } from "zod";

export const layoutSchema = z.enum(["16x9", "1x1", "9x16"]);
export type Layout = z.infer<typeof layoutSchema>;

export const caseStudySchema = z.object({
  /** Uplift in take-up rate, in percent. e.g. 12.5 renders "+12.5%". null = not provided yet. */
  takeUpUplift: z.number().nullable(),
  /** Uplift in revenue per passenger, in percent. null = not provided yet. */
  rppUplift: z.number().nullable(),
  /** Optional basis line under the KPIs, e.g. "vs. control group, Jan-Mar 2026". */
  resultsNote: z.string(),
  /** Optional call-to-action on the end card, e.g. a URL or email. Empty = hidden. */
  ctaText: z.string(),
});

export type CaseStudyProps = z.infer<typeof caseStudySchema>;

export const defaultCaseStudyProps: CaseStudyProps = {
  takeUpUplift: 220, // supplied by user (Tune Protect), take-up rate uplift %
  rppUplift: null,
  resultsNote: "",
  ctaText: "",
};
