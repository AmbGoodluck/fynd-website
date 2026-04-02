"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const DownloadCTA = () => {
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <section
      id="download"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #16a34a 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        {/* Overline — emphasises the free, no-friction entry */}
        <p className="text-green-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Start free — no account needed.
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Your next great spot is waiting.
        </h2>

        {/* Sub copy */}
        <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Get the app or open the web version — start discovering your next
          favorite place in under a minute.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* "Get the app" opens the download picker */}
          <button
            onClick={() => setDownloadOpen(true)}
            className="inline-flex items-center gap-2.5 bg-white text-gray-900 font-semibold px-7 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Download the Fynd app"
          >
            <Smartphone className="w-5 h-5 text-green-600" aria-hidden="true" />
            Get the app
          </button>

          {/* Opens web app directly */}
          {/* TODO: replace href with final web-app URL */}
          <a
            href="https://app.fyndplaces.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-transparent text-white font-semibold px-7 py-4 rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open Fynd web app"
          >
            <Globe className="w-5 h-5" aria-hidden="true" />
            Open web app
          </a>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-green-200/60 text-sm">
          Android app available now &middot; iOS coming soon &middot; Works in any browser
        </p>
      </motion.div>

      {/* Download picker modal */}
      {downloadOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setDownloadOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
              onClick={() => setDownloadOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-1 text-center text-gray-900">
              Get Fynd
            </h2>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Choose your platform and start exploring in seconds.
            </p>
            <div className="flex flex-col gap-3">
              {/* TODO: replace with App Store link when available */}
              <a
                href="https://androidv1.fyndplaces.com/app-release.apk"
                download
                className="w-full"
              >
                <Button variant="primary" size="md" className="w-full">
                  Android (APK)
                </Button>
              </a>
              {/* TODO: replace with Google Play / App Store links */}
              <a href="/downloads/fynd-ios-v1.ipa" download className="w-full">
                <Button variant="secondary" size="md" className="w-full">
                  iOS (coming soon)
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
