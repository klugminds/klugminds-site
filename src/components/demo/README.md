# Demo films

Video-style product demonstrations drawn from a script, not recorded: every
frame is a pure function of time, so they are sharp at any size, weigh
nothing, and scrub exactly.

- `DemoPlayer.tsx` — the client player: play/pause, scrubbable timeline
  (pointer capture + keyboard), -5s, speed cycle, caption toggle, fullscreen.
  Pauses off-screen; autoplay is opt-in per player and never under reduced
  motion. Only one film plays at a time.
- `toolkit.ts` — the tiny SVG toolkit and timing primitives (`win`, `lerp`,
  eases, seeded PRNG) the stages draw with.
- `stages/` — one renderer per film: `stream` (fraud, 32s), `queue` (AML,
  30s), `ring` (iGaming, 30s), `sessions` (responsible gaming, 28s). Each
  exports `{ init(svg), frame(handle, t) }`; `frame` must write every value
  it owns on every call so scrubbing backwards never leaves stale state.

Captions support `**bold**` markers and are real DOM text (selectable,
screen-reader readable). Film copy lives in the page content modules.
