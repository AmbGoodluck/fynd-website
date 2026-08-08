/**
 * Shared, dependency-free place logic for the discovery-preview endpoint.
 *
 * Ported (not imported - separate repo/deploy) from fynd-pwa's
 * src/services/freePlacesService.ts, simplified for a marketing-page preview:
 *   - isChain / CHAIN_KEYWORDS: verbatim port (freePlacesService.ts:656-673)
 *   - isStockPhoto: verbatim port (freePlacesService.ts:225) - the app's own
 *     category-fallback images are hardcoded Unsplash URLs, used only when no
 *     real Google Places photo was found for that place.
 *   - Category bucketing: NEW, simplified for the 6-bucket hero mix. The real
 *     app uses a 26-interest taste-profile system (TYPE_TO_INTERESTS) driven
 *     by a signed-in user's preferences; anonymous hero visitors have no
 *     profile, so this uses keyword matching against HERE category names
 *     instead - good enough for a curated preview, not a recommendation engine.
 */

export type CategoryBucket =
  | "food"
  | "hidden_gem"
  | "culture"
  | "outdoors"
  | "wellness"
  | "nightlife"
  | "other";

export interface RawHereItem {
  id: string;
  title: string;
  position?: { lat: number; lng: number };
  address?: { label?: string; street?: string; city?: string; stateCode?: string };
  categories?: { id?: string; name?: string }[];
  distance?: number;
  openingHours?: { isOpen?: boolean; text?: string[] }[];
}

export interface CandidatePlace {
  hereId: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  categoryNames: string[];
  bucket: CategoryBucket;
  distanceMeters?: number;
  openNow?: boolean;
  isChain: boolean;
}

export interface PlacePreview {
  place_id: string;
  name: string;
  category_bucket: CategoryBucket;
  category_label: string;
  lat: number;
  lng: number;
  address: string;
  rating: number | null;
  open_now: boolean | null;
  photo_url: string | null;
  ai_description: string | null;
  distance_km: number | null;
}

// ── Chain detection - verbatim port of freePlacesService.ts CHAIN_KEYWORDS ───
const CHAIN_KEYWORDS = [
  "mcdonald", "burger king", "wendy", "taco bell", "subway", "domino",
  "pizza hut", "papa john", "little caesars", "sonic", "arby", "hardee",
  "chick-fil-a", "popeyes", "kfc", "dunkin", "starbucks", "red lobster",
  "olive garden", "applebee", "chili", "ihop", "denny", "waffle house",
  "cracker barrel", "dollar general", "dollar tree", "walmart", "target",
  "walgreens", "cvs", "save-a-lot", "aldi", "kroger", "shell", "bp",
  "speedway", "circle k", "marathon", "valero", "buffalo wild wings",
  "hooters", "cicis", "outback", "golden corral", "panera", "chipotle",
  "five guys", "zaxby", "cookout", "firehouse sub", "jersey mike",
  "jimmy john", "panda express", "raising cane", "wingstop",
  "sonny's barbecue", "logan's roadhouse", "tropical smoothie",
];

export function isChain(name: string): boolean {
  const lower = name.toLowerCase();
  return CHAIN_KEYWORDS.some((c) => lower.includes(c));
}

// ── Stock-photo detection - verbatim port of freePlacesService.ts:225 ────────
export function isStockPhoto(url: string | null | undefined): boolean {
  if (!url) return true;
  return url.includes("unsplash.com");
}

// ── Category bucketing - keyword match against HERE category names ──────────
const BUCKET_KEYWORDS: Record<Exclude<CategoryBucket, "hidden_gem" | "other">, string[]> = {
  food: [
    "restaurant", "eating", "dining", "pizza", "burger", "sushi", "steak",
    "bbq", "barbecue", "noodle", "ramen", "seafood", "diner", "grill",
    "bakery", "bagel", "dessert", "ice cream", "breakfast", "brunch",
    "fast food", "cafe", "café", "coffee", "tea house",
  ],
  nightlife: ["bar", "pub", "night club", "nightclub", "lounge", "brewery", "winery", "distillery", "tavern"],
  culture: [
    "museum", "gallery", "theatre", "theater", "cinema", "historic",
    "landmark", "monument", "memorial", "church", "cathedral", "temple",
    "mosque", "synagogue", "heritage", "art", "sight",
  ],
  outdoors: ["park", "garden", "trail", "nature", "natural", "beach", "lake", "forest", "viewpoint", "scenic", "botanical"],
  wellness: ["spa", "wellness", "yoga", "gym", "fitness", "salon", "massage"],
};

const BUCKET_LABELS: Record<CategoryBucket, string> = {
  food: "Restaurant & Café",
  hidden_gem: "Hidden Gem",
  culture: "Arts & Culture",
  outdoors: "Park & Outdoors",
  wellness: "Wellness",
  nightlife: "Nightlife",
  other: "Place",
};

export function getBucketLabel(bucket: CategoryBucket): string {
  return BUCKET_LABELS[bucket];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Word-boundary match - plain .includes() false-positives on substrings
 * (e.g. "art" matching inside "Makeup Artist", misclassifying a makeup
 * studio as Arts & Culture). */
function containsWord(haystack: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i").test(haystack);
}

export function bucketFromCategoryNames(categoryNames: string[], placeName: string): CategoryBucket {
  const haystack = [...categoryNames, placeName].join(" ").toLowerCase();
  for (const bucket of Object.keys(BUCKET_KEYWORDS) as (keyof typeof BUCKET_KEYWORDS)[]) {
    if (BUCKET_KEYWORDS[bucket].some((kw) => containsWord(haystack, kw))) return bucket;
  }
  return "other";
}

// ── HERE item normalization ──────────────────────────────────────────────────
export function normalizeHereItem(item: RawHereItem, fallbackCity: string): CandidatePlace | null {
  if (!item.title || !item.position) return null;
  const categoryNames = (item.categories || []).map((c) => c.name || "").filter(Boolean);
  return {
    hereId: item.id,
    name: item.title,
    lat: item.position.lat,
    lng: item.position.lng,
    address:
      item.address?.label ||
      [item.address?.street, item.address?.city, item.address?.stateCode].filter(Boolean).join(", ") ||
      fallbackCity,
    city: item.address?.city || fallbackCity,
    categoryNames,
    bucket: bucketFromCategoryNames(categoryNames, item.title),
    distanceMeters: item.distance,
    openNow: item.openingHours?.[0]?.isOpen,
    isChain: isChain(item.title),
  };
}

// ── Bucket selection - 3 food / 2 hidden gems / 2 culture / 1 outdoors / 1 wellness / 1 nightlife ──
export const BUCKET_QUOTAS: { bucket: Exclude<CategoryBucket, "hidden_gem" | "other">; count: number }[] = [
  { bucket: "food", count: 3 },
  { bucket: "culture", count: 2 },
  { bucket: "outdoors", count: 1 },
  { bucket: "wellness", count: 1 },
  { bucket: "nightlife", count: 1 },
];
export const HIDDEN_GEM_COUNT = 2;
export const TOTAL_TARGET = 10;

/**
 * Rank within a bucket: prefer non-chain, then closer distance.
 * (No `rating` available at this stage - HERE Browse doesn't return it;
 * rating-based re-ranking happens after Google enrichment, see discover.ts.)
 */
export function rankCandidates(items: CandidatePlace[]): CandidatePlace[] {
  return [...items].sort((a, b) => {
    if (a.isChain !== b.isChain) return a.isChain ? 1 : -1;
    const da = a.distanceMeters ?? Infinity;
    const db = b.distanceMeters ?? Infinity;
    return da - db;
  });
}

/** Dedupe by hereId + normalized name - shared by selectBalancedMix and discover.ts's enrichment walk. */
export function dedupeCandidates(pool: CandidatePlace[]): CandidatePlace[] {
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  return pool.filter((p) => {
    if (seenIds.has(p.hereId)) return false;
    const normName = p.name.toLowerCase().replace(/\s+/g, " ").trim();
    if (seenNames.has(normName)) return false;
    seenIds.add(p.hereId);
    seenNames.add(normName);
    return true;
  });
}

/**
 * Ranked (unsliced) candidate pool per named bucket, plus a ranked hidden-gem
 * pool (non-chain candidates from any bucket). discover.ts walks each pool in
 * order, skipping candidates that turn out to have no real photo after Google
 * enrichment, until each quota is filled or the pool is exhausted.
 */
export function rankBucketPools(pool: CandidatePlace[]): {
  byBucket: Record<Exclude<CategoryBucket, "hidden_gem" | "other">, CandidatePlace[]>;
  hiddenGemPool: CandidatePlace[];
  everything: CandidatePlace[];
} {
  const deduped = dedupeCandidates(pool);
  const byBucket = {
    food: rankCandidates(deduped.filter((p) => p.bucket === "food")),
    culture: rankCandidates(deduped.filter((p) => p.bucket === "culture")),
    outdoors: rankCandidates(deduped.filter((p) => p.bucket === "outdoors")),
    wellness: rankCandidates(deduped.filter((p) => p.bucket === "wellness")),
    nightlife: rankCandidates(deduped.filter((p) => p.bucket === "nightlife")),
  };
  const hiddenGemPool = rankCandidates(deduped.filter((p) => !p.isChain));
  return { byBucket, hiddenGemPool, everything: rankCandidates(deduped) };
}

/**
 * Pick a balanced ~10-place mix from a pool of candidates. Deduplicates by
 * hereId + normalized name. Backfills short buckets from the general pool so
 * the total stays close to TOTAL_TARGET even in sparse cities.
 */
export function selectBalancedMix(pool: CandidatePlace[]): CandidatePlace[] {
  const { byBucket, hiddenGemPool, everything } = rankBucketPools(pool);
  const picked: CandidatePlace[] = [];
  const pickedIds = new Set<string>();

  for (const { bucket, count } of BUCKET_QUOTAS) {
    for (const p of byBucket[bucket]) {
      if (picked.filter((x) => x.bucket === bucket).length >= count) break;
      if (pickedIds.has(p.hereId)) continue;
      picked.push(p);
      pickedIds.add(p.hereId);
    }
  }

  for (const p of hiddenGemPool) {
    if (picked.filter((x) => x.bucket === "hidden_gem").length >= HIDDEN_GEM_COUNT) break;
    if (pickedIds.has(p.hereId)) continue;
    picked.push({ ...p, bucket: "hidden_gem" });
    pickedIds.add(p.hereId);
  }

  if (picked.length < TOTAL_TARGET) {
    for (const p of everything) {
      if (picked.length >= TOTAL_TARGET) break;
      if (pickedIds.has(p.hereId)) continue;
      picked.push(p);
      pickedIds.add(p.hereId);
    }
  }

  return picked;
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Cache key: lowercased city name, or rounded lat/lng (~1.1km buckets) for geolocation searches. */
export function cacheKeyForCity(city: string): string {
  return `city:${city.trim().toLowerCase()}`;
}
export function cacheKeyForCoords(lat: number, lng: number): string {
  return `geo:${Math.round(lat * 100) / 100},${Math.round(lng * 100) / 100}`;
}
