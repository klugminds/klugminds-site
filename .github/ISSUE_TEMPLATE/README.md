# Issue Templates

Structured GitHub issue forms for consistent, high-quality issue reporting.

## Purpose

This directory contains YAML-based issue templates that GitHub presents when contributors open a new issue. Each template provides guided fields to ensure reporters include the information needed for efficient triage and resolution.

## Templates

| Template        | File                                       | Label           | Use when                                                |
| --------------- | ------------------------------------------ | --------------- | ------------------------------------------------------- |
| Bug Report      | [bug_report.yml](bug_report.yml)           | `bug`           | Reporting defects in repository content or tooling      |
| Feature Request | [feature_request.yml](feature_request.yml) | `enhancement`   | Proposing new capabilities or significant improvements  |
| Documentation   | [documentation.yml](documentation.yml)     | `documentation` | Reporting documentation gaps or suggesting improvements |

## How Templates Work

GitHub reads YAML files in this directory and presents them as selectable options on the "New Issue" page. Each template:

- Sets a default title prefix (e.g., `[Bug]: `).
- Applies a label automatically.
- Defines required and optional form fields.
- Uses markdown blocks for introductory guidance.

## Adding a New Template

1. Create a new `.yml` file in this directory following the [GitHub issue forms syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms).
2. Choose a descriptive filename in `snake_case`.
3. Assign an appropriate label (create the label in repository settings if it does not exist).
4. Update this README with the new template entry.
5. Update [.github/README.md](../README.md) if the template category is new.

## Related Documentation

- [.github/README.md](../README.md) — GitHub configuration overview
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — contribution workflow
