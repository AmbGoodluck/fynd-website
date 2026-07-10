"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DiscoverySearch } from "@/components/hero/DiscoverySearch";
import { DiscoveryCarousel, type DiscoveryState } from "@/components/hero/DiscoveryCarousel";
import { fetchDiscoverByCity, fetchDiscoverByLocation, DiscoverError } from "@/lib/discoverApi";

export const Hero = () => {
  const [state, setState] = useState<DiscoveryState>({ status: "fallback" });
  const lastAction = useRef<(() => void) | null>(null);

  const runSearch = useCallback(async (fetcher: () => ReturnType<typeof fetchDiscoverByCity>) => {
    setState({ status: "loading" });
    try {
      const data = await fetcher();
      if (data.places.length === 0) {
        setState({ status: "empty", resolved: data.resolved });
      } else {
        setState({ status: "success", resolved: data.resolved, places: data.places });
      }
    } catch (err) {
      const message = err instanceof DiscoverError ? err.message : "Something went wrong. Please try again.";
      setState({ status: "error", message });
    }
  }, []);

  const handleSearchCity = useCallback(
    (city: string) => {
      lastAction.current = () => runSearch(() => fetchDiscoverByCity(city));
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
        lastAction.current = () => runSearch(() => fetchDiscoverByLocation(pos.coords.latitude, pos.coords.longitude));
        lastAction.current();
      },
      () => {
        // User said no to the location prompt — fall back to static examples
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
          Search a city or share your location — see what Fynd would find for you right now.
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
