import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { companyConfig, formatGstRegistrationDate } from '@/config/company';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Legal & GST Information';
const pageDescription = `GST registration and legal entity details for ${siteConfig.name} (${companyConfig.legalName}). GSTIN ${companyConfig.gstin}.`;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.legal,
  title: pageTitle,
  description: pageDescription,
});

export default function LegalPage() {
  return (
    <>
      <JsonLd
        pathname={ROUTES.legal}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbs={[
          { name: siteConfig.name, path: ROUTES.home },
          { name: 'Legal', path: ROUTES.legal },
        ]}
      />
      <Section aria-labelledby="legal-heading">
        <Container>
          <div className="mx-auto max-w-2xl">
            <nav aria-label="Breadcrumb" className="text-muted mb-6 text-sm">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={ROUTES.home} className="hover:text-foreground transition-colors">
                    {siteConfig.name}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Legal</li>
              </ol>
            </nav>

            <h1
              id="legal-heading"
              className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Legal &amp; GST information
            </h1>
            <p className="text-muted mt-4 leading-relaxed">
              This page lists the legal entity and GST registration details for the official{' '}
              {siteConfig.name} website ({siteConfig.name} AI, Klugmindlabs).
            </p>

            <section aria-labelledby="company-identity-heading" className="mt-10">
              <h2
                id="company-identity-heading"
                className="text-foreground text-xl font-semibold tracking-tight"
              >
                Company identity
              </h2>
              <dl className="border-border mt-4 divide-y divide-[var(--color-border)] rounded-lg border">
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">Brand / website</dt>
                  <dd className="text-foreground text-sm font-medium">{siteConfig.name}</dd>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">Legal entity name</dt>
                  <dd className="text-foreground text-sm font-medium">{companyConfig.legalName}</dd>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">Also known as</dt>
                  <dd className="text-foreground text-sm font-medium">
                    {siteConfig.alternateNames.join(', ')}
                  </dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="gst-registration-heading" className="mt-10">
              <h2
                id="gst-registration-heading"
                className="text-foreground text-xl font-semibold tracking-tight"
              >
                GST registration
              </h2>
              <dl className="border-border mt-4 divide-y divide-[var(--color-border)] rounded-lg border">
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">GSTIN</dt>
                  <dd className="text-foreground font-mono text-sm font-medium">
                    {companyConfig.gstin}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">Registered from</dt>
                  <dd className="text-foreground text-sm font-medium">
                    {formatGstRegistrationDate()}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted text-sm">Registered to</dt>
                  <dd className="text-foreground text-sm font-medium">{companyConfig.legalName}</dd>
                </div>
              </dl>
            </section>

            <p className="text-muted mt-10 text-sm leading-relaxed">
              {siteConfig.statusMessage} For business or compliance enquiries related to{' '}
              {siteConfig.name} or {companyConfig.legalName}, use official channels once published
              on this website.
            </p>

            <p className="mt-6">
              <Link
                href={ROUTES.home}
                className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                &larr; Back to {siteConfig.name}
              </Link>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
