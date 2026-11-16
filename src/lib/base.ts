export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const withBase = (p: string) => `${BASE}${p}`;
