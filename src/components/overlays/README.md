# Overlays

Site-wide overlays, mounted once from the root layout via `GlobalOverlays`:

- `Overlay.tsx` — the one overlay primitive: veil, panel, Escape, focus trap,
  scroll lock, focus restore
- `BriefingWizard.tsx` — 3 validated steps → review → mailto + clipboard
  handoff (no form backend; nothing is stored on this site)
- `CommandPalette.tsx` — ⌘K / Ctrl+K / `/`, authored search index
- `Toaster.tsx` — toast host; fire via `toast()` in `src/lib/toast.ts`

CTAs open the wizard through `openBriefing()` in `src/lib/briefing.ts` and keep
a `mailto:` href as the no-JS fallback. Search triggers call `openCommandPalette()`
in `src/lib/command-palette.ts`.
