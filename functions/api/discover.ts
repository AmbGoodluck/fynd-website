/**
 * GET /api/discover?city=<name>  |  ?lat=<lat>&lng=<lng>
 *
 * Cloudflare Pages Function — powers the homepage's interactive discovery
 * hero. Lives entirely in this repo, separate from fynd-pwa's backend (see
 * plan doc), and shares only the Supabase project/schema as a public,
 * non-user cache of place previews.
 *
 * Flow: resolve city/coords → check Supabase cache (7-day TTL) → on miss,
 * HERE Browse for a broad category pool → bucket into a balanced ~10-place
 * mix (functions/_shared/places.ts) → enrich each candidate with a real
 * Google Places photo (skip + try next candidate if none found — this is
 * the "no stock photos" rule) → generate a one-sentence AI description →
 * upsert into Supabase → return.
 *
 * Required Cloudflare Pages env vars (this repo's OWN project, separate
 * from fynd-pwa's):
 *   HERE_API_KEY, GOOGLE_PLACES_API_KEY, OPENAI_API_KEY,
 *   SUPABASE_URL, SUPABASE_ANON_KEY
 * Missing Supabase vars degrade gracefully to "no caching" (still works,
 * just re-runs the full pipeline every time) so local dev works without them.
 */

import { checkRateLimit, clientIp } from "../_shared/rateLimit";
import {
  BUCKET_QUOTAS,
  HIDDEN_GEM_COUNT,
  TOTAL_TARGET,
  CandidatePlace,
  CategoryBucket,
  PlacePreview,
  RawHereItem,
  cacheKeyForCity,
  cacheKeyForCoords,
  getBucketLabel,
  haversineKm,
  isStockPhoto,
  normalizeHereItem,
  rankBucketPools,
} from "../_shared/places";

interface Env {
  HERE_API_KEY: string;
  GOOGLE_PLACES_API_KEY: string;
  OPENAI_API_KEY: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_CACHED_ROWS = 6;
const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 60 * 1000;

interface EnrichedPlace {
  googlePlaceId: string | null;
  rating: number | null;
  openNow: boolean | null;
  photoUrl: string | null;
  address: string;
}

interface Winner {
  candidate: CandidatePlace;
  enriched: EnrichedPlace;
  description: string | null;
}

// ── External API response shapes (minimal — only fields we read) ──────────────
interface HereGeocodeResponse {
  items?: { position?: { lat: number; lng: number }; address?: { label?: string } }[];
}
interface HereBrowseResponse {
  items?: RawHereItem[];
}
// Places API (New) — the legacy Text Search / Place Photo endpoints return
// REQUEST_DENIED on Google Cloud projects that only have the New API enabled.
interface GoogleSearchTextResponse {
  places?: {
    id?: string;
    formattedAddress?: string;
    rating?: number;
    currentOpeningHours?: { openNow?: boolean };
    photos?: { name?: string }[];
  }[];
  error?: { status?: string; message?: string };
}
interface OpenAIChatResponse {
  choices?: { message?: { content?: string } }[];
}
interface DiscoverPlaceRow {
  place_id: string;
  google_place_id: string | null;
  name: string;
  category_bucket: CategoryBucket;
  lat: number;
  lng: number;
  address: string;
  rating: number | null;
  open_now: boolean | null;
  photo_url: string | null;
  ai_description: string | null;
  last_refreshed_at: string;
}

// ── HTTP helpers ──────────────────────────────────────────────────────────────
function baseHeaders(): Record<string, string> {
  return { "Content-Type": "application/json", "Cache-Control": "no-store" };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: baseHeaders() });
}

async function fetchWithTimeout(url: string, ms: number, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ── HERE ──────────────────────────────────────────────────────────────────────
async function geocodeCity(
  city: string,
  apiKey: string,
): Promise<{ lat: number; lng: number; label: string } | null> {
  try {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(city)}&apiKey=${apiKey}`;
    const res = await fetchWithTimeout(url, 8000);
    if (!res.ok) {
      console.error("[discover] HERE geocode failed", res.status, (await res.text().catch(() => "")).slice(0, 300));
      return null;
    }
    const data: HereGeocodeResponse = await res.json();
    const item = data.items?.[0];
    if (!item?.position) return null;
    return { lat: item.position.lat, lng: item.position.lng, label: item.address?.label || city };
  } catch (err) {
    console.error("[discover] HERE geocode error", err instanceof Error ? err.message : err);
    return null;
  }
}

async function browseHere(lat: number, lng: number, apiKey: string): Promise<RawHereItem[]> {
  try {
    // 100 Eating/Drinking, 200 Going Out, 300 Sights & Museums, 350 Natural/Geographical,
    // 550 Sports/Recreation (parks). 400 Transport and 600 Shopping intentionally
    // excluded — Shopping's long tail of local service businesses (salons, home
    // improvement, tutoring studios) doesn't match any of the 6 target buckets and
    // was surfacing as low-quality "Hidden Gem" picks.
    const url = `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&categories=100,200,300,350,550&limit=100&apiKey=${apiKey}`;
    const res = await fetchWithTimeout(url, 8000);
    if (!res.ok) {
      console.error("[discover] HERE browse failed", res.status, (await res.text().catch(() => "")).slice(0, 300));
      return [];
    }
    const data: HereBrowseResponse = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("[discover] HERE browse error", err instanceof Error ? err.message : err);
    return [];
  }
}

// ── Google Places (New) — real photo enrichment ────────────────────────────────
// Uses places:searchText (New Places API), not the legacy textsearch/json
// endpoint — Google Cloud projects created without the legacy API enabled
// get REQUEST_DENIED from the old endpoint even with the New API active.
async function enrichWithGoogle(candidate: CandidatePlace, apiKey: string): Promise<EnrichedPlace | null> {
  try {
    const res = await fetchWithTimeout("https://places.googleapis.com/v1/places:searchText", 8000, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.formattedAddress,places.rating,places.currentOpeningHours.openNow,places.photos",
      },
      body: JSON.stringify({
        textQuery: `${candidate.name} ${candidate.address}`,
        locationBias: {
          circle: { center: { latitude: candidate.lat, longitude: candidate.lng }, radius: 500 },
        },
        maxResultCount: 1,
      }),
    });
    if (!res.ok) {
      console.error("[discover] Google searchText failed", res.status, (await res.text().catch(() => "")).slice(0, 300));
      return null;
    }
    const data: GoogleSearchTextResponse = await res.json();
    if (data.error) {
      console.error("[discover] Google searchText error", data.error.status, data.error.message);
    }
    const result = data.places?.[0];
    if (!result) return null;
    const photoName = result.photos?.[0]?.name;
    const photoUrl = photoName
      ? `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${apiKey}`
      : null;
    return {
      googlePlaceId: result.id || null,
      rating: typeof result.rating === "number" ? result.rating : null,
      openNow: result.currentOpeningHours?.openNow ?? null,
      photoUrl,
      address: result.formattedAddress || candidate.address,
    };
  } catch (err) {
    console.error("[discover] Google searchText fetch error", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Walk a ranked candidate pool, enriching one at a time, keeping only
 * candidates with a real Google photo (no stock/placeholder images — this IS
 * the "skip if stock photo" rule from the spec: a candidate with no real
 * photo found is treated exactly like a stock photo and rejected).
 * Not concurrency-optimized — acceptable for a not-yet-deployed v1.
 */
async function fillFromPool(
  pool: CandidatePlace[],
  quota: number,
  bucketOverride: CategoryBucket | undefined,
  winners: Winner[],
  env: Env,
): Promise<void> {
  let filled = 0;
  for (const candidate of pool) {
    if (filled >= quota) break;
    if (winners.some((w) => w.candidate.hereId === candidate.hereId)) continue;

    const enriched = await enrichWithGoogle(candidate, env.GOOGLE_PLACES_API_KEY);
    if (!enriched || isStockPhoto(enriched.photoUrl)) continue; // no real photo — try next candidate

    winners.push({
      candidate: bucketOverride ? { ...candidate, bucket: bucketOverride } : candidate,
      enriched,
      description: null,
    });
    filled++;
  }
}

// ── OpenAI — one-sentence editorial description ───────────────────────────────
async function generateOneLiner(
  name: string,
  address: string,
  bucketLabel: string,
  rating: number | null,
  apiKey: string,
): Promise<string | null> {
  if (!apiKey) return null;
  try {
    const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", 12000, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 60,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are a local guide writing a single-sentence teaser for a place-discovery app. " +
              "Write exactly ONE sentence — natural, specific, editorial, never generic or promotional " +
              '(avoid words like "amazing", "must-visit", "perfect place"). Return ONLY the sentence, no quotes.',
          },
          {
            role: "user",
            content: `Place: ${name}\nAddress: ${address}\nCategory: ${bucketLabel}\nRating: ${rating ?? "unknown"}/5`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data: OpenAIChatResponse = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null;
  }
}

// ── Supabase REST — public, non-user place-preview cache ──────────────────────
function supabaseConfigured(env: Env): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

function rowToPreview(row: DiscoverPlaceRow): PlacePreview {
  return {
    // Always "here_<id>" — matches the PWA's fetchPlaceById() cold-open deep-link
    // resolver (freePlacesService.ts:505-506), which only recognizes that prefix.
    place_id: row.place_id,
    name: row.name,
    category_bucket: row.category_bucket,
    category_label: getBucketLabel(row.category_bucket),
    lat: row.lat,
    lng: row.lng,
    address: row.address,
    rating: row.rating,
    open_now: row.open_now,
    photo_url: row.photo_url,
    ai_description: row.ai_description,
    distance_km: null,
  };
}

async function readCache(env: Env, cacheKey: string): Promise<PlacePreview[] | null> {
  if (!supabaseConfigured(env)) return null;
  try {
    const url = `${env.SUPABASE_URL}/rest/v1/discover_places?cache_key=eq.${encodeURIComponent(cacheKey)}&select=*`;
    const res = await fetchWithTimeout(url, 8000, {
      headers: { apikey: env.SUPABASE_ANON_KEY!, Authorization: `Bearer ${env.SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) return null;
    const rows: DiscoverPlaceRow[] = await res.json();
    if (!Array.isArray(rows) || rows.length < MIN_CACHED_ROWS) return null;
    const oldest = Math.min(...rows.map((r) => new Date(r.last_refreshed_at).getTime()));
    if (Date.now() - oldest > CACHE_TTL_MS) return null;
    return rows.map(rowToPreview);
  } catch {
    return null;
  }
}

async function writeCache(env: Env, cacheKey: string, winners: Winner[]): Promise<void> {
  if (!supabaseConfigured(env) || winners.length === 0) return;
  try {
    const rows = winners.map((w) => ({
      // Canonical Fynd place ID — must be "here_<id>" so "Open in Fynd" cold-opens
      // correctly in the PWA (fetchPlaceById only resolves that prefix). Google's
      // place_id is kept separately, only for re-fetching a photo on cache refresh.
      place_id: `here_${w.candidate.hereId}`,
      google_place_id: w.enriched.googlePlaceId,
      cache_key: cacheKey,
      name: w.candidate.name,
      category_bucket: w.candidate.bucket,
      lat: w.candidate.lat,
      lng: w.candidate.lng,
      address: w.enriched.address,
      rating: w.enriched.rating,
      open_now: w.enriched.openNow,
      photo_url: w.enriched.photoUrl,
      ai_description: w.description,
      source_types: w.candidate.categoryNames,
      last_refreshed_at: new Date().toISOString(),
    }));
    await fetch(`${env.SUPABASE_URL}/rest/v1/discover_places`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(rows),
    });
  } catch {
    // best-effort — a failed cache write shouldn't break the response already sent
  }
}

// ── Distance ──────────────────────────────────────────────────────────────────
function attachDistance(places: PlacePreview[], lat: number, lng: number, hasVisitorLocation: boolean): PlacePreview[] {
  if (!hasVisitorLocation) return places.map((p) => ({ ...p, distance_km: null }));
  return places.map((p) => ({ ...p, distance_km: Math.round(haversineKm(lat, lng, p.lat, p.lng) * 10) / 10 }));
}

function toPreview(w: Winner): PlacePreview {
  return {
    // Same "here_<id>" rule as writeCache() — must match what fetchPlaceById expects.
    place_id: `here_${w.candidate.hereId}`,
    name: w.candidate.name,
    category_bucket: w.candidate.bucket,
    category_label: getBucketLabel(w.candidate.bucket),
    lat: w.candidate.lat,
    lng: w.candidate.lng,
    address: w.enriched.address,
    rating: w.enriched.rating,
    open_now: w.enriched.openNow,
    photo_url: w.enriched.photoUrl,
    ai_description: w.description,
    distance_km: null,
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!checkRateLimit(`discover:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW)) {
      return json({ error: "Too many requests — try again in a bit." }, 429);
    }

    const url = new URL(request.url);
    const cityParam = url.searchParams.get("city")?.trim();
    const latParam = url.searchParams.get("lat");
    const lngParam = url.searchParams.get("lng");
    const hasVisitorLocation = Boolean(latParam && lngParam);

    let originLat: number;
    let originLng: number;
    let cacheKey: string;
    let resolvedLabel: string;

    if (hasVisitorLocation) {
      originLat = parseFloat(latParam!);
      originLng = parseFloat(lngParam!);
      if (Number.isNaN(originLat) || Number.isNaN(originLng)) {
        return json({ error: "Invalid coordinates" }, 400);
      }
      cacheKey = cacheKeyForCoords(originLat, originLng);
      resolvedLabel = "your location";
    } else if (cityParam) {
      const geo = await geocodeCity(cityParam, env.HERE_API_KEY);
      if (!geo) return json({ error: `Could not find "${cityParam}" — try a different spelling.` }, 404);
      originLat = geo.lat;
      originLng = geo.lng;
      resolvedLabel = geo.label;
      cacheKey = cacheKeyForCity(cityParam);
    } else {
      return json({ error: "Provide ?city= or ?lat=&lng=" }, 400);
    }

    // 1. Cache
    const cached = await readCache(env, cacheKey);
    if (cached) {
      return json({ resolved: resolvedLabel, places: attachDistance(cached, originLat, originLng, hasVisitorLocation) });
    }

    // 2. Cache miss — full discovery pipeline
    const hereItems = await browseHere(originLat, originLng, env.HERE_API_KEY);
    const candidates = hereItems
      .map((item) => normalizeHereItem(item, resolvedLabel))
      .filter((c): c is CandidatePlace => c !== null);

    if (candidates.length === 0) {
      return json({ resolved: resolvedLabel, places: [] });
    }

    const pools = rankBucketPools(candidates);
    const winners: Winner[] = [];

    for (const { bucket, count } of BUCKET_QUOTAS) {
      await fillFromPool(pools.byBucket[bucket], count, undefined, winners, env);
    }
    const hiddenGemCandidates = pools.hiddenGemPool.filter((p) => !winners.some((w) => w.candidate.hereId === p.hereId));
    await fillFromPool(hiddenGemCandidates, HIDDEN_GEM_COUNT, "hidden_gem", winners, env);
    if (winners.length < TOTAL_TARGET) {
      const remaining = pools.everything.filter((p) => !winners.some((w) => w.candidate.hereId === p.hereId));
      await fillFromPool(remaining, TOTAL_TARGET - winners.length, undefined, winners, env);
    }

    // 3. AI descriptions — concurrent, small batch (~10)
    await Promise.all(
      winners.map(async (w) => {
        w.description = await generateOneLiner(
          w.candidate.name,
          w.enriched.address,
          getBucketLabel(w.candidate.bucket),
          w.enriched.rating,
          env.OPENAI_API_KEY,
        );
      }),
    );

    // 4. Cache for future visitors (best-effort)
    await writeCache(env, cacheKey, winners);

    const places = winners.map(toPreview);
    return json({ resolved: resolvedLabel, places: attachDistance(places, originLat, originLng, hasVisitorLocation) });
  } catch {
    return json({ error: "Something went wrong finding places." }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => new Response(null, { status: 204, headers: baseHeaders() });
