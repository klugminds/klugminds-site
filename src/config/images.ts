/**
 * Central image registry — official brand assets and generated icons.
 * Source logos: public/images/brand/logo-primary.png, logo-transparent.png
 * Regenerate icons: python scripts/generate-icons.py
 * Regenerate favicons: python scripts/generate-favicons.py
 */
export const siteImages = {
  logoPrimary: {
    src: '/images/brand/logo-primary.png',
    alt: 'Klugminds — Think Smart Build Impact',
    width: 1024,
    height: 682,
    displayHeight: 56,
  },
  logoPrimaryNav: {
    src: '/images/brand/logo-primary-nav.png',
    alt: 'Klugminds',
    width: 655,
    height: 382,
    displayHeight: 36,
  },
  logoTransparent: {
    src: '/images/brand/logo-transparent.png',
    alt: 'Klugminds',
    width: 1024,
    height: 682,
    displayHeight: 56,
  },
  logoMark: {
    src: '/images/logo-icon.png',
    alt: 'Klugminds',
    width: 512,
    height: 512,
    displayHeight: 36,
  },
  favicon: {
    src: '/images/favicon.png',
    alt: 'Klugminds',
    width: 512,
    height: 512,
    displayHeight: 32,
  },
  logoMarkColor: {
    src: '/images/logo-mark-color.png',
    alt: 'Klugminds',
    width: 512,
    height: 512,
    displayHeight: 36,
  },
  logoMarkNav: {
    src: '/images/logo-mark-nav.png',
    alt: 'Klugminds',
    width: 512,
    height: 512,
    displayHeight: 36,
  },
  appIcon: {
    src: '/images/icons/app-icon-512.png',
    alt: 'Klugminds',
    width: 512,
    height: 512,
    displayHeight: 32,
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
