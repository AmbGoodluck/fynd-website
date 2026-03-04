"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const mockResult = {
  destination: "A Hidden Gem in Tuscany",
  region: "Val d'Orcia",
  startingPoint: "Florence",
  highlights: [
    "Sunrise hike in the Crete Senesi",
    "Wine tasting at a nearby vineyard",
    "Sunset dinner at a local trattoria",
  ],
};

export const ProductPreview = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `✨ Destination: ${mockResult.destination}\n📍 Starting from: ${mockResult.startingPoint}\n📍 Region: ${mockResult.region}\n\nInstant Itinerary:\n- Morning: Sunrise hike in the Crete Senesi\n- Afternoon: Wine tasting at a nearby vineyard\n- Evening: Sunset dinner at a local trattoria`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-lg text-gray-600">
            Your AI travel concierge, live.
          </p>
        </div>

        {/* Browser Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          {/* Browser Header */}
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 ml-4">
              <div className="text-xs font-medium text-gray-600">
                fynd.ai/discover
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-12 min-h-96 bg-gradient-to-br from-white to-slate-50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-fynd">
                Your AI Concierge
              </h3>
              <div className="text-gray-700 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {displayedText}
                {displayedText.length < fullText.length && (
                  <span className="inline-block animate-pulse ml-1">▋</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
