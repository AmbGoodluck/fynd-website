"use client";

import { motion } from "framer-motion";
import { Sunrise, Plane, Laptop, Users } from "lucide-react";

// Use cases / personas — who Fynd is built for
const personas = [
  {
    icon: Sunrise,
    label: "Weekend explorers",
    benefit:
      "Fill your days off with places that actually feel worth going — from sunrise hikes to late-night eats.",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    icon: Plane,
    label: "Travelers & city-hoppers",
    benefit:
      "Land anywhere and know immediately where locals actually go — not just the obvious tourist spots.",
    bg: "bg-sky-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    icon: Laptop,
    label: "Remote workers & nomads",
    benefit:
      "Find work-friendly cafes, quiet corners, and creative spots wherever you set up next.",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
  },
  {
    icon: Users,
    label: "Friends planning together",
    benefit:
      "Share lists, find spots everyone actually likes, and plan the night without the group chat chaos.",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export const Problems = () => {
  return (
    <section
      id="who-its-for"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Built for explorers like you
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Whoever you are, wherever you go.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From your daily neighborhood to your next destination — Fynd adapts
            to where you are and what you&apos;re after.
          </p>
        </div>

        {/* Persona cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`${p.bg} rounded-2xl p-7 hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-5 h-5 ${p.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {p.label}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.benefit}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
