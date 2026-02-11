import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SkillMatcher } from './matcher.js';
import fs from 'fs-extra';
import path from 'path';
vi.mock('fs-extra');
describe('SkillMatcher', () => {
    let matcher;
    beforeEach(() => {
        matcher = new SkillMatcher('fake/path');
        vi.clearAllMocks();
    });
    it('should scan local directory recursively and find SKILL.md', async () => {
        const mockPaths = [{ path: 'local/skills', label: 'Claude' }];
        fs.pathExists.mockImplementation(async (p) => {
            if (p === 'local/skills')
                return true;
            if (p === path.join('local/skills', 'my-local-skill'))
                return true;
            if (p === path.join('local/skills', 'my-local-skill', 'SKILL.md'))
                return true;
            return false;
        });
        fs.readdir.mockImplementation(async (p) => {
            if (p === 'local/skills')
                return ['my-local-skill'];
            return [];
        });
        fs.stat.mockImplementation(async (p) => {
            return { isDirectory: () => !p.endsWith('SKILL.md') };
        });
        await matcher.scanLocalSkills(mockPaths);
        const results = matcher.match('local-skill');
        expect(results).toHaveLength(1);
        expect(results[0].name).toBe('my-local-skill');
        expect(results[0].isInstalled).toBe(true);
        expect(results[0].sourceEnv).toBe('Claude');
    });
    it('should prioritize local skills over remote skills with the same name', async () => {
        // Setup remote skills
        matcher.skills = [{ name: 'github', description: 'Remote GitHub', tags: ['git'], provider: 'vercel' }];
        // Setup local skills
        matcher.localSkills = [{ name: 'github', description: 'Local GitHub', tags: ['git'], provider: 'local', sourceEnv: 'Cursor' }];
        const results = matcher.match('git');
        expect(results).toHaveLength(1);
        expect(results[0].provider).toBe('local');
        expect(results[0].isInstalled).toBe(true);
        expect(results[0].sourceEnv).toBe('Cursor');
    });
});
