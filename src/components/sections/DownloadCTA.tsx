"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe } from "lucide-react";

export const DownloadCTA = () => {
  return (
    <section
      id="download"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cinematic photo backdrop with brand-orange wash */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/photos/rooftop-friends.jpg"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(154,52,18,0.92) 0%, rgba(194,65,12,0.88) 50%, rgba(234,88,12,0.85) 100%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        {/* Overline */}
        <p className="text-orange-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Ready to explore?
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Ready to Fynd your next spot?
        </h2>

        {/* Sub copy */}
        <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Jump straight into the web version — no account, no install,
          just open and start discovering.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center">
          {/* Opens web app directly */}
          {/* TODO: replace href with final web-app URL */}
          <a
            href="https://app.fyndplaces.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-gray-900 font-semibold px-7 py-4 rounded-full hover:bg-orange-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open Fynd web app"
          >
            <Globe className="w-5 h-5 text-orange-600" aria-hidden="true" />
            Open web app
          </a>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-orange-200/60 text-sm">
          Works on any browser, on any device.
        </p>
      </motion.div>
    </section>
  );
};
