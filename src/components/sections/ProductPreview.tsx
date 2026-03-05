"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionAmbientIcons } from "@/components/SectionAmbientIcons";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screenshots = [
  { src: "/screenshots/fynd-screen1.png", alt: "Fynd home screen" },
  { src: "/screenshots/fynd-screen2.png", alt: "Fynd discover places" },
  { src: "/screenshots/fynd-screen3.png", alt: "Fynd trip planning" },
  { src: "/screenshots/fynd-screen4.png", alt: "Fynd itinerary view" },
  { src: "/screenshots/fynd-screen5.png", alt: "Fynd saved trips" },
  { src: "/screenshots/fynd-screen6.png", alt: "Fynd explore" },
  { src: "/screenshots/fynd-screen7.png", alt: "Fynd map view" },
  { src: "/screenshots/fynd-screen8.png", alt: "Fynd recommendations" },
  { src: "/screenshots/fynd-screen9.png", alt: "Fynd profile" },
  { src: "/screenshots/fynd-screen10.png", alt: "Fynd settings" },
  { src: "/screenshots/fynd-screen11.png", alt: "Fynd places" },
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

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <SectionAmbientIcons variant="productpreview" />
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-lg text-fynd">
            Real screens. Real trips. Real you.
          </p>
        </div>

        {/* Phone mockup slider */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex items-center justify-center gap-4">
            {/* Prev button */}
            <button
              onClick={prev}
              className="z-10 p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Phone frame */}
            <div className="relative w-[240px] sm:w-[280px] h-[480px] sm:h-[560px] bg-gray-900 rounded-[40px] shadow-2xl border-[6px] border-gray-800 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
              {/* Screenshot */}
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screenshots[current].src}
                    alt={screenshots[current].alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="z-10 p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-fynd w-6" : "bg-gray-300 w-2"
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
