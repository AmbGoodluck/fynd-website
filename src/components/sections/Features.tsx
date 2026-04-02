"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, SlidersHorizontal, Smartphone } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI that gets your taste",
    description:
      "Every suggestion shaped by your interests, mood, and location — not trending lists or sponsored placements.",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Globe,
    title: "Home city or anywhere new",
    description:
      "Exploring your neighborhood or landing somewhere unfamiliar — Fynd adapts to where you are, every time.",
    accent: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: SlidersHorizontal,
    title: "Filter until it feels right",
    description:
      "Narrow by mood, time, distance, or budget until the list feels handpicked — because it is.",
    accent: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Start anywhere. Continue everywhere.",
    description:
      "Save on the web, navigate on mobile. Your trips and saved places follow you across every device.",
    accent: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Features = () => {
  return (
    <section
      id="features"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Designed for how you actually travel
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discovery that fits your world.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            For travelers, locals, and anyone with somewhere new to be.
          </p>
        </div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl border p-8 ${feature.accent} hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}
                >
                  <Icon
                    className={`w-6 h-6 ${feature.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
