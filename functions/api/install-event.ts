/**
 * POST /api/install-event
 * Body: { source: string, action?: "view" | "pwa" | "appstore" }
 *
 * Records a visit to /install so QR codes can be compared against each other
 * (see supabase/install_events.sql).
 *
 * Deliberately anonymous: no IP, cookie, device id or full user agent is
 * stored. Platform is bucketed to ios/android/desktop/other server-side from
 * the UA header and the header itself is discarded. That answers "which poster
 * worked" without collecting anything personal, which keeps this outside the
 * Privacy Policy's personal-data commitments.
 *
 * Required Cloudflare Pages env vars (same project as /api/waitlist):
 *   SUPABASE_URL, SUPABASE_ANON_KEY
 */

import { checkRateLimit, clientIp } from "../_shared/rateLimit";

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

// Generous: one person may legitimately tap view -> pwa -> appstore, and a
// crowded hallway can share an IP. Only blunts scripted abuse.
const RATE_LIMIT = 40;
const RATE_WINDOW = 60 * 60 * 1000;

const ACTIONS = new Set(["view", "pwa", "appstore"]);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Coarse bucket only - never store the raw user agent. */
function platformFrom(ua: string): string {
  const s = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(s)) return "ios";
  if (/android/.test(s)) return "android";
  if (/windows|macintosh|linux|cros/.test(s)) return "desktop";
  return "other";
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!checkRateLimit(`install:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW)) {
      // Silently accept: a dropped analytics ping must never look like a broken
      // page to someone standing in a hallway trying to install the app.
      return json({ ok: true });
    }
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return json({ ok: true });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    // Bounded and sanitised: this value is chosen by whoever prints the QR, so
    // treat it as untrusted input even though it is ours.
    const source = String(body.source ?? "direct")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "")
      .slice(0, 48) || "direct";

    const rawAction = String(body.action ?? "view");
    const action = ACTIONS.has(rawAction) ? rawAction : "view";

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/install_events`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source,
        action,
        platform: platformFrom(request.headers.get("user-agent") ?? ""),
      }),
    });

    // Analytics must never block the install. Report ok either way.
    return json({ ok: res.ok });
  } catch {
    return json({ ok: true });
  }
};
