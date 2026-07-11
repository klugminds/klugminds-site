# Documentation

Internal references for the Klugminds team — indexed by topic.

## Navigation

| Section                           | Description                                           |
| --------------------------------- | ----------------------------------------------------- |
| [Company](company/)               | Mission, values, organization, and governance         |
| [Product](product/)               | Vision, roadmap, and requirements                     |
| [Engineering](engineering/)       | Development workflow and practices                    |
| [Architecture](architecture/)     | System design and technical diagrams                  |
| [API](api/)                       | API contracts, specifications, and integration guides |
| [AI](ai/)                         | AI strategy, models, prompts, and responsible use     |
| [Infrastructure](infrastructure/) | Cloud, hosting, networking, and environments          |
| [Security](security/)             | Security principles, threat models, and practices     |
| [Operations](operations/)         | Incident response, observability, and SRE practices   |
| [Runbooks](runbooks/)             | Service-specific operational procedures               |
| [Onboarding](onboarding/)         | New team member guides and checklists                 |
| [Decisions](decisions/)           | Architecture and organizational decision records      |
| [Branding](branding/)             | Visual identity, voice, and brand guidelines          |
| [Marketing](marketing/)           | Positioning, campaigns, and go-to-market              |
| [Finance](finance/)               | Budgeting, billing, and financial operations          |
| [Legal](legal/)                   | Contracts, compliance, and intellectual property      |

## Purpose

The `docs/` folder holds how Klugminds works — engineering practices, product direction, security, operations, and company context. It supports building and running the [company website](../README.md), not replacing it.

Each subdirectory has a `README.md` with navigation, purpose, related documents, and planned topics. Significant technical choices go in [decisions/](decisions/).

## Writing Guidelines

- Start every document with a clear title and summary paragraph.
- Use ATX headings (`##`, `###`) for scanability.
- End substantive documents with a **Related Documents** section.
- Use relative links for all internal references.
- Follow [.editorconfig](../.editorconfig) for whitespace and line endings.
- Record significant decisions in [decisions/](decisions/) using [templates/adr-template.md](../templates/adr-template.md).

### Naming Conventions

| Type             | Convention             | Example                      |
| ---------------- | ---------------------- | ---------------------------- |
| Decision records | `NNNN-short-title.md`  | `0002-website-framework.md`  |
| Guides           | `kebab-case.md`        | `incident-response.md`       |
| Diagrams         | `kebab-case.{svg,png}` | `system-context-diagram.svg` |

## Related Documents

- [README.md](../README.md) — repository overview
- [PROJECT_MEMORY.md](../PROJECT_MEMORY.md) — AI agent context and repository rules
- [standards/README.md](../standards/README.md) — engineering standards
- [templates/README.md](../templates/README.md) — reusable document templates
- [policies/README.md](../policies/README.md) — formal company policies
- [CONTRIBUTING.md](../CONTRIBUTING.md) — contribution workflow

## Future Topics

- Searchable documentation index generated from folder structure
- Documentation versioning aligned with website releases
- Automated link validation in CI
- Glossary of Klugminds terms shared across sections
- Role-based reading paths (engineer, product, marketing, legal)
