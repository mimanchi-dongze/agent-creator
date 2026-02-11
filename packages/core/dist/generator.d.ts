import { AgentBlueprint } from './schema.js';
export declare class AgentGenerator {
    /**
     * Validates the blueprint object against the Zod schema.
     */
    validate(blueprint: any): AgentBlueprint;
    /**
     * Renders a template with the provided data without validation.
     */
    renderRaw(templatePath: string, data: any): Promise<string>;
    /**
     * Renders a template with the provided blueprint data after validation.
     */
    render(templatePath: string, blueprint: any): Promise<string>;
    /**
     * Helper to render the default agent.md content.
     */
    generateAgentMd(blueprint: any, templatePath: string): Promise<string>;
}
