function formatUtcDate(isoDate: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

export function formatBlogDate(isoDate: string): string {
  return formatUtcDate(isoDate, { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatInsightDate(isoDate: string): string {
  return formatUtcDate(isoDate, { day: 'numeric', month: 'short', year: 'numeric' });
}
