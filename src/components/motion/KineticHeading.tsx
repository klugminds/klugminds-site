'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

type KineticTag = 'h1' | 'h2' | 'h3' | 'p';

type KineticHeadingProps = {
  as?: KineticTag;
  className?: string;
  children: ReactNode;
};

type ElementWithProps = ReactElement<{
  className?: string;
  children?: ReactNode;
  'data-kinetic-atom'?: boolean;
}>;

/** A gradient phrase must stay one box: background-clip paints against the
 *  element's own box, so splitting it into word wrappers renders it invisible. */
function isAtomic(el: ElementWithProps): boolean {
  return Boolean(el.props['data-kinetic-atom']) || /\bv4-lit\b/.test(el.props.className ?? '');
}

/**
 * Word-by-word headline reveal (the V4 `data-kinetic` behaviour). Words rise
 * out of overflow-hidden boxes in reading order, 45ms apart, capped so a long
 * headline never takes a second to assemble.
 */
export function KineticHeading({ as: Tag = 'h2', className, children }: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wordIndex = { value: 0 };

  const wrap = (content: ReactNode, key: string) => {
    const style = { '--i': String(Math.min(wordIndex.value, 16)) } as CSSProperties;
    wordIndex.value += 1;
    return (
      <span key={key} className="v4-kw">
        <span style={style}>{content}</span>
      </span>
    );
  };

  const split = (nodes: ReactNode, prefix: string): ReactNode[] =>
    Children.toArray(nodes).flatMap((node, nodeIndex): ReactNode[] => {
      const key = `${prefix}-${nodeIndex}`;
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
          .split(/(\s+)/)
          .filter(Boolean)
          .map((part, partIndex) =>
            /^\s+$/.test(part) ? part : wrap(part, `${key}-${partIndex}`),
          );
      }
      if (isValidElement(node)) {
        const el = node as ElementWithProps;
        if (isAtomic(el)) {
          return [wrap(el, key)];
        }
        return [cloneElement(el, { key }, split(el.props.children, key))];
      }
      return [node];
    });

  return (
    <Tag ref={ref} className={`${className ?? ''}${inView ? 'v4-kin-in' : ''}`}>
      {split(children, 'kw')}
    </Tag>
  );
}
