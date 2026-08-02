import Link from 'next/link';

type Crumb = {
  label: string;
  href?: string;
};

type DetailBreadcrumbProps = {
  crumbs: Crumb[];
};

export function DetailBreadcrumb({ crumbs }: DetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="t-muted flex flex-wrap items-center gap-2 text-xs">
        {crumbs.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {crumb.href ? (
              <Link className="hover:t-fg" href={crumb.href}>
                {crumb.label}
              </Link>
            ) : (
              <span className="t-fg font-medium" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
