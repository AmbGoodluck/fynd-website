"use client";

import { motion } from "framer-motion";
import {
  Lock,
  MapPin,
  Zap,
} from "lucide-react";
import { SectionAmbientIcons } from "@/components/SectionAmbientIcons";

const features = [
  {
    icon: Lock,
    title: "No-Login Privacy",
    description: "Discover amazing places without creating an account or sharing personal data.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: MapPin,
    title: "Hyper-Local Data",
    description: "Powered by real local insights, not just tourist reviews.",
    span: "col-span-1 md:col-span-1",
  },
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "Get results in seconds, not hours of research.",
    span: "col-span-1 md:col-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export const Features = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      <SectionAmbientIcons variant="features" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Fynd?
          </h2>
          <p className="text-lg text-fynd max-w-2xl mx-auto">
            Built for travelers who value speed, privacy, and authenticity.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${feature.span} bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border border-gray-200 hover:border-fynd/30 transition-colors shadow-sm hover:shadow-md`}
              >
                <Icon className="w-12 h-12 text-fynd mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
