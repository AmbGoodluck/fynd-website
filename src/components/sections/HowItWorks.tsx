"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

const chapters = [
  {
    tag: "01 — Discover",
    title: "Tell it what you're craving",
    description:
      "A mood, a budget, a distance. That's all it takes for Fynd to start looking.",
    image: "/photos/istanbul-kebab-night.jpg",
    alt: "A neon-lit street food spot at night",
  },
  {
    tag: "02 — Personalize",
    title: "See your city differently",
    description:
      "Every suggestion is shaped by what you actually like — not what's trending.",
    image: "/photos/egyptian-museum-hall.jpg",
    alt: "A grand museum hall filled with ancient artifacts",
  },
  {
    tag: "03 — Explore",
    title: "Save it, share it, go",
    description:
      "Build a list, send it to a friend, get directions. Then go find out for yourself.",
    image: "/photos/paris-terrace-day.jpg",
    alt: "A lively restaurant terrace full of people",
  },
];

export const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-canvas overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-xl mb-20 sm:mb-28">
          <p className="text-sm font-semibold text-fynd uppercase tracking-widest mb-3">
            Simple by design
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
            Life gets more interesting when you know where to go.
          </h2>
        </div>

        {/* Alternating editorial chapters */}
        <div className="flex flex-col gap-24 sm:gap-32 mb-24 sm:mb-32">
          {chapters.map((chapter, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={chapter.tag}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-hairline">
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="text-sm font-semibold text-fynd uppercase tracking-widest mb-3">
                    {chapter.tag}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-ink mb-3">
                    {chapter.title}
                  </h3>
                  <p className="text-ink-muted text-lg leading-relaxed max-w-sm">
                    {chapter.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Demo video */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-hairline bg-black w-full max-w-3xl">
            {/* TODO: replace with final product demo video */}
            <video
              ref={videoRef}
              src="/Video_Generation_Request_Fulfilled.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              style={{ maxHeight: "65vh" }}
            />
            <button
              onClick={toggleSound}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <>
                  <VolumeX size={15} />
                  <span>Sound off</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} />
                  <span>Sound on</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
