# Agent Blueprint Schema (v0.1)

The Agent Blueprint is the core configuration format for Agent Creator. It defines the agent's identity, capabilities, and behaviors.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Agent Blueprint",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Unique identifier for the agent."
    },
    "version": {
      "type": "string",
      "description": "Semantic versioning of the agent config."
    },
    "description": {
      "type": "string",
      "description": "Natural language description of the agent's purpose."
    },
    "goals": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Primary objectives the agent should achieve."
    },
    "triggers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "enum": ["manual", "webhook", "schedule", "event"] },
          "description": { "type": "string" }
        },
        "required": ["type"]
      }
    },
    "skills": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "provider": { "type": "string" },
          "config": { "type": "object" }
        },
        "required": ["name"]
      }
    },
    "workflow": {
      "type": "object",
      "description": "Definition of the agent's internal process logic."
    }
  },
  "required": ["name", "description", "goals"]
}
```

## Rationale
- **Goals over Tasks**: Focus on high-level intent so LLMs can reason about execution.
- **Pluggable Skills**: Allows easy integration with external tool registries.
- **Flexible Workflow**: Initially a generic object to support different framework formats (LangChain graphs, AutoGen conversations).
