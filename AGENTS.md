# Agents

Entry point for AI tools working in this repository. Keep context small — load only what the task needs.

## Start here

1. **[PROJECT_MEMORY.md](PROJECT_MEMORY.md)** — phase, rules, directory index, task routing (~1 min read)
2. **`.cursor/rules/`** — auto-applied constraints (do not duplicate in chat)

## Token-efficient workflow

| Task         | Read first                               | Read only if needed        |
| ------------ | ---------------------------------------- | -------------------------- |
| Any change   | `PROJECT_MEMORY.md`                      | —                          |
| Docs edit    | `docs/<section>/README.md`               | Other sections             |
| New decision | `templates/adr-template.md`              | `docs/decisions/README.md` |
| Standards    | `standards/README.md`                    | Full `docs/` tree          |
| Website work | `app/`, `components/`, `lib/site-url.ts` | `docs/branding/`           |
| Security     | `SECURITY.md`                            | `docs/security/README.md`  |

**Do not** load every `docs/**/README.md` or traverse the full tree unless the user asks for a broad audit.

## Repository

- **Private** monorepo: Next.js website + `docs/`
- **Phase:** Website foundation — placeholder homepage live
- **Split:** TBD; treat as single repo for now

## Human docs (on demand)

- [README.md](README.md) — repo overview for humans
- [docs/README.md](docs/README.md) — docs index
- [CONTRIBUTING.md](CONTRIBUTING.md) — PR/commit workflow
