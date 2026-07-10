"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Map, LifeBuoy, Bookmark, Users, type LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  span?: "featured" | "wide";
}

const features: Feature[] = [
  {
    title: "AI itineraries in seconds",
    description:
      "Pick a destination, pick your vibes, tap once. Fynd builds a full day plan with ordered stops made for how you travel.",
    icon: Sparkles,
    span: "featured",
  },
  {
    title: "Discovery that gets your vibe",
    description:
      "No generic top-10 lists. Choose vibes like foodie, nightlife, or hidden gems and Fynd surfaces places that actually match.",
    icon: Compass,
  },
  {
    title: "Your trip, live on the map",
    description: "Every stop pinned, routes drawn, one tap to navigate. Never wonder “where next?”",
    icon: Map,
  },
  {
    title: "Service Hub",
    description:
      "Pharmacies, clinics, ATMs, and essentials near you — because real trips need backup, not just bucket lists.",
    icon: LifeBuoy,
  },
  {
    title: "Save now, go later",
    description: "Keep places and past itineraries in one spot. Rebuild a great day with one tap.",
    icon: Bookmark,
  },
  {
    title: "Travel together",
    description: "Share trips, plan with friends, and capture Trip Moments along the way.",
    icon: Users,
    span: "wide",
  },
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-canvas overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="mono-tag text-ink-muted mb-4">Everything Fynd does</p>
          <h2 className="text-4xl md:text-5xl text-ink mb-4">Your whole trip, one app.</h2>
          <p className="text-lg text-ink-muted">Stop juggling ten tabs. Fynd plans, maps, and travels with you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isFeatured = feature.span === "featured";
            const isWide = feature.span === "wide";

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className={`group relative rounded-3xl p-8 sm:p-9 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.04] ${
                  isFeatured || isWide ? "md:col-span-2" : ""
                } ${
                  isFeatured
                    ? "bg-fynd/[0.06] ring-fynd/15 hover:bg-fynd/[0.09]"
                    : "glass hover:bg-surface-raised"
                } ${isWide ? "flex flex-col sm:flex-row sm:items-center gap-6" : "flex flex-col justify-between min-h-[220px]"}`}
              >
                {isFeatured && (
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-fynd/10 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={`relative flex-shrink-0 flex items-center justify-center rounded-2xl transition-colors ${
                    isFeatured ? "w-14 h-14 bg-fynd/15" : "w-12 h-12 bg-fynd/10"
                  } ${isWide ? "" : "mb-6"}`}
                >
                  <Icon className={isFeatured ? "w-7 h-7 text-fynd" : "w-6 h-6 text-fynd"} strokeWidth={1.75} />
                </div>

                <div className="relative">
                  <h3 className={isFeatured ? "text-2xl text-ink mb-2.5" : "text-xl text-ink mb-2"}>
                    {feature.title}
                  </h3>
                  <p
                    className={`text-ink-muted leading-relaxed ${
                      isFeatured ? "text-base max-w-md" : "text-sm max-w-md"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
