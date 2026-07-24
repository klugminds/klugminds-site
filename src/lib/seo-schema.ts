import { companyConfig } from '@/config/company';
import { siteConfig } from '@/config/site';
import { absoluteUrl, getSiteUrl } from '@/lib/site-url';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type PageSchemaOptions = {
  pathname: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbs?: BreadcrumbItem[];
};

export function buildPageSchema(options: PageSchemaOptions) {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(options.pathname);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteConfig.name,
      legalName: companyConfig.legalName,
      alternateName: [...siteConfig.alternateNames, companyConfig.legalName],
      url: siteUrl,
      description: siteConfig.seoDescription,
      taxID: companyConfig.gstin,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'GSTIN',
        value: companyConfig.gstin,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.seoDescription,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: siteConfig.locale,
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: options.pageTitle,
      description: options.pageDescription,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      inLanguage: siteConfig.locale,
    },
  ];

  if (options.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
