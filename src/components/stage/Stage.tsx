'use client';

import dynamic from 'next/dynamic';

const SignalField = dynamic(
  () => import('@/components/stage/SignalField').then((mod) => mod.SignalField),
  { ssr: false },
);

type StageProps = {
  id?: string;
  className?: string;
  /** Animated gradient aurora pools behind the content. */
  aurora?: boolean;
  /** The canvas signal field. */
  net?: boolean;
  /** Calm bands (closing CTAs) run no ambient loops. */
  calm?: boolean;
  children: React.ReactNode;
};

/**
 * A V4 stage: the lit dark room a page arrives on — grain, optional aurora,
 * optional signal-field canvas, and the woven grid. Content children sit
 * above the ambient layers.
 */
export function Stage({
  id,
  className,
  aurora = false,
  net = false,
  calm = false,
  children,
}: StageProps) {
  const classes = ['v4-stage', 'v4-grain'];
  if (calm) {
    classes.push('v4-calm');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <section id={id} className={classes.join(' ')}>
      {aurora ? (
        <div className="v4-aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}
      {net ? <SignalField /> : null}
      <div className="hero-weave" aria-hidden="true" />
      {children}
    </section>
  );
}
