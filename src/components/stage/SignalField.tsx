'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  warm: boolean;
  ox: number;
  oy: number;
};

const LINK = 132;

/**
 * The hero signal field: seeded drifting nodes linked when close, with the
 * pointer pushing them apart. Deterministic PRNG so the field looks identical
 * on every load; paused off-screen and on hidden tabs; a single static frame
 * under prefers-reduced-motion.
 */
export function SignalField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    let seed = 20240419;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const build = () => {
      const r = host.getBoundingClientRect();
      w = Math.max(320, r.width);
      h = Math.max(240, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed = 20240419;
      const count = clamp(Math.round((w * h) / 21000), 26, 54);
      nodes = Array.from({ length: count }, (_, i) => ({
        x: rnd() * w,
        y: rnd() * h,
        vx: (rnd() - 0.5) * 0.13,
        vy: (rnd() - 0.5) * 0.13,
        r: 0.9 + rnd() * 1.5,
        warm: i % 17 === 3,
        ox: 0,
        oy: 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!a) {
          continue;
        }
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          if (!b) {
            continue;
          }
          const dx = a.x + a.ox - (b.x + b.ox);
          const dy = a.y + a.oy - (b.y + b.oy);
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) {
            continue;
          }
          const t = 1 - Math.sqrt(d2) / LINK;
          const warm = a.warm || b.warm;
          ctx.strokeStyle = warm
            ? `rgba(244,113,26,${(t * 0.34).toFixed(3)})`
            : `rgba(102,203,213,${(t * 0.26).toFixed(3)})`;
          ctx.lineWidth = warm ? 0.8 : 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x + a.ox, a.y + a.oy);
          ctx.lineTo(b.x + b.ox, b.y + b.oy);
          ctx.stroke();
        }
      }

      nodes.forEach((n) => {
        const x = n.x + n.ox;
        const y = n.y + n.oy;
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.warm ? 'rgba(251,146,60,0.9)' : 'rgba(102,203,213,0.62)';
        ctx.fill();
        if (n.warm) {
          ctx.beginPath();
          ctx.arc(x, y, n.r * 4.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244,113,26,0.07)';
          ctx.fill();
        }
      });
    };

    const step = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        // Pointer repulsion, eased back to zero so nothing snaps.
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (d < 150 && d > 0.001) {
          const f = (1 - d / 150) ** 2 * 34;
          tx = (dx / d) * f;
          ty = (dy / d) * f;
        }
        n.ox += (tx - n.ox) * 0.09;
        n.oy += (ty - n.oy) * 0.09;
      });
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || reduced) {
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    draw();

    const cleanups: Array<() => void> = [];
    if (!reduced) {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            if (visible) {
              start();
            } else {
              stop();
            }
          },
          { threshold: 0.02 },
        );
        io.observe(host);
        cleanups.push(() => io.disconnect());
      } else {
        start();
      }

      const surface = host.closest('.v4-stage') ?? host.parentElement ?? host;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
      };
      const onLeave = () => {
        pointer.x = -9999;
        pointer.y = -9999;
      };
      const onVisibility = () => {
        if (document.hidden) {
          stop();
        } else if (visible) {
          start();
        }
      };
      surface.addEventListener('pointermove', onMove as EventListener, { passive: true });
      surface.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVisibility);
      cleanups.push(() => {
        surface.removeEventListener('pointermove', onMove as EventListener);
        surface.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
      });
    }

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw();
      }, 180);
    };
    window.addEventListener('resize', onResize);
    cleanups.push(() => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    });

    return () => {
      stop();
      cleanups.forEach((fn) => fn());
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="v4-net" aria-hidden="true" />;
}
