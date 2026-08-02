/** The four demo films, one per solution. */
export type DemoKind = 'stream' | 'queue' | 'ring' | 'sessions';

/**
 * A demo stage: `init` builds the SVG scaffolding once and returns a handle;
 * `frame` writes the handle for time t. `frame(t)` must be a pure function of
 * t — no state to unwind when scrubbing backwards.
 */
export type DemoStage<H = unknown> = {
  init(svg: SVGSVGElement): H;
  frame(handle: H, t: number): void;
};

/** Erase the handle type for the registry while keeping init/frame paired. */
export function defineStage<H>(stage: DemoStage<H>): DemoStage {
  return stage as DemoStage;
}
