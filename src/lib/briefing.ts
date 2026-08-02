/**
 * Cross-component channel for the briefing wizard. Any CTA can request the
 * overlay; the wizard mounted in the root layout listens. CTAs keep a mailto
 * href so the action still works before hydration or without JS.
 */
export const OPEN_BRIEFING_EVENT = 'km:open-briefing';

export type OpenBriefingDetail = {
  /** Where the request came from, prefilled into the hidden context field. */
  topic?: string;
};

export function openBriefing(topic?: string): void {
  window.dispatchEvent(
    new CustomEvent<OpenBriefingDetail>(OPEN_BRIEFING_EVENT, { detail: { topic } }),
  );
}
