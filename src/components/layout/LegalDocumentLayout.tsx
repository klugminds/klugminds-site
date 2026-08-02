import Link from 'next/link';
import type { ReactNode } from 'react';

import { policyRelatedLinks } from '@/config/content/policies';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { formatBlogDate } from '@/lib/format-date';

type Breadcrumb = {
  name: string;
  path: string;
};

type LegalDocumentLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  breadcrumbs: readonly Breadcrumb[];
  children: ReactNode;
};

export function LegalDocumentLayout({
  title,
  description,
  lastUpdated,
  breadcrumbs,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <section className="section-white b-line border-b py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="t-muted flex flex-wrap items-center gap-2 text-xs">
            <li>
              <Link className="hover:t-fg" href={ROUTES.home}>
                {siteConfig.name}
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="t-fg font-medium" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link className="hover:t-fg" href={crumb.path}>
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="border-foreground/10 border-b pb-8">
          <p className="font-mono-eyebrow t-accent">LEGAL</p>
          <h1 className="font-display t-fg mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="t-muted mt-4 max-w-2xl leading-relaxed">{description}</p>
          <p className="t-muted mt-3 text-sm">Last updated: {formatBlogDate(lastUpdated)}</p>
        </header>

        <div className="legal-prose mt-10 space-y-10">{children}</div>

        <aside
          aria-label="Related legal documents"
          className="content-card v4-spot mt-12 rounded-xl p-6"
        >
          <h2 className="font-display t-fg text-sm font-bold">Related documents</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {policyRelatedLinks.map((link) => (
              <li key={link.href}>
                <Link className="t-accent hover:t-fg font-medium" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <p className="mt-10">
          <Link className="t-accent hover:t-fg text-sm font-medium" href={ROUTES.home}>
            ← Back to {siteConfig.name}
          </Link>
        </p>
      </div>
    </section>
  );
}
