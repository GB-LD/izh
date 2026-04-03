import { z } from "zod";

export const AnalyticsSchema = z.object({
  surveyScores: z.array(
    z.object({ score: z.number(), date: z.iso.datetime() }),
  ),
  lastSurveyDate: z.iso.datetime().nullable(),
  totalTasksCreated: z.number(),
  totalTasksCompleted: z.number(),
  totalFlowsCompleted: z.number(),
});

export type Analytics = z.infer<typeof AnalyticsSchema>;
