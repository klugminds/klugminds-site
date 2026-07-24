import { buildPageSchema } from '@/lib/seo-schema';

type JsonLdProps = {
  pathname?: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

export function JsonLd({ pathname = '/', pageTitle, pageDescription, breadcrumbs }: JsonLdProps) {
  const schema = buildPageSchema({
    pathname,
    pageTitle,
    pageDescription,
    breadcrumbs,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
