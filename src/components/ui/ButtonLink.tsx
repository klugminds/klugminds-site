import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/cn';
import type { ButtonVariant } from '@/types/button';

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  onClick?: () => void;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border border-accent-interactive bg-accent-interactive text-accent-foreground shadow-[0_0_28px_rgb(0_122_133/0.35)] hover:border-accent-on-light-hover hover:bg-accent-on-light-hover hover:shadow-[0_0_36px_rgb(0_131_143/0.4)]',
  outline:
    'border border-foreground/25 bg-transparent text-foreground hover:border-foreground/45 hover:bg-foreground/5',
  secondary:
    'border border-border bg-surface/40 text-foreground hover:border-accent/40 hover:bg-surface/80',
  ghost: 'text-foreground hover:bg-foreground/5',
};

export function ButtonLink({
  href,
  children,
  className,
  variant = 'primary',
  external = false,
  onClick,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none',
    variantStyles[variant],
    className,
  );

  if (external || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external || href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
