# On-demand validation

Use **slash commands** in Cursor Agent chat — not on every commit or push.

## Slash commands (primary)

Type `/` in chat:

| Command      | When to use                                       |
| ------------ | ------------------------------------------------- |
| `/validate`  | Full review before release or after big changes   |
| `/pentest`   | Security headers + exposure checks only           |
| `/standards` | ESLint, TypeScript, Prettier, build + conventions |

Optional URL after the command, e.g. `/pentest https://preview.vercel.app`

See [../commands/README.md](../commands/README.md).

## Detailed checklist

[validate-changes.md](validate-changes.md) — full agent instructions (referenced by slash commands).

## Also works in plain chat

Phrases like “validate changes” or “pentest” still trigger the same workflow via `.cursor/rules/validate-on-request.mdc`.
