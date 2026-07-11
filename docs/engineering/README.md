# Engineering

Development workflow, practices, and conventions for Klugminds engineers.

## Navigation

| Section           | Link                                                    |
| ----------------- | ------------------------------------------------------- |
| Documentation hub | [docs/README.md](../README.md)                          |
| Architecture      | [architecture/README.md](../architecture/README.md)     |
| API               | [api/README.md](../api/README.md)                       |
| Infrastructure    | [infrastructure/README.md](../infrastructure/README.md) |
| Security          | [security/README.md](../security/README.md)             |
| Decisions         | [decisions/README.md](../decisions/README.md)           |
| Standards         | [standards/README.md](../../standards/README.md)        |

## Purpose

This directory defines how Klugminds engineers write, review, test, and ship software — including the company website in this repository. It establishes shared expectations so contributors work consistently across projects.

Engineering practices documented here apply to all code in `klugminds-site`, whether website frontend, API routes, automation scripts, or future services.

## Development Workflow

### Branching

| Branch      | Purpose                                    |
| ----------- | ------------------------------------------ |
| `main`      | Stable, reviewed content; protected branch |
| `feature/*` | New capabilities or significant additions  |
| `fix/*`     | Bug fixes and corrections                  |
| `docs/*`    | Documentation-only changes                 |
| `chore/*`   | Maintenance, tooling, housekeeping         |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.

### Pull Requests

- One concern per PR; keep diffs focused and reviewable.
- Use the [pull request template](../../.github/PULL_REQUEST_TEMPLATE.md).
- Require at least one approval before merge.
- Update [CHANGELOG.md](../../CHANGELOG.md) for notable changes.

### Code Review Expectations

Reviewers evaluate correctness, clarity, convention compliance, security, and test coverage. Authors respond to feedback promptly and keep PRs moving.

## Related Documents

- [standards/README.md](../../standards/README.md) — coding and documentation standards
- [architecture/README.md](../architecture/README.md) — system design principles
- [api/README.md](../api/README.md) — API design conventions
- [infrastructure/README.md](../infrastructure/README.md) — hosting and deployment
- [security/README.md](../security/README.md) — secure development practices
- [decisions/README.md](../decisions/README.md) — architectural decisions
- [onboarding/README.md](../onboarding/README.md) — new engineer guide
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — contribution workflow

## Future Topics

- Website local development setup and prerequisites
- Branching and release strategy for site deployments
- Code review checklist and approval matrix
- Testing strategy (unit, integration, end-to-end, visual regression)
- CI/CD pipeline documentation
- Dependency management and update policy
- Performance budgets for the company website
- Accessibility standards (WCAG) for frontend work
