# Templates

Reusable document templates for Klugminds.

## Purpose

This directory provides standardized templates for common document types. Using templates ensures consistency, completeness, and reduces the effort required to create new documentation.

## Available Templates

| Template                                         | Use for                    | Output location                         |
| ------------------------------------------------ | -------------------------- | --------------------------------------- |
| [adr-template.md](adr-template.md)               | Architecture decisions     | `docs/decisions/NNNN-title.md`          |
| [rfc-template.md](rfc-template.md)               | Large cross-team proposals | `docs/company/` or PR body              |
| [runbook-template.md](runbook-template.md)       | Operational runbooks       | `docs/operations/`                      |
| [design-doc-template.md](design-doc-template.md) | Feature and system design  | `docs/architecture/` or `docs/product/` |

## How to Use

1. Copy the appropriate template to the target directory.
2. Rename the file following the naming conventions in [standards/README.md](../standards/README.md).
3. Fill in all sections; delete guidance comments if present.
4. Submit via pull request for review.

## Template Maintenance

- Templates are living documents. Propose improvements via pull request.
- When a template changes significantly, note the update in [CHANGELOG.md](../CHANGELOG.md).
- New templates require a README update in this file.

## Related Documentation

- [docs/decisions/README.md](../docs/decisions/README.md) — decision record process
- [docs/company/README.md](../docs/company/README.md) — governance and RFC process
- [docs/operations/README.md](../docs/operations/README.md) — runbook standards
- [standards/README.md](../standards/README.md) — naming conventions
