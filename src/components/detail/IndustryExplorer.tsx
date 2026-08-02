'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { Checklist } from '@/components/detail/Checklist';
import { VizPanel, type VizKind } from '@/components/viz/panels';
import { replaceHashSilently, subscribeToHash } from '@/lib/nav';

export type IndustryTab = {
  id: string;
  label: string;
  panel: VizKind;
  intro: string;
  bullets: readonly string[];
  why: string;
};

type IndustryExplorerProps = {
  label: string;
  industries: readonly IndustryTab[];
};

function industryFromHash(hash: string, industries: readonly IndustryTab[]): string | null {
  const id = hash.replace(/^#/, '');
  if (!id) {
    return null;
  }
  return industries.some((item) => item.id === id) ? id : null;
}

function scrollToIndustry(id: string) {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function IndustryExplorer({ label, industries }: IndustryExplorerProps) {
  const baseId = useId();
  const pathname = usePathname();
  const lastHashRef = useRef('');
  const [active, setActive] = useState(industries[0]?.id ?? '');

  useEffect(() => {
    const syncFromHash = (scroll: boolean) => {
      const hash = window.location.hash;
      const id = industryFromHash(hash, industries);
      if (!id) {
        return;
      }
      setActive((current) => (current === id ? current : id));
      if (scroll && hash !== lastHashRef.current) {
        scrollToIndustry(id);
      }
      lastHashRef.current = hash;
    };

    syncFromHash(true);
    return subscribeToHash(() => syncFromHash(true));
  }, [industries, pathname]);

  const selectIndustry = (id: string) => {
    setActive(id);
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      replaceHashSilently(hash);
      lastHashRef.current = hash;
    }
  };

  const current = industries.find((item) => item.id === active) ?? industries[0];
  if (!current) {
    return null;
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        data-explorer
        aria-label={label}
        className="flex flex-wrap gap-2"
        data-reveal
        data-reveal-delay="1"
      >
        {industries.map((item) => {
          const tabId = `${baseId}-${item.id}-tab`;
          const panelId = `${baseId}-${item.id}-panel`;
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              suppressHydrationWarning
              className={`explorer-tab inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? 'border-accent-interactive bg-accent-interactive text-accent-foreground'
                  : 'border-foreground/20 t-muted hover:border-foreground/35 hover:t-fg'
              }`}
              onClick={() => selectIndustry(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {industries.map((item) => {
        const panelId = `${baseId}-${item.id}-panel`;
        const tabId = `${baseId}-${item.id}-tab`;
        const selected = item.id === active;
        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className="explorer-panel mt-10 focus-visible:outline-none"
            tabIndex={0}
          >
            <span id={item.id} className="block scroll-mt-28" aria-hidden="true" />
            <div
              className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
              data-reveal
              data-reveal-delay="2"
            >
              <div>
                <h3 className="font-display t-fg text-2xl font-bold sm:text-3xl">{item.label}</h3>
                <p className="t-muted mt-4 text-base leading-relaxed">{item.intro}</p>
                <div className="mt-6">
                  <Checklist items={item.bullets} />
                </div>
                <div className="content-card mt-7 rounded-2xl p-5">
                  <p className="t-accent text-xs font-semibold tracking-wider uppercase">
                    Why clients choose us here
                  </p>
                  <p className="t-muted mt-1.5 text-sm leading-relaxed">{item.why}</p>
                </div>
              </div>
              <div>
                <VizPanel kind={item.panel} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
