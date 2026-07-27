'use client';

import { useCallback, useEffect, useState } from 'react';

import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import type { ProductFamily } from '@/config/content/products';
import { useStablePanelHeight } from '@/hooks/useStablePanelHeight';
import { cn } from '@/lib/cn';

type ProductCatalogProps = {
  eyebrow: string;
  title: string;
  description: string;
  families: readonly ProductFamily[];
};

export function ProductCatalog({ eyebrow, title, description, families }: ProductCatalogProps) {
  const [activeFamilyId, setActiveFamilyId] = useState(families[0]?.id ?? '');
  const { containerRef, minHeight } = useStablePanelHeight(
    families.map((family) => `${family.id}:${family.products.length}`).join('|'),
  );

  const activeFamily = families.find((family) => family.id === activeFamilyId) ?? families[0];

  const selectFamily = useCallback((familyId: string) => {
    setActiveFamilyId(familyId);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const matchedFamily = families.find((family) => family.id === hash);
    if (matchedFamily) {
      selectFamily(matchedFamily.id);
      return;
    }

    const familyWithProduct = families.find((family) =>
      family.products.some((product) => product.slug === hash),
    );
    if (familyWithProduct) {
      selectFamily(familyWithProduct.id);
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [families, selectFamily]);

  if (!activeFamily) {
    return null;
  }

  return (
    <div id="catalog">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <div
        role="tablist"
        aria-label="Product families"
        className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {families.map((family) => {
          const isActive = family.id === activeFamily.id;

          return (
            <button
              key={family.id}
              type="button"
              role="tab"
              id={`catalog-tab-${family.id}`}
              aria-selected={isActive}
              aria-controls={`catalog-panel-${family.id}`}
              onClick={() => selectFamily(family.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'border-accent-interactive bg-accent-interactive text-white shadow-[0_0_20px_rgb(0_122_133/0.35)]'
                  : 'border-[var(--section-light-border)] bg-[var(--surface-elevated)] text-[var(--soft)] hover:border-accent-on-light/50 hover:text-white',
              )}
            >
              {family.name}
              <span className="ml-2 text-xs opacity-70">({family.products.length})</span>
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className="relative mt-8 transition-[min-height] duration-300 ease-out"
        style={{ minHeight: minHeight > 0 ? minHeight : undefined }}
      >
        <div aria-hidden="true">
          {families.map((family) => (
            <div
              key={family.id}
              data-measure-panel
              className="pointer-events-none invisible absolute inset-x-0 top-0"
            >
              <FeatureGrid items={family.products} columns={2} />
            </div>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`catalog-panel-${activeFamily.id}`}
          aria-labelledby={`catalog-tab-${activeFamily.id}`}
          className="relative"
        >
          <FeatureGrid items={activeFamily.products} columns={2} />
        </div>
      </div>
    </div>
  );
}
