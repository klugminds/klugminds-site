# Features

Feature modules for the Klugminds website.

## Navigation

| Section    | Link                                               |
| ---------- | -------------------------------------------------- |
| App routes | [../app/README.md](../app/README.md)               |
| Components | [../components/README.md](../components/README.md) |

## Purpose

Feature-based modules group domain logic (auth, blog, CMS, dashboard, contact, analytics) separate from shared UI primitives. Each future feature gets its own subdirectory with components, hooks, and types colocated.

## Planned modules

- `auth/` — authentication flows
- `blog/` — blog posts and listing
- `cms/` — content management integration
- `dashboard/` — authenticated user dashboard
- `admin/` — admin portal
- `contact/` — contact forms
- `analytics/` — analytics integration
- `payments/` — payment flows
- `ai/` — AI-powered features

## Related Documents

- [klugminds-handbook → product](https://github.com/klugminds/klugminds-handbook/blob/main/docs/product/README.md) — product requirements
- [klugminds-handbook → architecture](https://github.com/klugminds/klugminds-handbook/blob/main/docs/architecture/README.md) — system design

## Future Topics

- Feature module conventions and boundaries
- Shared feature types and API clients
