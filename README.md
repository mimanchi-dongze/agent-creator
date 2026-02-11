# 🤖 Agent Creator (v0.12)

> **Unlock the full potential of AI Agents with high-density Passive Context and Multi-Agent Skill integration.**

**English** | [简体中文](./README_CN.md)

[![NPM Version](https://img.shields.io/npm/v/@codemi/agent-creator.svg)](https://www.npmjs.com/package/@codemi/agent-creator)
[![GitHub License](https://img.shields.io/github/license/mimanchi-dongze/agent-creator.svg)](LICENSE)
[![CI/CD](https://github.com/mimanchi-dongze/agent-creator/actions/workflows/publish.yml/badge.svg)](https://github.com/mimanchi-dongze/agent-creator/actions)

Agent Creator is a powerful Monorepo designed to automate the setup of AI-native projects. It implements the **Passive Context Protocol** (innovated by the Vercel team), which enables AI agents to reach **100% task success rates** by providing high-density project context from the very first turn.

---

## 📖 Philosophy & Motivation

Current AI coding tools often rely on **Active Retrieval** (e.g., "let me search for the file tree"). However, [Vercel's research](https://vercel.com/blog/assessing-agentic-coding-success-passive-context) shows that providing a single, high-density index (`AGENTS.md`)—known as **Passive Context**—leads to significantly better outcomes:

- **100% Success vs 70%**: Agents with full passive context achieve perfect success rates in complex tasks.
- **Zero Latency**: Eliminates the "thinking" steps where agents decide what to search.
- **Cross-Agent Standard**: A unified context format that works across Claude, Cursor, and beyond.

**Agent Creator** simplifies the adoption of this protocol for every developer.

---

## 🔥 Key Features

### 1. 🧠 Passive Context Strategy
Eliminate the "retrieval decision" bottleneck. Agent Creator scans your entire repository—architecture, commands, tools, and conventions—to generate a compressed `AGENTS.md`. This ensures your AI Agent (Claude, Cursor, etc.) has all the context it needs without needing to explicitly call search tools.

### 2. 🤖 Multi-Agent Skill Discovery
Stop duplicating efforts. Agent Creator automatically discovers and leverages skills installed by other AI platforms:
- **Claude Code** (`.claude/skills`)
- **Cursor** (`.cursor/skills`)
- **Windsurf** (`.windsurf/skills`)
- **Trae** (`.trae/skills`)
- **Global Vercel Skills** (`.agents/skills`)

Matched skills are prioritized and labeled (e.g., `(Local - Claude)`), allowing you to reuse your AI assets across any coding tool.

### 3. ⌨️ Slash Command & Skill Integration
Agent Creator is itself a **standardized Skill**. Once linked, you can invoke it in any compatible AI editor using `/agent-creator init`.

---

## 🚀 Quick Start

### Installation
```bash
# Using npx (Recommended)
npx @codemi/agent-creator init

# Or install globally
npm install -g @codemi/agent-creator
```

### Usage
Run the following command in your project root to start the AI-native initialization flow:
```bash
agent-creator init
```
1. **Describe your agent**: Tell us what you're building in natural language.
2. **Select Skills**: Mix and match from the Vercel Registry and your local environment.
3. **Enjoy the Context**: Watch as `AGENTS.md` is generated, perfectly tailored for your AI pairs.

---

## 🏗️ Architecture

This is a Monorepo powered by `npm workspaces`:

| Package | Role |
| :--- | :--- |
| **[`@codemi/agent-creator-core`](./packages/core)** | The logic engine: handles indexing, skill matching, and template rendering. |
| **[`@mimanchi-dongze/agent-creator`](./packages/cli)** | The interactive layer: provides the CLI experience and template bundling. |

---

## 🛠️ Development & CI/CD

This project uses **GitHub Actions** for automated publishing. Any push to `main` with a version tag (e.g., `v1.0.0`) automatically triggers a build and push to NPM.

### Build from source
```bash
npm install
npm run build
```

---

## 🤝 Contributing
We welcome contributions! Please feel free to submit PRs or open issues for feature requests.

## 📄 License
MIT © 2026
