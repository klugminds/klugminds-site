# Standards

Engineering standards and conventions for Klugminds.

## Purpose

This directory defines the conventions that all Klugminds repositories and contributors follow. Standards ensure consistency, reduce cognitive load, and make code and documentation predictable across the organization.

## Standards Index

| Standard                                  | Scope                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------- |
| [Documentation](#documentation-standards) | Markdown, README, and cross-linking conventions                       |
| [Naming](#naming-conventions)             | Files, branches, variables, and API naming                            |
| [Git](#git-standards)                     | Branching, commits, and pull request practices                        |
| [Code](#code-standards)                   | Language-agnostic coding principles (applied when code is introduced) |
| [API](#api-standards)                     | REST API design conventions (applied when APIs are built)             |

## Documentation Standards

- Every directory must contain a `README.md` explaining its purpose.
- Use ATX-style headings (`#`, `##`, `###`).
- Prefer relative links for internal references.
- Write in clear, direct prose; avoid jargon without definition.
- Use fenced code blocks with language identifiers.
- Keep documents focused; split large topics into separate files with cross-links.

## Naming Conventions

### Files and Directories

| Type          | Convention                          | Example                    |
| ------------- | ----------------------------------- | -------------------------- |
| Directories   | `kebab-case`                        | `docs/`, `issue-template/` |
| Markdown docs | `kebab-case.md` or `README.md`      | `incident-response.md`     |
| ADRs          | `NNNN-kebab-case.md`                | `0002-use-postgresql.md`   |
| Scripts       | `kebab-case.sh` or `kebab-case.mjs` | `lint-docs.sh`             |

### Git

| Type     | Convention               | Example                  |
| -------- | ------------------------ | ------------------------ |
| Branches | `type/short-description` | `docs/update-onboarding` |
| Tags     | `vMAJOR.MINOR.PATCH`     | `v0.1.0`                 |

### Code (Future)

| Type            | Convention                                 | Example             |
| --------------- | ------------------------------------------ | ------------------- |
| Variables       | `camelCase` (JS/TS), `snake_case` (Python) | `userId`, `user_id` |
| Constants       | `UPPER_SNAKE_CASE`                         | `MAX_RETRY_COUNT`   |
| Classes/Types   | `PascalCase`                               | `UserService`       |
| Files (modules) | `kebab-case` or language convention        | `user-service.ts`   |

## Git Standards

- **Default branch:** `main` (protected).
- **Commit messages:** [Conventional Commits](https://www.conventionalcommits.org/).
- **Pull requests:** one concern per PR; use the PR template.
- **Merge strategy:** squash merge for clean history (configure in repository settings).
- **No force push** to `main`.

## Code Standards

When code is introduced, all repositories must follow these principles:

1. **Readability** — code is written for humans; optimize for clarity over cleverness.
2. **Small functions** — each function does one thing; prefer composition over large methods.
3. **Explicit types** — use type systems where available; avoid `any` in TypeScript.
4. **Error handling** — handle errors at boundaries; never swallow exceptions silently.
5. **No magic values** — use named constants for literals with meaning.
6. **Tests for behavior** — write tests that verify behavior, not implementation details.
7. **Linting and formatting** — enforce via automated tools in CI.

Language-specific standards will be added here when the primary language is chosen via ADR.

## API Standards

When REST APIs are built:

- Use nouns for resource paths: `/users`, `/orders/{id}`.
- Use HTTP methods semantically: GET (read), POST (create), PUT/PATCH (update), DELETE (remove).
- Return appropriate status codes: 200, 201, 204, 400, 401, 403, 404, 409, 500.
- Version APIs in the URL path: `/v1/users`.
- Document APIs with OpenAPI specifications.
- Use consistent error response format across all endpoints.

## Updating Standards

1. Propose changes via pull request.
2. Discuss with affected teams.
3. If the change is significant, create a decision record in [docs/decisions/](../docs/decisions/).
4. Update this document and notify the team.

## Related Documentation

- [docs/engineering/README.md](../docs/engineering/README.md) — development workflow
- [CONTRIBUTING.md](../CONTRIBUTING.md) — contribution process
- [templates/README.md](../templates/README.md) — document templates
