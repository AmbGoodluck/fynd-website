"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TODO: update captions to match final product copy
const screenshots = [
  {
    src: "/screenshots/fynd-screen1.png",
    alt: "Fynd home screen",
    caption: "Home — your personalized discovery feed",
  },
  {
    src: "/screenshots/fynd-screen2.png",
    alt: "Fynd discover places",
    caption: "Discover — browse tailored places nearby",
  },
  {
    src: "/screenshots/fynd-screen3.png",
    alt: "Fynd map view",
    caption: "Map view — see everything on a map at once",
  },
  {
    src: "/screenshots/fynd-screen4.png",
    alt: "Fynd place details",
    caption: "Place details — reviews, hours, and directions",
  },
  {
    src: "/screenshots/fynd-screen5.png",
    alt: "Fynd saved lists",
    caption: "Saved lists — your favorite spots, always handy",
  },
  {
    src: "/screenshots/fynd-screen6.png",
    alt: "Fynd explore",
    caption: "Explore — browse by mood, category, or vibe",
  },
  {
    src: "/screenshots/fynd-screen7.png",
    alt: "Fynd recommendations",
    caption: "Smart suggestions — matched to your interests",
  },
  {
    src: "/screenshots/fynd-screen8.png",
    alt: "Fynd filters",
    caption: "Filters — narrow by distance, budget, and time",
  },
  {
    src: "/screenshots/fynd-screen9.png",
    alt: "Fynd profile",
    caption: "Profile — your preferences shape every result",
  },
  {
    src: "/screenshots/fynd-screen10.png",
    alt: "Fynd settings",
    caption: "Settings — customise your discovery experience",
  },
  {
    src: "/screenshots/fynd-screen11.png",
    alt: "Fynd places list",
    caption: "Places — a curated list of top spots",
  },
];

export const ProductPreview = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    const index = (current - 1 + screenshots.length) % screenshots.length;
    goTo(index, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    const index = (current + 1) % screenshots.length;
    goTo(index, 1);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -280 : 280, opacity: 0 }),
  };

  return (
    <section
      id="product-tour"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #f8fafc 0%, #f0fdf4 50%, #f8fafc 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            See it in action
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            A visual tour of Fynd
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            Real screens. Real trips. Real you.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center gap-4">
            {/* Prev button */}
            <button
              onClick={prev}
              className="z-10 p-2.5 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Screenshot display — no phone frame */}
            <div className="relative w-[264px] sm:w-[308px] h-[539px] sm:h-[627px] overflow-hidden rounded-2xl shadow-xl">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screenshots[current].src}
                    alt={screenshots[current].alt}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="z-10 p-2.5 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Animated caption */}
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-500 text-center max-w-xs"
          >
            {screenshots[current].caption}
          </motion.p>

          {/* Dot nav */}
          <div className="flex gap-2 flex-wrap justify-center">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-green-500 w-6" : "bg-gray-200 w-2"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
