# Klugminds Website

**Public company website for [Klugminds](https://www.klugminds.ai).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## About

Next.js 15 company website — placeholder homepage today, foundation for blog, auth, CMS, and dashboard features. Internal company documentation lives in the private [klugminds-handbook](https://github.com/klugminds/klugminds-handbook) repository.

## Technology stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 15 (App Router)                    |
| UI         | React 19                                   |
| Language   | TypeScript (strict)                        |
| Styling    | Tailwind CSS v4 (CSS variables + `@theme`) |
| Quality    | ESLint, Prettier, Husky, lint-staged       |
| CI         | GitHub Actions                             |
| Containers | Docker (development + production)          |

## Quick start

### Prerequisites

- Node.js 24+ ([.nvmrc](.nvmrc))
- npm

### Setup

```bash
git clone https://github.com/klugminds/klugminds-site.git
cd klugminds-site
npm install
```

Copy environment file for **local development**:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ALLOW_INDEXING=false
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## NPM scripts

| Script                 | Description              |
| ---------------------- | ------------------------ |
| `npm run dev`          | Start development server |
| `npm run build`        | Production build         |
| `npm run start`        | Start production server  |
| `npm run lint`         | Run ESLint               |
| `npm run lint:fix`     | Fix ESLint issues        |
| `npm run type-check`   | TypeScript check         |
| `npm run format`       | Format with Prettier     |
| `npm run format:check` | Check formatting         |
| `npm run clean`        | Remove `.next` and `out` |

## Project structure

```
src/           Application code (see src/README.md)
  app/         Next.js App Router
  components/  Reusable UI
  lib/         Utilities (site-url, metadata, security-headers)
  …
public/        Static assets
Dockerfile*    Container builds (repo root)
.github/       CI and issue templates
.cursor/       AI rules and slash commands
```

Root holds **tooling and config** only; all website code is under `src/`.

## Environment variables

| Variable                     | Default                          | Optional override           |
| ---------------------------- | -------------------------------- | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | `https://www.klugminds.ai`       | Local or alternate site URL |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only on Vercel production | Explicit `true` or `false`  |

All absolute URLs use `getSiteUrl()` from [src/lib/site-url.ts](src/lib/site-url.ts). Vercel previews and local development remain non-indexable unless explicitly enabled.

## Deployment

### Vercel (recommended)

1. Import this repository in Vercel (public repo or personal account).
2. Deploy without environment variables; production indexing is detected automatically.
3. Connect `klugminds.ai` DNS to Vercel.

### Production Docker

Multi-stage build with Next.js `standalone` output. Final image contains compiled server and static assets only — no TypeScript source or dev dependencies. Nginx sits in front as a reverse proxy.

```bash
docker compose -f docker-compose.prod.yml up --build
```

Open [http://localhost:8080](http://localhost:8080).

| File                                               | Purpose                                     |
| -------------------------------------------------- | ------------------------------------------- |
| [Dockerfile.prod](Dockerfile.prod)                 | Multi-stage production build                |
| [docker-compose.prod.yml](docker-compose.prod.yml) | nginx + app stack                           |
| [nginx/nginx.conf](nginx/nginx.conf)               | Reverse proxy, rate limit, security headers |
| [Dockerfile](Dockerfile)                           | Dev only — `npm run dev` with hot reload    |

### Docker (development)

```bash
docker compose up
```

## Related repositories

| Repository           | Visibility | Purpose                |
| -------------------- | ---------- | ---------------------- |
| `klugminds-site`     | Public     | This website           |
| `klugminds-handbook` | Private    | Internal documentation |

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) · AI context: [AGENTS.md](AGENTS.md)

## License

[MIT License](LICENSE)
