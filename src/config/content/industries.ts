import type { FeatureItem } from '@/config/content/home';
import { mailtoLinks } from '@/lib/mailto';
import { industryAnchor } from '@/constants/routes';

export type IndustryDetail = {
  id: string;
  title: string;
  problemShape: string;
  builds: readonly string[];
  whyUs: string;
  regulatoryContext?: string;
  integrations?: readonly string[];
};

export const industriesContent = {
  hero: {
    eyebrow: 'INDUSTRIES',
    title: 'Specialists, not generalists.',
    description:
      "There is a version of AI consulting where the same team ships a churn model on Monday and a hospital triage model on Friday. It is not the version we do. Each industry below has a lead who has worked in it — on the operator side or the vendor side — for years.",
  },
  industries: [
    {
      id: 'fintech',
      title: 'Fintech',
      problemShape:
        'Fintech clients live under three simultaneous pressures: expand credit to segments the bureau does not price well, prevent fraud on a growing surface, and stay ahead of AML expectations that ratchet every year.',
      builds: [
        'Application, behavioural, and collections scorecards with monotonicity, reason codes, and fairness diagnostics.',
        'Alternative-data credit models for thin-file and underbanked applicants.',
        'Real-time fraud detection and behavioural biometrics.',
        'AML transaction screening and case triage that clears backlogs.',
        'Document intelligence for KYC onboarding.',
      ],
      whyUs:
        'Because we speak the language of your model-risk-management function before the meeting starts. We build audit-ready by default, not on request.',
    },
    {
      id: 'igaming',
      title: 'iGaming',
      problemShape:
        'Licensed operators face adversarial players, aggressive promo economics, and regulators who expect evidence — not dashboards. Fraud, integrity, AML, and safer gambling all run on the same event streams but different teams own the outcomes.',
      builds: [
        'Payment, deposit, and withdrawal fraud with real-time scoring at wallet and cash-out.',
        'Bonus abuse, multi-accounting, and collusion detection using network-graph learning.',
        'Player risk and responsible-gaming detection with a graded intervention playbook.',
        'AML transaction monitoring tuned to gaming velocity and payment patterns.',
        'Affiliate and acquisition fraud — synthetic sign-ups, bonus farming, and partner abuse.',
        'VIP value and LTV modelling for tiering and host allocation.',
      ],
      whyUs:
        'Because we treat integrity and responsible gaming as operational controls — with reason codes, analyst workflows, and audit trails — not compliance slide ware.',
      regulatoryContext:
        'We build for operators under UKGC, MGA, and other EU national frameworks — covering safer-gambling obligations, AML monitoring, and model documentation regulators and auditors expect. Licence requirements vary; we scope to yours during discovery.',
      integrations: [
        'Player account, wallet, bet, and session event streams',
        'KYC, device intelligence, and geolocation providers',
        'Bonus engines, CRM, and host-allocation workflows',
        'Case management and analyst review queues',
        'Real-time scoring APIs and scheduled risk refreshes',
      ],
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      problemShape:
        'E-commerce operators fight for attention on the front end and for margin on the back end. The models that matter all touch live revenue. There is no tolerance for a bad deploy.',
      builds: [
        'Product recommendation, personalised search, and learning-to-rank systems.',
        'Demand forecasting and inventory optimisation at SKU × location × week.',
        'Dynamic pricing and promotion optimisation with merchandising guardrails.',
        'Payment fraud, return fraud, and account-takeover detection.',
      ],
      whyUs:
        'Because we treat the shopping session as a system — search, ranking, pricing, fraud, and returns all move together.',
    },
    {
      id: 'logistics',
      title: 'Logistics',
      problemShape:
        'Logistics is the discipline of small percentages compounding. A two-minute-tighter ETA or a three-percent-lower empty-mile ratio decides whether the P&L works.',
      builds: [
        'Route optimisation and last-mile delivery planning with real-world constraints.',
        'ETA prediction grounded in your telematics, not textbook assumptions.',
        'Demand forecasting for fleet and warehouse capacity planning.',
        'Supply-chain risk detection and lane-level lead-time variability.',
      ],
      whyUs:
        'Because our optimisation models produce dispatch plans your operations team will actually run.',
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      problemShape:
        'Healthcare is where every ML principle we hold gets tested: explainability, data privacy, model governance, and the tolerance-for-error question that no other industry poses so directly.',
      builds: [
        'Clinical and administrative document intelligence.',
        'Patient risk stratification and readmission prediction with clinician-in-the-loop workflows.',
        'Operational forecasting for staffing, bed capacity, and elective-surgery scheduling.',
        'Healthcare fraud, waste, and abuse detection for payers.',
        'HIPAA-aligned data platforms; PHI handling by design.',
      ],
      whyUs:
        'Because we know when to say no. In healthcare, that is the first sign of a competent partner.',
    },
  ] satisfies IndustryDetail[],
  domains: {
    title: 'Five domains we know cold.',
    description:
      'With the vocabulary, regulators, and data quirks to prove it.',
    items: [
      { title: 'Fintech', description: 'Credit, fraud, AML, and KYC for regulated financial services.', href: industryAnchor('fintech') },
      { title: 'iGaming', description: 'Payment fraud, bonus abuse, collusion, RG, and AML for licensed operators.', href: industryAnchor('igaming') },
      { title: 'E-commerce', description: 'Ranking, pricing, fraud, and demand forecasting.', href: industryAnchor('ecommerce') },
      { title: 'Logistics', description: 'Route optimisation, ETA precision, and capacity planning.', href: industryAnchor('logistics') },
      { title: 'Healthcare', description: 'Document intelligence and operational forecasting.', href: industryAnchor('healthcare') },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: 'Brief with a domain specialist.',
    description: 'Our first meeting in your industry does not feel like a first meeting.',
    cta: { label: 'Book a briefing →', href: mailtoLinks.briefingIndustries() },
  },
} as const;
