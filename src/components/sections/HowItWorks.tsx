"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Bookmark, Volume2, VolumeX } from "lucide-react";

const steps = [
  {
    icon: Heart,
    number: "01",
    title: "Tell Fynd your vibe",
    description:
      "Set your interests, mood, budget, and how far you want to go. Fynd remembers what matters to you.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Get a curated map — instantly",
    description:
      "A personalized map and list of the spots you'd actually want — not just what's popular. Yours in seconds.",
  },
  {
    icon: Bookmark,
    number: "03",
    title: "Save, share, and explore",
    description:
      "Save favorites, build trip lists, share with friends, and navigate — all without switching apps.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

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
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Simple by design
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three steps to your next great spot.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Tell Fynd what you love. Get your perfect map instantly.
          </p>
        </div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="relative">
                {/* Step number watermark */}
                <div
                  className="text-7xl font-black leading-none mb-4 select-none"
                  style={{ color: "#22c55e18" }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 -mt-6">
                  <Icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>

                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 -right-8 w-16 h-0.5 bg-green-100"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Demo video */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black w-full max-w-3xl">
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
