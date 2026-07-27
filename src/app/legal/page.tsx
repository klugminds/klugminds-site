import type { Metadata } from 'next';

import { LegalDocumentLayout } from '@/components/layout/LegalDocumentLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { policyLastUpdated } from '@/config/content/policies';
import { companyConfig, formatGstRegistrationDate } from '@/config/company';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';
import { getSiteUrl } from '@/lib/site-url';

const pageTitle = 'Legal & GST Information';
const pageDescription = `GST registration and legal entity details for ${siteConfig.name} (${companyConfig.legalName}). GSTIN ${companyConfig.gstin}.`;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.legal,
  title: pageTitle,
  description: pageDescription,
});

export default function LegalPage() {
  const siteUrl = getSiteUrl();
  const siteHost = new URL(siteUrl).host;

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
      <LegalDocumentLayout
        title="Legal & GST information"
        description={`Legal entity and GST registration details for the official ${siteConfig.name} website (${siteConfig.alternateNames.join(', ')}).`}
        lastUpdated={policyLastUpdated}
        breadcrumbs={[{ name: 'Legal', path: ROUTES.legal }]}
      >
        <section aria-labelledby="company-identity-heading">
          <h2
            id="company-identity-heading"
            className="text-foreground text-xl font-semibold tracking-tight"
          >
            Company identity
          </h2>
          <dl className="border-border divide-border mt-4 divide-y rounded-lg border">
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
              <dt className="text-muted text-sm">Brand</dt>
              <dd className="text-foreground text-sm font-medium">{siteConfig.name}</dd>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
              <dt className="text-muted text-sm">Website</dt>
              <dd className="text-foreground text-sm font-medium">
                <a
                  href={siteUrl}
                  className="text-accent-on-light transition-colors hover:text-accent-on-light-hover"
                >
                  {siteHost}
                </a>
              </dd>
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
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
              <dt className="text-muted text-sm">Registered office</dt>
              <dd className="text-foreground text-sm font-medium">
                {companyConfig.registeredOffice}
              </dd>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
              <dt className="text-muted text-sm">Delivery centre</dt>
              <dd className="text-foreground text-sm font-medium">
                {siteConfig.locations.delivery.join(', ')}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="gst-registration-heading">
          <h2
            id="gst-registration-heading"
            className="text-foreground text-xl font-semibold tracking-tight"
          >
            GST registration
          </h2>
          <dl className="border-border divide-border mt-4 divide-y rounded-lg border">
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
      </LegalDocumentLayout>
    </>
  );
}
