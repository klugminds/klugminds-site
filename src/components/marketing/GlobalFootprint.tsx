import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { RegionFlag, type RegionCode } from '@/components/marketing/RegionFlag';

type Region = {
  label: string;
  detail: string;
  region: RegionCode;
};

type GlobalFootprintProps = {
  regions: readonly Region[];
  caption: string;
};

export function GlobalFootprint({ regions, caption }: GlobalFootprintProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {regions.map((region, index) => (
          <ContentCard
            key={region.label}
            glow={cardGlowAt(index)}
            leading={<RegionFlag code={region.region} className="mx-auto" />}
            title={region.label}
            description={region.detail}
            align="center"
            className="min-w-0 px-3 py-5 sm:px-5 sm:py-6 [&_h3]:text-base [&_h3]:sm:text-lg [&_p:last-child]:text-xs [&_p:last-child]:leading-snug [&_p:last-child]:sm:text-sm"
          />
        ))}
      </div>
      <p className="text-muted mt-6 max-w-2xl text-sm leading-relaxed sm:mt-8 sm:text-base">
        {caption}
      </p>
    </div>
  );
}
