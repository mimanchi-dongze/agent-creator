# v0.1 Core User Scenarios

## Scenario 1: The Code Reviewer Agent
**User Input**: "I need an agent that reviews my GitHub Pull Requests for security issues and coding style."

**Agent Creator Output**:
- `agent.md` defining the security and style review goals.
- Workflows for fetching PR diffs.
- Recommended tools: `github-api`, `llm-security-scanner`.

## Scenario 2: The Daily Researcher
**User Input**: "Create an agent that summarizes the latest AI news from Twitter and Hacker News every morning at 8 AM."

**Agent Creator Output**:
- `agent.md` with scheduled task definitions.
- Integration templates for `twitter-api`, `hn-api`.
- Output formatting templates (Markdown for Obsidian).

## Scenario 3: Basic Skill Generator
**User Input**: "Help me write a new skill for my agent that translates German to English."

**Agent Creator Output**:
- Skill configuration JSON.
- Implementation scaffold in TypeScript.
- Unit test template.
