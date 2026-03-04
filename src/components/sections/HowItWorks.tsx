"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Vibe",
    description: "Tell us what you're looking for: adventure, relaxation, culture, food, or a mix.",
  },
  {
    number: "02",
    title: "AI Processes",
    description:
      "Our AI analyzes millions of local data points to find your perfect match in seconds.",
  },
  {
    number: "03",
    title: "Instant Itinerary",
    description:
      "Get an instant Itinerary with custom locations starting from your current location or preferred place.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to your dream vacation.
          </p>
        </div>

        {/* Steps Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Step Number */}
              <div className="text-6xl font-bold text-fynd/10 mb-4">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative -mt-8 pt-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-6 w-12 h-1 bg-fynd/20" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
