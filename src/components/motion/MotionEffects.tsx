'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Global motion binder. Pages stay server components and opt in with the V4
 * attribute hooks; this one client component wires them after each navigation:
 *
 *   [data-reveal]      rise-in on scroll (+ [data-reveal-delay] stagger)
 *   [data-clip]        clip reveal (observe parent, clip child)
 *   .v4-metrics        metric-bar growth
 *   [data-counter]     odometer count-up (data-target, data-decimals)
 *   [data-tilt]        pointer tilt          — fine pointers only
 *   .v4-spot           pointer spotlight     — fine pointers only
 *   [data-magnet]      magnetic pull         — fine pointers only
 *   .btn-glow          pointer-lit buttons
 *   [data-parallax]    scroll parallax
 *
 * Everything is gated by prefers-reduced-motion, mirroring the V4 reference.
 */
export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const observers: IntersectionObserver[] = [];
    const unbinders: Array<() => void> = [];

    const listen = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
      options?: AddEventListenerOptions,
    ) => {
      el.addEventListener(type, handler, options);
      unbinders.push(() => el.removeEventListener(type, handler, options));
    };

    const parseRootInset = (margin: string) => {
      const parts = margin.trim().split(/\s+/);
      const top = parts[0] ?? '0px';
      const bottom = parts.length === 1 ? (parts[0] ?? '0px') : (parts[2] ?? '0px');
      const toPx = (value: string) => {
        const n = parseFloat(value);
        if (Number.isNaN(n)) {
          return 0;
        }
        if (value.endsWith('%')) {
          return (n / 100) * window.innerHeight;
        }
        return n;
      };
      return { top: toPx(top), bottom: toPx(bottom) };
    };

    const revealOnce = (
      els: HTMLElement[],
      cls: string,
      threshold: number,
      rootMargin: string,
      onReveal?: (el: HTMLElement) => void,
    ) => {
      const pending = els.filter((el) => !el.classList.contains(cls));
      if (!pending.length) {
        return;
      }
      if (reduced || !('IntersectionObserver' in window)) {
        pending.forEach((el) => {
          el.classList.add(cls);
          onReveal?.(el);
        });
        return;
      }
      const reveal = (el: HTMLElement) => {
        if (el.classList.contains(cls)) {
          return;
        }
        el.classList.add(cls);
        onReveal?.(el);
        io.unobserve(el);
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            reveal(entry.target as HTMLElement);
          });
        },
        { threshold, rootMargin },
      );
      pending.forEach((el) => io.observe(el));
      observers.push(io);

      // IO can miss elements already on-screen after client navigation or before
      // aspect-ratio / image layout settles. Re-check once paint has flushed.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const { top: topInset, bottom: bottomInset } = parseRootInset(rootMargin);
          const rootTop = -topInset;
          const rootBottom = window.innerHeight + bottomInset;
          pending.forEach((el) => {
            if (el.classList.contains(cls)) {
              return;
            }
            const r = el.getBoundingClientRect();
            if (r.height <= 0) {
              return;
            }
            const visible = Math.max(0, Math.min(r.bottom, rootBottom) - Math.max(r.top, rootTop));
            if (visible / r.height >= threshold) {
              reveal(el);
            }
          });
        });
      });
    };

    const all = <T extends HTMLElement>(selector: string) =>
      Array.from(document.querySelectorAll<T>(selector));

    // Arrival: reveals, clip reveals, metric bars.
    revealOnce(all('[data-reveal]'), 'is-visible', 0.12, '0px 0px -40px 0px');
    const clipEls = all('[data-clip]').filter((el) => !el.closest('#hero'));
    revealOnce(clipEls, 'is-visible', 0.18, '0px 0px -8% 0px');
    revealOnce(all('.v4-metrics'), 'is-visible', 0.25, '0px 0px -8% 0px');

    // Counters.
    const runCounter = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute('data-target') ?? '');
      if (Number.isNaN(target)) {
        return;
      }
      const decimals = parseInt(el.getAttribute('data-decimals') ?? '0', 10);
      if (reduced) {
        el.textContent = target.toFixed(decimals);
        return;
      }
      const duration = 1100;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals);
        }
      };
      requestAnimationFrame(step);
    };
    const counters = all('[data-counter]').filter((el) => !el.dataset.counted);
    if (counters.length) {
      if ('IntersectionObserver' in window && !reduced) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                el.dataset.counted = '1';
                runCounter(el);
                io.unobserve(el);
              }
            });
          },
          { threshold: 0.6 },
        );
        counters.forEach((el) => io.observe(el));
        observers.push(io);
      } else {
        counters.forEach((el) => {
          el.dataset.counted = '1';
          runCounter(el);
        });
      }
    }

    // Pointer surfaces — only where hovering is real, never under reduced motion.
    if (finePointer && !reduced) {
      all('[data-tilt]').forEach((el) => {
        const max = parseFloat(el.getAttribute('data-tilt') ?? '') || 5;
        listen(
          el,
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.classList.add('is-tilting');
            el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
            el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
          },
          { passive: true },
        );
        listen(el, 'pointerleave', () => {
          el.classList.remove('is-tilting');
          el.style.setProperty('--ry', '0deg');
          el.style.setProperty('--rx', '0deg');
        });
      });

      all('.v4-spot').forEach((el) => {
        listen(
          el,
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          },
          { passive: true },
        );
      });

      all('[data-magnet]').forEach((el) => {
        const pull = parseFloat(el.getAttribute('data-magnet') ?? '') || 5;
        listen(
          el,
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            el.style.setProperty('--dx', `${(dx * pull).toFixed(2)}px`);
            el.style.setProperty('--dy', `${(dy * pull).toFixed(2)}px`);
          },
          { passive: true },
        );
        listen(el, 'pointerleave', () => {
          el.style.setProperty('--dx', '0px');
          el.style.setProperty('--dy', '0px');
        });
      });
    }

    all('.btn-glow').forEach((el) => {
      listen(
        el,
        'pointermove',
        (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
          el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        },
        { passive: true },
      );
    });

    // Parallax — one rAF-gated scroll job.
    const layers = all('[data-parallax]');
    if (layers.length && !reduced) {
      let frame = 0;
      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        layers.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) {
            return;
          }
          const depth = parseFloat(el.getAttribute('data-parallax') ?? '') || 0.12;
          const centre = r.top + r.height / 2 - vh / 2;
          el.style.setProperty('--py', `${(-centre * depth).toFixed(1)}px`);
        });
      };
      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      unbinders.push(() => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
      update();
    }

    return () => {
      observers.forEach((io) => io.disconnect());
      unbinders.forEach((unbind) => unbind());
    };
  }, [pathname]);

  return null;
}
