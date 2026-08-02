/**
 * Cross-component channel for the command palette. Navbar and hero cues call
 * `openCommandPalette()`; the palette mounted in the root layout listens.
 */
export const OPEN_COMMAND_PALETTE_EVENT = 'km:open-command-palette';

export function openCommandPalette(): void {
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
}

/** Platform-aware shortcut label for UI hints (client-only). */
export function commandPaletteShortcutLabel(): string {
  if (typeof navigator === 'undefined') {
    return 'Ctrl+K';
  }
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘K' : 'Ctrl+K';
}
