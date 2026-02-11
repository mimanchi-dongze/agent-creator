import { z } from 'zod';
export declare const TriggerSchema: z.ZodObject<{
    type: z.ZodEnum<["manual", "webhook", "schedule", "event"]>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "manual" | "webhook" | "schedule" | "event";
    description?: string | undefined;
}, {
    type: "manual" | "webhook" | "schedule" | "event";
    description?: string | undefined;
}>;
export declare const SkillSchema: z.ZodObject<{
    name: z.ZodString;
    provider: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    isInstalled: z.ZodOptional<z.ZodBoolean>;
    sourceEnv: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    provider?: string | undefined;
    config?: Record<string, any> | undefined;
    isInstalled?: boolean | undefined;
    sourceEnv?: string | undefined;
}, {
    name: string;
    provider?: string | undefined;
    config?: Record<string, any> | undefined;
    isInstalled?: boolean | undefined;
    sourceEnv?: string | undefined;
}>;
export declare const AgentBlueprintSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString, "many">;
    triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["manual", "webhook", "schedule", "event"]>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "manual" | "webhook" | "schedule" | "event";
        description?: string | undefined;
    }, {
        type: "manual" | "webhook" | "schedule" | "event";
        description?: string | undefined;
    }>, "many">>;
    skills: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        provider: z.ZodOptional<z.ZodString>;
        config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        isInstalled: z.ZodOptional<z.ZodBoolean>;
        sourceEnv: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        provider?: string | undefined;
        config?: Record<string, any> | undefined;
        isInstalled?: boolean | undefined;
        sourceEnv?: string | undefined;
    }, {
        name: string;
        provider?: string | undefined;
        config?: Record<string, any> | undefined;
        isInstalled?: boolean | undefined;
        sourceEnv?: string | undefined;
    }>, "many">>;
    workflow: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    description: string;
    name: string;
    version: string;
    goals: string[];
    triggers?: {
        type: "manual" | "webhook" | "schedule" | "event";
        description?: string | undefined;
    }[] | undefined;
    skills?: {
        name: string;
        provider?: string | undefined;
        config?: Record<string, any> | undefined;
        isInstalled?: boolean | undefined;
        sourceEnv?: string | undefined;
    }[] | undefined;
    workflow?: any;
}, {
    description: string;
    name: string;
    goals: string[];
    version?: string | undefined;
    triggers?: {
        type: "manual" | "webhook" | "schedule" | "event";
        description?: string | undefined;
    }[] | undefined;
    skills?: {
        name: string;
        provider?: string | undefined;
        config?: Record<string, any> | undefined;
        isInstalled?: boolean | undefined;
        sourceEnv?: string | undefined;
    }[] | undefined;
    workflow?: any;
}>;
export type AgentBlueprint = z.infer<typeof AgentBlueprintSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;
