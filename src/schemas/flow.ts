import { z } from "zod";

const fluxEnum = ["flux1", "flux2", "flux3", "flux4"] as const;
export const FluxEnumSchema = z.enum(fluxEnum);

export const FlowStateSchema = z.object({
  currentFlux: FluxEnumSchema.nullable(),
  currentStep: z.number(),
  taskId: z.uuid().nullable(),
  answers: z.array(z.string()),
  isActive: z.boolean(),
});

export type Flux = z.infer<typeof FluxEnumSchema>;
export type FlowState = z.infer<typeof FlowStateSchema>;
