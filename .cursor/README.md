# Cursor AI configuration

Lean setup for token-efficient agent sessions.

## Files

| File                                      | Role                                            |
| ----------------------------------------- | ----------------------------------------------- |
| [AGENTS.md](../AGENTS.md)                 | **Start here** — task routing, what not to load |
| [PROJECT_MEMORY.md](../PROJECT_MEMORY.md) | Dense snapshot when routing is not enough       |
| [rules/](rules/)                          | Auto-applied `.mdc` rules                       |

## Rules

| Rule               | Scope                                                     |
| ------------------ | --------------------------------------------------------- |
| `project-core.mdc` | Always — phase, limits, token discipline                  |
| `website.mdc`      | `app/`, `components/`, `lib/`, `config/`, `styles/`, etc. |

## Token discipline

- Use AGENTS.md routing table for task-specific paths
- Company docs and ADRs live in `klugminds-handbook` — do not load unless asked
- PROJECT_MEMORY is compressed; expand via code READMEs on demand

## Related

- [klugminds-handbook → docs/ai](https://github.com/klugminds/klugminds-handbook/blob/main/docs/ai/README.md) — Klugminds AI strategy (product), not Cursor config
- [CONTRIBUTING.md](../CONTRIBUTING.md) — human contribution workflow
