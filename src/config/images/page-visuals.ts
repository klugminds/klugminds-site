export type PageVisual = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
};

/** Context-matched photography for marketing pages. Each `src` is used once. Fetch via: python scripts/fetch-page-images.py */
export const pageVisuals = {
  home: {
    delivery: {
      src: '/images/pages/global-delivery.jpg',
      alt: 'Global engineering team collaborating across time zones',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  products: {
    platform: {
      src: '/images/pages/products-ships-with.jpg',
      alt: 'Engineering team collaborating on production ML architecture, monitoring, and deployment',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  services: {
    hero: {
      src: '/images/pages/services.jpg',
      alt: 'Senior engineering team in a design review',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    delivery: {
      src: '/images/pages/services-delivery.jpg',
      alt: 'Collaborative engineering workspace for client delivery',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  industries: {
    hero: {
      src: '/images/pages/industries.jpg',
      alt: 'Financial operations team monitoring regulated systems',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    fintech: {
      src: '/images/pages/industry-fintech.jpg',
      alt: 'Fintech operations and risk monitoring environment',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    igaming: {
      src: '/images/pages/industry-igaming.jpg',
      alt: 'Licensed gaming operator integrity and risk workflows',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    ecommerce: {
      src: '/images/pages/industry-ecommerce.jpg',
      alt: 'E-commerce merchandising and fraud operations',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    logistics: {
      src: '/images/pages/industry-logistics.jpg',
      alt: 'Logistics fleet and warehouse operations planning',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    healthcare: {
      src: '/images/pages/industry-healthcare.jpg',
      alt: 'Healthcare clinical and operational planning environment',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  approach: {
    hero: {
      src: '/images/pages/approach.jpg',
      alt: 'Engineers planning a delivery roadmap on a whiteboard',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  insights: {
    hero: {
      src: '/images/pages/insights-hero.jpg',
      alt: 'Senior team reviewing client outcomes in a professional strategy session',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    research: {
      src: '/images/pages/insights-research.jpg',
      alt: 'Practitioner documenting lessons from production AI deployments',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  careers: {
    culture: {
      src: '/images/pages/careers.jpg',
      alt: 'Modern engineering workspace in Bengaluru',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
  about: {
    hero: {
      src: '/images/pages/about.jpg',
      alt: 'Contemporary office tower representing global delivery',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    story: {
      src: '/images/pages/about-story.jpg',
      alt: 'Practitioner-led team shaping a production AI engagement',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
    operations: {
      src: '/images/pages/about-operations.jpg',
      alt: 'Senior engineering team coordinating global client delivery',
      width: 1400,
      height: 933,
      credit: 'Unsplash',
    },
  },
} as const satisfies Record<string, Record<string, PageVisual>>;

export type IndustryVisualId = 'fintech' | 'igaming' | 'ecommerce' | 'logistics' | 'healthcare';

export function industryPageVisual(id: IndustryVisualId): PageVisual {
  return pageVisuals.industries[id];
}
