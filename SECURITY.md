# Security Policy

## Supported Versions

This repository is in its foundation phase and contains documentation only. Security updates apply to the repository itself and any future code introduced here.

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability related to Klugminds systems, repositories, or documentation that exposes sensitive information, please report it responsibly.

**Email:** security@klugminds.com

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested remediation (optional)

**Do not** open a public GitHub issue for security vulnerabilities.

## Response Timeline

| Stage                         | Target                              |
| ----------------------------- | ----------------------------------- |
| Acknowledgment                | Within 2 business days              |
| Initial assessment            | Within 5 business days              |
| Resolution or mitigation plan | Within 30 days (severity-dependent) |

We will keep you informed of progress and coordinate disclosure timing with you.

## Scope

This policy covers:

- This repository and its contents
- Klugminds organizational infrastructure (when established)
- Klugminds products and services (when launched)

Out of scope:

- Third-party services not operated by Klugminds
- Social engineering attacks
- Physical security issues

## Security Practices for Contributors

- **Never commit secrets** — no API keys, tokens, passwords, private keys, or credentials.
- **Use `.env.example`** — when environment variables are needed in the future, provide example files without real values.
- **Review before pushing** — check diffs for accidental inclusion of sensitive data.
- **Follow least privilege** — request only the access you need.
- **Report incidents promptly** — if you suspect a compromise, contact security@klugminds.com immediately.

## Security Documentation

For security principles, threat modeling guidance, and secure development practices, see [docs/security/README.md](docs/security/README.md).

## Recognition

We appreciate responsible disclosure and will acknowledge researchers who help improve Klugminds security, with permission.
