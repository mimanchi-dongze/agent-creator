import Handlebars from 'handlebars';
import fs from 'fs-extra';
import { AgentBlueprint, AgentBlueprintSchema } from './schema.js';

export class AgentGenerator {
    /**
     * Validates the blueprint object against the Zod schema.
     */
    validate(blueprint: any): AgentBlueprint {
        return AgentBlueprintSchema.parse(blueprint);
    }

    /**
     * Renders a template with the provided data without validation.
     */
    async renderRaw(templatePath: string, data: any): Promise<string> {
        const templateSource = await fs.readFile(templatePath, 'utf-8');
        const template = Handlebars.compile(templateSource);
        return template(data);
    }

    /**
     * Renders a template with the provided blueprint data after validation.
     */
    async render(templatePath: string, blueprint: any): Promise<string> {
        const validatedData = this.validate(blueprint);
        return this.renderRaw(templatePath, validatedData);
    }

    /**
     * Helper to render the default agent.md content.
     */
    async generateAgentMd(blueprint: any, templatePath: string): Promise<string> {
        return this.render(templatePath, blueprint);
    }
}
