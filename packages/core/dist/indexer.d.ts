export interface ProjectContext {
    projectName: string;
    description: string;
    instructions: string[];
    directoryTree: string;
    commands: {
        install: string;
        build: string;
        test: string;
        dev: string;
    };
    conventions: {
        language: string;
        lint: string;
        patterns: string;
    };
}
export declare class ProjectIndexer {
    index(rootPath: string, metadata?: {
        description: string;
        goals: string[];
    }): Promise<ProjectContext>;
    private generateTree;
}
