# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Next.js 15 website foundation with placeholder homepage.
- Reusable components: Navbar, Footer, Container, Section, Button, Logo, JsonLd.
- Tailwind v4 design system with CSS variables.
- SEO: metadata, Open Graph, Twitter Cards, sitemap, robots, manifest, JSON-LD.
- GitHub Actions CI, Docker dev and prod setup, Husky + lint-staged.
- AI-ready setup: `AGENTS.md`, `.cursor/rules/`, `.cursorignore`.

### Changed

- **Repository split:** internal docs moved to `klugminds-handbook`; this repo is website-only and public-ready.
- Production Docker: multi-stage `Dockerfile.prod`, nginx reverse proxy, Next.js `standalone` output.
- README and CONTRIBUTING focused on website development and Vercel deployment.

## [0.1.0] - 2026-07-11

### Added

- Initial monorepo commit (website + docs; superseded by split).

[Unreleased]: https://github.com/klugminds/klugminds-site/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/klugminds/klugminds-site/releases/tag/v0.1.0
