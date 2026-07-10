"use client";

import { motion } from "framer-motion";
import { Sparkles, Smartphone, KeyRound, ShieldOff } from "lucide-react";

const boxes = [
  {
    icon: Sparkles,
    title: "Made for your taste",
    description:
      "Not what's trending. What's you. Every suggestion is shaped by what you actually like.",
    span: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Wherever you are",
    description: "Start on the web. Finish on your phone.",
    span: "",
  },
  {
    icon: KeyRound,
    title: "Free, no account",
    description: "Open it and start looking. Nothing to sign up for.",
    span: "",
  },
  {
    icon: ShieldOff,
    title: "Curated, not sponsored",
    description:
      "Places earn their spot by being worth the trip — not by paying for placement.",
    span: "md:col-span-2",
  },
];

export const TrustArchitecture = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-canvas">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="mono-tag text-ink-muted mb-4">Built to be trusted</p>
          <h2 className="text-4xl md:text-5xl text-ink">Discovery architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {boxes.map((box, i) => {
            const Icon = box.icon;
            return (
              <motion.div
                key={box.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className={`glass rounded-3xl p-8 flex flex-col justify-between min-h-[220px] hover:bg-surface-raised transition-colors ${box.span}`}
              >
                <Icon className="w-7 h-7 text-fynd mb-6" strokeWidth={1.75} />
                <div>
                  <h3 className="text-xl text-ink mb-2">{box.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {box.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
