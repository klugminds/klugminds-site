/**
 * Central image registry — V4 brand assets and page photography.
 * Sources live in public/images/brand and public/images/pages.
 */
export const siteImages = {
  /** Logo mark for light surfaces (navy/teal/orange). */
  mark: {
    src: '/images/brand/mark.svg',
    alt: 'Klugminds',
    width: 372,
    height: 282,
  },
  /** Logo mark for dark surfaces. */
  markInverse: {
    src: '/images/brand/mark-inverse.svg',
    alt: 'Klugminds',
    width: 372,
    height: 282,
  },
  /** Square favicon source (full-bleed navy tile). */
  favicon: {
    src: '/images/brand/favicon.svg',
    alt: 'Klugminds',
    width: 512,
    height: 512,
  },
  /** Open Graph / social sharing image. */
  ogImage: {
    src: '/images/brand/og-image.jpg',
    alt: 'Klugminds — applied AI engineering',
    width: 1200,
    height: 630,
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;

/** Page photography used by inner-page heroes and media frames. */
export const pageImages = {
  about: { src: '/images/pages/about.jpg', alt: 'The Klugminds engineering floor' },
  approach: { src: '/images/pages/approach.jpg', alt: 'Engineers reviewing a delivery plan' },
  careers: { src: '/images/pages/careers.jpg', alt: 'Engineers pairing at a workstation' },
  industries: { src: '/images/pages/industries.jpg', alt: 'Operations across regulated sectors' },
  services: { src: '/images/pages/services.jpg', alt: 'A delivery pod at work' },
} as const;

export type PageImageKey = keyof typeof pageImages;
