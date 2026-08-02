import type { IndustryTab } from '@/components/detail/IndustryExplorer';
import type { VizKind } from '@/components/viz/panels';

export const industriesContent = {
  hero: {
    eyebrow: 'INDUSTRIES',
    title: 'Specialists, not generalists.',
    description:
      'There is a version of AI consulting where the same team ships a churn model on Monday and a hospital triage model on Friday. It is not the version we do.',
  },
  explorer: {
    eyebrow: 'WHERE WE GO DEEP',
    title: 'Five domains we know cold.',
    lede: 'Pick one to see what we build there, and a graphic from that work.',
    tabs: [
      {
        id: 'fintech',
        label: 'Fintech',
        panel: 'underwriting' as VizKind,
        intro:
          'Expand credit to segments the bureau does not price well, prevent fraud on a growing surface, and stay ahead of AML expectations that ratchet every year.',
        bullets: [
          'Scorecards with reason codes and fairness diagnostics.',
          'Alternative-data models for thin-file applicants.',
          'Real-time fraud detection and AML case triage.',
        ],
        why: 'We speak the language of your model-risk function before the meeting starts.',
      },
      {
        id: 'igaming',
        label: 'iGaming',
        panel: 'tiers' as VizKind,
        intro:
          'Licensed operators face adversarial players, aggressive promo economics, and regulators who expect evidence rather than dashboards.',
        bullets: [
          'Payment, deposit, and withdrawal fraud scored at cash-out.',
          'Bonus abuse, multi-accounting, and collusion via graph learning.',
          'Responsible gaming with a graded intervention playbook.',
        ],
        why: 'Integrity and RG as operational controls, not compliance slideware. Built for UKGC and MGA frameworks.',
      },
      {
        id: 'ecommerce',
        label: 'E-commerce',
        panel: 'ranking' as VizKind,
        intro:
          'Operators fight for attention on the front end and margin on the back end. The models that matter all touch live revenue.',
        bullets: [
          'Recommendation, personalised search, and learning-to-rank.',
          'Demand forecasting at SKU × location × week.',
          'Payment fraud, return fraud, and account takeover.',
        ],
        why: 'We treat the shopping session as one system — search, ranking, pricing, fraud, and returns move together.',
      },
      {
        id: 'logistics',
        label: 'Logistics',
        panel: 'eta' as VizKind,
        intro:
          'Logistics is the discipline of small percentages compounding. A two-minute-tighter ETA decides whether the P&L works.',
        bullets: [
          'Route optimisation and last-mile planning under real constraints.',
          'ETA prediction grounded in your telematics.',
          'Capacity forecasting for fleet and warehouse.',
        ],
        why: 'Our plans produce dispatch schedules your operations team will actually run.',
      },
      {
        id: 'healthcare',
        label: 'Healthcare',
        panel: 'docintel' as VizKind,
        intro:
          'Healthcare tests every principle we hold: explainability, data privacy, and model governance, with no room to be casual about any of them.',
        bullets: [
          'Clinical and administrative document intelligence.',
          'Risk stratification with clinician-in-the-loop workflows.',
          'Operational forecasting for staffing and scheduling.',
        ],
        why: 'We know when to say no. In healthcare, that is the first sign of a competent partner.',
      },
    ] satisfies readonly IndustryTab[],
  },
  cta: {
    title: 'Brief with a domain specialist.',
  },
} as const;
