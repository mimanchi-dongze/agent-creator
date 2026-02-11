import enquirer from 'enquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { execSync } from 'child_process';
import { AgentGenerator, SkillMatcher, ProjectIndexer } from '@mimanchi-dongze/agent-creator-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initCommand = async () => {
    console.log('🚀 Welcome to Agent Creator!');

    try {
        const answers: any = await (enquirer as any).prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your agent name?',
                default: 'my-agent'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Describe your agent\'s purpose:',
                default: 'A helpful AI assistant'
            },
            {
                type: 'input',
                name: 'goals',
                message: 'What are the main goals? (comma separated)',
                default: 'Help users, solve problems'
            }
        ]);

        const goalsArray = answers.goals.split(',').map((g: string) => g.trim());

        // 1. Skill Matching with Local Prioritization
        const matcher = new SkillMatcher('');
        await matcher.loadRegistry();

        // Define local paths to scan
        const homeDir = os.homedir();
        const localPaths = [
            { path: path.join(process.cwd(), '.agent/skills'), label: 'Project' },
            { path: path.join(process.cwd(), 'skills'), label: 'Project' },
            { path: path.join(homeDir, '.gemini/antigravity/skills'), label: 'Gemini' },
            { path: path.join(homeDir, '.agents/skills'), label: 'Vercel' },
            { path: path.join(homeDir, '.claude/skills'), label: 'Claude' },
            { path: path.join(homeDir, '.cursor/skills'), label: 'Cursor' },
            { path: path.join(homeDir, '.windsurf/skills'), label: 'Windsurf' },
            { path: path.join(homeDir, '.trae/skills'), label: 'Trae' }
        ];

        console.log('🔍 Scanning for local skills across multiple agents...');
        await matcher.scanLocalSkills(localPaths);

        const suggestedSkills = matcher.match(`${answers.description} ${answers.goals}`);

        let selectedSkills: any[] = [];
        if (suggestedSkills.length > 0) {
            const selection: any = await (enquirer as any).prompt([
                {
                    type: 'multiselect',
                    name: 'skills',
                    message: 'Found matching skills! Select to include:',
                    choices: suggestedSkills.map(s => ({
                        name: `${s.name}${s.isInstalled ? ` (Local - ${s.sourceEnv})` : ''}`,
                        value: s
                    }))
                }
            ]);

            selectedSkills = suggestedSkills.filter(s => {
                const choiceName = `${s.name}${s.isInstalled ? ` (Local - ${s.sourceEnv})` : ''}`;
                return selection.skills.includes(choiceName);
            });
        }

        // 2. Install Skills (npx skills add) - Only for remote skills
        const remoteSkills = selectedSkills.filter(s => !s.isInstalled);
        if (remoteSkills.length > 0) {
            console.log('\n📦 Installing remote skills...');
            for (const skill of remoteSkills) {
                try {
                    console.log(`- Adding ${skill.name}...`);
                    const pkg = `vercel-labs/agent-skills@${skill.name}`;
                    execSync(`npx skills add ${pkg}`, { stdio: 'inherit' });
                } catch (err) {
                    console.error(`Failed to install ${skill.name}. Skipping...`);
                }
            }
        } else if (selectedSkills.length > 0) {
            console.log('\n✅ All selected skills are already installed locally.');
        }

        // 3. Generate Passive Context (AGENTS.md)
        console.log('\n🔍 Generating AGENTS.md (Passive Context)...');
        const rootPath = process.cwd();
        const indexer = new ProjectIndexer();
        const context = await indexer.index(rootPath, {
            description: answers.description,
            goals: goalsArray
        });

        const generator = new AgentGenerator();
        const templatePath = path.resolve(__dirname, '../templates/agents.md.hbs');

        if (await fs.pathExists(templatePath)) {
            const agentsMdContent = await generator.renderRaw(templatePath, context);
            await fs.writeFile(path.join(rootPath, 'AGENTS.md'), agentsMdContent);
            console.log('✅ AGENTS.md generated.');
        }

        // 4. Cleanup
        const oldAgentMd = path.join(rootPath, 'agent.md');
        if (await fs.pathExists(oldAgentMd)) {
            await fs.remove(oldAgentMd);
            console.log('🧹 Cleaned up temporary agent.md.');
        }

        console.log(`\n🎉 Project "${answers.name}" is now ready for AI agents!`);
    } catch (err) {
        console.error('Operation cancelled/Error occurred:', err);
    }
};
