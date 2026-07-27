import Link from 'next/link';
import { Briefcase, Mail, MapPin } from 'lucide-react';

import { ContentCard } from '@/components/marketing/ContentCard';
import { RegionFlag } from '@/components/marketing/RegionFlag';
import { mailtoLinks } from '@/lib/mailto';
import { siteConfig } from '@/config/site';

type RoleItem = {
  title: string;
};

type CareersHeroVisualProps = {
  roles: readonly RoleItem[];
  locationsDescription: string;
};

export function CareersHeroVisual({ roles, locationsDescription }: CareersHeroVisualProps) {
  return (
    <div className="space-y-4 sm:space-y-5" aria-label="Careers at Klugminds overview">
      <ContentCard
        glow="brand"
        leading={<RegionFlag code="in" />}
        eyebrow="Delivery centre"
        title="Bengaluru"
        description="Hybrid model — in-office for design reviews and model committees; remote for deep work."
        footer={
          <p className="inline-flex items-center gap-1.5 text-xs text-[var(--slate-500)]">
            <MapPin className="h-3.5 w-3.5 text-accent-on-light" aria-hidden="true" />
            Client engagements across Europe, UAE, and Canada
          </p>
        }
      />

      <ContentCard glow="teal" icon={Briefcase} eyebrow="Roles we hire for" title="Practitioners who have shipped.">
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {roles.map((role) => (
            <li
              key={role.title}
              className="rounded-lg border border-[var(--section-light-border)] bg-[var(--bg-soft)] px-3 py-2 text-sm font-medium text-[var(--ink)]"
            >
              {role.title}
            </li>
          ))}
        </ul>
      </ContentCard>

      <Link href={mailtoLinks.careers()} className="block">
        <ContentCard
          glow="brand"
          icon={Mail}
          eyebrow="Apply now"
          title={siteConfig.careersEmail}
          description={locationsDescription}
          footer={
            <p className="text-accent-on-light text-sm font-semibold">Send your application →</p>
          }
        />
      </Link>
    </div>
  );
}
