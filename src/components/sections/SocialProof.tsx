"use client";

import { motion } from "framer-motion";
import { Star, MessageSquarePlus, TrendingUp } from "lucide-react";

// ── Card Stack component ────────────────────────────────────────────────────
// Renders N ghost cards fanned behind a visible front card to convey "content
// is building up". Replace the front card content once real data arrives.
const CardStack = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Back card 2 — furthest */}
    <div
      className="absolute inset-0 bg-slate-100 border border-slate-200 rounded-2xl"
      style={{ transform: "rotate(-4deg) translateY(6px)", zIndex: 0 }}
      aria-hidden="true"
    />
    {/* Back card 1 */}
    <div
      className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-2xl"
      style={{ transform: "rotate(-2deg) translateY(3px)", zIndex: 1 }}
      aria-hidden="true"
    />
    {/* Front card — visible content */}
    <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm" style={{ zIndex: 2 }}>
      {children}
    </div>
  </div>
);

// ── Metric placeholder ──────────────────────────────────────────────────────
const MetricStack = ({ label, icon: Icon }: { label: string; icon: React.ElementType }) => (
  <div className="relative">
    <div
      className="absolute inset-0 bg-slate-100 rounded-2xl border border-slate-200"
      style={{ transform: "rotate(-2deg) translateY(4px)" }}
      aria-hidden="true"
    />
    <div className="relative bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-green-600" aria-hidden="true" />
      </div>
      <p className="text-2xl font-black text-gray-300 mb-1 tracking-tight">——</p>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  </div>
);

export const SocialProof = () => {
  return (
    <section
      id="social-proof"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
            Community
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Growing every day
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Fynd is brand new — be among the first to explore and help shape
            what comes next.
          </p>
        </div>

        {/* Metric stacks */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Replace label text and Icon once real analytics are wired up */}
          <MetricStack label="Places discovered" icon={TrendingUp} />
          <MetricStack label="Cities explored" icon={TrendingUp} />
          <MetricStack label="Recommendations made" icon={TrendingUp} />
        </motion.div>

        {/* Testimonial stacks */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Slot 1 — invite first review */}
          <CardStack>
            <div className="flex gap-0.5 mb-4" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gray-200" />
              ))}
            </div>
            <p className="text-sm text-gray-400 italic leading-relaxed mb-6">
              Your review could be here. Be the first explorer to share your
              Fynd experience.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageSquarePlus className="w-4 h-4 text-gray-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">You?</p>
                <p className="text-xs text-gray-300">Early explorer</p>
              </div>
            </div>
          </CardStack>

          {/* Slot 2 */}
          <CardStack>
            <div className="flex gap-0.5 mb-4" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gray-200" />
              ))}
            </div>
            <p className="text-sm text-gray-400 italic leading-relaxed mb-6">
              Reviews from the community will appear here as people start
              discovering with Fynd.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageSquarePlus className="w-4 h-4 text-gray-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Coming soon</p>
                <p className="text-xs text-gray-300">From real users</p>
              </div>
            </div>
          </CardStack>

          {/* Slot 3 */}
          <CardStack>
            <div className="flex gap-0.5 mb-4" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gray-200" />
              ))}
            </div>
            <p className="text-sm text-gray-400 italic leading-relaxed mb-6">
              The more people explore, the smarter Fynd gets. Help us build
              something great.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageSquarePlus className="w-4 h-4 text-gray-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Growing</p>
                <p className="text-xs text-gray-300">With every explore</p>
              </div>
            </div>
          </CardStack>
        </motion.div>

        {/* Bottom nudge */}
        <motion.p
          className="text-center text-sm text-gray-400 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Try Fynd and{" "}
          <a
            href="mailto:hello@fyndplaces.com"
            className="text-green-600 hover:underline font-medium"
          >
            share your thoughts
          </a>{" "}
          — we read every message.
        </motion.p>
      </div>
    </section>
  );
};
