import fs from 'fs-extra';
import path from 'path';
export class ProjectIndexer {
    async index(rootPath, metadata) {
        const packageJsonPath = path.join(rootPath, 'package.json');
        let pkg = {};
        if (await fs.pathExists(packageJsonPath)) {
            pkg = await fs.readJSON(packageJsonPath);
        }
        return {
            projectName: pkg.name || path.basename(rootPath),
            description: metadata?.description || pkg.description || 'No description provided.',
            instructions: metadata?.goals || [],
            directoryTree: await this.generateTree(rootPath),
            commands: {
                install: 'npm install',
                build: pkg.scripts?.build ? 'npm run build' : 'N/A',
                test: pkg.scripts?.test ? 'npm run test' : 'N/A',
                dev: pkg.scripts?.dev ? 'npm run dev' : 'N/A',
            },
            conventions: {
                language: pkg.devDependencies?.typescript ? 'TypeScript' : 'JavaScript',
                lint: pkg.devDependencies?.eslint ? 'ESLint' : 'None',
                patterns: 'Standard Node.js/TypeScript patterns',
            },
        };
    }
    async generateTree(dir, depth = 0) {
        if (depth > 2)
            return ''; // Limit depth for high density
        if (!await fs.pathExists(dir))
            return '';
        const items = await fs.readdir(dir);
        let tree = '';
        for (const item of items) {
            if (['node_modules', '.git', 'dist', '.gemini'].includes(item))
                continue;
            try {
                const fullPath = path.join(dir, item);
                const stat = await fs.stat(fullPath);
                tree += '  '.repeat(depth) + (stat.isDirectory() ? '📂 ' : '📄 ') + item + '\n';
                if (stat.isDirectory()) {
                    tree += await this.generateTree(fullPath, depth + 1);
                }
            }
            catch (err) {
                // Skip files that can't be accessed
            }
        }
        return tree;
    }
}
