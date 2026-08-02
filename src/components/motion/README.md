# Motion

The V4 motion layer, rebuilt for React.

- `MotionEffects.tsx` — one global client binder mounted in the root layout.
  Pages stay server components and opt in with attribute hooks: `data-reveal`,
  `data-clip`, `data-counter`, `data-tilt`, `data-magnet`, `data-parallax`,
  and the `.v4-spot` / `.btn-glow` / `.v4-metrics` classes.
- `KineticHeading.tsx` — word-by-word headline reveal. Keep gradient phrases
  (`.v4-lit`) as a single child element; they are wrapped atomically because
  `background-clip: text` cannot survive being split across word boxes.

All motion is gated by `prefers-reduced-motion` and pointer-driven effects
attach only on `(hover: hover) and (pointer: fine)`.
