'use client';

import { CommandPaletteShortcut } from '@/components/ui/CommandPaletteShortcut';
import { openCommandPalette } from '@/lib/command-palette';

/** Homepage hero hint — opens the command palette on click. */
export function CommandPaletteCue() {
  return (
    <p className="mt-8 hidden lg:block">
      <button type="button" className="v4-cue v4-cue-btn" onClick={() => openCommandPalette()}>
        <i aria-hidden="true" />
        Jump anywhere — or press <CommandPaletteShortcut />
      </button>
    </p>
  );
}
