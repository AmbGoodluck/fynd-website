"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Made for your taste",
    description: "Not what's trending. What's you.",
    image: "/photos/cafe-friends-nyc.jpg",
    alt: "Friends catching up at a corner café",
    span: "lg:col-span-2",
  },
  {
    title: "Home, or a world away",
    description: "New city or your own — Fynd already knows the block.",
    image: "/photos/friends-bar-laughing.jpg",
    alt: "Friends sharing drinks at a bar",
    span: "",
  },
  {
    title: "Tuned to the smallest detail",
    description: "Mood, budget, distance — dial it in.",
    image: "/photos/vatican-gallery-maps.jpg",
    alt: "An ornately detailed gallery ceiling",
    span: "",
  },
  {
    title: "Wherever you are",
    description: "Start on the web. Finish on your phone.",
    image: "/photos/park-bench-solo.jpg",
    alt: "Someone checking their phone on a park bench",
    span: "lg:col-span-2",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Features = () => {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-fynd uppercase tracking-widest mb-3">
            Built for real exploration
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ink">
            Everything points toward going somewhere.
          </h2>
        </div>

        {/* Photo bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className={`relative rounded-3xl overflow-hidden group h-72 sm:h-80 ${feature.span}`}
            >
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
