import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = siteConfig.name;
const pageDescription = siteConfig.seoDescription;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.home,
  title: pageTitle,
  description: pageDescription,
});

export default function HomePage() {
  return (
    <>
      <JsonLd pathname={ROUTES.home} pageTitle={pageTitle} pageDescription={pageDescription} />
      <Section>
        <Container>
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="text-muted mt-4 max-w-xl text-lg sm:text-xl">{siteConfig.tagline}</p>
            <p className="border-border bg-surface text-muted mt-6 rounded-md border px-4 py-2 text-sm">
              {siteConfig.statusMessage}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
