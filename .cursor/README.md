# Cursor AI configuration

Lean setup for token-efficient agent sessions.

## Files

| File                                      | Role                                            |
| ----------------------------------------- | ----------------------------------------------- |
| [AGENTS.md](../AGENTS.md)                 | **Start here** — task routing, what not to load |
| [PROJECT_MEMORY.md](../PROJECT_MEMORY.md) | Dense snapshot when routing is not enough       |
| [rules/](rules/)                          | Auto-applied `.mdc` rules                       |

## Rules

| Rule                | Scope                                                    |
| ------------------- | -------------------------------------------------------- |
| `project-core.mdc`  | Always — phase, limits, token discipline                 |
| `docs-markdown.mdc` | `docs/**/*.md`                                           |
| `website.mdc`       | `app/`, `apps/`, `src/`, `website/`, `web/` (when added) |

## Token discipline

- Do not instruct agents to read every README under `docs/`
- Use AGENTS.md routing table for task-specific paths
- PROJECT_MEMORY is compressed; expand via section READMEs on demand

## Related

- [docs/ai/README.md](../docs/ai/README.md) — Klugminds AI strategy (product), not Cursor config
- [CONTRIBUTING.md](../CONTRIBUTING.md) — human contribution workflow
