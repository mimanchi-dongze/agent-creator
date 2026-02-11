import { Skill } from './schema.js';
export interface RegistrySkill {
    name: string;
    description: string;
    tags: string[];
    provider: string;
    sourceEnv?: string;
}
export declare class SkillMatcher {
    private registryPath;
    private skills;
    constructor(registryPath: string);
    private fallbackSkills;
    private localSkills;
    loadRegistry(): Promise<void>;
    scanLocalSkills(localPaths: {
        path: string;
        label: string;
    }[]): Promise<void>;
    private recursiveScan;
    /**
     * Matches keywords against both local and remote skills.
     */
    match(input: string): Skill[];
}
