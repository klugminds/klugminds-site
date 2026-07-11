# Cursor slash commands

Type `/` in Cursor Agent chat to run these project commands. Optional text after the command is passed as context (e.g. deploy URL).

## Commands

| Command      | File                         | Purpose                                       |
| ------------ | ---------------------------- | --------------------------------------------- |
| `/validate`  | [validate.md](validate.md)   | Coding standards + lightweight pentest        |
| `/pentest`   | [pentest.md](pentest.md)     | Security review only (live site + repo)       |
| `/standards` | [standards.md](standards.md) | Lint, types, format, build + repo conventions |

## Usage

```
/validate
/pentest
/pentest https://my-preview.vercel.app
/standards
```

**On demand only** — not run on every commit or push.

Detailed checklists live in [../prompts/validate-changes.md](../prompts/validate-changes.md).

## Related

- [../prompts/README.md](../prompts/README.md) — prompt reference
- [../README.md](../README.md) — Cursor setup overview
