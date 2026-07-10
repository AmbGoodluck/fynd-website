export type CategoryBucket =
  | "food"
  | "hidden_gem"
  | "culture"
  | "outdoors"
  | "wellness"
  | "nightlife"
  | "other";

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

export interface DiscoverResponse {
  resolved: string;
  places: PlacePreview[];
}

export interface DiscoverErrorResponse {
  error: string;
}
