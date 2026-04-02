"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Hero rotating screenshots — best 4 screens that show the full journey at a glance
const screens = [
  { src: "/screenshots/fynd-screen3.png", alt: "Fynd — Instant Places Discovery onboarding screen" },
  { src: "/screenshots/fynd-screen4.png", alt: "Fynd — Set your location, time, and distance preferences" },
  { src: "/screenshots/fynd-screen8.png", alt: "Fynd — Suggested places list for New York" },
  { src: "/screenshots/fynd-screen1.png", alt: "Fynd — Trip map with pinned stops in Manhattan" },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance phone mockup screenshots
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)",
      }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, #bbf7d0 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #a7f3d0 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: text & CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Overline badge — signals AI and free entry point immediately */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-6 border border-green-200/60">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              AI-powered travel discovery
            </div>

            {/* Headline — Instrument Serif gives it editorial weight */}
            <h1 className="hero-title text-gray-900 mb-6">
              Discover places you&apos;ll actually love, wherever you are.
            </h1>

            {/* Subheading — outcome-first, specific, tight */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Fynd learns your interests and location to surface experiences,
              hidden gems, and local favorites worth visiting — matched to you
              in seconds.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Scrolls to download section */}
              <a href="#download" className="flex-shrink-0">
                <Button size="lg" variant="primary" aria-label="Get the Fynd app">
                  Get the app
                </Button>
              </a>

              {/* Opens the web app directly */}
              <a
                href="https://app.fyndplaces.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Button size="lg" variant="outline" aria-label="Try Fynd in your browser">
                  Try it in your browser
                </Button>
              </a>
            </div>

            {/* Trust row — checkmarks make these feel confirmed, not aspirational */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
              {["Free to start", "No account required", "Works on any device"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right column: phone mockup ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="relative">
              {/* Floating phone */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Screenshot display — no phone frame */}
                <div
                  className="relative w-[286px] sm:w-[330px] overflow-hidden rounded-2xl shadow-2xl"
                  style={{ aspectRatio: "9/19.5" }}
                >
                  {/* Rotating screenshots */}
                  <div className="absolute inset-0 bg-gray-100">
                    {screens.map((s, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: i === current ? 1 : 0 }}
                      >
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          className="object-contain"
                          unoptimized
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating info bubble — top right */}
              <motion.div
                className="absolute -right-6 top-20 bg-white rounded-2xl shadow-lg px-4 py-3 text-xs max-w-[148px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="text-green-600 font-bold text-sm">Your local picks</p>
                <p className="text-gray-500 mt-0.5 leading-snug">
                  Curated for your area
                </p>
              </motion.div>

              {/* Floating info bubble — bottom left */}
              <motion.div
                className="absolute -left-6 bottom-28 bg-white rounded-2xl shadow-lg px-4 py-3 text-xs max-w-[148px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <p className="text-green-600 font-bold text-sm">Made for you</p>
                <p className="text-gray-500 mt-0.5 leading-snug">
                  Matches your vibe in seconds
                </p>
              </motion.div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-5">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Show screen ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-green-500 w-6" : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
