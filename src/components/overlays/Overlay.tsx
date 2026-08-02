'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/cn';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  place: 'center' | 'top';
  label?: string;
  labelledBy?: string;
  panelClassName: string;
  children: React.ReactNode;
};

/**
 * The one overlay primitive: veil, panel, Escape, focus trap, scroll lock,
 * and focus restore to the trigger on close.
 */
export function Overlay({
  open,
  onClose,
  place,
  label,
  labelledBy,
  panelClassName,
  children,
}: OverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const root = rootRef.current;
    if (!root) {
      return;
    }

    // Remember the trigger, lock the page, focus the panel.
    lastFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const pad = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (pad > 0) {
      document.body.style.paddingRight = `${pad}px`;
    }
    const frame = requestAnimationFrame(() => {
      const first =
        root.querySelector<HTMLElement>('[data-autofocus]') ??
        root.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) {
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      const lastFocus = lastFocusRef.current;
      if (lastFocus && document.contains(lastFocus)) {
        lastFocus.focus();
      }
    };
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className={cn('v4-ov', open && 'is-open')}
      data-place={place}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-hidden={!open}
    >
      <div className="v4-ov-veil" aria-hidden="true" onClick={onClose} />
      <div className={`v4-ov-panel ${panelClassName}`}>{children}</div>
    </div>
  );
}
