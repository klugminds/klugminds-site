import { Boxes, Code2, Globe2 } from 'lucide-react';

import { ContentCard } from '@/components/marketing/ContentCard';
import { siteConfig } from '@/config/site';

export function HeroVisual() {
  const clientRegions = siteConfig.locations.clients
    .map((region) => (region === 'United Arab Emirates' ? 'UAE' : region))
    .join(' · ');

  return (
    <div aria-label="Klugminds delivery footprint">
      <ContentCard glow="brand" className="!p-5 sm:!p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--navy-800)]/10 text-[var(--navy-800)] sm:h-14 sm:w-14">
            <Globe2 className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-mono-eyebrow text-accent-on-light">{siteConfig.name}</p>
            <p className="font-display mt-1 text-xl font-bold text-[var(--ink)] sm:text-2xl">
              Think Smart Build Impact
            </p>
            <p className="mt-2 inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[var(--slate-700)] sm:text-sm">
              <Globe2 className="h-4 w-4 shrink-0 text-accent-on-light" aria-hidden="true" />
              <span>{clientRegions}</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--section-light-border)] pt-4">
              <div className="flex items-start gap-2">
                <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-accent-on-light" aria-hidden="true" />
                <p className="text-xs leading-snug text-[var(--slate-700)] sm:text-sm">
                  <span className="font-semibold text-[var(--ink)]">10 models</span> across fraud, AML,
                  credit, and iGaming integrity
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-on-light" aria-hidden="true" />
                <p className="text-xs leading-snug text-[var(--slate-700)] sm:text-sm">
                  <span className="font-semibold text-[var(--ink)]">4 practices</span> — one senior team
                  from discovery through operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
    </div>
  );
}
