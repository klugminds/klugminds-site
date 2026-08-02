'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { STAGES, type DemoKind } from '@/components/demo/stages';
import { clamp, fmtTime } from '@/components/demo/toolkit';

export type DemoCaption = {
  t: number;
  /** Caption copy; `**bold**` spans render as <b>. */
  text: string;
};

export type DemoFilm = {
  kind: DemoKind;
  title: string;
  duration: number;
  /** Poster frame as a fraction of the duration. */
  poster?: number;
  captions: DemoCaption[];
  /** aria-label for the stage. */
  ariaLabel: string;
};

type DemoPlayerProps = DemoFilm & {
  /** Autoplay when ≥40% visible; never under reduced motion. */
  autoplay?: boolean;
  /** Background mode — the film sits behind copy (`v4-player--bg`). */
  background?: boolean;
};

const SPEED_STEPS = [1, 1.5, 2, 0.5] as const;

/** Only one film plays at a time — two moving panels compete. */
const activePlayers = new Set<() => void>();

/** Render `**bold**` caption markers as real <b> elements. */
function renderCaption(text: string) {
  return text
    .split('**')
    .map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>));
}

/**
 * A demo film: video chrome (play, scrubbable timeline, speed, captions,
 * fullscreen) over an SVG stage where every frame is a pure function of
 * time — sharp at any size, exact to scrub, captions readable by a screen
 * reader.
 */
export function DemoPlayer({
  kind,
  title,
  duration,
  poster = 0.55,
  captions,
  ariaLabel,
  autoplay = false,
  background = false,
}: DemoPlayerProps) {
  const figRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const timeNowRef = useRef<HTMLElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [ccOn, setCcOn] = useState(true);
  const [capIdx, setCapIdx] = useState(-1);

  // Mutable playback state, written at 60fps without re-rendering.
  const stateRef = useRef({
    t: 0,
    playing: false,
    speed: 1,
    started: false,
    raf: 0,
    last: 0,
    capIdx: -1,
    frame: undefined as ((t: number) => void) | undefined,
  });

  const paintChrome = useCallback(() => {
    const s = stateRef.current;
    const pct = `${(s.t / duration) * 100}%`;
    fillRef.current?.style.setProperty('--t', pct);
    knobRef.current?.style.setProperty('--t', pct);
    if (timeNowRef.current) {
      timeNowRef.current.textContent = fmtTime(s.t);
    }
    const scrub = scrubRef.current;
    if (scrub) {
      scrub.setAttribute('aria-valuenow', String(Math.round(s.t)));
      scrub.setAttribute('aria-valuetext', `${fmtTime(s.t)} of ${fmtTime(duration)}`);
    }
    let ci = -1;
    for (let i = 0; i < captions.length; i += 1) {
      const cap = captions[i];
      if (cap && s.t >= cap.t) {
        ci = i;
      }
    }
    if (ci !== s.capIdx) {
      s.capIdx = ci;
      setCapIdx(ci);
    }
  }, [captions, duration]);

  const render = useCallback(() => {
    stateRef.current.frame?.(stateRef.current.t);
    paintChrome();
  }, [paintChrome]);

  const pause = useCallback(() => {
    const s = stateRef.current;
    s.playing = false;
    cancelAnimationFrame(s.raf);
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    const s = stateRef.current;
    if (s.playing) {
      return;
    }
    if (s.t >= duration) {
      s.t = 0;
    }
    s.started = true;
    s.playing = true;
    setStarted(true);
    setPlaying(true);
    setEnded(false);
    activePlayers.forEach((pauseOther) => {
      if (pauseOther !== pause) {
        pauseOther();
      }
    });
    s.last = performance.now();
    const loop = (now: number) => {
      if (!s.playing) {
        return;
      }
      const dt = Math.min((now - s.last) / 1000, 0.25) * s.speed;
      s.last = now;
      s.t += dt;
      if (s.t >= duration) {
        s.t = duration;
        render();
        s.playing = false;
        setPlaying(false);
        setEnded(true);
        return;
      }
      render();
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
  }, [duration, pause, render]);

  const seek = useCallback(
    (secs: number) => {
      const s = stateRef.current;
      s.t = clamp(secs, 0, duration);
      s.started = true;
      setStarted(true);
      setEnded(false);
      render();
    },
    [duration, render],
  );

  const toggle = useCallback(() => {
    if (stateRef.current.playing) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  // Build the stage once, paint the poster frame, register the player.
  useEffect(() => {
    const svg = svgRef.current;
    const fig = figRef.current;
    if (!svg || !fig) {
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stage = STAGES[kind];
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    const handle = stage.init(svg);
    const s = stateRef.current;
    s.frame = (t) => stage.frame(handle, t);

    /* Poster frame: the moment the demo is about, not frame zero. */
    s.t = poster * duration;
    s.frame(s.t);
    s.t = 0;
    paintChrome();

    activePlayers.add(pause);

    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const on = entries.some((entry) => entry.isIntersecting);
          if (!on && s.playing) {
            pause();
          } else if (on && !s.started && autoplay && !reduced) {
            play();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(fig);
    }

    return () => {
      pause();
      activePlayers.delete(pause);
      io?.disconnect();
    };
  }, [autoplay, duration, kind, paintChrome, pause, play, poster]);

  useEffect(() => {
    stateRef.current.speed = speed;
  }, [speed]);

  // Caption fade-in on change (matches the reference's is-on re-add).
  useEffect(() => {
    const cap = capRef.current;
    if (!cap || capIdx < 0) {
      return;
    }
    cap.classList.remove('is-on');
    const raf = requestAnimationFrame(() => cap.classList.add('is-on'));
    return () => cancelAnimationFrame(raf);
  }, [capIdx]);

  // Scrubbing — pointer capture so a drag that leaves the bar still works.
  const dragRef = useRef({ dragging: false, resume: false });
  const scrubTo = (clientX: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const r = track.getBoundingClientRect();
    seek(((clientX - r.left) / r.width) * duration);
  };

  const onScrubKeyDown = (event: React.KeyboardEvent) => {
    const s = stateRef.current;
    const step = event.shiftKey ? 5 : 2;
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        seek(s.t + step);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        seek(s.t - step);
        break;
      case 'Home':
        event.preventDefault();
        seek(0);
        break;
      case 'End':
        event.preventDefault();
        seek(duration);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        toggle();
        break;
      default:
        break;
    }
  };

  const figureClasses = [
    'v4-player',
    background ? 'v4-player--bg' : '',
    started ? 'is-started' : '',
    !playing ? 'is-paused' : '',
    ended ? 'is-ended' : '',
    ccOn ? '' : 'is-cc-off',
  ]
    .filter(Boolean)
    .join(' ');

  const caption = capIdx >= 0 ? captions[capIdx] : undefined;

  return (
    <figure ref={figRef} className={figureClasses} data-demo={kind}>
      <div className="v4-pl-stage">
        <svg
          ref={svgRef}
          data-stage=""
          viewBox="0 0 480 270"
          preserveAspectRatio="xMaxYMid meet"
          role="img"
          aria-label={`${title} — animated product demonstration`}
        />
      </div>
      <div className="v4-pl-caption" aria-live="polite">
        <p ref={capRef} key={capIdx}>
          {caption ? renderCaption(caption.text) : null}
        </p>
      </div>
      <div className="v4-pl-chrome">
        <div className="v4-pl-toolbar">
          <div
            ref={scrubRef}
            className="v4-pl-scrub"
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={0}
            onKeyDown={onScrubKeyDown}
            onPointerDown={(event) => {
              dragRef.current.dragging = true;
              dragRef.current.resume = stateRef.current.playing;
              event.currentTarget.setPointerCapture(event.pointerId);
              pause();
              scrubTo(event.clientX);
            }}
            onPointerMove={(event) => {
              if (dragRef.current.dragging) {
                scrubTo(event.clientX);
              }
            }}
            onPointerUp={(event) => {
              dragRef.current.dragging = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
              if (dragRef.current.resume) {
                play();
              }
            }}
          >
            <div ref={trackRef} className="v4-pl-track">
              <div ref={fillRef} className="v4-pl-fill" />
              <div ref={knobRef} className="v4-pl-knob" />
            </div>
          </div>
          <div className="v4-pl-btns">
            <div className="v4-pl-transport">
              <button
                type="button"
                className="v4-pl-btn v4-pl-btn--main"
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={toggle}
              >
                {playing ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="v4-pl-btn"
                aria-label="Restart"
                title="Restart"
                onClick={() => {
                  seek(0);
                  play();
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </button>
              <button
                type="button"
                className="v4-pl-btn"
                aria-label="Back five seconds"
                title="Back 5s"
                onClick={() => seek(stateRef.current.t - 5)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 8v8l-6-4z" />
                  <path d="M16 8v8l-6-4z" />
                </svg>
              </button>
              <span className="v4-pl-time">
                <b ref={timeNowRef}>0:00</b>
                <span className="v4-pl-time-sep" aria-hidden="true">
                  /
                </span>
                <span>{fmtTime(duration)}</span>
              </span>
            </div>
            <div className="v4-pl-utilities">
              <button
                type="button"
                className="v4-pl-btn"
                aria-pressed={speed !== 1}
                aria-label={`Playback speed ${speed}×`}
                title="Playback speed"
                onClick={() =>
                  setSpeed((current) => {
                    const i = SPEED_STEPS.indexOf(current as (typeof SPEED_STEPS)[number]);
                    return SPEED_STEPS[(i + 1) % SPEED_STEPS.length] ?? 1;
                  })
                }
              >
                {speed}×
              </button>
              <button
                type="button"
                className="v4-pl-btn"
                aria-pressed={ccOn}
                aria-label={ccOn ? 'Hide captions' : 'Show captions'}
                title="Captions"
                onClick={() => setCcOn((on) => !on)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="5" width="19" height="14" rx="3" />
                  <path
                    d="M9.5 10.2a2.4 2.4 0 1 0 0 3.6M16.5 10.2a2.4 2.4 0 1 0 0 3.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="v4-pl-btn"
                aria-label="Fullscreen"
                title="Fullscreen"
                onClick={() => {
                  if (document.fullscreenElement) {
                    void document.exitFullscreen();
                  } else {
                    void figRef.current?.requestFullscreen?.();
                  }
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">{ariaLabel}</figcaption>
    </figure>
  );
}
