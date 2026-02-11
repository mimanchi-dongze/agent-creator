import { z } from 'zod';
export const TriggerSchema = z.object({
    type: z.enum(['manual', 'webhook', 'schedule', 'event']),
    description: z.string().optional()
});
export const SkillSchema = z.object({
    name: z.string(),
    provider: z.string().optional(),
    config: z.record(z.any()).optional(),
    isInstalled: z.boolean().optional(),
    sourceEnv: z.string().optional()
});
export const AgentBlueprintSchema = z.object({
    name: z.string().min(1, "Name is required"),
    version: z.string().default("0.1.0"),
    description: z.string().min(1, "Description is required"),
    goals: z.array(z.string()).min(1, "At least one goal is required"),
    triggers: z.array(TriggerSchema).optional(),
    skills: z.array(SkillSchema).optional(),
    workflow: z.any().optional()
});
