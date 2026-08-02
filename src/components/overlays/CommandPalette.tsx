'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Overlay } from '@/components/overlays/Overlay';
import { CommandPaletteShortcut } from '@/components/ui/CommandPaletteShortcut';
import { ROUTES, serviceRoute, solutionRoute } from '@/constants/routes';
import { openBriefing } from '@/lib/briefing';
import { OPEN_COMMAND_PALETTE_EVENT } from '@/lib/command-palette';
import { cn } from '@/lib/cn';

type IndexKind = 'page' | 'model' | 'service' | 'action' | 'demo';

type IndexItem = {
  group: string;
  title: string;
  sub: string;
  kind: IndexKind;
  href?: string;
  action?: 'briefing';
};

/** Authored search index — a static site has no search endpoint, and the whole site fits here. */
const INDEX: IndexItem[] = [
  {
    group: 'Actions',
    title: 'Book a briefing',
    sub: '45 minutes',
    kind: 'action',
    action: 'briefing',
  },
  { group: 'Actions', title: 'Contact us', sub: 'Form', kind: 'action', href: ROUTES.contact },
  {
    group: 'Actions',
    title: 'Watch a product demo',
    sub: 'On the model page',
    kind: 'demo',
    href: `${solutionRoute('fraud-detection')}#demo`,
  },
  {
    group: 'Actions',
    title: 'See open roles',
    sub: 'Careers',
    kind: 'action',
    href: `${ROUTES.careers}#roles`,
  },

  {
    group: 'Solutions',
    title: 'Fraud Detection Suite',
    sub: 'Financial crime',
    kind: 'model',
    href: solutionRoute('fraud-detection'),
  },
  {
    group: 'Solutions',
    title: 'AML Monitoring',
    sub: 'Financial crime',
    kind: 'model',
    href: solutionRoute('aml-monitoring'),
  },
  {
    group: 'Solutions',
    title: 'iGaming Integrity',
    sub: 'Financial crime',
    kind: 'model',
    href: solutionRoute('igaming-integrity'),
  },
  {
    group: 'Solutions',
    title: 'Responsible Gaming',
    sub: 'Financial crime',
    kind: 'model',
    href: solutionRoute('responsible-gaming'),
  },

  {
    group: 'Services',
    title: 'AI, Data Science & ML',
    sub: 'Practice',
    kind: 'service',
    href: serviceRoute('ai-ml'),
  },
  {
    group: 'Services',
    title: 'Agentic AI',
    sub: 'Capability',
    kind: 'service',
    href: `${serviceRoute('ai-ml')}#agentic-ai`,
  },
  {
    group: 'Services',
    title: 'DevSecOps & Platform',
    sub: 'Practice',
    kind: 'service',
    href: serviceRoute('devsecops'),
  },
  {
    group: 'Services',
    title: 'Cloud & Landing Zones',
    sub: 'Capability',
    kind: 'service',
    href: `${serviceRoute('devsecops')}#cloud`,
  },
  {
    group: 'Services',
    title: 'Full-Stack Engineering',
    sub: 'Practice',
    kind: 'service',
    href: serviceRoute('full-stack'),
  },
  {
    group: 'Services',
    title: 'Data Strategy',
    sub: 'Practice',
    kind: 'service',
    href: serviceRoute('data-strategy'),
  },

  {
    group: 'Industries',
    title: 'Fintech',
    sub: 'Sector',
    kind: 'page',
    href: `${ROUTES.industries}#fintech`,
  },
  {
    group: 'Industries',
    title: 'iGaming',
    sub: 'Sector',
    kind: 'page',
    href: `${ROUTES.industries}#igaming`,
  },
  {
    group: 'Industries',
    title: 'E-commerce',
    sub: 'Sector',
    kind: 'page',
    href: `${ROUTES.industries}#ecommerce`,
  },
  {
    group: 'Industries',
    title: 'Logistics',
    sub: 'Sector',
    kind: 'page',
    href: `${ROUTES.industries}#logistics`,
  },
  {
    group: 'Industries',
    title: 'Healthcare',
    sub: 'Sector',
    kind: 'page',
    href: `${ROUTES.industries}#healthcare`,
  },

  { group: 'Pages', title: 'Home', sub: '', kind: 'page', href: ROUTES.home },
  {
    group: 'Pages',
    title: 'All solutions',
    sub: 'Catalogue',
    kind: 'page',
    href: ROUTES.solutions,
  },
  {
    group: 'Pages',
    title: 'What ships with a model',
    sub: 'Five layers',
    kind: 'page',
    href: `${ROUTES.solutions}#stack`,
  },
  { group: 'Pages', title: 'All services', sub: 'Overview', kind: 'page', href: ROUTES.services },
  { group: 'Pages', title: 'Approach', sub: 'How we deliver', kind: 'page', href: ROUTES.approach },
  { group: 'Pages', title: 'Insights', sub: 'Field notes', kind: 'page', href: ROUTES.insights },
  { group: 'Pages', title: 'About', sub: 'The team', kind: 'page', href: ROUTES.about },
  { group: 'Pages', title: 'Careers', sub: 'Open roles', kind: 'page', href: ROUTES.careers },
  { group: 'Pages', title: 'Privacy', sub: 'Legal', kind: 'page', href: ROUTES.privacy },
  { group: 'Pages', title: 'Cookies', sub: 'Legal', kind: 'page', href: ROUTES.cookies },
  { group: 'Pages', title: 'Legal', sub: 'Terms', kind: 'page', href: ROUTES.legal },
];

function score(item: IndexItem, query: string): number {
  const title = item.title.toLowerCase();
  const meta = `${item.group} ${item.sub}`.toLowerCase();
  if (!query) return 1;
  if (title.startsWith(query)) return 100;
  if (title.includes(query)) return 60;
  if (meta.includes(query)) return 30;
  // Loose subsequence, so "frd" finds "Fraud Detection".
  let i = 0;
  for (const ch of title) {
    if (ch === query[i]) i += 1;
  }
  return i === query.length ? 12 : 0;
}

function KindIcon({ kind }: { kind: IndexKind }) {
  const shared = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
  } as const;

  switch (kind) {
    case 'model':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case 'service':
      return (
        <svg {...shared}>
          <path d="M12 3v4M12 17v4M4 12h4M16 12h4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'action':
      return (
        <svg {...shared}>
          <path
            d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'demo':
      return (
        <svg {...shared}>
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
          <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'page':
      return (
        <svg {...shared}>
          <path d="M8 3h8l4 4v14H8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3v4h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

/** ⌘K / Ctrl+K / "/" — the whole site in one keystroke. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setQuery('');
      setSelected(0);
    };
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const active = document.activeElement;
      const typing =
        active instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
        setQuery('');
        setSelected(0);
      } else if (event.key === '/' && !typing) {
        setOpen((current) => {
          if (current) {
            return current;
          }
          event.preventDefault();
          setQuery('');
          setSelected(0);
          return true;
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDEX.map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 24)
      .map((r) => r.item);
  }, [query]);

  const go = (item: IndexItem | undefined) => {
    if (!item) {
      return;
    }
    setOpen(false);
    if (item.action === 'briefing') {
      window.setTimeout(() => openBriefing(), 120);
      return;
    }
    if (item.href) {
      router.push(item.href);
    }
  };

  const move = (delta: number) => {
    if (!hits.length) {
      return;
    }
    const next = (selected + delta + hits.length) % hits.length;
    setSelected(next);
    listRef.current?.querySelectorAll('.v4-cmd-item')[next]?.scrollIntoView({ block: 'nearest' });
  };

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(hits[selected]);
    }
  };

  let lastGroup = '';

  return (
    <Overlay
      open={open}
      onClose={() => setOpen(false)}
      place="top"
      label="Search the site"
      panelClassName="v4-cmd"
    >
      <div className="v4-cmd-in">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          placeholder="Search solutions, services, pages…"
          aria-label="Search"
          data-autofocus
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKeyDown}
        />
        <span className="v4-kbd">esc</span>
      </div>
      <div ref={listRef} className="v4-cmd-list" role="listbox" aria-label="Results">
        {hits.length ? (
          hits.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.title}`} className="contents">
                {showGroup ? <p className="v4-cmd-group">{item.group}</p> : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={index === selected}
                  className={cn('v4-cmd-item', index === selected && 'is-sel')}
                  onClick={() => go(item)}
                  onPointerEnter={() => setSelected(index)}
                >
                  <span className="ic" aria-hidden="true">
                    <KindIcon kind={item.kind} />
                  </span>
                  <span>{item.title}</span>
                  {item.sub ? <span className="sub">{item.sub}</span> : null}
                </button>
              </div>
            );
          })
        ) : (
          <p className="v4-cmd-empty">
            Nothing matches “{query}”. Try “fraud”, “cloud”, or “briefing”.
          </p>
        )}
      </div>
      <div className="v4-cmd-foot">
        <span>
          <span className="v4-kbd">↑↓</span> move
        </span>
        <span>
          <span className="v4-kbd">↵</span> open
        </span>
        <span>
          <CommandPaletteShortcut /> from anywhere
        </span>
      </div>
    </Overlay>
  );
}
