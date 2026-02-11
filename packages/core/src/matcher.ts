import fs from 'fs-extra';
import path from 'path';
import { Skill } from './schema.js';

export interface RegistrySkill {
    name: string;
    description: string;
    tags: string[];
    provider: string;
    sourceEnv?: string;
}

export class SkillMatcher {
    private skills: RegistrySkill[] = [];

    constructor(private registryPath: string) { }

    private fallbackSkills: RegistrySkill[] = [
        { name: 'crypto', description: 'Monitor cryptocurrency prices and trends.', tags: ['bitcoin', 'ethereum', 'trading', 'price'], provider: 'vercel-labs' },
        { name: 'duckduckgo', description: 'Search the web using DuckDuckGo.', tags: ['search', 'search-engine', 'web'], provider: 'vercel-labs' },
        { name: 'github', description: 'Interact with GitHub repositories and issues.', tags: ['repo', 'pr', 'issue', 'git'], provider: 'vercel-labs' },
        { name: 'mathematics', description: 'Perform complex mathematical calculations.', tags: ['math', 'calculate', 'formula'], provider: 'vercel-labs' },
        { name: 'serpapi', description: 'Google search results API.', tags: ['google', 'search', 'results'], provider: 'vercel-labs' },
        { name: 'slack', description: 'Send messages and interact with Slack.', tags: ['chat', 'message', 'slack', 'team'], provider: 'vercel-labs' },
        { name: 'wikipedia', description: 'Search and fetch information from Wikipedia.', tags: ['wiki', 'info', 'knowledge'], provider: 'vercel-labs' },
        { name: 'wolfram-alpha', description: 'Access Wolfram|Alpha knowledge base.', tags: ['computational', 'data', 'facts'], provider: 'vercel-labs' },
        { name: 'youtube', description: 'Search and interact with YouTube videos.', tags: ['video', 'media', 'youtube'], provider: 'vercel-labs' }
    ];

    private localSkills: RegistrySkill[] = [];

    async loadRegistry() {
        try {
            // Attempt to fetch live registry, but fall back to curated list if 404
            const response = await fetch('https://raw.githubusercontent.com/vercel-labs/skills/main/registry.json');
            if (response.ok) {
                this.skills = await response.json();
            } else {
                this.skills = this.fallbackSkills;
            }
        } catch (err) {
            this.skills = this.fallbackSkills;
        }
    }

    async scanLocalSkills(localPaths: { path: string, label: string }[]) {
        this.localSkills = [];
        for (const entry of localPaths) {
            if (await fs.pathExists(entry.path)) {
                await this.recursiveScan(entry.path, entry.label);
            }
        }
    }

    private async recursiveScan(dir: string, label: string) {
        const items = await fs.readdir(dir);
        for (const item of items) {
            if (['node_modules', '.git'].includes(item)) continue;
            const fullPath = path.join(dir, item);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                const skillMdPath = path.join(fullPath, 'SKILL.md');
                if (await fs.pathExists(skillMdPath)) {
                    this.localSkills.push({
                        name: item,
                        description: `Local skill found at ${fullPath}`,
                        tags: [item],
                        provider: 'local',
                        sourceEnv: label
                    });
                } else {
                    await this.recursiveScan(fullPath, label);
                }
            }
        }
    }

    /**
     * Matches keywords against both local and remote skills.
     */
    match(input: string): Skill[] {
        const lowerInput = input.toLowerCase();

        const filterFn = (skill: RegistrySkill) => {
            const tagMatch = skill.tags.some(tag => lowerInput.includes(tag.toLowerCase()));
            const contentMatch = skill.name.toLowerCase().includes(lowerInput) ||
                skill.description.toLowerCase().includes(lowerInput);
            return tagMatch || contentMatch;
        };

        const localMatches = this.localSkills.filter(filterFn).map(s => ({
            name: s.name,
            provider: s.provider,
            isInstalled: true,
            sourceEnv: s.sourceEnv
        }));

        const remoteMatches = this.skills
            .filter(filterFn)
            .filter(s => !localMatches.some(l => l.name === s.name))
            .map(s => ({
                name: s.name,
                provider: s.provider,
                isInstalled: false
            }));

        return [...localMatches, ...remoteMatches];
    }
}
