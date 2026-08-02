# Viz panels

React implementations of the interactive graphics from the V4 reference (`viz.py` / `viz.js`).

## Layout

- **SelectableViz panels** — static SVG marks with client-side picking (`FunnelPanel`, `MapPanel`, …).
- **Client panels** — sliders or buttons that drive the readout (`ThresholdPanel`, `HarmPanel`, `GatesPanel`).
- **`index.ts`** — `VizKind`, `VIZ_PANELS`, and `VizPanel` for rendering by kind.

Copy, stats, and plot geometry follow the V4 generator. Each SVG uses `VizBackdrop` with a unique id.

## Adding a panel

1. Add `<Name>Panel.tsx` in this folder.
2. Register the `data-viz` kind string in `VizKind` and `VIZ_PANELS` in `index.ts`.
3. Wire the panel into the relevant page (outside this folder).
