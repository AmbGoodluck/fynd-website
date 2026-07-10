"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export const ConversionTerminal = () => {
  return (
    <section
      id="download"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir text-paper overflow-hidden"
    >
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mono-tag text-fynd-light mb-5">Ready to explore?</p>

        <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
          Ready to Fynd your next spot?
        </h2>

        <p className="text-paper-muted text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Jump straight into the web version — no account, no install,
          just open and start discovering.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="https://app.fyndplaces.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-fynd text-white font-semibold px-8 py-4 rounded-full hover:bg-fynd-dark transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-fynd-light focus:ring-offset-2 focus:ring-offset-noir"
            aria-label="Open Fynd web app"
          >
            <Globe className="w-5 h-5" aria-hidden="true" />
            Open web app
          </a>
        </div>

        <p className="mt-6 text-paper-muted/70 text-sm">
          Works on any browser, on any device.
        </p>
      </motion.div>
    </section>
  );
};
