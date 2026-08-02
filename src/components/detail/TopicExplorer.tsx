'use client';

import { useId, useState } from 'react';

import { VizPanel, type VizKind } from '@/components/viz/panels';

export type TopicTab = {
  key: string;
  tab: string;
  heading: string;
  lede: string;
  bullets: readonly string[];
  panel: VizKind;
};

type TopicExplorerProps = {
  id: string;
  label: string;
  topics: readonly TopicTab[];
};

export function TopicExplorer({ id, label, topics }: TopicExplorerProps) {
  const baseId = useId();
  const [active, setActive] = useState(topics[0]?.key ?? '');

  const current = topics.find((t) => t.key === active) ?? topics[0];

  if (!current) {
    return null;
  }

  return (
    <div id={id} className="mt-10">
      <div role="tablist" data-explorer aria-label={label} className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const tabId = `${baseId}-${topic.key}-tab`;
          const panelId = `${baseId}-${topic.key}-panel`;
          const selected = topic.key === active;
          return (
            <button
              key={topic.key}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              suppressHydrationWarning
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? 'border-accent-interactive bg-accent-interactive text-accent-foreground'
                  : 'border-foreground/20 t-muted hover:border-foreground/35 hover:t-fg'
              }`}
              onClick={() => setActive(topic.key)}
            >
              {topic.tab}
            </button>
          );
        })}
      </div>

      {topics.map((topic) => {
        const panelId = `${baseId}-${topic.key}-panel`;
        const tabId = `${baseId}-${topic.key}-tab`;
        const selected = topic.key === active;
        return (
          <div
            key={topic.key}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14"
          >
            <div className="min-w-0">
              <h3 className="font-display t-fg text-xl font-bold tracking-tight sm:text-2xl">
                {topic.heading}
              </h3>
              <p className="t-muted mt-4 text-base leading-relaxed">{topic.lede}</p>
              <ul className="mt-6 space-y-3">
                {topic.bullets.map((bullet) => (
                  <li key={bullet} className="t-muted flex gap-3 text-sm leading-relaxed">
                    <span
                      className="bg-accent-interactive mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <VizPanel kind={topic.panel} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
