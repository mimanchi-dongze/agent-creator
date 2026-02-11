# 🤖 Agent Creator (v0.12)

> **通过高信息密度的“被动上下文”和跨平台技能集成，释放 AI Agent 的全部潜力。**

[![NPM Version](https://img.shields.io/npm/v/@codemi/agent-creator.svg)](https://www.npmjs.com/package/@codemi/agent-creator)
[![GitHub License](https://img.shields.io/github/license/mimanchi-dongze/agent-creator.svg)](LICENSE)
[![CI/CD](https://github.com/mimanchi-dongze/agent-creator/actions/workflows/publish.yml/badge.svg)](https://github.com/mimanchi-dongze/agent-creator/actions)

[English](./README.md) | **简体中文**

Agent Creator 是一个强大的 Monorepo 工具，旨在自动化构建“AI 原生”项目。它实现了 **Passive Context Protocol（被动上下文协议）**（由 Vercel 团队提出），旨在通过提供高密度的项目上下文，使 AI Agent 的任务成功率在第一步就达到 **100%**。

---

## 📖 核心理念与动机

目前的 AI 编程工具大多依赖 **Active Retrieval（主动检索）**（例如：“让我先搜索一下文件树”）。然而，[Vercel 的研究](https://vercel.com/blog/assessing-agentic-coding-success-passive-context)表明，提供单一、高密度的索引文件（`AGENTS.md`）——即 **Passive Context（被动上下文）**——能带来显著的性能提升：

- **100% 成功率 vs 70%**：拥有完整被动上下文的代理在复杂任务中能达到完美的成功率。
- **零延迟**：消除了代理决定“该搜索什么”的思考步骤。
- **跨代理标准**：一种通用的上下文格式，适用于 Claude、Cursor 等各种工具。

**Agent Creator** 的使命是让每一位开发者都能低成本地应用这一协议。

---

## 🔥 核心特性

### 1. 🧠 被动上下文策略 (Passive Context)
彻底消除 AI 的“检索决策”瓶颈。Agent Creator 会自动扫描你的整个代码库——包括架构、指令、工具和规范——并生成压缩后的 `AGENTS.md`。这确保了你的 AI 助理（Claude, Cursor, Windsurf 等）在对话的第一秒就拥有全部上下文，无需浪费 Token 或依赖由于训练数据过时而导致的“瞎猜”。

### 2. 🤖 多 AI 代理技能发现
无需重复安装。Agent Creator 会自动识别并复用其他 AI 平台已安装的技能：
- **Claude Code** (`.claude/skills`)
- **Cursor** (`.cursor/skills`)
- **Windsurf** (`.windsurf/skills`)
- **Trae** (`.trae/skills`)
- **全局 Vercel Skills** (`.agents/skills`)

匹配到的技能将被优先推荐并标注来源（如 `(Local - Claude)`），实现真正的一处安装，全平台通用。

### 3. ⌨️ Slash Command & 技能集成
Agent Creator 本身就是一个**标准化的 Skill**。将其链接到你的 AI 编辑器后，你可以直接通过 `/agent-creator init` 调用，享受丝滑的初始化流程。

---

## 🚀 快速上手

### 安装
```bash
# 使用 npx (推荐)
npx @codemi/agent-creator init

# 或者全局安装
npm install -g @codemi/agent-creator
```

### 使用方法
在你的项目根目录运行以下命令，启动 AI 原生初始化流程：
```bash
agent-creator init
```
1. **描述你的 Agent**：用自然语言告诉我们你想构建什么。
2. **选择技能**：从 Vercel 注册表或你的本地环境（Claude/Cursor 等）中挑选技能。
3. **享受上下文**：系统将自动生成 `AGENTS.md`，为你的 AI 结对编程做好所有准备。

---

## 🏗️ 架构说明

本项目是一个基于 `npm workspaces` 的 Monorepo：

| 软件包 | 职责 |
| :--- | :--- |
| **[`@codemi/agent-creator-core`](./packages/core)** | 逻辑引擎：负责索引、技能匹配和模板渲染。 |
| **[`@mimanchi-dongze/agent-creator`](./packages/cli)** | 交互层：提供命令行体验和模板打包。 |

---

## 🛠️ 开发与 CI/CD

本项目使用 **GitHub Actions** 实现自动化发布。任何向 `main` 分支提交的带有版本标签（如 `v1.0.0`）的操作，都会自动触发构建并发布到 NPM。

---

## 🤝 贡献
欢迎任何形式的贡献！请随时提交 PR 或提出 Issue。

## 📄 开源协议
MIT © 2026
