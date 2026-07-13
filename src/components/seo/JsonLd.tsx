import { siteConfig } from '@/config/site';
import { absoluteUrl, getSiteUrl } from '@/lib/site-url';

type JsonLdProps = {
  pathname?: string;
};

export function JsonLd({ pathname = '/' }: JsonLdProps) {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(pathname);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        description: siteConfig.description,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
