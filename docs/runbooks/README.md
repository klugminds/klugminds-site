# Runbooks

Service-specific operational procedures for Klugminds.

## Navigation

| Section           | Link                                                    |
| ----------------- | ------------------------------------------------------- |
| Documentation hub | [docs/README.md](../README.md)                          |
| Operations        | [operations/README.md](../operations/README.md)         |
| Infrastructure    | [infrastructure/README.md](../infrastructure/README.md) |
| Engineering       | [engineering/README.md](../engineering/README.md)       |
| Security          | [security/README.md](../security/README.md)             |

## Purpose

This directory contains step-by-step runbooks for operating Klugminds services in production. Each runbook answers: "What is this service, how do I know it is healthy, and what do I do when something goes wrong?"

Runbooks are distinct from [operations/](../operations/), which defines frameworks and incident processes. Runbooks are the tactical guides operators follow during alerts and outages.

The first runbook target is the **company website** once it is deployed to production.

## Runbook Standards

Use [templates/runbook-template.md](../../templates/runbook-template.md) for every runbook. Required sections:

| Section           | Purpose                                    |
| ----------------- | ------------------------------------------ |
| Service overview  | What the service does and its dependencies |
| Health checks     | How to verify the service is healthy       |
| Common alerts     | Alert names, thresholds, and meanings      |
| Diagnosis steps   | Systematic troubleshooting guide           |
| Remediation steps | How to fix known problems                  |
| Escalation        | When and how to escalate                   |
| Rollback          | How to revert a bad deployment             |

## Naming Convention

```
runbooks/<service-name>.md
```

Examples: `company-website.md`, `api-gateway.md`, `dns.md`

## Related Documents

- [operations/README.md](../operations/README.md) — incident response framework
- [infrastructure/README.md](../infrastructure/README.md) — hosting and environments
- [engineering/README.md](../engineering/README.md) — deployment workflow
- [security/README.md](../security/README.md) — security incident procedures
- [templates/runbook-template.md](../../templates/runbook-template.md) — runbook template
- [scripts/README.md](../../scripts/README.md) — operational automation scripts

## Future Topics

- Company website production runbook
- DNS and domain failover runbook
- CDN cache invalidation procedures
- SSL certificate renewal runbook
- Database backup and restore runbook
- CI/CD pipeline failure recovery
- Third-party service outage playbooks
- On-call handoff checklist
