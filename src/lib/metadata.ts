import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl, getSiteUrl, isIndexingAllowed } from '@/lib/site-url';

type CreateMetadataOptions = {
  pathname?: string;
  title?: string;
  description?: string;
  keywords?: readonly string[];
};

export function createMetadata(options: CreateMetadataOptions = {}): Metadata {
  const pathname = options.pathname ?? '/';
  const title = options.title ?? siteConfig.name;
  const description = options.description ?? siteConfig.seoDescription;
  const keywords = options.keywords ?? siteConfig.keywords;
  const canonical = absoluteUrl(pathname);
  const allowIndexing = isIndexingAllowed();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [...keywords],
    applicationName: siteConfig.name,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: allowIndexing,
      follow: allowIndexing,
      googleBot: {
        index: allowIndexing,
        follow: allowIndexing,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
