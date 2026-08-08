import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { PlacePreview } from "@/types/discover";

const FYND_APP_BASE = "https://app.fyndplaces.com";
const PLACE_DETAIL_PATH = "/place/";

export const PlaceCard = ({ place }: { place: PlacePreview }) => {
  // Static fallback examples have no real place_id - send those to the app
  // generally, with a different CTA copy since it can't deep-link to this
  // specific (illustrative, non-existent-in-the-database) place.
  const isFallback = !place.place_id;
  const openHref = isFallback
    ? `${FYND_APP_BASE}?from=hero-home`
    : `${FYND_APP_BASE}${PLACE_DETAIL_PATH}${encodeURIComponent(place.place_id)}?from=hero-place&returnTo=${encodeURIComponent(`${FYND_APP_BASE}/`)}`;
  const ctaLabel = isFallback ? "Discover more in Fynd" : "Open in Fynd";

  return (
    <div className="w-72 sm:w-80 flex-shrink-0 rounded-3xl overflow-hidden bg-surface-raised ring-1 ring-hairline flex flex-col">
      <div className="relative w-full h-44 bg-surface">
        {place.photo_url ? (
          <Image
            src={place.photo_url}
            alt={place.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-muted text-sm">
            No photo yet
          </div>
        )}
        <span className="absolute top-3 left-3 mono-tag bg-canvas/90 text-ink px-2.5 py-1 rounded-full backdrop-blur-sm">
          {place.category_label}
        </span>
        {place.open_now !== null && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
              place.open_now ? "bg-fynd/90 text-white" : "bg-canvas/90 text-ink-muted"
            }`}
          >
            {place.open_now ? "Open" : "Closed"}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg text-ink mb-1 leading-snug">{place.name}</h3>

        {place.distance_km !== null && (
          <p className="flex items-center gap-1 text-xs text-ink-muted mb-2">
            <MapPin className="w-3.5 h-3.5" />
            {place.distance_km < 1 ? "Less than 1 km away" : `${place.distance_km} km away`}
          </p>
        )}

        {place.ai_description && (
          <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3 flex-1">
            {place.ai_description}
          </p>
        )}

        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-1.5 bg-fynd text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-fynd-dark transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-fynd focus:ring-offset-2 focus:ring-offset-surface-raised"
          aria-label={isFallback ? "Discover more in Fynd" : `Open ${place.name} in Fynd`}
        >
          {ctaLabel}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
