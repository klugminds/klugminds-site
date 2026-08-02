export const approachContent = {
  hero: {
    eyebrow: 'OUR APPROACH',
    title: 'A delivery model built for models that have to work.',
    description:
      'Most AI projects fail in the first fortnight — wrong problem framed, wrong metric chosen, or wrong stakeholder left out of the room. Long before any production incident.',
  },
  principles: {
    eyebrow: 'THE FIVE PHASES',
    title: 'Five phases, each with an exit gate.',
    lede: 'Select a phase in the pipeline above to see what it produces and what has to be true before we move on. Designed to make early failures visible and cheap to correct.',
    items: [
      {
        title: 'Explainable by default',
        description: 'If we cannot explain the decision, we do not ship the model.',
      },
      {
        title: 'Audit-ready architecture',
        description: 'Every input, feature, version, and decision is reproducible.',
      },
      {
        title: 'Secure from the first commit',
        description: 'Threat modelling before sprint one. Scanning on every merge.',
      },
      {
        title: 'Operated, not abandoned',
        description: 'We stay after go-live — that is where value is realised or lost.',
      },
      {
        title: 'Small, senior teams',
        description: 'Two people who can decide, rather than five who need permission.',
      },
    ],
  },
  operate: {
    eyebrow: 'OPERATE & OPTIMISE',
    title: 'The phase most vendors skip.',
    lede: 'A model is a liability the day after go-live unless someone is watching it. Trigger the drift below to see what our runbook does when a feed changes.',
  },
  cta: {
    title: 'Walk through our delivery model with an engagement lead.',
  },
} as const;
