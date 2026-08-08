import type { GlyphName } from '@/components/ui/Glyph';
import type { FeatureIconKey } from '@/config/icons/feature-icons';
import { ROUTES, solutionRoute } from '@/constants/routes';

type Cta = {
  label: string;
  href: string;
};

/* -------------------------------------------------------------------------
   Legacy shared types, still imported by the not-yet-migrated Phase-2 pages
   (about, approach, industries, …). Deleted with them in Phase 2 cleanup.
   ------------------------------------------------------------------------- */

export type FeatureItem = {
  title: string;
  description: string;
  href?: string;
  icon?: FeatureIconKey;
  slug?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Partner = {
  name: string;
  href: string;
  description?: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoClassName?: string;
  /** Use when the logo asset is designed for dark backgrounds (e.g. white SVG). */
  logoSurface?: 'dark';
};

export type CaseStudy = {
  stat: string;
  industry: string;
  context: string;
  href: string;
};

export const homeContent = {
  hero: {
    eyebrow: 'Production AI · regulated industries',
    /** The lit phrase stays one span — gradient text must not be word-split. */
    title: {
      lead: 'AI systems that ship, scale, and ',
      lit: 'stay reliable',
      tail: ' in production.',
    },
    description:
      'Financial-crime machine learning — fraud, AML, iGaming integrity, and responsible gaming — built, explained, and operated by the engineers who wrote it. Four models are already in production shape and waiting for your data.',
    secondaryCta: { label: 'Explore the solutions', href: ROUTES.solutions } satisfies Cta,
    facts: [
      { label: 'Delivery centre', value: 'Bengaluru' },
      { label: 'Engagements', value: 'Europe · UAE · Canada' },
      { label: 'Team shape', value: 'Seniors only, no hand-offs' },
    ],
    glassStrip: [
      { label: 'Decision', value: 'Scored, not guessed' },
      { label: 'Evidence', value: 'Versioned artefacts' },
      { label: 'Operations', value: 'Monitored and paged' },
    ],
  },

  capabilities: {
    eyebrow: 'What we operate',
    title: 'Eighteen capabilities, four practices, one senior team.',
    aside:
      'Each one is something we have already put into production and now operate — not a service line invented for a slide.',
    chips: [
      { icon: 'shield', label: 'Card & payment fraud' },
      { icon: 'shield', label: 'AML transaction monitoring' },
      { icon: 'radar', label: 'Sanctions & PEP screening' },
      { icon: 'network', label: 'Mule-account detection' },
      { icon: 'dice', label: 'iGaming integrity' },
      { icon: 'dice', label: 'Bonus abuse & multi-accounting' },
      { icon: 'network', label: 'Collusion & graph learning' },
      { icon: 'target', label: 'Responsible gaming' },
      { icon: 'target', label: 'Escalating-harm detection' },
      { icon: 'wave', label: 'Device & behavioural signals' },
      { icon: 'network', label: 'Agentic AI with guardrails' },
      { icon: 'doc', label: 'Feature stores & lineage' },
      { icon: 'wave', label: 'Model monitoring & drift' },
      { icon: 'cloud', label: 'Cloud landing zones' },
      { icon: 'shield', label: 'CI/CD security gates' },
      { icon: 'doc', label: 'KYC document intelligence' },
      { icon: 'network', label: 'Explainability & reason codes' },
      { icon: 'chart', label: 'Champion / challenger' },
    ] satisfies Array<{ icon: GlyphName; label: string }>,
  },

  solutions: {
    eyebrow: 'WHAT WE BUILD',
    title: 'One problem. Four models that compound.',
    lede: 'Financial crime is one system, not four products — the four models share a schema, a feature store, and an evaluation harness, so a signal found in one is available to the others.',
    cards: [
      {
        href: solutionRoute('fraud-detection'),
        icon: 'shield-check',
        title: 'Fraud Detection Suite',
        text: 'Real-time scoring on device, behavioural, and network-graph signals, under 80\u00a0ms at p99.',
      },
      {
        href: solutionRoute('aml-monitoring'),
        icon: 'rings',
        title: 'AML Monitoring',
        text: 'Scenarios plus supervised scoring, triaged by expected value rather than by alert age.',
      },
      {
        href: solutionRoute('igaming-integrity'),
        icon: 'dice-5',
        title: 'iGaming Integrity',
        text: 'Bonus abuse, multi-accounting, and collusion, scored as one network rather than three rules.',
      },
      {
        href: solutionRoute('responsible-gaming'),
        icon: 'eye',
        title: 'Responsible Gaming',
        text: "Escalating-harm detection with a graded playbook — every tier's response written before it fires.",
      },
    ] satisfies Array<{ href: string; icon: GlyphName; title: string; text: string }>,
    cardCta: 'Open the model',
    cta: {
      label: 'See what ships with each one →',
      href: `${ROUTES.solutions}#stack`,
    } satisfies Cta,
  },

  governance: {
    eyebrow: 'WHY THE WORK HOLDS UP',
    title: 'Every decision, reproducible.',
    lede: 'Versioned data, features, and models. Select an artefact to see exactly what a reviewer gets when they ask how a decision was made.',
    cards: [
      {
        icon: 'shield-check',
        title: 'Explainable by default',
        text: 'Reason codes a regulator, a reviewer, and a customer can all read.',
      },
      {
        icon: 'doc-check',
        title: 'Audit-ready',
        text: 'Versioned data, features, and models. Every decision reproducible.',
      },
      {
        icon: 'lock',
        title: 'Secure from the first commit',
        text: 'Threat modelling, SBOMs, and secret scanning wired in from day one.',
      },
      {
        icon: 'refresh',
        title: 'Operated, not abandoned',
        text: 'Drift response, retraining cadence, and a named engineer after go-live.',
      },
    ] satisfies Array<{ icon: GlyphName; title: string; text: string }>,
  },

  impact: {
    eyebrow: 'The impact',
    title: 'Measured in production, not in a pitch deck.',
    lede: 'Three engagements, three numbers that were counted after go-live. Client names are withheld because the figures are theirs, not ours — the shape of the work is not.',
    cta: { label: 'Read the field notes', href: ROUTES.insights } satisfies Cta,
    proofs: [
      {
        sector: 'Fintech',
        org: 'European neobank',
        heading: 'Nineteen analysts, six thousand alerts behind, no headcount coming.',
        figure: '3.4',
        unit: '× throughput',
        text: 'A two-year AML backlog cleared in 90 days on flat headcount, by ranking alerts instead of closing them. Eighteen months on, no changes required.',
        link: { label: 'How it was built', href: solutionRoute('aml-monitoring') },
      },
      {
        sector: 'Payments',
        org: 'UAE marketplace',
        heading: 'Fraud losses were growing faster than the review team could.',
        figure: '61',
        unit: '% losses cut',
        text: 'A model placed in front of the existing rules engine, with the cut-off owned by the risk committee rather than by engineering. No review analysts added.',
        link: { label: 'How it was built', href: solutionRoute('fraud-detection') },
      },
      {
        sector: 'iGaming',
        org: 'European operator',
        heading: 'The rules engine intervened late, or not at all.',
        figure: '4',
        unit: '× interventions',
        text: 'Four graded tiers, each with a response written before it fires. More players reached earlier, and every intervention is defensible to the regulator.',
        link: { label: 'How it was built', href: solutionRoute('responsible-gaming') },
      },
    ],
    footnote: 'Anonymised client outcomes, measured in production. Past results, not guarantees.',
  },

  fieldNotes: {
    eyebrow: 'FIELD NOTES',
    title: 'What the people doing the work are writing.',
    lede: 'One essay every second Thursday.',
    notes: [
      {
        title: 'Why your AML model is not the problem — your alert taxonomy is.',
        text: 'Supervised scoring rarely fails in isolation. It fails because the labels were never clean.',
      },
      {
        title: 'Explainability is a product surface, not a compliance line item.',
        text: 'Reason codes your reviewers, your customers, and your regulator can all read.',
      },
      {
        title: 'Bonus abuse is a graph problem before it is a rules problem.',
        text: 'What to instrument before you train your first collusion model.',
      },
    ],
    noteCta: 'On Insights',
    href: ROUTES.insights,
  },

  closing: {
    eyebrow: '45 minutes',
    title: 'Talk to the engineer who would build it.',
    text: 'No business-development lead, no discovery deck. Bring the decision you are trying to improve; we will bring the two or three things we would look at first and tell you honestly whether we are the right team for it.',
    secondaryCta: { label: 'Contact us instead', href: ROUTES.contact } satisfies Cta,
    signature: ['One working day to a reply', 'Bengaluru delivery centre'],
    signatureOverlap: { prefix: 'Overlap with', regions: ['Europe', 'UAE', 'Canada'] },
    cards: [
      {
        label: 'If you already know the model',
        text: 'Go straight to the catalogue — four models, each with what ships around it.',
        link: { label: 'Solutions', href: ROUTES.solutions },
      },
      {
        label: 'If you would rather watch first',
        text: 'Every model page opens its film behind the copy. Half a minute, no form in front of it.',
        link: { label: 'Watch fraud detection', href: `${solutionRoute('fraud-detection')}#demo` },
      },
      {
        label: 'If you want to join instead',
        text: 'Senior roles only, and the pod you would sit in is drawn on the page.',
        link: { label: 'Careers', href: ROUTES.careers },
      },
    ],
  },
} as const;
