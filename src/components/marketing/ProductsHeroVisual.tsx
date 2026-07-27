'use client';

import Link from 'next/link';
import { Boxes, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { ContentCard } from '@/components/marketing/ContentCard';
import type { ProductFamily } from '@/config/content/products';
import { resolveFeatureIcon } from '@/config/icons/feature-icons';
import { useStablePanelHeight } from '@/hooks/useStablePanelHeight';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/cn';

type ProductsHeroVisualProps = {
  families: readonly ProductFamily[];
  totalProducts: number;
};

function FamilyProductList({
  family,
  measure = false,
}: {
  family: ProductFamily;
  measure?: boolean;
}) {
  return (
    <div
      data-measure-panel={measure ? '' : undefined}
      role={measure ? undefined : 'tabpanel'}
      id={measure ? undefined : `hero-panel-${family.id}`}
      aria-labelledby={measure ? undefined : `hero-tab-${family.id}`}
      className={cn('space-y-2', measure && 'pointer-events-none invisible absolute inset-x-0 top-0')}
    >
      {family.products.map((product, index) => {
        const Icon = resolveFeatureIcon(product.icon);

        return (
          <div
            key={product.title}
            className={cn(
              'flex items-start gap-3 rounded-xl border border-[var(--section-light-border)] bg-[var(--bg-soft)] p-3 transition-colors',
              !measure && index === 0 && 'border-accent-on-light/30 bg-white',
            )}
          >
            <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--navy-800)]/10 text-[var(--navy-800)]">
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--ink)]">{product.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[var(--slate-700)]">
                {product.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductsHeroVisual({ families, totalProducts }: ProductsHeroVisualProps) {
  const [activeFamilyId, setActiveFamilyId] = useState(families[0]?.id ?? '');
  const activeFamily = families.find((family) => family.id === activeFamilyId) ?? families[0];
  const { containerRef, minHeight } = useStablePanelHeight(
    families.map((family) => `${family.id}:${family.products.length}`).join('|'),
  );

  if (!activeFamily) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-5" aria-label="Product catalogue preview">
      <ContentCard glow="brand" icon={Boxes} iconSize="large" className="!p-5 sm:!p-6">
        <p className="font-mono-eyebrow text-accent-on-light">Production catalogue</p>
        <p className="font-display mt-2 text-2xl font-bold text-[var(--ink)] sm:text-3xl">
          {totalProducts} models · {families.length} families
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--slate-700)]">
          Reference architectures, explainability layers, and monitoring planes included with every
          product.
        </p>
      </ContentCard>

      <ContentCard glow="teal" className="!p-4 sm:!p-5">
        <p className="font-mono-eyebrow text-[0.65rem] text-accent-on-light">Browse by family</p>
        <div
          role="tablist"
          aria-label="Product families"
          className="mt-3 grid grid-cols-2 gap-2"
        >
          {families.map((family) => {
            const isActive = family.id === activeFamily.id;

            return (
              <button
                key={family.id}
                type="button"
                role="tab"
                id={`hero-tab-${family.id}`}
                aria-selected={isActive}
                aria-controls={`hero-panel-${family.id}`}
                onClick={() => setActiveFamilyId(family.id)}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all duration-200 sm:text-sm',
                  isActive
                    ? 'border-accent-on-light bg-accent-on-light/10 text-[var(--ink)] shadow-sm'
                    : 'border-[var(--section-light-border)] bg-white text-[var(--slate-700)] hover:border-accent-on-light/40 hover:bg-[var(--bg-soft)]',
                )}
              >
                {family.shortName}
              </button>
            );
          })}
        </div>

        <div
          ref={containerRef}
          className="relative mt-4 transition-[min-height] duration-300 ease-out"
          style={{ minHeight: minHeight > 0 ? minHeight : undefined }}
        >
          <div aria-hidden="true">
            {families.map((family) => (
              <FamilyProductList key={family.id} family={family} measure />
            ))}
          </div>
          <FamilyProductList family={activeFamily} />
        </div>

        <Link
          href={`${ROUTES.products}#catalog`}
          className="text-accent-on-light mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-accent-on-light-hover"
        >
          Explore full catalogue
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </ContentCard>
    </div>
  );
}
