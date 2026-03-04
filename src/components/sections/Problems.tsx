"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  Clock,
  TrendingUp,
} from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Decision Fatigue",
    description: "Too many choices paralyze you. Where do you even start?",
  },
  {
    icon: Search,
    title: "Search Overload",
    description: "Endless scrolling across multiple sites wastes your time.",
  },
  {
    icon: Clock,
    title: "Planning Paralysis",
    description:
      "Building itineraries from scratch feels overwhelming and tedious.",
  },
  {
    icon: TrendingUp,
    title: "Generic Results",
    description: "Algorithms show you what's popular, not what interests you.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const Problems = () => {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Problems We Solve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Travel planning shouldn't be a chore. Let's fix what's broken.
          </p>
        </div>

        {/* Problems Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="w-10 h-10 text-fynd mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
