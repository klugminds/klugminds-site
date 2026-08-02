'use client';

import { Glyph } from '@/components/ui/Glyph';
import { CONTACT_MAILTO } from '@/constants/routes';
import { openBriefing } from '@/lib/briefing';

type BriefingButtonProps = {
  /** Where the click came from; prefilled into the wizard's context. */
  topic: string;
  label?: string;
  className?: string;
};

/**
 * The "Book a briefing" call to action. Opens the wizard overlay; without
 * JavaScript the mailto fallback still starts the conversation.
 */
export function BriefingButton({
  topic,
  label = 'Book a briefing',
  className = 'v4-btn v4-btn--primary',
}: BriefingButtonProps) {
  return (
    <a
      className={className}
      href={CONTACT_MAILTO}
      data-magnet="5"
      onClick={(event) => {
        event.preventDefault();
        openBriefing(topic);
      }}
    >
      <span>
        <Glyph name="calendar" className="h-[15px] w-[15px]" strokeWidth={1.7} />
      </span>
      <span>{label}</span>
      <span className="v4-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
