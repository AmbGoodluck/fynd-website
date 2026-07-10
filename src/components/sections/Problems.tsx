"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// This section was previously "The Problems We Solve".
// Repurposed as "Who is Fynd for?" — use cases / personas.
const personas = [
  {
    label: "Weekend explorers",
    benefit: "Never run out of ideas for your days off.",
    image: "/photos/friends-study-coffee.jpg",
    alt: "Friends relaxing together over coffee outdoors",
  },
  {
    label: "Travelers & city-hoppers",
    benefit: "Land anywhere, know where locals actually go.",
    image: "/photos/rooftop-friends.jpg",
    alt: "Friends on a rooftop overlooking the city",
  },
  {
    label: "Remote workers",
    benefit: "Cozy cafés and work-friendly spots, minutes away.",
    image: "/photos/terrace-phone-candid.jpg",
    alt: "Someone checking their phone at a café terrace",
  },
  {
    label: "Couples & friend groups",
    benefit: "Build a shared list. Plan your next outing together.",
    image: "/photos/park-picnic-couple.jpg",
    alt: "A couple sharing a quiet moment on a park picnic",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export const Problems = () => {
  return (
    <section
      id="who-its-for"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-canvas"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-xl mb-14">
          <p className="mono-tag text-ink-muted mb-4">Made for you</p>
          <h2 className="text-4xl md:text-5xl text-ink">
            Who is Fynd for?
          </h2>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p, i) => (
            <motion.div
              key={p.label}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-3xl overflow-hidden group h-96 sm:h-[26rem]"
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 55%, transparent 80%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-white text-base font-semibold mb-1">
                  {p.label}
                </h3>
                <p className="text-white/70 text-sm leading-snug">{p.benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
