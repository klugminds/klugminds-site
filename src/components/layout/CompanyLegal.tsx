import Link from 'next/link';

import { companyConfig } from '@/config/company';
import { ROUTES } from '@/constants/routes';

export function CompanyLegal() {
  return (
    <p className="text-muted text-xs leading-relaxed sm:text-sm">
      <Link href={ROUTES.legal} className="hover:text-foreground transition-colors">
        GSTIN {companyConfig.gstin}
      </Link>
      {' · '}
      {companyConfig.legalName}
    </p>
  );
}
