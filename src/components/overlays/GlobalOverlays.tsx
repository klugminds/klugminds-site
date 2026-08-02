import { BriefingWizard } from '@/components/overlays/BriefingWizard';
import { CommandPalette } from '@/components/overlays/CommandPalette';
import { Toaster } from '@/components/overlays/Toaster';

/** Site-wide overlays mounted once in the root layout. */
export function GlobalOverlays() {
  return (
    <>
      <BriefingWizard />
      <CommandPalette />
      <Toaster />
    </>
  );
}
