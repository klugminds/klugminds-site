# Agents

Entry point for AI tools working in this repository. Keep context small — load only what the task needs.

## Start here

1. **[PROJECT_MEMORY.md](PROJECT_MEMORY.md)** — phase, rules, directory index (~1 min read)
2. **`.cursor/rules/`** — auto-applied constraints (do not duplicate in chat)

## Token-efficient workflow

| Task                                      | Read first                                             | Read only if needed                            |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Any change                                | `PROJECT_MEMORY.md`                                    | —                                              |
| User runs `/validate` or asks to validate | `.cursor/commands/validate.md` → `validate-changes.md` | `SECURITY.md`                                  |
| Website work                              | `src/app/`, `src/components/`, `src/lib/site-url.ts`   | `src/config/site.ts`, `src/styles/globals.css` |
| Branding                                  | —                                                      | `klugminds-handbook` → `docs/branding/`        |
| ADRs / docs                               | —                                                      | `klugminds-handbook` → `docs/decisions/`       |
| Security                                  | `SECURITY.md`                                          | `klugminds-handbook` → `docs/security/`        |

**Do not** load handbook docs unless the user explicitly asks for company or policy context.

**Do not** run the full validation/pentest workflow unless the user asks in chat (see `.cursor/prompts/README.md`).

## Repository

- **Public** website: Next.js 16 app
- **Handbook:** [klugminds-handbook](https://github.com/klugminds/klugminds-handbook) (private, internal docs)
- **Phase:** Website foundation — V4 marketing site (solutions, services, industries, legal, overlays, viz panels)

## Human docs (on demand)

- [README.md](README.md) — setup, scripts, deployment
- [CONTRIBUTING.md](CONTRIBUTING.md) — PR/commit workflow
