# Runbook: Service Name

- **Service:** <!-- service name -->
- **Owner:** <!-- team or individual responsible -->
- **Last updated:** YYYY-MM-DD
- **On-call:** <!-- rotation or contact method -->

## Overview

<!-- What does this service do? What depends on it? What does it depend on? -->

## Health Checks

<!-- How to verify the service is healthy. -->

| Check     | Command / URL  | Expected Result |
| --------- | -------------- | --------------- |
| Liveness  | `curl /health` | HTTP 200        |
| Readiness | `curl /ready`  | HTTP 200        |

## Dashboards and Alerts

| Resource     | Link                 |
| ------------ | -------------------- |
| Dashboard    | <!-- URL -->         |
| Alert policy | <!-- URL or name --> |

## Common Alerts

### Alert: [Alert Name]

- **Severity:** critical | warning | info
- **Meaning:** <!-- What this alert indicates -->
- **Diagnosis:**
  1. Step 1
  2. Step 2
- **Remediation:**
  1. Step 1
  2. Step 2

## Diagnosis Steps

<!-- Systematic troubleshooting guide for unknown issues. -->

1. Check service health endpoints.
2. Review recent deployments and configuration changes.
3. Inspect logs for errors (filter by severity and time range).
4. Check dependency health (database, cache, external APIs).
5. Review resource utilization (CPU, memory, disk, connections).

## Remediation Procedures

### Procedure: [Name]

<!-- Step-by-step fix for a known issue. -->

1. Step 1
2. Step 2
3. Verify recovery

## Rollback

<!-- How to revert a bad deployment or configuration change. -->

1. Identify the last known good version.
2. Execute rollback command or procedure.
3. Verify service health.
4. Notify stakeholders.

## Escalation

| Condition                    | Action                | Contact                |
| ---------------------------- | --------------------- | ---------------------- |
| SEV-1 not resolved in 30 min | Page engineering lead | <!-- contact -->       |
| Data integrity concern       | Page security team    | security@klugminds.com |

## Related Documentation

<!-- Links to architecture docs, ADRs, other runbooks. -->
