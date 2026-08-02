'use client';

import { useEffect, useRef, useState } from 'react';

import type { VizConfig, VizStat } from '@/components/viz/types';

type SelectableVizProps = {
  /** The panel kind, kept as data-viz for parity with the reference. */
  kind: string;
  title: string;
  hint?: string;
  config: VizConfig;
  /** Readout row definition; values come from the active item's stats. */
  stats?: VizStat[];
  /** Readout column count; 3 is the stylesheet default. */
  statsCols?: 2 | 3 | 4;
  /** Dim non-related marks while one is active (default true). */
  dim?: boolean;
  /** Also pick marks on hover (default true). */
  hover?: boolean;
  /** Screen-reader description of the plot. */
  caption: string;
  ariaLabel?: string;
  className?: string;
  /** The SVG plot: `<g className="viz-hit" data-key="…">` marks, optional
   *  `.viz-ring` halos, and `[data-edge="a|b"]` edges. */
  children: React.ReactNode;
};

/**
 * The shared "pick a mark, read about it" panel. The SVG children are static
 * JSX rendered on the server; this wrapper owns the active key, wires
 * pointer/keyboard picking onto the marks, and repaints readout and detail.
 */
export function SelectableViz({
  kind,
  title,
  hint = 'Select a node',
  config,
  stats = [],
  statsCols = 3,
  dim = true,
  hover = true,
  caption,
  ariaLabel,
  className,
  children,
}: SelectableVizProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(config.initial);

  // Wake-up: stagger indices on marks, is-live when scrolled to.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) {
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      figure.querySelectorAll<SVGElement>('.viz-hit').forEach((mark, i) => {
        mark.style.setProperty('--vi', String(Math.min(i, 13)));
        mark.classList.add('viz-anim');
      });
    }
    if (reduced || !('IntersectionObserver' in window)) {
      figure.classList.add('is-live');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          figure.classList.add('is-live');
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(figure);
    return () => io.disconnect();
  }, []);

  // Wire picking onto the server-rendered marks.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) {
      return;
    }
    const marks = Array.from(figure.querySelectorAll<SVGGElement>('.viz-hit[data-key]'));
    const cleanups: Array<() => void> = [];
    marks.forEach((mark) => {
      mark.setAttribute('role', 'button');
      if (!mark.hasAttribute('tabindex')) {
        mark.setAttribute('tabindex', '0');
      }
      const pick = () => {
        const key = mark.dataset.key;
        if (key) {
          setActive(key);
        }
      };
      const onHover = () => {
        if (hover) {
          pick();
        }
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          pick();
        }
      };
      mark.addEventListener('click', pick);
      mark.addEventListener('mouseenter', onHover);
      mark.addEventListener('focus', pick);
      mark.addEventListener('keydown', onKeyDown);
      cleanups.push(() => {
        mark.removeEventListener('click', pick);
        mark.removeEventListener('mouseenter', onHover);
        mark.removeEventListener('focus', pick);
        mark.removeEventListener('keydown', onKeyDown);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [hover]);

  // Repaint mark and edge classes when the active key changes.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) {
      return;
    }
    const item = config.items[active] ?? {};
    const keep = new Set([active, ...(item.with ?? [])]);
    figure.querySelectorAll<SVGGElement>('.viz-hit[data-key]').forEach((mark) => {
      const key = mark.dataset.key ?? '';
      mark.classList.toggle('is-active', key === active);
      mark.classList.toggle('is-dim', dim && !keep.has(key));
      mark.setAttribute('aria-pressed', String(key === active));
    });
    figure.querySelectorAll<SVGElement>('[data-edge]').forEach((edge) => {
      const [a = '', b = ''] = (edge.dataset.edge ?? '').split('|');
      edge.classList.toggle('is-dim', !(keep.has(a) && keep.has(b)));
    });
  }, [active, config.items, dim]);

  const item = config.items[active] ?? {};
  const statValues = new Map(item.stats ?? []);

  return (
    <figure
      ref={figureRef}
      className={`viz${className ? ` ${className}` : ''}`}
      data-viz={kind}
      role="group"
      aria-label={ariaLabel ?? title}
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">{title}</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          {hint}
        </span>
      </div>
      {children}
      {stats.length ? (
        <dl
          className={`viz-readout${statsCols !== 3 ? ` cols-${statsCols}` : ''}`}
          aria-live="polite"
        >
          {stats.map((stat) => (
            <div
              key={stat.el}
              className={`viz-stat${
                stat.tone === 'signal' ? 'is-signal' : stat.tone === 'accent' ? 'is-accent' : ''
              }`}
            >
              <dt>{stat.label}</dt>
              <dd>{statValues.get(stat.el) ?? '—'}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="viz-detail">
        <p className="viz-detail-title">{item.title}</p>
        <p>{item.text}</p>
        {item.kv?.length ? (
          <div className="viz-kv">
            {item.kv.map((entry) => (
              <span key={entry}>{entry}</span>
            ))}
          </div>
        ) : null}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
