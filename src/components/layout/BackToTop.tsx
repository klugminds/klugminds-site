'use client';

import { useEffect, useRef } from 'react';

/** Floating control that appears after the first screen of scroll. */
export function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }
    const onScroll = () => {
      button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={buttonRef}
      id="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="border-accent-interactive bg-accent-interactive hover:bg-accent-on-light-hover fixed right-6 bottom-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border text-white shadow-lg"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
