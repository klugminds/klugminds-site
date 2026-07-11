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
- GitHub Actions CI, Docker dev setup, Husky + lint-staged.
- ADR 0002 (Next.js website stack).
- AI-ready setup: `AGENTS.md`, `.cursor/rules/`, `.cursorignore`.

### Changed

- Production Docker: multi-stage `Dockerfile.prod`, nginx reverse proxy, Next.js `standalone` output.
- `.dockerignore` excludes source docs, AI config, and dev files from production build context.
- Consolidated governance content into `docs/company/`.
- Updated root README to reflect website + documentation dual purpose.
- Updated cross-references across CONTRIBUTING, PROJECT_MEMORY, templates, and policies.

## [0.1.0] - 2026-07-11

### Added

- Repository foundation with documentation-first structure.
- Root documentation: README, PROJECT_MEMORY, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT.
- Developer hygiene files: `.gitignore`, `.editorconfig`, `.gitattributes`, MIT LICENSE.
- Documentation hub under `docs/` with eight specialized subdirectories.
- Architecture Decision Record process and seed ADR 0001.
- Company policies, standards, and reusable document templates.
- GitHub community health files: issue templates, pull request template.
- Per-folder README files explaining purpose and usage for every directory.

[Unreleased]: https://github.com/klugminds/klugminds-site/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/klugminds/klugminds-site/releases/tag/v0.1.0
