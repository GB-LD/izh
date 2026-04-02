import { z } from "zod";

const statusEnum = ["inbox", "backlog", "active", "archived"] as const;
export const taskStatusEnumSchema = z.enum(statusEnum);
const quadrantEnum = ["q1", "q2", "q3", "q4"] as const;
export const quadrantEnumSchema = z.enum(quadrantEnum);
const sourceFluxEnum = ["flux1", "flux2", "flux3", "flux4", "manual"] as const;
export const sourceFluxEnumSchema = z.enum(sourceFluxEnum);
const classificationMethodEnum = ["assisted", "manual"] as const;
export const classificationMethodEnumSchema = z.enum(classificationMethodEnum);

export const TaskSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1),
  status: taskStatusEnumSchema,
  quadrant: quadrantEnumSchema.nullable(),
  createdAt: z.iso.datetime(),
  classifiedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  flowDurationMs: z.number().nullable(),
  sourceFlux: sourceFluxEnumSchema.nullable(),
  classificationMethod: classificationMethodEnumSchema.nullable(),
  userOverride: z.boolean().nullable(),
  position: z.number().nonnegative(),
});

export const TaskSchemaList = z.array(TaskSchema);

export type TaskStatus = z.infer<typeof taskStatusEnumSchema>;
export type Quadrant = z.infer<typeof quadrantEnumSchema>;
export type SourceFlux = z.infer<typeof sourceFluxEnumSchema>;
export type ClassificationMethod = z.infer<
  typeof classificationMethodEnumSchema
>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskList = z.infer<typeof TaskSchemaList>;
