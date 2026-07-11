# GitHub Configuration

This directory contains GitHub-specific configuration for the Klugminds repository.

## Contents

| Path                                                 | Purpose                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| [ISSUE_TEMPLATE/](ISSUE_TEMPLATE/)                   | Structured issue forms for bugs, features, and documentation |
| [PULL_REQUEST_TEMPLATE.md](PULL_REQUEST_TEMPLATE.md) | Default pull request description template                    |

## Issue Templates

Three form-based issue templates are available:

- **Bug Report** — for defects in repository content or tooling
- **Feature Request** — for new capabilities or significant improvements
- **Documentation** — for documentation gaps, corrections, or additions

Templates use GitHub's YAML issue form format. They automatically apply labels and provide structured fields for consistent issue quality.

## Pull Request Template

The PR template enforces a checklist covering:

- Contribution guidelines compliance
- Documentation quality
- ADR format (when applicable)
- Changelog updates
- Secret scanning awareness

## Future Additions

When application code is introduced, add the following under this directory:

| Path             | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `workflows/`     | CI/CD pipelines (lint, test, build, deploy) |
| `dependabot.yml` | Automated dependency update configuration   |
| `CODEOWNERS`     | Automatic review assignment by path         |

### Workflow Guidelines

- Keep workflows vendor-neutral where possible; document provider-specific choices in ADRs.
- Use path filters to avoid running expensive jobs on documentation-only changes.
- Require status checks on `main` before merge (configure in repository settings).

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) — contribution workflow
- [docs/engineering/README.md](../docs/engineering/README.md) — engineering practices
- [docs/company/README.md](../docs/company/README.md) — governance and change management
