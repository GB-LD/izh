import { z } from "zod";

export const TaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  status: z.enum(["inbox", "backlog", "active", "archived"]),
  quadrant: z.enum(["q1", "q2", "q3", "q4"]).nullable(),
  createdAt: z.iso.datetime(),
  classifiedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  flowDurationMs: z.number().nullable(),
  sourceFlux: z.enum(["flux1", "flux2", "flux3", "flux4", "manual"]).nullable(),
  classificationMethod: z.enum(["assisted", "manual"]).nullable(),
  userOverride: z.boolean().nullable(),
  position: z.number(),
});

export const TaskSchemaList = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
export type TaskList = z.infer<typeof TaskSchemaList>;
