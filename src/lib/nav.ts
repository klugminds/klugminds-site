/** Whether the current pathname matches a nav link (hash-aware for anchored routes). */
export function isNavLinkActive(pathname: string, href: string, currentHash = ''): boolean {
  const { path, hash } = splitNavHref(href);

  const pathMatches =
    path === '/'
      ? pathname === '/'
      : pathname === path || pathname.startsWith(`${path}/`);

  if (!pathMatches) {
    return false;
  }

  if (hash) {
    return currentHash === hash;
  }

  if (path === '/about' && currentHash === '#contact') {
    return false;
  }

  return true;
}

export function splitNavHref(href: string): { path: string; hash: string } {
  const [path, anchor] = href.split('#');
  return { path: path || '/', hash: anchor ? `#${anchor}` : '' };
}

/** Clear hash when re-clicking a path-only nav link on the same page (e.g. About vs Contact). */
export function handleNavLinkClick(
  event: { preventDefault(): void },
  href: string,
  pathname: string,
): void {
  const { path, hash: targetHash } = splitNavHref(href);

  if (pathname !== path) {
    return;
  }

  if (!targetHash) {
    if (window.location.hash) {
      event.preventDefault();
      window.history.replaceState(null, '', path);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  if (window.location.hash === targetHash) {
    event.preventDefault();
    document.getElementById(targetHash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function subscribeToHash(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

export function getHashSnapshot(): string {
  return window.location.hash;
}

export function getServerHashSnapshot(): string {
  return '';
}
