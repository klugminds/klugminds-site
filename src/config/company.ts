/**
 * GST registration (REG-06, issued 23 July 2026).
 * Brand name "Klugminds" is operated by KLUGMINDLABS PRIVATE LIMITED.
 */
export const companyConfig = {
  legalName: 'KLUGMINDLABS PRIVATE LIMITED',
  gstin: '37AANCK0145Q1ZZ',
  gstRegisteredFrom: '2026-07-23',
  registeredOffice: 'Tirupati, Andhra Pradesh, India',
} as const;

export function formatGstRegistrationDate(): string {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${companyConfig.gstRegisteredFrom}T00:00:00Z`),
  );
}
