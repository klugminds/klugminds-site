# Klugminds

**Klugminds company website and repository.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## About

Official website for [Klugminds](https://klugminds.ai) built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. This repository also contains internal documentation under `docs/`.

## Technology stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 15 (App Router)                    |
| UI         | React 19                                   |
| Language   | TypeScript (strict)                        |
| Styling    | Tailwind CSS v4 (CSS variables + `@theme`) |
| Quality    | ESLint, Prettier, Husky, lint-staged       |
| CI         | GitHub Actions                             |
| Containers | Docker (development)                       |

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
app/           Next.js App Router (routes, metadata, SEO)
components/    Reusable UI (layout, ui, seo)
features/      Feature modules (future: blog, auth, CMS)
hooks/         Custom React hooks
lib/           Utilities (site-url, metadata, cn)
services/      API clients (future)
types/         Shared TypeScript types
utils/         General utilities
config/        Static site config (no URLs)
constants/     Route constants
styles/        Global CSS and design tokens
public/        Static assets
docs/          Internal company documentation
```

## Environment variables

| Variable                     | Development             | Production             |
| ---------------------------- | ----------------------- | ---------------------- |
| `NEXT_PUBLIC_SITE_URL`       | `http://localhost:3000` | `https://klugminds.ai` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                 | `true`                 |

All absolute URLs use `getSiteUrl()` from [lib/site-url.ts](lib/site-url.ts). Default fallback: `https://klugminds.ai`.

## Deployment

### Production (Docker — compiled, no source in image)

The production image uses a **multi-stage build** with Next.js `standalone` output. The final container contains only:

- Compiled `server.js` and minimal runtime `node_modules`
- Static assets (`.next/static`, `public/`)

It does **not** include TypeScript source, `docs/`, `.cursor/`, or dev dependencies. Nginx sits in front as a reverse proxy.

```bash
docker compose -f docker-compose.prod.yml up --build
```

Open [http://localhost:8080](http://localhost:8080) (nginx → Next.js).

Build production image only:

```bash
docker build -f Dockerfile.prod \
  --build-arg NEXT_PUBLIC_SITE_URL=https://klugminds.ai \
  --build-arg NEXT_PUBLIC_ALLOW_INDEXING=true \
  -t klugminds-site:prod .
```

| File                                               | Purpose                                      |
| -------------------------------------------------- | -------------------------------------------- |
| [Dockerfile.prod](Dockerfile.prod)                 | Multi-stage production build                 |
| [docker-compose.prod.yml](docker-compose.prod.yml) | nginx + app stack                            |
| [nginx/nginx.conf](nginx/nginx.conf)               | Reverse proxy, rate limit, security headers  |
| [Dockerfile](Dockerfile)                           | **Dev only** — `npm run dev` with hot reload |

### Hosted deployment

1. Set production env vars (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING=true`).
2. `npm run build && npm run start`, or use your platform's Next.js integration (Vercel, etc.).
3. CI runs lint, type-check, and build on every PR and push to `main`.

**Note:** Browser JavaScript is always minified bundles — that is normal for any website. Production Docker ensures **server-side source** (`.ts`, `.tsx`, internal docs) is not shipped in the image.

## Docker (development)

```bash
docker compose up
```

## Documentation

Internal references: [docs/](docs/) · Contributing: [CONTRIBUTING.md](CONTRIBUTING.md) · AI context: [AGENTS.md](AGENTS.md)

## License

[MIT License](LICENSE)
