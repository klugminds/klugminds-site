# Contributing to Klugminds

Thank you for contributing to the Klugminds organizational repository. This guide explains how to propose, review, and merge changes.

## Before You Start

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md).
2. Review [PROJECT_MEMORY.md](PROJECT_MEMORY.md) to understand the repository's current phase and rules.
3. Check [docs/onboarding/README.md](docs/onboarding/README.md) for the recommended reading order.

## What to Contribute

This repository welcomes contributions to:

- Documentation improvements and corrections
- Architecture Decision Records (ADRs)
- Engineering standards and conventions
- Policy documents and governance guides
- Templates for reusable document formats
- Repository automation scripts

Do not contribute application code, deployable services, or secrets unless explicitly scoped and approved.

## Development Workflow

### 1. Fork and Clone

```bash
git clone https://github.com/klugminds/klugminds-site.git
cd klugminds-site
```

### 2. Create a Branch

Use descriptive branch names with a type prefix:

| Prefix     | Use for                                   |
| ---------- | ----------------------------------------- |
| `docs/`    | Documentation changes                     |
| `feature/` | New capabilities or significant additions |
| `fix/`     | Corrections to existing content           |
| `chore/`   | Maintenance, tooling, housekeeping        |

Example: `docs/add-onboarding-checklist`

### 3. Make Changes

- Follow [standards/README.md](standards/README.md) for writing and formatting conventions.
- Update or create README.md files when adding new directories.
- Use templates from [templates/](templates/) for ADRs, RFCs, runbooks, and design docs.
- Record architectural decisions in [docs/decisions/](docs/decisions/).

### 4. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Examples:

```
docs(adr): add ADR for authentication strategy
fix(onboarding): correct repository clone URL
chore(templates): update runbook template sections
```

### 5. Open a Pull Request

- Use the pull request template provided in [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md).
- Link related issues if applicable.
- Request review from a team member with domain expertise.
- Ensure all checklist items are addressed before requesting merge.

## Pull Request Guidelines

- **One concern per PR** — keep changes focused and reviewable.
- **Update the changelog** — add entries under `[Unreleased]` in [CHANGELOG.md](CHANGELOG.md) for notable changes.
- **No secrets** — never include API keys, tokens, passwords, or private configuration.
- **Cross-link** — reference related docs, ADRs, and standards where relevant.

## Architecture Decision Records

When a change involves a significant technical or organizational decision:

1. Copy [templates/adr-template.md](templates/adr-template.md) to `docs/decisions/NNNN-short-title.md`.
2. Assign the next sequential number.
3. Set status to `proposed` and submit for review.
4. Update status to `accepted` after approval.

See [docs/decisions/README.md](docs/decisions/README.md) for the full process.

## Documentation Standards

- Write in clear, direct prose.
- Use relative links for internal references.
- Avoid vendor-specific language unless documenting a deliberate choice in an ADR.
- Every directory must have a README.md explaining its purpose.

## Review Process

1. Author opens a pull request with a clear description.
2. At least one team member reviews for accuracy, clarity, and convention compliance.
3. Author addresses feedback.
4. Reviewer approves and merges.

## Questions

Open a [documentation issue](.github/ISSUE_TEMPLATE/documentation.yml) for questions about contributing, or reach out to the engineering team directly.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
