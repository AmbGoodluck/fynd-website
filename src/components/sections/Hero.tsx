"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DiscoverySearch } from "@/components/hero/DiscoverySearch";
import { DiscoveryCarousel, type DiscoveryState } from "@/components/hero/DiscoveryCarousel";
import { fetchDiscoverByCity, fetchDiscoverByLocation, DiscoverError } from "@/lib/discoverApi";
import type { PlacePreview } from "@/types/discover";

interface CachedSearchResult {
  status: "success" | "empty";
  resolved: string;
  places?: PlacePreview[];
}

const CACHE_STORAGE_KEY = "fynd-hero-search-cache";

export const Hero = () => {
  const [state, setState] = useState<DiscoveryState>({ status: "fallback" });
  const lastAction = useRef<(() => void) | null>(null);
  const searchCache = useRef<Map<string, CachedSearchResult>>(new Map());

  const persistCache = useCallback((key: string, result: CachedSearchResult) => {
    searchCache.current.set(key, result);

    if (typeof window === "undefined") return;
    try {
      const current = Object.fromEntries(searchCache.current.entries());
      window.sessionStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Ignore storage errors and keep the in-memory cache working.
    }
  }, []);

  const applyCachedResult = useCallback((key: string) => {
    const cached = searchCache.current.get(key);
    if (!cached) return false;

    if (cached.status === "success" && cached.places) {
      setState({ status: "success", resolved: cached.resolved, places: cached.places });
    } else {
      setState({ status: "empty", resolved: cached.resolved });
    }

    return true;
  }, []);

  const runSearch = useCallback(
    async (fetcher: () => ReturnType<typeof fetchDiscoverByCity>, key: string) => {
      if (applyCachedResult(key)) {
        // Keep the already-known results visible immediately, then refresh in the background.
      } else {
        setState({ status: "loading" });
      }

      try {
        const data = await fetcher();
        const nextResult: CachedSearchResult =
          data.places.length === 0 ? { status: "empty", resolved: data.resolved } : { status: "success", resolved: data.resolved, places: data.places };

        persistCache(key, nextResult);
        if (nextResult.status === "success" && nextResult.places) {
          setState({ status: "success", resolved: nextResult.resolved, places: nextResult.places });
        } else {
          setState({ status: "empty", resolved: nextResult.resolved });
        }
      } catch (err) {
        const message = err instanceof DiscoverError ? err.message : "Something went wrong. Please try again.";
        setState({ status: "error", message });
      }
    },
    [applyCachedResult, persistCache],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.sessionStorage.getItem(CACHE_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Record<string, CachedSearchResult>;
      Object.entries(parsed).forEach(([key, value]) => {
        searchCache.current.set(key, value);
      });

      const latest = Object.values(parsed).at(-1);
      if (latest?.status === "success" && latest.places) {
        setState({ status: "success", resolved: latest.resolved, places: latest.places });
      } else if (latest) {
        setState({ status: "empty", resolved: latest.resolved });
      }
    } catch {
      // Ignore bad cache payloads.
    }
  }, []);

  const handleSearchCity = useCallback(
    (city: string) => {
      const key = `city:${city.trim().toLowerCase()}`;
      lastAction.current = () => runSearch(() => fetchDiscoverByCity(city), key);
      lastAction.current();
    },
    [runSearch],
  );

  const handleUseLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ status: "fallback", reason: "location-unavailable" });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const key = `coords:${pos.coords.latitude.toFixed(2)}:${pos.coords.longitude.toFixed(2)}`;
        lastAction.current = () => runSearch(() => fetchDiscoverByLocation(pos.coords.latitude, pos.coords.longitude), key);
        lastAction.current();
      },
      () => {
        // User said no to the location prompt - fall back to static examples
        // instead of a dead-end error, so there's always something to see.
        setState({ status: "fallback", reason: "location-denied" });
      },
      { timeout: 8000, enableHighAccuracy: false },
    );
  }, [runSearch]);

  const handleRetry = useCallback(() => {
    lastAction.current?.();
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-canvas text-center overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono-tag text-ink-muted mb-6"
        >
          Your city, reconsidered
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-title text-ink mb-4"
        >
          Discover places you&apos;ll <em>actually</em> love.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-ink-muted text-lg mb-10 max-w-lg mx-auto"
        >
          Search a city or share your location - see what Fynd would find for you right now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DiscoverySearch
            onSearchCity={handleSearchCity}
            onUseLocation={handleUseLocation}
            loading={state.status === "loading"}
          />
        </motion.div>
      </div>

      <DiscoveryCarousel state={state} onRetry={handleRetry} />
    </section>
  );
};
