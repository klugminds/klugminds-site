import Link from 'next/link';

import { FooterBriefingLink } from '@/components/layout/FooterBriefingLink';
import { BrandLockup } from '@/components/ui/BrandLockup';
import { companyConfig } from '@/config/company';
import {
  footerCompanyLinks,
  footerLegalLinks,
  footerWorkLinks,
  type NavLink,
} from '@/config/content/navigation';
import { siteConfig } from '@/config/site';

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="text-sm text-white/70 transition-colors hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t bg-[var(--navy-900)] text-white/85">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <BrandLockup variant="panel" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Production AI for regulated industries, built and operated by one senior team.
            </p>
            <p className="mt-4 text-xs text-white/55">
              Delivery centre: Bengaluru · Engagements: Europe, UAE, Canada
            </p>
          </div>
          <FooterColumn title="Work" links={footerWorkLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.careersEmail}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.careersEmail}
                </a>
              </li>
            </ul>
            <FooterBriefingLink />
          </div>
        </div>
        <div className="b-line mt-12 border-t pt-6">
          <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {footerLegalLinks.map((link, index) => (
                <span key={link.label} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <Link className="transition-colors hover:text-white/80" href={link.href}>
                    {link.label}
                  </Link>
                </span>
              ))}
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[0.7rem]">{companyConfig.gstin}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
