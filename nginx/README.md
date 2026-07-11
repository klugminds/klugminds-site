# Nginx (production)

Reverse proxy in front of the Next.js standalone server.

## Navigation

| Item                  | Link                                                     |
| --------------------- | -------------------------------------------------------- |
| Production compose    | [../docker-compose.prod.yml](../docker-compose.prod.yml) |
| Production Dockerfile | [../Dockerfile.prod](../Dockerfile.prod)                 |

## Purpose

Nginx is the public entry point in production Docker. It terminates HTTP (port 80 inside the stack, mapped to 8080 on host), applies rate limiting and security headers, and proxies to the Next.js container on port 3000.

The Next.js container is not exposed directly to the host.

## Related Documents

- [../README.md](../README.md) — deployment commands
- [../docs/infrastructure/README.md](../docs/infrastructure/README.md)

## Future Topics

- TLS termination (Let's Encrypt / cert-manager)
- HTTP/2 and gzip tuning
- CDN integration in front of nginx
