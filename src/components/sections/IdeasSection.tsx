"use client";

import { motion } from "framer-motion";
import { Pencil, Clock } from "lucide-react";

// Category labels for the stacked "coming soon" cards
// Replace with real guide data + links once content is published
const upcomingTopics = [
  { tag: "Remote work", color: "bg-amber-100 text-amber-700", border: "border-amber-100" },
  { tag: "Day trips", color: "bg-green-100 text-green-700", border: "border-green-100" },
  { tag: "Rainy day", color: "bg-blue-100 text-blue-700", border: "border-blue-100" },
  { tag: "Weekends", color: "bg-orange-100 text-orange-700", border: "border-orange-100" },
  { tag: "Food & drink", color: "bg-red-100 text-red-700", border: "border-red-100" },
  { tag: "Nightlife", color: "bg-violet-100 text-violet-700", border: "border-violet-100" },
];

// ── Single stacked card slot ────────────────────────────────────────────────
interface GuideStackProps {
  tag: string;
  tagClass: string;
  borderClass: string;
  delay: number;
}

const GuideStack = ({ tag, tagClass, borderClass, delay }: GuideStackProps) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.55, delay }}
  >
    {/* Ghost card 2 — back */}
    <div
      className={`absolute inset-0 bg-white border ${borderClass} rounded-2xl opacity-40`}
      style={{ transform: "rotate(-3deg) translateY(6px)", zIndex: 0 }}
      aria-hidden="true"
    />
    {/* Ghost card 1 */}
    <div
      className={`absolute inset-0 bg-white border ${borderClass} rounded-2xl opacity-70`}
      style={{ transform: "rotate(-1.5deg) translateY(3px)", zIndex: 1 }}
      aria-hidden="true"
    />

    {/* Front card */}
    <div
      className={`relative bg-white border ${borderClass} rounded-2xl p-7 shadow-sm`}
      style={{ zIndex: 2 }}
    >
      {/* Tag */}
      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${tagClass}`}>
        {tag}
      </span>

      {/* Skeleton title lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3.5 bg-gray-100 rounded-full w-4/5" />
        <div className="h-3.5 bg-gray-100 rounded-full w-3/5" />
      </div>

      {/* Skeleton body lines */}
      <div className="space-y-2 mb-6">
        <div className="h-2.5 bg-gray-50 rounded-full w-full" />
        <div className="h-2.5 bg-gray-50 rounded-full w-5/6" />
        <div className="h-2.5 bg-gray-50 rounded-full w-2/3" />
      </div>

      {/* Coming soon indicator */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        Guide coming soon
      </div>
    </div>
  </motion.div>
);

export const IdeasSection = () => {
  return (
    <section
      id="ideas"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Inspiration
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ideas for your next adventure
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            We&apos;re writing guides for every kind of explorer. They&apos;ll
            live here — stay tuned.
          </p>
        </div>

        {/* Stacked guide card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {upcomingTopics.map((t, i) => (
            <GuideStack
              key={i}
              tag={t.tag}
              tagClass={t.color}
              borderClass={t.border}
              delay={i * 0.07}
            />
          ))}
        </div>

        {/* Contribute nudge */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Pencil className="w-5 h-5 text-green-600" aria-hidden="true" />
          </div>
          <p className="text-gray-500 text-sm max-w-md">
            Know a great spot or have a guide idea?{" "}
            <a
              href="mailto:hello@fyndplaces.com"
              className="text-green-600 font-medium hover:underline"
            >
              Tell us about it
            </a>{" "}
            — we&apos;d love to feature it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
