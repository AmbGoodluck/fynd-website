/**
 * Simple in-memory IP-based rate limiter for Cloudflare Pages Functions.
 * Mirrors the pattern already used in fynd-pwa's functions/api/*
 * (per-isolate in-memory Map — resets on cold start, good enough for
 * abuse-dampening on a low-traffic marketing endpoint).
 */

interface RateEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateEntry>();
const MAP_SIZE_LIMIT = 5000;

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (store.size > MAP_SIZE_LIMIT) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= limit;
}

export function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
}
