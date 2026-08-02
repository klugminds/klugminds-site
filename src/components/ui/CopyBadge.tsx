'use client';

import { toast } from '@/lib/toast';

type CopyBadgeProps = {
  value: string;
  label?: string;
};

/** Copy-to-clipboard control used on routing address cards. */
export function CopyBadge({ value, label = 'Copy' }: CopyBadgeProps) {
  return (
    <button
      type="button"
      className="v4-badge"
      aria-label={`Copy ${value}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          toast('Copied', value);
        } catch {
          toast('Could not copy', 'Select the address and copy it manually.', 'warn');
        }
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h8" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
