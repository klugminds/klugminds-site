import type { Metadata } from 'next';

import { LegalDocumentLayout } from '@/components/layout/LegalDocumentLayout';
import { PolicySections } from '@/components/layout/PolicySections';
import { JsonLd } from '@/components/seo/JsonLd';
import { cookiePolicy, policyLastUpdated } from '@/config/content/policies';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = cookiePolicy.title;
const pageDescription = cookiePolicy.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.cookies,
  title: pageTitle,
  description: pageDescription,
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        pathname={ROUTES.cookies}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbs={[
          { name: siteConfig.name, path: ROUTES.home },
          { name: 'Cookies', path: ROUTES.cookies },
        ]}
      />
      <LegalDocumentLayout
        title={cookiePolicy.title}
        description={cookiePolicy.description}
        lastUpdated={policyLastUpdated}
        breadcrumbs={[{ name: 'Cookies', path: ROUTES.cookies }]}
      >
        <PolicySections sections={cookiePolicy.sections} />

        <section aria-labelledby="cookie-table-heading">
          <h2 id="cookie-table-heading" className="text-foreground text-xl font-semibold tracking-tight">
            Cookies we use
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--section-light-border)] bg-[var(--bg-soft)]">
            <table className="min-w-full divide-y divide-[var(--section-light-border)] text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    Purpose
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--section-light-border)]">
                {cookiePolicy.cookies.map((cookie) => (
                  <tr key={cookie.name}>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--ink)] sm:text-sm">
                      {cookie.name}
                    </td>
                    <td className="px-4 py-3 text-[var(--slate-700)]">{cookie.purpose}</td>
                    <td className="px-4 py-3 text-[var(--slate-700)]">{cookie.category}</td>
                    <td className="px-4 py-3 text-[var(--slate-700)]">{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </LegalDocumentLayout>
    </>
  );
}
