"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "Sabri Usta, after dark",
    description:
      "Neon signs, sizzling grills, and a line that moves fast because it's worth it.",
    tags: ["#LateNightEats", "#NeonLit"],
    image: "/photos/istanbul-kebab-night.jpg",
    alt: "A neon-lit street food spot at night",
    offset: false,
  },
  {
    title: "A hall built to wander",
    description:
      "Grand halls and quiet corners, minutes from wherever you already are.",
    tags: ["#QuietWander", "#Culture"],
    image: "/photos/egyptian-museum-hall.jpg",
    alt: "A grand museum hall filled with ancient artifacts",
    offset: true,
  },
  {
    title: "Terrace, golden hour",
    description: "A table outside, good light, nowhere to be.",
    tags: ["#GoldenHour", "#Terrace"],
    image: "/photos/paris-terrace-day.jpg",
    alt: "A lively restaurant terrace full of people",
    offset: false,
  },
  {
    title: "Corner café, regulars only",
    description:
      "The kind of place that remembers your order by the second visit.",
    tags: ["#CornerCafe", "#Regulars"],
    image: "/photos/cafe-friends-nyc.jpg",
    alt: "Friends catching up at a corner café",
    offset: true,
  },
  {
    title: "Bar talk, no rush",
    description: "Drinks, easy conversation, and a night that wasn't overplanned.",
    tags: ["#EasyNights", "#GoodCompany"],
    image: "/photos/friends-bar-laughing.jpg",
    alt: "Friends sharing drinks at a bar",
    offset: false,
  },
  {
    title: "A bench, a moment",
    description:
      "Sometimes the best find is five minutes of quiet in the middle of it all.",
    tags: ["#SoloTime", "#CityQuiet"],
    image: "/photos/park-bench-solo.jpg",
    alt: "Someone checking their phone on a park bench",
    offset: true,
  },
];

export const KineticProofDeck = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <p className="mono-tag text-ink-muted mb-4">Humanity-first discovery</p>
          <h2 className="text-4xl md:text-5xl text-ink leading-tight">
            Experience, not logistics.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              className={`group ${card.offset ? "md:translate-y-6" : ""}`}
            >
              <div className="relative w-full h-64 rounded-3xl overflow-hidden ring-1 ring-hairline mb-5 bg-surface-raised">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover grayscale-[15%] contrast-105 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <h3 className="text-xl text-ink mb-2">{card.title}</h3>
              <p className="text-sm text-ink-muted mb-3 leading-relaxed">
                {card.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono-tag bg-ink/[0.04] text-ink-muted px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
