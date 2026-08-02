import type { GlyphName } from '@/components/ui/Glyph';
import { ROUTES, serviceRoute, solutionRoute } from '@/constants/routes';

export const servicesContent = {
  hero: {
    eyebrow: 'KLUGMINDS SERVICES',
    title: 'Custom work, delivered by people who ship for a living.',
    description:
      'Senior engineers and scientists on every engagement. No bench, no pyramid, no hand-off from the partner who won the work.',
    briefingTopic: 'Services page',
    secondaryCta: { label: 'See the solutions', href: ROUTES.solutions },
  },

  practices: {
    eyebrow: 'THE ENGINEERING DEPTH',
    title: 'Four practices, one team.',
    lede: 'One senior pod carries the work from discovery through operations. Select a practice in the graphic above to see what it owns.',
    cards: [
      {
        href: serviceRoute('ai-ml'),
        icon: 'network' as GlyphName,
        title: 'AI, Data Science & ML',
        text: 'Discovery, custom models, validation, fairness testing, and governance documentation.',
        tags: ['Agentic AI', 'Graph learning', 'Applied LLM'],
      },
      {
        href: serviceRoute('devsecops'),
        icon: 'lock' as GlyphName,
        title: 'DevSecOps & Platform',
        text: 'Cloud architecture, security on every merge, and observability that survives an incident.',
        tags: ['Cloud & landing zones', 'Kubernetes', 'SBOM per release'],
      },
      {
        href: serviceRoute('full-stack'),
        icon: 'rings' as GlyphName,
        title: 'Full-Stack Engineering',
        text: 'Analyst workflows, front-ends, backend services, and APIs a reviewer can read.',
        tags: ['Case management', 'React', 'OpenAPI first'],
      },
      {
        href: serviceRoute('data-strategy'),
        icon: 'doc' as GlyphName,
        title: 'Data Strategy & Architecture',
        text: 'Platform design, quality expectations that fail the build, and generated lineage.',
        tags: ['Lakehouse', 'Schema contracts', 'Column lineage'],
      },
    ],
  },

  flagships: {
    eyebrow: 'WHAT WE LEAD WITH',
    title: 'Two capabilities clients now ask for by name.',
    lede: 'Both sit inside an existing practice rather than beside it, because that is where the same engineers already work.',
    cards: [
      {
        href: `${serviceRoute('ai-ml')}#agentic-ai`,
        icon: 'network' as GlyphName,
        title: 'Agentic AI',
        subtitle: 'Under AI, Data Science & ML',
        text: 'Six narrow agents working one case file — triage, data, graph, evidence, narrative, and rules. The gathering is automated; the judgement is not.',
        tags: [
          'Plan, retrieve, analyse, verify, draft',
          'Every figure cites its query',
          'Irreversible actions stay human',
        ],
        cta: 'Open it and operate it',
      },
      {
        href: `${serviceRoute('devsecops')}#cloud`,
        icon: 'cloud' as GlyphName,
        title: 'Cloud & Landing Zones',
        subtitle: 'Under DevSecOps & Platform',
        text: 'AWS, Azure, and GCP, with placement decided per workload on latency, data gravity, identity, and retention. Boundaries sized around blast radius.',
        tags: [
          'Terraform module per boundary',
          'No standing write access to production',
          'Cost owned on the pod',
        ],
        cta: 'Open it and operate it',
      },
    ],
  },

  agentic: {
    eyebrow: 'AGENTIC AI',
    title: 'Agents that do the preparation. People still decide.',
    lede: 'Six narrow agents work one case file — triage, data, graph, evidence, narrative, and rules. Autonomy stops where undo stops.',
    cards: [
      {
        icon: 'network' as GlyphName,
        title: 'The gathering, automated',
        text: 'Pulling history, expanding a cluster, finding the document — minutes rather than an afternoon.',
      },
      {
        icon: 'doc-check' as GlyphName,
        title: 'Every figure cites its query',
        text: 'An uncited claim is dropped rather than smoothed over, because the citation is the deliverable.',
      },
      {
        icon: 'lock' as GlyphName,
        title: 'Reversible actions only',
        text: 'A hold or a step-up may be automated. Closures, filings, and declines stay with a person.',
      },
      {
        icon: 'eye' as GlyphName,
        title: 'Measured on disagreement',
        text: 'A read-only shadow period first, because how often the agent is wrong is the only useful early metric.',
      },
    ],
    cta: { label: 'See it running →', href: `${serviceRoute('ai-ml')}#agentic-ai` },
  },

  commercial: {
    eyebrow: 'COMMERCIAL MODELS',
    title: 'Honest work, honestly priced.',
    lede: 'The engineers on your briefing are the engineers on the project.',
    cards: [
      {
        title: 'Fixed-scope, fixed-price',
        text: 'For problems with clear boundaries — a pilot, a migration, an integration.',
      },
      {
        title: 'Time-and-materials, capped',
        text: 'For discovery-heavy work where the budget still has to hold.',
      },
      {
        title: 'Outcome-based',
        text: 'When we are confident enough in the lift to price part of the fee against it.',
      },
      {
        title: 'Managed operations',
        text: 'A monthly retainer for drift response and quarterly model reviews.',
      },
    ],
  },

  metric: {
    eyebrow: 'MEASURED IN PRODUCTION',
    title: 'Nineteen analysts, six thousand alerts behind, and no headcount coming.',
    text: "A European neobank's backlog had been noticed by its regulator. We rebuilt the alert taxonomy, layered scoring over the scenarios, and ordered the queue by the expected value of investigating. Two model validations have passed since, with no changes required.",
    link: { label: 'See how it was built', href: solutionRoute('aml-monitoring') },
    figure: '3.4×',
    figureLabel: 'Alert throughput',
    figureNote: 'Cleared in 90 days on flat headcount. Anonymised client outcome, not a guarantee.',
  },

  fieldNotes: {
    eyebrow: 'FIELD NOTES',
    title: 'What the people doing the work are writing.',
    lede: 'One essay every second Thursday.',
    href: ROUTES.insights,
    noteCta: 'On Insights',
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
  },

  closing: {
    title: 'Start with a senior-led briefing.',
    topic: 'Services closing',
  },
} as const;
