import Link from 'next/link';
import { Boxes, Code2 } from 'lucide-react';

import { ContentCard } from '@/components/marketing/ContentCard';
import { SectionHeader } from '@/components/marketing/SectionHeader';

type Panel = {
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  cta: { label: string; href: string };
};

type TwoWaysSectionProps = {
  eyebrow: string;
  title: string;
  products: Panel;
  services: Panel;
};

function TwoWayPanel({
  panel,
  icon,
  glow,
}: {
  panel: Panel;
  icon: typeof Boxes;
  glow: 'brand' | 'teal';
}) {
  return (
    <ContentCard
      glow={glow}
      icon={icon}
      iconSize="large"
      padding="large"
      eyebrow={panel.title}
      title={panel.subtitle}
      description={panel.description}
      className="h-full"
      footer={
        <>
          <p className="font-mono text-xs text-[var(--slate-500)]">{panel.stat}</p>
          <Link
            href={panel.cta.href}
            className="text-accent-on-light mt-4 inline-flex items-center text-sm font-semibold transition-colors hover:text-accent-on-light-hover"
          >
            {panel.cta.label}
          </Link>
        </>
      }
    />
  );
}

export function TwoWaysSection({ eyebrow, title, products, services }: TwoWaysSectionProps) {
  return (
    <>
      <SectionHeader eyebrow={eyebrow} title={title} align="center" tone="light" className="mx-auto" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <TwoWayPanel panel={products} icon={Boxes} glow="brand" />
        <TwoWayPanel panel={services} icon={Code2} glow="teal" />
      </div>
    </>
  );
}
