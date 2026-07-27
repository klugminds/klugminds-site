import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';
import type { ButtonVariant } from '@/types/button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border border-accent-interactive bg-accent-interactive text-accent-foreground shadow-[0_0_28px_rgb(0_122_133/0.35)] hover:border-accent-on-light-hover hover:bg-accent-on-light-hover',
  outline:
    'border border-foreground/25 bg-transparent text-foreground hover:border-foreground/45 hover:bg-foreground/5',
  secondary:
    'border border-border bg-surface/40 text-foreground hover:border-accent/40 hover:bg-surface/80',
  ghost: 'text-foreground hover:bg-foreground/5',
};

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
