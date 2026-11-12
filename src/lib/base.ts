/**
 * Sub-path the site is served from (e.g. "/T-H-Restaurant" on GitHub Pages, "" on an own domain).
 * Set NEXT_PUBLIC_BASE_PATH at build time; every hard-coded public path goes through withBase().
 */
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const withBase = (p: string) => `${BASE}${p}`;
