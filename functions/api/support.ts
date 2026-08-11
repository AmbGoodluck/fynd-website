/**
 * POST /api/support
 * Body: { name?: string, email: string, category: string, message: string }
 *
 * Cloudflare Pages Function - stores a support/feedback submission in
 * Supabase (`support_requests` table, see supabase/support_requests.sql).
 * Like /api/waitlist, this table holds PII, so it is INSERT-only for the
 * anon role - no public read policy, so no visitor can list other
 * submissions via the Supabase REST API.
 *
 * Required Cloudflare Pages env vars (same project as /api/waitlist):
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
const CATEGORIES = new Set(["bug", "feature", "account", "billing", "other"]);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!checkRateLimit(`support:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW)) {
      return json({ error: "Too many attempts - try again later." }, 429);
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      return json({ error: "Support form isn't configured yet - try again soon." }, 503);
    }

    let body: { name?: unknown; email?: unknown; category?: unknown; message?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) || null : null;
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const category = typeof body.category === "string" ? body.category.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ error: "That doesn't look like a valid email." }, 400);
    }
    if (!CATEGORIES.has(category)) {
      return json({ error: "Please choose a valid category." }, 400);
    }
    if (!message || message.length < 10) {
      return json({ error: "Tell us a bit more - message is too short." }, 400);
    }
    if (message.length > 5000) {
      return json({ error: "Message is too long - please shorten it." }, 400);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let res: Response;
    try {
      res = await fetch(`${env.SUPABASE_URL}/rest/v1/support_requests`, {
        method: "POST",
        headers: {
          apikey: env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify([{ name, email, category, message, source: "support-page" }]),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[support] Supabase insert failed", res.status, detail.slice(0, 500));
      return json({ error: "Something went wrong - try again." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[support] unhandled error", err instanceof Error ? err.message : err);
    return json({ error: "Something went wrong - try again." }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: { "Content-Type": "application/json" } });
