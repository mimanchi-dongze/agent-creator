import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectIndexer, AgentGenerator } from '@agent-creator/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const indexCommand = async () => {
    console.log('🔍 Indexing project for Passive Context...');

    try {
        const rootPath = process.cwd();
        const indexer = new ProjectIndexer();
        const context = await indexer.index(rootPath);

        const generator = new AgentGenerator();
        const templatePath = path.resolve(__dirname, '../templates/agents.md.hbs');

        if (!await fs.pathExists(templatePath)) {
            console.error(`Error: Template not found at ${templatePath}`);
            return;
        }

        const agentsMdContent = await generator.renderRaw(templatePath, context);
        const targetPath = path.join(rootPath, 'AGENTS.md');
        await fs.writeFile(targetPath, agentsMdContent);

        console.log(`\n✅ Success! AGENTS.md (Passive Context) generated at ${targetPath}`);
        console.log('AI agents like Cursor and Claude Code will now have better project awareness.');
    } catch (err) {
        console.error('Indexing failed:', err);
    }
};
