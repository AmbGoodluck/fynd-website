/**
 * POST /api/waitlist
 * Body: { email: string, source?: string }
 *
 * Cloudflare Pages Function — stores a waitlist signup in Supabase
 * (`waitlist` table, see supabase/waitlist.sql). Unlike discover_places,
 * this table holds PII (an email address), so it is INSERT-only for the
 * anon role — no public read policy, so no visitor can list other signups
 * via the Supabase REST API.
 *
 * Required Cloudflare Pages env vars (same project as /api/discover):
 *   SUPABASE_URL, SUPABASE_ANON_KEY
 */

import { checkRateLimit, clientIp } from "../_shared/rateLimit";

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!checkRateLimit(`waitlist:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW)) {
      return json({ error: "Too many attempts — try again later." }, 429);
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      return json({ error: "Waitlist isn't configured yet — try again soon." }, 503);
    }

    let body: { email?: unknown; source?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.slice(0, 100) : null;

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ error: "That doesn't look like a valid email." }, 400);
    }

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        // Re-submitting the same email is treated as success, not an error.
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify([{ email, source }]),
    });

    if (!res.ok && res.status !== 409) {
      return json({ error: "Something went wrong — try again." }, 502);
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Something went wrong — try again." }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: { "Content-Type": "application/json" } });
