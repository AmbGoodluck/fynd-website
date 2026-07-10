import type { DiscoverResponse } from "@/types/discover";

export class DiscoverError extends Error {}

export async function fetchDiscoverByCity(city: string): Promise<DiscoverResponse> {
  const res = await fetch(`/api/discover?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  if (!res.ok) throw new DiscoverError(data?.error || "Something went wrong.");
  return data as DiscoverResponse;
}

export async function fetchDiscoverByLocation(lat: number, lng: number): Promise<DiscoverResponse> {
  const res = await fetch(`/api/discover?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  if (!res.ok) throw new DiscoverError(data?.error || "Something went wrong.");
  return data as DiscoverResponse;
}
