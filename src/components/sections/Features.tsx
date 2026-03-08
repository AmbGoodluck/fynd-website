"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, SlidersHorizontal, Smartphone } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Personalized discovery",
    description:
      "Recommendations shaped by your interests, past behavior, and current location — not just what's trending.",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Globe,
    title: "Local or on the road",
    description:
      "Whether you're exploring your own city or landing somewhere new, Fynd has you covered.",
    accent: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: SlidersHorizontal,
    title: "Smart filters",
    description:
      "Refine by mood, time of day, distance, budget, and type of activity to zero in on exactly what you want.",
    accent: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Cross-device",
    description:
      "Start on the web, pick up on your phone. Fynd works seamlessly across all your devices.",
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
            Built for real exploration
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to explore
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Fynd is built for travelers, locals, and everyone curious about
            what&apos;s around them.
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
