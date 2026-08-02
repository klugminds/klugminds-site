import type { TopicTab } from '@/components/detail/TopicExplorer';
import type { VizKind } from '@/components/viz/panels';
import type { GlyphName } from '@/components/ui/Glyph';
import {
  ROUTES,
  SOLUTION_SLUGS,
  type ServiceSlug,
  type SolutionSlug,
  serviceRoute,
  solutionRoute,
} from '@/constants/routes';

export type SolutionOutcome = {
  value: string;
  label: string;
  note: string;
};

export type SolutionDetail = {
  slug: SolutionSlug;
  family: string;
  title: string;
  lede: string;
  meta: string;
  graphic: VizKind;
  graphic2?: VizKind;
  outcomes: readonly SolutionOutcome[];
  capabilities: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: readonly string[];
  };
  comparison: {
    heading: string;
    pairs: readonly (readonly [string, string])[];
  };
  ctaHeading: string;
  related: readonly { title: string; text: string; slug: SolutionSlug }[];
};

const FRAUD: SolutionDetail = {
  slug: 'fraud-detection',
  family: 'FINANCIAL CRIME',
  title: 'Fraud Detection Suite',
  lede: 'Real-time scoring on device, behavioural, and network-graph signals — with a decision back to your payment flow in under 80 ms at p99.',
  meta: 'Real-time fraud detection for payments, deposits, and cash-out — device intelligence, behavioural biometrics, and graph signals with sub-80ms decisions and reason codes.',
  graphic: 'threshold',
  graphic2: 'signals',
  outcomes: [
    {
      value: '61%',
      label: 'Fewer chargeback losses',
      note: 'UAE marketplace, two quarters, flat headcount.',
    },
    {
      value: '34%',
      label: 'Fewer false positives',
      note: 'Fewer good customers stopped at checkout.',
    },
    {
      value: '<80ms',
      label: 'Decision at p99',
      note: 'Fast enough to sit inline in authorisation.',
    },
  ],
  capabilities: {
    eyebrow: 'WHAT IT CATCHES',
    heading: 'The attacks a rules engine keeps missing.',
    intro:
      'Rules catch what you already know about. This model is built for the patterns that emerge between accounts, devices, and sessions rather than inside a single transaction.',
    items: [
      'Card testing and enumeration across merchant and issuer traffic.',
      'Account takeover, detected from behavioural drift rather than failed logins.',
      'Synthetic and mule accounts, surfaced through shared device and payment fingerprints.',
      'First-party fraud, separated from genuine disputes.',
    ],
  },
  comparison: {
    heading: 'Most fraud stacks are a rules maze nobody will prune.',
    pairs: [
      [
        'Rules accumulate for years; nobody dares remove one.',
        'Rules and the model run side by side, and we measure where they disagree.',
      ],
      [
        'Device and behaviour signals bought from three vendors, never joined.',
        'One scoring layer over your own signals — no per-vendor data silos.',
      ],
      [
        'Analysts see a score with no explanation attached.',
        'Ranked reason codes on every decision, for the analyst and the regulator.',
      ],
    ],
  },
  ctaHeading: 'See it scored against your own traffic.',
  related: [
    {
      title: 'iGaming Integrity',
      text: 'Bonus abuse, multi-accounting, and collusion in one graph-aware model.',
      slug: 'igaming-integrity',
    },
    {
      title: 'AML Monitoring',
      text: 'Scenario coverage plus supervised scoring, triaged by expected value.',
      slug: 'aml-monitoring',
    },
    {
      title: 'Responsible Gaming',
      text: 'Escalating-harm detection early enough to intervene.',
      slug: 'responsible-gaming',
    },
  ],
};

const IGAMING: SolutionDetail = {
  slug: 'igaming-integrity',
  family: 'FINANCIAL CRIME',
  title: 'iGaming Integrity Model',
  lede: 'Bonus abuse, multi-accounting, and collusion in a single graph-aware model — built for operators who have to show a regulator their working.',
  meta: 'Graph-aware iGaming integrity: bonus abuse, multi-accounting, chip-dumping, and collusion detection with analyst reason codes for licensed operators.',
  graphic: 'collusion',
  outcomes: [
    {
      value: '6×',
      label: 'Larger rings surfaced',
      note: 'Clusters a per-account rule set never joins up.',
    },
    {
      value: 'Graph',
      label: 'Native detection',
      note: 'Shared device, payment, and session edges as features.',
    },
    {
      value: 'Audit',
      label: 'Ready by default',
      note: 'Every flag reproducible for a UKGC or MGA review.',
    },
  ],
  capabilities: {
    eyebrow: 'WHAT IT DETECTS',
    heading: 'Abuse is a network problem before it is an account problem.',
    intro:
      'A single account rarely looks wrong. The signal lives in what accounts share — devices, payment instruments, session timing, and table behaviour.',
    items: [
      'Bonus and promo farming across linked sign-ups.',
      'Multi-accounting through shared device, payment, and address fingerprints.',
      'Chip-dumping and soft play, scored at the table level.',
      'Withdrawal abuse timed against bonus wagering thresholds.',
    ],
  },
  comparison: {
    heading: 'Single-account heuristics miss the ring entirely.',
    pairs: [
      [
        'Velocity rules fire per account, so a ten-account ring becomes ten weak alerts.',
        'Clusters are scored and escalated as one case with a ranked member list.',
      ],
      [
        'Device matching stops at exact fingerprint equality.',
        'Fuzzy entity resolution links accounts that deliberately vary their attributes.',
      ],
      [
        'Evidence for a licence review is reconstructed by hand, months later.',
        'Every cluster keeps its evidence trail, reproducible on demand.',
      ],
    ],
  },
  ctaHeading: 'Bring us a month of event data.',
  related: [
    {
      title: 'Fraud Detection Suite',
      text: 'Real-time transaction scoring on device, behavioural, and graph signals.',
      slug: 'fraud-detection',
    },
    {
      title: 'Responsible Gaming',
      text: 'Escalating-harm detection with a graded intervention playbook.',
      slug: 'responsible-gaming',
    },
    {
      title: 'AML Monitoring',
      text: 'Monitoring tuned to gaming velocity and payment patterns.',
      slug: 'aml-monitoring',
    },
  ],
};

const AML: SolutionDetail = {
  slug: 'aml-monitoring',
  family: 'FINANCIAL CRIME',
  title: 'AML Transaction Monitoring',
  lede: 'Typology scenarios and supervised scoring, layered so the two disagree productively — with a queue triaged by the expected value of investigating.',
  meta: 'AML transaction monitoring combining typology scenarios with supervised risk scoring — alert triage by expected value, reason codes, and model governance documentation.',
  graphic: 'funnel',
  graphic2: 'typologies',
  outcomes: [
    {
      value: '3.4×',
      label: 'Alert throughput',
      note: 'European neobank cleared a two-year backlog in 90 days.',
    },
    {
      value: '21%',
      label: 'Higher SAR conversion',
      note: 'More of what reaches an analyst is reportable.',
    },
    {
      value: '2',
      label: 'Validations passed',
      note: 'Since go-live, with no model changes required.',
    },
  ],
  capabilities: {
    eyebrow: 'WHAT IT MONITORS',
    heading: 'Your alert taxonomy is usually the problem, not the model.',
    intro:
      'Supervised scoring rarely fails in isolation. It fails because the labels were never clean, so we rebuild the taxonomy before layering scoring on scenarios.',
    items: [
      'Structuring and smurfing across accounts and time windows.',
      'Layering and circular flows between related parties.',
      'Mule networks, detected from counterparty graph structure.',
      'Rapid pass-through and dormant-then-active account patterns.',
    ],
  },
  comparison: {
    heading: 'Coverage without triage just moves the backlog.',
    pairs: [
      [
        'Every scenario hit becomes an alert of equal priority.',
        'Alerts group per customer, and the queue orders by expected value of investigation.',
      ],
      [
        'AI bolted on as a filter over already-inaccurate rule output.',
        'Scoring runs on raw activity, so it finds what no scenario covers.',
      ],
      [
        'Model documentation written retrospectively for the audit.',
        'Governance documentation is a build artefact, produced each release.',
      ],
    ],
  },
  ctaHeading: 'Show us your alert backlog.',
  related: [
    {
      title: 'Fraud Detection Suite',
      text: 'Real-time scoring for payments, deposits, and cash-out.',
      slug: 'fraud-detection',
    },
    {
      title: 'iGaming Integrity',
      text: 'Graph-aware bonus abuse, multi-accounting, and collusion detection.',
      slug: 'igaming-integrity',
    },
    {
      title: 'Responsible Gaming',
      text: 'Escalating-harm detection with a graded response playbook.',
      slug: 'responsible-gaming',
    },
  ],
};

const RG: SolutionDetail = {
  slug: 'responsible-gaming',
  family: 'FINANCIAL CRIME',
  title: 'Responsible Gaming Model',
  lede: 'Detects escalating harm early enough for an intervention to still matter, with a graded playbook and the evidence trail a regulator asks for.',
  meta: 'Responsible gaming model detecting escalating harm early, with a graded intervention playbook and audit-ready documentation for licensed operators.',
  graphic: 'harm',
  outcomes: [
    {
      value: '4×',
      label: 'More actionable interventions',
      note: "Versus the operator's previous rules engine.",
    },
    {
      value: '12',
      label: 'High-risk cases, month one',
      note: 'Escalated to human outreach in the first month.',
    },
    {
      value: 'Graded',
      label: 'Response playbook',
      note: 'Each tier mapped to a specific, evidenced action.',
    },
  ],
  capabilities: {
    eyebrow: 'WHAT IT SURFACES',
    heading: 'Rules trigger after the harm; patterns show up before it.',
    intro:
      'Deposit-limit breaches are a lagging indicator. Escalation shows up earlier — in session rhythm, chasing behaviour, and how a player responds to losing.',
    items: [
      'Loss-chasing sequences within and across sessions.',
      'Escalating deposit frequency and shrinking gaps between top-ups.',
      'Cancelled withdrawals reinvested into play.',
      'Response to prior interventions, feeding the next escalation step.',
    ],
  },
  comparison: {
    heading: 'Compliance slideware is not an operational control.',
    pairs: [
      [
        'Fixed deposit and time limits that only fire after the fact.',
        'Trajectory scoring flags escalation while an intervention still helps.',
      ],
      [
        'The same generic message sent regardless of risk tier.',
        "A graded playbook: the response matches the tier and the player's history.",
      ],
      [
        'No record of whether an intervention changed behaviour.',
        'Outcomes are captured and become training labels.',
      ],
    ],
  },
  ctaHeading: 'Walk through the intervention playbook.',
  related: [
    {
      title: 'iGaming Integrity',
      text: 'Bonus abuse, multi-accounting, and collusion in one graph-aware model.',
      slug: 'igaming-integrity',
    },
    {
      title: 'AML Monitoring',
      text: 'Monitoring tuned to gaming velocity and payment patterns.',
      slug: 'aml-monitoring',
    },
    {
      title: 'Fraud Detection Suite',
      text: 'Real-time scoring on device, behavioural, and graph signals.',
      slug: 'fraud-detection',
    },
  ],
};

export const SOLUTION_DETAILS: Record<SolutionSlug, SolutionDetail> = {
  'fraud-detection': FRAUD,
  'igaming-integrity': IGAMING,
  'aml-monitoring': AML,
  'responsible-gaming': RG,
};

export function getSolutionDetail(slug: string): SolutionDetail | undefined {
  if (!SOLUTION_SLUGS.includes(slug as SolutionSlug)) {
    return undefined;
  }
  return SOLUTION_DETAILS[slug as SolutionSlug];
}

export const ENGAGEMENT_DELIVERABLES = [
  {
    icon: 'shield' as GlyphName,
    title: 'The model',
    text: 'Trained on your data, with ranked reason codes on every decision rather than a score alone.',
  },
  {
    icon: 'rings' as GlyphName,
    title: 'The feature store',
    text: 'Built so the second model costs less than the first, and the third less again.',
  },
  {
    icon: 'radar' as GlyphName,
    title: 'The monitoring plane',
    text: 'Drift, latency, and outcome tracking, alerting on symptoms rather than on busy machines.',
  },
  {
    icon: 'doc-check' as GlyphName,
    title: 'The governance pack',
    text: 'Validation, fairness diagnostics, and documentation generated per release, not before an audit.',
  },
  {
    icon: 'eye' as GlyphName,
    title: 'The analyst workflow',
    text: 'The queue, the case view, the override path, and the audit trail that make a score operational.',
  },
  {
    icon: 'refresh' as GlyphName,
    title: 'A named engineer',
    text: 'On it after go-live, on the incident bridge, and on the quarterly review.',
  },
] as const;

export type ServiceFlagshipSection = {
  id: string;
  eyebrow: string;
  heading: string;
  lede: string;
  label: string;
  topics: readonly TopicTab[];
};

export type ServiceDetail = {
  slug: ServiceSlug;
  family: string;
  title: string;
  lede: string;
  meta: string;
  graphic: VizKind;
  outcomes: readonly SolutionOutcome[];
  capabilities: SolutionDetail['capabilities'];
  sections?: readonly ServiceFlagshipSection[];
  comparison: SolutionDetail['comparison'];
  extra?: {
    eyebrow: string;
    heading: string;
    rows: readonly { title: string; text: string }[];
  };
  ctaHeading: string;
  related: readonly { title: string; text: string; slug: ServiceSlug }[];
};

const AGENTIC_SECTION: ServiceFlagshipSection = {
  id: 'agentic-ai',
  eyebrow: 'AGENTIC AI',
  heading: "Agents that do the analyst's preparation, not the analyst's job.",
  lede: 'The work worth automating in a risk team is the gathering — pulling the history, expanding the cluster, finding the document. Judgement stays where it is.',
  label: 'Agentic AI topics',
  topics: [
    {
      key: 'run',
      tab: 'An agent run',
      heading: 'One analyst question, answered in minutes.',
      lede: 'Three questions we hear on every engagement, each answered through the same five stages, with every tool call logged. Run one and watch where the time actually goes.',
      bullets: [
        'Plan, retrieve, analyse, verify, draft — the same shape every time, so a reviewer knows where to look.',
        'Every figure arrives with the query that produced it. An uncited claim is dropped, not smoothed over.',
        'The last stage is a draft. Filing, closing, and declining stay human acts.',
      ],
      panel: 'prompts',
    },
    {
      key: 'roster',
      tab: 'The roster',
      heading: 'Six narrow agents, one case file.',
      lede: 'Not one chatbot with a knowledge base. Six agents that write into the same case, so an investigator reads a single trail instead of six transcripts.',
      bullets: [
        'Triage ranks the queue by what is worth opening rather than by what fired first.',
        'Graph expansion stops when the edges stop paying, and names the attribute that joined each account.',
        'The rule assistant backtests before it proposes, so the false-positive cost is known up front.',
      ],
      panel: 'agents',
    },
    {
      key: 'guardrails',
      tab: 'Guardrails',
      heading: 'How much autonomy is actually honest.',
      lede: 'Autonomy is defensible where the action can be undone and nowhere else. Drag the dial and the human checkpoint moves with it — until it reaches the level we will not ship.',
      bullets: [
        'A read-only shadow period first, because the disagreement rate is the only useful early metric.',
        'Reversible actions can be automated: a hold, a step-up, a document request — each one click back.',
        'Account closure, filings, credit declines, and money movement stay with a person. Not offered as a setting.',
      ],
      panel: 'autonomy',
    },
  ],
};

const CLOUD_SECTION: ServiceFlagshipSection = {
  id: 'cloud',
  eyebrow: 'CLOUD',
  heading: 'Cloud architecture judged on what happens when it fails.',
  lede: 'A landing zone is not a diagram. It is a set of decisions about how far a bad deploy reaches, who can touch production, and what the estate costs at rest.',
  label: 'Cloud topics',
  topics: [
    {
      key: 'zone',
      tab: 'Landing zone',
      heading: 'Boundaries sized around blast radius.',
      lede: 'Seven accounts, each with a reason to exist. Select one and read what it contains when it fails, and who can get inside it.',
      bullets: [
        'A Terraform module per boundary, so a new environment is a pull request rather than a project.',
        'The log archive holds credentials the workload accounts have never seen.',
        'Production is reached by the pipeline. Human access is a time-boxed role with a ticket attached.',
      ],
      panel: 'landing',
    },
    {
      key: 'placement',
      tab: 'Placement',
      heading: 'Three clouds, and a reason for each one.',
      lede: 'AWS, Azure, and GCP, chosen per workload on latency, data gravity, accelerator supply, identity, and retention mechanics. We have no preferred vendor to defend.',
      bullets: [
        'Latency-critical scoring stays in whichever cloud your payment stack already occupies.',
        'The feature pipeline follows the warehouse, because egress costs more than the compute did.',
        'Portability is checkpoints and container images — not a lowest-common-denominator abstraction.',
      ],
      panel: 'multicloud',
    },
    {
      key: 'cost',
      tab: 'Cost & capacity',
      heading: 'Utilisation is a risk setting, not a cost setting.',
      lede: 'Drag the target and the fleet, the monthly bill, and the headroom move together. Under 20% headroom, the saving is being paid for in incidents.',
      bullets: [
        'Cost and capacity are owned by the platform engineer on the pod, not by a quarterly review.',
        'Budgets and region allow-lists sit on the workload boundary, so they are not re-argued per team.',
        'Kubernetes where it earns its complexity, and managed services where it does not.',
      ],
      panel: 'rightsize',
    },
  ],
};

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  'ai-ml': {
    slug: 'ai-ml',
    family: 'KLUGMINDS SERVICES',
    title: 'AI, Data Science & Machine Learning',
    lede: 'Discovery through production — custom models, agentic AI for risk operations, validation, fairness testing, and governance documentation.',
    meta: 'Custom AI, machine learning, and agentic AI consulting — discovery, model development, agent guardrails, validation, fairness testing, and governance documentation for regulated deployments.',
    graphic: 'lifecycle',
    outcomes: [
      {
        value: '5',
        label: 'Delivery phases',
        note: 'Frame, Design, Deliver, Deploy, Operate — a gate at each.',
      },
      {
        value: '6',
        label: 'Agents, one case file',
        note: 'Triage, data, graph, evidence, narrative, rules.',
      },
      {
        value: 'Governed',
        label: 'By default',
        note: 'Validation and documentation are build artefacts.',
      },
    ],
    capabilities: {
      eyebrow: 'WHAT WE DO',
      heading: 'Most models fail in the first fortnight, not in production.',
      intro:
        'They fail on a badly framed problem, a wrong success metric, or the absence of the person who has to act on the output.',
      items: [
        'Discovery and feasibility, ending in a written decision document.',
        'Custom models — classical ML, graph learning, and applied LLM work.',
        'Agentic AI for risk operations, with the autonomy level argued rather than assumed.',
        'Feature-store design, so later models compound on earlier ones.',
        'Validation, fairness diagnostics, and governance documentation per release.',
      ],
    },
    sections: [AGENTIC_SECTION],
    comparison: {
      heading: 'The prototype-to-production gap is where budgets die.',
      pairs: [
        [
          'A proof-of-concept scoped without naming the decision it changes.',
          'A written decision document before any modelling starts.',
        ],
        [
          'Handover to a different team for deployment.',
          'One team from framing through to operating it.',
        ],
        ['Nobody owns the model six months later.', 'A named engineer stays on it after go-live.'],
        [
          'Agents demoed at full autonomy, then quietly restricted after the first incident.',
          'The autonomy level is argued before build, and irreversible actions stay human.',
        ],
      ],
    },
    extra: {
      eyebrow: 'COMMERCIAL SHAPE',
      heading: 'Priced against a decision, not a day rate.',
      rows: [
        {
          title: 'Pilot — 6 to 8 weeks',
          text: 'One model or one agent, one segment, one measurable outcome. Fixed price, lift reported on your held-out sample.',
        },
        {
          title: 'Deploy — 10 to 14 weeks',
          text: 'Production integration, monitoring, governance sign-off, analyst training. Priced per environment.',
        },
        {
          title: 'Operate — ongoing',
          text: 'Drift response, quarterly retraining, and a named engineer as your point of contact.',
        },
      ],
    },
    ctaHeading: 'Scope a discovery phase.',
    related: [
      {
        title: 'Full-Stack Engineering',
        text: 'The application around the model.',
        slug: 'full-stack',
      },
      {
        title: 'DevSecOps & Platform',
        text: 'Cloud landing zones, CI/CD security, and observability.',
        slug: 'devsecops',
      },
      {
        title: 'Data Strategy',
        text: 'Platform design, data quality, and lineage.',
        slug: 'data-strategy',
      },
    ],
  },
  'full-stack': {
    slug: 'full-stack',
    family: 'KLUGMINDS SERVICES',
    title: 'Full-Stack Solutions Engineering',
    lede: 'The application around the model: analyst workflows, web and mobile front-ends, backend services, and APIs a reviewer can actually read.',
    meta: 'Full-stack engineering around the model — analyst workflows, web and mobile front-ends, backend services, and OpenAPI-first API design instrumented from the first endpoint.',
    graphic: 'contract',
    outcomes: [
      {
        value: 'OpenAPI',
        label: 'First, always',
        note: 'Contract before implementation, versioned from day one.',
      },
      {
        value: 'Instrumented',
        label: 'From endpoint one',
        note: 'Tracing and metrics in the definition of done.',
      },
      {
        value: 'Operator',
        label: 'Grade workflows',
        note: 'Tooling built for the people who use it all day.',
      },
    ],
    capabilities: {
      eyebrow: 'WHAT WE BUILD',
      heading: 'A model is only as useful as the workflow around it.',
      intro:
        'Scores that arrive in a CSV do not change decisions. The queue, the case view, the override path, and the audit trail are what turn a model into an operational control.',
      items: [
        'Analyst and operator workflows: queues, case views, and override paths.',
        'Front-ends in React and Next.js, accessible by default rather than by audit.',
        'Backend services in Python, Node.js, Go, and Java, picked per workload.',
        'Real-time scoring APIs with latency budgets and backpressure handling.',
      ],
    },
    comparison: {
      heading: 'The integration is usually the part nobody budgeted for.',
      pairs: [
        [
          "The model ships; the workflow around it is somebody else's problem.",
          'Workflow and model scoped as one deliverable.',
        ],
        [
          'Observability added after the first production incident.',
          'Tracing and metrics in the definition of done.',
        ],
        [
          'Breaking API changes discovered by the consumer, in production.',
          'Consumer-driven contract tests catch them in CI.',
        ],
      ],
    },
    extra: {
      eyebrow: 'THE STACK',
      heading: 'Chosen for the problem, not for the CV.',
      rows: [
        {
          title: 'Front-end',
          text: 'React and Next.js, TypeScript throughout, accessible by default rather than by audit.',
        },
        {
          title: 'Services',
          text: "Python, Node.js, Go, and Java — picked per service for the workload and your team's ability to maintain it.",
        },
        {
          title: 'Data plane',
          text: 'Postgres, Kafka, and Redis, with schema contracts between every producer and consumer.',
        },
      ],
    },
    ctaHeading: 'Scope the application around your model.',
    related: [
      {
        title: 'AI, Data Science & ML',
        text: 'Custom models, agentic AI, and governance documentation.',
        slug: 'ai-ml',
      },
      {
        title: 'DevSecOps & Platform',
        text: 'Cloud landing zones, CI/CD security, and observability.',
        slug: 'devsecops',
      },
      {
        title: 'Data Strategy',
        text: 'Platform design, data quality, and lineage.',
        slug: 'data-strategy',
      },
    ],
  },
  devsecops: {
    slug: 'devsecops',
    family: 'KLUGMINDS SERVICES',
    title: 'DevSecOps & Platform Engineering',
    lede: 'Cloud architecture across AWS, Azure, and GCP, security wired into every merge, and observability that still says something at three in the morning.',
    meta: 'DevSecOps, cloud, and platform engineering — landing zones across AWS, Azure and GCP, CI/CD with SAST, DAST, SCA and secret scanning, Kubernetes, cost ownership, and observability that survives an incident.',
    graphic: 'gates',
    outcomes: [
      {
        value: 'Day one',
        label: 'Threat modelling',
        note: 'Before the first sprint, not before the first audit.',
      },
      {
        value: 'Every',
        label: 'Merge scanned',
        note: 'SAST, DAST, SCA, and secret detection on every PR.',
      },
      {
        value: '3',
        label: 'Clouds, one operating model',
        note: 'Placement decided per workload, not per vendor.',
      },
    ],
    capabilities: {
      eyebrow: 'WHAT WE RUN',
      heading: 'Security added later is security that gets descoped.',
      intro:
        'Every project means to harden things before launch, and most run out of runway. Wired into the pipeline from the first commit, it survives.',
      items: [
        'Landing zones for AWS, Azure, and GCP, as Terraform modules per boundary.',
        'CI/CD with SAST, DAST, SCA, and secret scanning on every merge.',
        'Kubernetes platform engineering, including cost and capacity ownership.',
        'Alerting tuned to symptoms users feel, plus runbooks agreed before go-live.',
      ],
    },
    sections: [CLOUD_SECTION],
    comparison: {
      heading: 'Most alerting says a box is busy, not that users are hurting.',
      pairs: [
        [
          'Security review scheduled for the sprint before launch.',
          'Threat modelling before sprint one, and findings blocking in CI.',
        ],
        [
          'Dependencies floating on latest, provenance unknown.',
          'Pinned dependencies with an SBOM per release.',
        ],
        [
          'Alerts on CPU and memory, none on user-visible symptoms.',
          'Alerting on symptoms and SLOs, so a page means something.',
        ],
        [
          'One cloud chosen years ago, and every workload argued into it since.',
          'Placement decided per workload on latency, data gravity, and retention.',
        ],
      ],
    },
    extra: {
      eyebrow: 'WHAT WE OWN',
      heading: 'Platform work has to come with the pager.',
      rows: [
        {
          title: 'Build — 8 to 12 weeks',
          text: 'Landing zone, pipeline, and observability stack, as Terraform a reviewer can read. Fixed price per environment.',
        },
        {
          title: 'Harden — 4 to 6 weeks',
          text: 'Threat model, gate the pipeline, and close what it finds. Priced against the finding list, not the hours.',
        },
        {
          title: 'Operate — ongoing',
          text: 'Cost and capacity ownership, patch cadence, and a named platform engineer on the incident bridge.',
        },
      ],
    },
    ctaHeading: 'Review your pipeline with us.',
    related: [
      {
        title: 'AI, Data Science & ML',
        text: 'Custom models, agentic AI, and governance documentation.',
        slug: 'ai-ml',
      },
      {
        title: 'Full-Stack Engineering',
        text: 'The application around the model.',
        slug: 'full-stack',
      },
      {
        title: 'Data Strategy',
        text: 'Platform design, data quality, and lineage.',
        slug: 'data-strategy',
      },
    ],
  },
  'data-strategy': {
    slug: 'data-strategy',
    family: 'KLUGMINDS SERVICES',
    title: 'Data Strategy & Architecture',
    lede: 'Data platform design, quality frameworks, and governance operating models that pass audit without slowing delivery to a crawl.',
    meta: 'Data strategy and architecture — platform design, data-quality frameworks, master data management, and governance operating models that pass audit.',
    graphic: 'lineage',
    outcomes: [
      {
        value: 'Lineage',
        label: 'End to end',
        note: 'Every field traceable from source system to feature.',
      },
      {
        value: 'Contracts',
        label: 'Not conventions',
        note: 'Producers and consumers bound by tested schemas.',
      },
      {
        value: 'Audit',
        label: 'Without the freeze',
        note: 'Governance teams can still ship under.',
      },
    ],
    capabilities: {
      eyebrow: 'WHAT WE DESIGN',
      heading: 'Governance usually fails by being either absent or unusable.',
      intro:
        'Too little and nothing is traceable when audit asks. Too much and every change needs three approvals, so teams route around it.',
      items: [
        'Data platform and lakehouse architecture matched to real workloads.',
        'Quality expectations that run in the pipeline and fail the build.',
        'Schema contracts between producing and consuming systems, enforced in CI.',
        'Column-level lineage, generated rather than hand-maintained.',
      ],
    },
    comparison: {
      heading: 'A data catalogue nobody updates is worse than none.',
      pairs: [
        [
          'A catalogue populated once during the programme, then abandoned.',
          'Metadata generated from the pipeline, so it cannot go stale.',
        ],
        [
          'Data quality measured on a dashboard nobody is accountable for.',
          'Quality expectations as tests that fail the build.',
        ],
        [
          'Governance so heavy that teams build shadow pipelines around it.',
          'A governance model sized so teams follow it rather than evade it.',
        ],
      ],
    },
    ctaHeading: 'Review your data platform with us.',
    related: [
      {
        title: 'AI, Data Science & ML',
        text: 'Custom models, agentic AI, and governance documentation.',
        slug: 'ai-ml',
      },
      {
        title: 'Full-Stack Engineering',
        text: 'The application around the model.',
        slug: 'full-stack',
      },
      {
        title: 'DevSecOps & Platform',
        text: 'Cloud landing zones, CI/CD security, and observability.',
        slug: 'devsecops',
      },
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const slugs: readonly ServiceSlug[] = ['ai-ml', 'devsecops', 'full-stack', 'data-strategy'];
  if (!slugs.includes(slug as ServiceSlug)) {
    return undefined;
  }
  return SERVICE_DETAILS[slug as ServiceSlug];
}

/** Breadcrumb parent for solution detail pages. */
export const SOLUTION_PARENT = { label: 'Solutions', href: ROUTES.solutions } as const;
export const SERVICE_PARENT = { label: 'Services', href: ROUTES.services } as const;

export function solutionRelatedHref(slug: SolutionSlug): string {
  return solutionRoute(slug);
}

export function serviceRelatedHref(slug: ServiceSlug): string {
  return serviceRoute(slug);
}
