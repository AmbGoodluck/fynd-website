"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw } from "lucide-react";
import type { PlacePreview } from "@/types/discover";
import { PlaceCard } from "./PlaceCard";
import { FALLBACK_PLACES } from "./fallbackPlaces";
import { useAutoScroll } from "./useAutoScroll";

export type DiscoveryState =
  | { status: "fallback"; reason?: "location-denied" | "location-unavailable" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty"; resolved: string }
  | { status: "success"; resolved: string; places: PlacePreview[] };

const AutoScrollRow = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useAutoScroll(ref, true);
  return (
    <div
      ref={ref}
      className="discovery-scroll flex gap-5 overflow-x-auto px-4 sm:px-0 pb-4 -mx-4 sm:mx-0"
    >
      {children}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="w-72 sm:w-80 flex-shrink-0 rounded-3xl overflow-hidden bg-surface-raised ring-1 ring-hairline">
    <div className="w-full h-44 bg-surface animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 w-3/4 bg-surface animate-pulse rounded" />
      <div className="h-3 w-1/2 bg-surface animate-pulse rounded" />
      <div className="h-3 w-full bg-surface animate-pulse rounded" />
      <div className="h-9 w-28 bg-surface animate-pulse rounded-full mt-2" />
    </div>
  </div>
);

export const DiscoveryCarousel = ({ state, onRetry }: { state: DiscoveryState; onRetry: () => void }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.status}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl mx-auto mt-10"
      >
        {state.status === "loading" && (
          <div className="flex gap-5 overflow-x-hidden px-4 sm:px-0 pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-ink-muted">{state.message}</p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 text-sm font-semibold text-fynd hover:text-fynd-dark transition-colors"
            >
              <RotateCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        )}

        {state.status === "empty" && (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-ink-muted">
              No places found yet for <span className="text-ink font-semibold">{state.resolved}</span>.
            </p>
            <p className="text-sm text-ink-muted/70">Try a bigger city nearby.</p>
          </div>
        )}

        {state.status === "success" && (
          <>
            <p className="mono-tag text-ink-muted mb-4 px-4 sm:px-0">
              A preview of <span className="text-ink">{state.resolved}</span>
            </p>
            <AutoScrollRow>
              {state.places.map((place, i) => (
                <PlaceCard key={place.place_id || `${place.name}-${i}`} place={place} />
              ))}
            </AutoScrollRow>
          </>
        )}

        {state.status === "fallback" && (
          <>
            <p className="mono-tag text-ink-muted mb-4 px-4 sm:px-0">
              {state.reason
                ? "No location shared — here's a taste of what Fynd finds"
                : "A taste of what Fynd finds"}
            </p>
            <AutoScrollRow>
              {FALLBACK_PLACES.map((place, i) => (
                <PlaceCard key={`${place.name}-${i}`} place={place} />
              ))}
            </AutoScrollRow>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
