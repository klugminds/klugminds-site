import type { Metadata } from 'next';

import { LegalDocumentLayout } from '@/components/layout/LegalDocumentLayout';
import { PolicySections } from '@/components/layout/PolicySections';
import { JsonLd } from '@/components/seo/JsonLd';
import { policyLastUpdated, privacyPolicy } from '@/config/content/policies';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = privacyPolicy.title;
const pageDescription = privacyPolicy.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.privacy,
  title: pageTitle,
  description: pageDescription,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        pathname={ROUTES.privacy}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbs={[
          { name: siteConfig.name, path: ROUTES.home },
          { name: 'Privacy', path: ROUTES.privacy },
        ]}
      />
      <LegalDocumentLayout
        title={privacyPolicy.title}
        description={privacyPolicy.description}
        lastUpdated={policyLastUpdated}
        breadcrumbs={[{ name: 'Privacy', path: ROUTES.privacy }]}
      >
        <PolicySections sections={privacyPolicy.sections} />
      </LegalDocumentLayout>
    </>
  );
}
