# Scripts

Automation scripts for the Klugminds repository.

## Purpose

This directory contains scripts that automate repository maintenance, documentation validation, and operational tasks. Scripts are version-controlled, documented, and runnable without manual intervention.

## Current State

No scripts have been added yet. This directory is reserved for future automation as the repository and organization grow.

## Conventions

When adding scripts to this directory:

### Naming

- Use `kebab-case` with an appropriate extension: `.sh`, `.mjs`, `.py`, `.ps1`.
- Prefix with the action: `lint-`, `validate-`, `generate-`, `deploy-`.

### Structure

```text
scripts/
├── README.md          # This file
├── lint-docs.sh       # Example: validate markdown links
└── generate-toc.mjs   # Example: generate table of contents
```

### Requirements

- Include a header comment describing purpose, usage, and prerequisites.
- Exit with non-zero status codes on failure.
- Accept no arguments for safe defaults; use flags for optional behavior.
- Be idempotent — running twice produces the same result.
- Avoid hardcoded secrets; read from environment variables.
- Document usage in this README when adding a new script.

### Example Header

```bash
#!/usr/bin/env bash
# lint-docs.sh — Validate internal markdown links in the repository.
# Usage: ./scripts/lint-docs.sh
# Prerequisites: Node.js 18+
set -euo pipefail
```

## Planned Scripts

These scripts will be added as the repository matures:

| Script             | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `lint-docs.sh`     | Validate relative links in markdown files                       |
| `check-readmes.sh` | Verify every directory has a README.md                          |
| `adr-index.sh`     | Regenerate the decision index table in docs/decisions/README.md |

## Running Scripts

When scripts are added, document the invocation here:

```bash
# Example (not yet available)
./scripts/lint-docs.sh
```

## Related Documentation

- [docs/operations/README.md](../docs/operations/README.md) — operational practices
- [standards/README.md](../standards/README.md) — naming conventions
- [CONTRIBUTING.md](../CONTRIBUTING.md) — contribution workflow
