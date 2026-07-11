# Contributing to Klugminds Website

Thank you for contributing to the Klugminds company website. This guide covers code changes in `klugminds-site`. For internal documentation, use [klugminds-handbook](https://github.com/klugminds/klugminds-handbook).

## Before You Start

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md).
2. Review [PROJECT_MEMORY.md](PROJECT_MEMORY.md) for repository phase and rules.
3. Read [README.md](README.md) for setup and environment variables.

## What to Contribute

- Website UI, pages, and components
- SEO, metadata, and performance improvements
- CI, Docker, and deployment configuration
- Bug fixes and accessibility improvements

Do not add internal company documentation here — that belongs in `klugminds-handbook`.

## Development Workflow

### 1. Clone

```bash
git clone https://github.com/klugminds/klugminds-site.git
cd klugminds-site
npm install
cp .env.example .env.local
```

### 2. Create a Branch

| Prefix     | Use for                         |
| ---------- | ------------------------------- |
| `feature/` | New pages, components, features |
| `fix/`     | Bug fixes                       |
| `chore/`   | Tooling, CI, dependencies       |
| `docs/`    | README and repo-level docs only |

### 3. Quality Checks

```bash
npm run lint
npm run type-check
npm run build
```

Pre-commit hooks run lint-staged automatically.

### 4. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(home): add hero section
fix(seo): correct canonical URL in metadata
chore(ci): bump Node to 24
```

### 5. Pull Request

- Use [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md).
- One concern per PR.
- Update [CHANGELOG.md](CHANGELOG.md) for notable changes.
- Never commit secrets or `.env.local`.

## Architecture Decisions

Significant technical decisions are recorded in `klugminds-handbook` → `docs/decisions/`. Link the ADR in your PR when applicable.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
