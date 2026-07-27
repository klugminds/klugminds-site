import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { policyRelatedLinks } from '@/config/content/policies';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { formatBlogDate } from '@/lib/format-date';
import { cn } from '@/lib/cn';

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
  className?: string;
};

export function LegalDocumentLayout({
  title,
  description,
  lastUpdated,
  breadcrumbs,
  children,
  className,
}: LegalDocumentLayoutProps) {
  return (
    <Section aria-labelledby="legal-document-heading">
      <Container>
        <div className={cn('mx-auto max-w-3xl', className)}>
          <nav aria-label="Breadcrumb" className="text-muted mb-6 text-sm">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={ROUTES.home} className="hover:text-foreground transition-colors">
                  {siteConfig.name}
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-foreground transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <header className="border-border border-b pb-8">
            <p className="font-mono-eyebrow text-accent-on-light">LEGAL</p>
            <h1
              id="legal-document-heading"
              className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {title}
            </h1>
            <p className="text-muted mt-4 max-w-2xl leading-relaxed">{description}</p>
            <p className="text-muted mt-3 text-sm">Last updated: {formatBlogDate(lastUpdated)}</p>
          </header>

          <div className="mt-10 space-y-10">{children}</div>

          <aside
            aria-label="Related legal documents"
            className="mt-12 rounded-xl border border-[var(--section-light-border)] bg-[var(--bg-soft)] p-6"
          >
            <h2 className="text-sm font-semibold text-[var(--ink)]">Related documents</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {policyRelatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-accent-on-light font-medium transition-colors hover:text-accent-on-light-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <p className="mt-10">
            <Link
              href={ROUTES.home}
              className="text-accent-muted hover:text-accent text-sm font-medium transition-colors"
            >
              &larr; Back to {siteConfig.name}
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
