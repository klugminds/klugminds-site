# Source

Application code for the Klugminds website.

## Navigation

| Directory                  | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| [app/](app/)               | Next.js App Router (routes, metadata, SEO) |
| [components/](components/) | UI (layout, motion, viz, overlays, detail) |
| [features/](features/)     | Feature modules (future)                   |
| [hooks/](hooks/)           | Custom React hooks                         |
| [lib/](lib/)               | Utilities (site-url, metadata, cn)         |
| [services/](services/)     | API clients (future)                       |
| [types/](types/)           | Shared TypeScript types                    |
| [utils/](utils/)           | General utilities                          |
| [config/](config/)         | Static site config (no URLs)               |
| [constants/](constants/)   | Route constants                            |
| [styles/](styles/)         | Global CSS and design tokens               |

## Purpose

All runtime website code lives under `src/`. Project tooling (Docker, CI, Cursor) and static assets (`public/`) stay at the repository root.

Import via `@/` alias (maps to `src/`).

## Related Documents

- [../README.md](../README.md) — setup and deployment
- [../public/README.md](../public/README.md) — static assets
- [../AGENTS.md](../AGENTS.md) — agent routing

## Future Topics

- Feature-based colocation under `features/`
- Shared test utilities under `src/` when tests are added
