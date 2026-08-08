import type { PlacePreview } from "@/types/discover";

/**
 * Static, illustrative examples shown before a visitor searches (so the hero
 * never shows empty space) and when location permission is denied (so a
 * "no" to the location prompt doesn't dead-end into an error). Not live
 * search results - no place_id, rating, or open/closed status is faked.
 * Photos are real (project's own vetted lifestyle photography), never stock.
 */
export const FALLBACK_PLACES: PlacePreview[] = [
  {
    place_id: "",
    name: "The Window Seat",
    category_bucket: "food",
    category_label: "Restaurant & Café",
    lat: 0,
    lng: 0,
    address: "",
    rating: null,
    open_now: null,
    photo_url: "/photos/coffee-shop-warm.jpg",
    ai_description: "Quiet mornings, good espresso, a window worth lingering at.",
    distance_km: null,
  },
  {
    place_id: "",
    name: "Print & Page",
    category_bucket: "hidden_gem",
    category_label: "Hidden Gem",
    lat: 0,
    lng: 0,
    address: "",
    rating: null,
    open_now: null,
    photo_url: "/photos/bookstore-couple.jpg",
    ai_description: "A small independent bookstore that's easy to lose an afternoon in.",
    distance_km: null,
  },
  {
    place_id: "",
    name: "The Grand Hall",
    category_bucket: "culture",
    category_label: "Arts & Culture",
    lat: 0,
    lng: 0,
    address: "",
    rating: null,
    open_now: null,
    photo_url: "/photos/museum-gallery-va.jpg",
    ai_description: "A gallery visit that's worth the detour, any day of the week.",
    distance_km: null,
  },
  {
    place_id: "",
    name: "The Quiet Lawn",
    category_bucket: "outdoors",
    category_label: "Park & Outdoors",
    lat: 0,
    lng: 0,
    address: "",
    rating: null,
    open_now: null,
    photo_url: "/photos/park-picnic-couple.jpg",
    ai_description: "A patch of green made for slow afternoons and packed lunches.",
    distance_km: null,
  },
  {
    place_id: "",
    name: "Corner Taps",
    category_bucket: "nightlife",
    category_label: "Nightlife",
    lat: 0,
    lng: 0,
    address: "",
    rating: null,
    open_now: null,
    photo_url: "/photos/friends-bar-laughing.jpg",
    ai_description: "Easy conversation, good drinks, no rush to leave.",
    distance_km: null,
  },
];
