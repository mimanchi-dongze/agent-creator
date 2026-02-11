# @codemi/agent-creator-core

The logic engine behind Agent Creator. Provides project indexing, skill matching, and template rendering for AI-native development.

## Features
- **ProjectIndexer**: Scans repos to extract structure, commands, and conventions.
- **SkillMatcher**: Cross-environment skill discovery and remote registry integration.
- **Template Engine**: Handlebars-based rendering for AGENTS.md.

## Installation
```bash
npm install @codemi/agent-creator-core
```

## Usage
```typescript
import { ProjectIndexer, SkillMatcher } from '@codemi/agent-creator-core';

const indexer = new ProjectIndexer();
const context = await indexer.index(process.cwd());
```
