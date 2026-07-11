import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl, getSiteUrl } from '@/lib/site-url';

type CreateMetadataOptions = {
  pathname?: string;
  title?: string;
  description?: string;
};

export function createMetadata(options: CreateMetadataOptions = {}): Metadata {
  const pathname = options.pathname ?? '/';
  const title = options.title ?? siteConfig.name;
  const description = options.description ?? siteConfig.description;
  const canonical = absoluteUrl(pathname);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
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
      index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
      follow: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
    },
  };
}
