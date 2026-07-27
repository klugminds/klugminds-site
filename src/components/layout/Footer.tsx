import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/ui/Logo';
import { SiteLink } from '@/components/ui/SiteLink';
import {
  footerCompanyLinks,
  footerContactLink,
  footerIndustryLinks,
  footerLegalLinks,
  footerSolutionsLinks,
} from '@/config/content/navigation';
import { companyConfig } from '@/config/company';
import { mailtoLinks } from '@/lib/mailto';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-[var(--navy-900)] border-t text-white/85">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Logo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-xs text-white/55">
              Delivery centres: {siteConfig.locations.delivery.join(' · ')}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Solutions</h2>
            <ul className="mt-4 space-y-2">
              {footerSolutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {footerIndustryLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-white/55 transition-colors hover:text-white/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Company</h2>
            <ul className="mt-4 space-y-2">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={mailtoLinks.enquiry()}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={mailtoLinks.careers()}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.careersEmail}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/55">
              Client engagements: {siteConfig.locations.clients.join(' · ')}
            </p>
            <a
              href={footerContactLink.href}
              className="text-accent-muted mt-4 inline-flex text-sm font-medium transition-colors hover:text-white"
            >
              {footerContactLink.label}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2 sm:text-sm">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {footerLegalLinks.map((link, index) => (
                <span key={link.href} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <Link href={link.href} className="transition-colors hover:text-white/80">
                    {link.label}
                  </Link>
                </span>
              ))}
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[0.7rem] sm:text-xs">{companyConfig.gstin}</span>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <span className="hidden sm:inline">{companyConfig.legalName}</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
