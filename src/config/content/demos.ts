import type { DemoFilm } from '@/components/demo/DemoPlayer';
import type { SolutionSlug } from '@/constants/routes';

/** Demo films wired to solution detail `#demo` sections — configs from V4. */
export const SOLUTION_DEMOS: Record<
  SolutionSlug,
  DemoFilm & { posterTitle: string; posterBody: string }
> = {
  'fraud-detection': {
    kind: 'stream',
    title: 'Scoring card authorisations in flight',
    duration: 32,
    poster: 0.62,
    posterTitle: 'One number decides block, review, or approve',
    posterBody:
      'Watch a live authorisation stream land on the score axis, then watch the cut-off move and re-decide everything already on screen.',
    ariaLabel: 'Scoring card authorisations in flight — animated product demonstration',
    captions: [
      {
        t: 1,
        text: 'Card authorisations arrive continuously. Each one is scored before the acquirer times out.',
      },
      { t: 7, text: 'The model returns a **position on an axis**, not a yes or a no.' },
      {
        t: 13,
        text: 'The cut-off at **0.62** is the only place a business decision enters. Everything left of it is approved.',
      },
      {
        t: 19,
        text: 'Loosen the cut-off to 0.44 and more fraud is caught — **and the review queue grows with it**.',
      },
      {
        t: 26,
        text: 'Both costs are on screen at once, which is the point. There is no setting that removes the trade.',
      },
    ],
  },
  'aml-monitoring': {
    kind: 'queue',
    title: 'A day of alerts down to six reports',
    duration: 30,
    poster: 0.7,
    posterTitle: '1,240 alerts, 38 human reviews, 6 filed reports',
    posterBody:
      'The triage funnel that makes an alert volume survivable — and the one case the rules never raised.',
    ariaLabel: 'AML alert triage — animated product demonstration',
    captions: [
      {
        t: 1,
        text: 'One operating day of transaction monitoring: **1,240 alerts** from the scenario library.',
      },
      {
        t: 5,
        text: 'Deduplication first. The same customer raised by four scenarios is one piece of work, not four.',
      },
      {
        t: 12,
        text: 'The model does not close alerts. It **orders** them, so the analyst day is spent at the top of the list.',
      },
      {
        t: 18,
        text: 'This one the scenarios never raised: nine deposits under the threshold, four branches, six days.',
      },
      {
        t: 23,
        text: 'Six reports filed, each carrying the ranked evidence that produced it. **The trail is the deliverable.**',
      },
    ],
  },
  'igaming-integrity': {
    kind: 'ring',
    title: 'Finding a collusion ring at one table',
    duration: 30,
    poster: 0.78,
    posterTitle: 'Three seats that stopped being three players',
    posterBody:
      '480 hands of chip flow, device overlap, and session timing — until the ring is not a coincidence.',
    ariaLabel: 'iGaming collusion ring detection — animated product demonstration',
    captions: [
      { t: 1, text: 'One table, six seats, 480 hands. Nothing here is unusual on its own.' },
      {
        t: 4,
        text: 'Chip flow first: value moving **consistently in one direction** is the signal that starts the case.',
      },
      {
        t: 10,
        text: 'Then corroboration. Two of the three seats share a device fingerprint; sessions overlap 94% of the time.',
      },
      {
        t: 15,
        text: 'Together the three seats read as **one actor with three hands** — the asymmetry is 3.1×.',
      },
      {
        t: 21,
        text: 'The response is defined in advance: suspend, preserve the hand history, and notify the regulator.',
      },
    ],
  },
  'responsible-gaming': {
    kind: 'sessions',
    title: 'A graded response to escalating harm',
    duration: 28,
    poster: 0.8,
    posterTitle: 'Fourteen days, four tiers, one intervention at a time',
    posterBody:
      'Session length, night play, and deposit velocity build a harm score — and each tier has a response written before it fires.',
    ariaLabel: 'Responsible gaming harm trajectory — animated product demonstration',
    captions: [
      { t: 1, text: "Fourteen days of one player's sessions. Orange bars are play after 01:00." },
      {
        t: 6,
        text: 'Tier one is **observe**. The model is confident enough to watch and not confident enough to act.',
      },
      {
        t: 11,
        text: 'Tier two shows the player their own numbers in session. Most escalation stops here.',
      },
      {
        t: 16,
        text: 'Tier three applies a **deposit limit** without waiting for anyone to approve it.',
      },
      {
        t: 21,
        text: "Tier four offers cool-off and pages a human. Every tier's response was written before it fired.",
      },
    ],
  },
};
