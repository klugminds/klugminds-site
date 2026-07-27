'use client';

import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures stacked panels inside `containerRef` and returns the tallest height
 * so tabbed content can swap without layout shift.
 */
export function useStablePanelHeight(dependencyKey: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const measure = () => {
      const panels = container.querySelectorAll<HTMLElement>('[data-measure-panel]');
      if (!panels.length) {
        return;
      }

      const maxHeight = Math.max(
        ...Array.from(panels).map((panel) => panel.getBoundingClientRect().height),
      );
      setMinHeight(Math.ceil(maxHeight));
    };

    measure();

    const observer = new ResizeObserver(measure);
    container.querySelectorAll('[data-measure-panel]').forEach((panel) => observer.observe(panel));

    return () => observer.disconnect();
  }, [dependencyKey]);

  return { containerRef, minHeight };
}
