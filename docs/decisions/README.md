# Decisions

Architecture and organizational decision records for Klugminds.

## Navigation

| Section           | Link                                                         |
| ----------------- | ------------------------------------------------------------ |
| Documentation hub | [docs/README.md](../README.md)                               |
| Company           | [company/README.md](../company/README.md)                    |
| Architecture      | [architecture/README.md](../architecture/README.md)          |
| Engineering       | [engineering/README.md](../engineering/README.md)            |
| Templates         | [templates/adr-template.md](../../templates/adr-template.md) |

## Purpose

This directory captures significant technical and organizational decisions along with their context, alternatives, and consequences. Decision records (ADRs) prevent re-litigating settled choices and give new contributors the background needed to make informed changes.

Every major choice affecting the company website, infrastructure, or engineering practices should be recorded here before implementation.

## When to Write a Decision Record

Create a record when a decision:

- Affects system architecture, data flow, or integration patterns
- Introduces or removes a technology, framework, or platform
- Changes security posture or authentication approach
- Establishes a convention multiple teams will follow
- Has significant trade-offs future contributors need to understand
- Is difficult or expensive to reverse

## Format

Decision records follow a lightweight MADR-inspired format. Use [templates/adr-template.md](../../templates/adr-template.md).

| Field      | Values                                             |
| ---------- | -------------------------------------------------- |
| **Status** | `proposed`, `accepted`, `deprecated`, `superseded` |
| **Naming** | `NNNN-short-title.md` (sequential numbering)       |
| **Review** | Submitted and approved via pull request            |

## Process

1. Copy the template and assign the next sequential number.
2. Set status to `proposed` and open a pull request.
3. Discuss with stakeholders in the PR review.
4. Update status to `accepted` upon merge.
5. If a decision changes, create a new record and mark the old one `superseded`.

## Index

| Record                                        | Title                         | Status   |
| --------------------------------------------- | ----------------------------- | -------- |
| [0001](0001-record-architecture-decisions.md) | Record Architecture Decisions | accepted |
| [0002](0002-nextjs-website-stack.md)          | Next.js Website Stack         | accepted |
| [0002](0002-nextjs-website-stack.md)          | Next.js Website Stack         | accepted |

## Related Documents

- [0001-record-architecture-decisions.md](0001-record-architecture-decisions.md) — meta-decision establishing this process
- [company/README.md](../company/README.md) — governance framework
- [architecture/README.md](../architecture/README.md) — system design
- [templates/adr-template.md](../../templates/adr-template.md) — decision record template
- [templates/rfc-template.md](../../templates/rfc-template.md) — RFC template for large proposals
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — contribution workflow

## Future Topics

- ADR for company website framework selection
- ADR for hosting and deployment platform
- ADR for primary programming language
- ADR for authentication strategy
- ADR for monorepo vs. polyrepo structure
- ADR for AI model provider selection
- Automated ADR index generation script
