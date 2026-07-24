# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Company legal details (GST registration) on homepage and footer.
- `npm run validate` — lint, type-check, format, build in one command.
- Post-change validation prompt: `.cursor/prompts/validate-changes.md`.

### Changed

- Application code moved under `src/`; root reserved for tooling, Docker, CI, and AI config.
- Production indexing auto-enabled on Vercel production deployments.
- Restricted `Access-Control-Allow-Origin` to canonical origin.

## [0.1.0] - 2026-07-11

### Added

- Initial monorepo commit (website + docs; superseded by split).

[Unreleased]: https://github.com/klugminds/klugminds-site/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/klugminds/klugminds-site/releases/tag/v0.1.0
