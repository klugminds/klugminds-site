'use client';

import { useSyncExternalStore } from 'react';

import { commandPaletteShortcutLabel } from '@/lib/command-palette';

type CommandPaletteShortcutProps = {
  className?: string;
};

/** Renders the platform-aware ⌘K / Ctrl+K keycap. */
export function CommandPaletteShortcut({ className = 'v4-kbd' }: CommandPaletteShortcutProps) {
  const label = useSyncExternalStore(
    () => () => {},
    commandPaletteShortcutLabel,
    () => 'Ctrl+K',
  );

  return <span className={className}>{label}</span>;
}
