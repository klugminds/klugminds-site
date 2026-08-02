'use client';

import { useEffect, useRef, useState } from 'react';

import { TOAST_EVENT, type ToastDetail } from '@/lib/toast';

type ToastItem = ToastDetail & {
  id: number;
  out: boolean;
};

const SHOW_MS = 5200;
const EXIT_MS = 400;

function ToastIcon({ kind }: { kind: ToastDetail['kind'] }) {
  if (kind === 'warn') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 9v4M12 17h.01M10.3 3.9 2.5 17.4A1.8 1.8 0 0 0 4 20h16a1.8 1.8 0 0 0 1.5-2.6L13.7 3.9a1.8 1.8 0 0 0-3.4 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Toast host, bottom right. Listens for the km:toast custom event. */
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastDetail>).detail;
      const id = nextId.current++;
      setItems((current) => [...current, { ...detail, id, out: false }]);
      window.setTimeout(() => {
        setItems((current) => current.map((t) => (t.id === id ? { ...t, out: true } : t)));
        window.setTimeout(() => {
          setItems((current) => current.filter((t) => t.id !== id));
        }, EXIT_MS);
      }, SHOW_MS);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <div className="v4-toasts" aria-live="polite" aria-atomic="false">
      {items.map((item) => (
        <div
          key={item.id}
          className={`v4-toast${item.out ? 'is-out' : ''}`}
          data-kind={item.kind}
          role="status"
        >
          <span className="ic" aria-hidden="true">
            <ToastIcon kind={item.kind} />
          </span>
          <span>
            <b>{item.title}</b>
            {item.body ? <p>{item.body}</p> : null}
          </span>
        </div>
      ))}
    </div>
  );
}
