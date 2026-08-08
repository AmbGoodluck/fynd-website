"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const responses = [
  {
    title: "The Window Seat",
    detail: "Quiet, good light, ten minutes away.",
    image: "/photos/coffee-shop-warm.jpg",
    alt: "A warmly lit coffee shop interior",
    faded: false,
  },
  {
    title: "Print & Page",
    detail: "Small, independent, open till late.",
    image: "/photos/bookstore-couple.jpg",
    alt: "A couple browsing shelves in a bookstore",
    faded: true,
  },
];

export const ParadigmShift = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir text-paper overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mono-tag text-fynd-light mb-4">How Fynd thinks</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">
              Smart matching, not <em>gimmicks</em>.
            </h2>
            <p className="text-paper-muted text-lg leading-relaxed max-w-md">
              Fynd reads what you actually want - a mood, a budget, a
              distance - instead of forcing you through star ratings and
              endless filters. Say it in your own words, and it finds real
              places that fit.
            </p>
          </motion.div>

          {/* Mock demonstration panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-dark rounded-[1.75rem] p-8"
          >
            <div className="glass-dark rounded-full px-5 py-3 mb-7 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-fynd flex-shrink-0" />
              <span className="text-paper/80 text-sm">
                &quot;A quiet space to read with good natural light...&quot;
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {responses.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center gap-4 rounded-2xl p-3 bg-white/[0.03]"
                  style={{ opacity: r.faded ? 0.6 : 1 }}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={r.image} alt={r.alt} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <h4 className="text-base text-paper" style={{ fontFamily: "var(--font-fraunces)" }}>
                      {r.title}
                    </h4>
                    <p className="text-xs text-paper-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
