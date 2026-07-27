import type { FeatureItem } from '@/config/content/home';
import { mailtoLinks } from '@/lib/mailto';

export type ProductFamily = {
  id: string;
  name: string;
  shortName: string;
  products: readonly FeatureItem[];
};

export const productsContent = {
  hero: {
    eyebrow: 'KLUGMINDS PRODUCTS',
    title: "Models we've already built. Ready for your data.",
    description:
      'The Klugminds product catalogue exists because the same eight to ten problems recur in every regulated industry — and every operator ends up rebuilding them from scratch. We refuse to let that be true. Each product below is a production system with a reference architecture, a documented feature set, an explainability layer, and a monitoring plane.',
  },
  families: {
    title: 'Four families. One platform.',
    description:
      'Products group into four families. Each family shares a data schema, a feature store, and an evaluation harness — so a client who deploys two products gets a compounding cost curve, not a linear one.',
    items: [
      {
        id: 'financial-crime',
        name: 'Financial Crime & Integrity',
        shortName: 'Financial crime',
        products: [
          {
            title: 'Fraud Detection Suite',
            slug: 'fraud-detection-suite',
            icon: 'fraud',
            description:
              'Real-time transaction anomaly detection with behavioural biometrics, device intelligence, and network-graph signals. Latency budget under 80 ms at p99 — for payments, deposits, and cash-out decisions in fintech and iGaming.',
          },
          {
            title: 'iGaming Integrity Model',
            slug: 'igaming-integrity-model',
            icon: 'gaming',
            description:
              'Bonus abuse, multi-accounting, and collusion in one graph-aware model. Surfaces linked accounts, promo farming, and chip-dumping patterns with reason codes for analyst review.',
          },
          {
            title: 'AML Transaction Monitoring',
            slug: 'aml-transaction-monitoring',
            icon: 'scale',
            description:
              'Scenario coverage plus supervised risk scoring, layered so the two disagree productively. Workflow triages cases by expected value of investigation.',
          },
          {
            title: 'Responsible Gaming (RG) Model',
            slug: 'responsible-gaming-model',
            icon: 'users',
            description:
              'Detects escalating harm patterns early enough for intervention. Built for risk and safer-gambling teams — ships with a graded response playbook and audit-ready documentation.',
          },
        ],
      },
      {
        id: 'credit-risk',
        name: 'Credit & Risk Decisioning',
        shortName: 'Credit & risk',
        products: [
          {
            title: 'Credit Risk Scoring Model',
            slug: 'credit-risk-scoring-model',
            icon: 'credit',
            description:
              'Application, behavioural, and collections scorecards with monotonicity constraints, reason codes, and a fairness diagnostic pack.',
          },
          {
            title: 'Alternative Credit Model',
            slug: 'alternative-credit-model',
            icon: 'users',
            description:
              'For thin-file and underbanked segments using telco, utility, e-commerce, and consented cash-flow data — with documented data provenance.',
          },
        ],
      },
      {
        id: 'customer-value',
        name: 'Customer Value & Retention',
        shortName: 'Customer value',
        products: [
          {
            title: 'Churn Prediction Model',
            slug: 'churn-prediction-model',
            icon: 'churn',
            description:
              'Time-to-event modelling with counterfactual uplift, so retention teams spend on customers who will actually respond.',
          },
          {
            title: 'Lifetime Value (LTV) Model',
            slug: 'lifetime-value-model',
            icon: 'growth',
            description:
              'Probabilistic customer lifetime with cohort decomposition — for pricing acquisition, tiering VIPs, and defending marketing budgets.',
          },
        ],
      },
      {
        id: 'operations-logistics',
        name: 'Operations & Logistics Intelligence',
        shortName: 'Operations',
        products: [
          {
            title: 'Logistics Optimisation Model',
            slug: 'logistics-optimisation-model',
            icon: 'logistics',
            description:
              'Route optimisation, ETA prediction, and last-mile sequencing — handling driver preference, vehicle constraints, and service-window promises.',
          },
          {
            title: 'Demand Forecasting Model',
            slug: 'demand-forecasting-model',
            icon: 'forecast',
            description:
              'Hierarchical forecasting for SKU × location × week, with promotion and event overlays. Reconciled forecasts that add up.',
          },
        ],
      },
    ] satisfies ProductFamily[],
  },
  shipsWith: {
    eyebrow: 'WHAT SHIPS WITH EVERY PRODUCT',
    title: 'Production systems, not slide decks.',
    items: [
      {
        title: 'A reference architecture',
        icon: 'architecture',
        description:
          'A deployable stack for AWS, Azure, or on-prem, with Terraform modules and CI templates.',
      },
      {
        title: 'Explainability, not screenshots',
        icon: 'explain',
        description:
          'SHAP-based reason codes at score time, plus a governance report per model release.',
      },
      {
        title: 'A monitoring plane',
        icon: 'monitor',
        description:
          'Data drift, concept drift, feature stability, and outcome tracking — dashboards live before the model does.',
      },
      {
        title: 'An operator runbook',
        icon: 'runbook',
        description:
          'Escalation paths, retraining triggers, model retirement conditions — the document your risk committee will actually want to read.',
      },
      {
        title: 'A shared feature store',
        icon: 'datastore',
        description:
          'So the second and third models you deploy build on the first — instead of reinventing customer, transaction, and session features.',
      },
    ] satisfies FeatureItem[],
  },
  buying: {
    eyebrow: 'HOW BUYING WORKS',
    title: 'Three engagement shapes.',
    description:
      'Chosen by the maturity of your data and the tolerance of your risk owners.',
    items: [
      {
        title: 'Pilot (6–8 weeks)',
        icon: 'pilot',
        description:
          'One model, one segment, one measurable outcome. Fixed price. Success criteria and baseline metrics agreed in writing before work starts — lift reported on your held-out sample at pilot close.',
      },
      {
        title: 'Deploy (10–14 weeks)',
        icon: 'deploy',
        description:
          'Production integration, monitoring, governance sign-off, and analyst training. Priced per environment.',
      },
      {
        title: 'Operate (ongoing)',
        icon: 'operate',
        description:
          'Managed model operations — drift response, quarterly retraining, and a named engineer as your point of contact.',
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: 'Request a product briefing.',
    description:
      'A thirty-minute walkthrough with the engineer who built the model, not a slide from a business-development lead.',
    cta: { label: 'Book a briefing →', href: mailtoLinks.briefingProducts() },
  },
} as const;
