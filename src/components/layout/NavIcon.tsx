import type { NavIconKey } from '@/config/content/navigation';

type NavIconProps = {
  icon: NavIconKey;
  className?: string;
};

/** Stroke-icon set used by the header mega-menus, drawn from the V4 reference. */
export function NavIcon({ icon, className = 'h-5 w-5' }: NavIconProps) {
  const shared = {
    'aria-hidden': true,
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
  } as const;

  switch (icon) {
    case 'shield-check':
      return (
        <svg {...shared}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3l8 3v6c0 4.5-3.2 7.9-8 9-4.8-1.1-8-4.5-8-9V6l8-3z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'radar':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" opacity="0.5" />
          <path strokeLinecap="round" d="M12 12l6-4" />
        </svg>
      );
    case 'dice':
      return (
        <svg {...shared}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...shared}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'sparks':
      return (
        <svg {...shared}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v4M12 17v4M4.2 6.2l2.8 2.8M17 15l2.8 2.8M3 12h4M17 12h4M4.2 17.8L7 15M17 9l2.8-2.8"
          />
        </svg>
      );
    case 'network':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="3" />
          <path
            strokeLinecap="round"
            d="M12 3v6M12 15v6M4.2 7.5l5.2 3M14.6 13.5l5.2 3M4.2 16.5l5.2-3M14.6 10.5l5.2-3"
          />
        </svg>
      );
    case 'lock':
      return (
        <svg {...shared}>
          <rect
            x="4.5"
            y="10.5"
            width="15"
            height="9.5"
            rx="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5"
          />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...shared}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.6 18.5h9.2a3.6 3.6 0 0 0 .4-7.18A5.2 5.2 0 0 0 7.7 9.3a3.5 3.5 0 0 0-.1 9.2z"
          />
        </svg>
      );
    case 'layers':
      return (
        <svg {...shared}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l9 5 9-5" />
        </svg>
      );
    case 'document':
      return (
        <svg {...shared}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 3h8l4 4v14H8zM16 3v4h4M11 12h5M11 16h5"
          />
        </svg>
      );
    case 'compass':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.5 9.5l-1.6 4.6-4.6 1.6 1.6-4.6z"
          />
        </svg>
      );
    case 'link':
      return (
        <svg {...shared}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.5 6h6a3.5 3.5 0 0 1 0 7h-5a3.5 3.5 0 0 0 0 7h5"
          />
        </svg>
      );
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}
