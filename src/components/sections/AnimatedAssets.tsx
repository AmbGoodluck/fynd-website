"use client";

import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  Heart,
} from "lucide-react";

const assets = [
  { Icon: Plane, delay: 0, size: 48, color: "#22C55E" },
  { Icon: MapPin, delay: 0.2, size: 40, color: "#4ADE80" },
  { Icon: Compass, delay: 0.4, size: 44, color: "#22C55E" },
  { Icon: Calendar, delay: 0.6, size: 40, color: "#4ADE80" },
  { Icon: Sparkles, delay: 0.8, size: 48, color: "#22C55E" },
  { Icon: Heart, delay: 1, size: 40, color: "#4ADE80" },
];

const floatingVariants = {
  animate: (custom: number) => ({
    y: [0, -30, 0],
    x: [0, 20, -20, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 6 + custom * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom * 0.3,
    },
  }),
};

export const AnimatedAssets = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-fynd-light/20" />

      {/* Animated Assets */}
      <div className="absolute inset-0 flex items-center justify-center">
        {assets.map(({ Icon, delay, size, color }, index) => (
          <motion.div
            key={index}
            className="absolute"
            custom={index}
            variants={floatingVariants}
            animate="animate"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            style={{
              left: `${15 + (index % 3) * 35}%`,
              top: `${20 + Math.floor(index / 3) * 40}%`,
            }}
          >
            <Icon size={size} color={color} className="drop-shadow-lg" />
          </motion.div>
        ))}
      </div>

      {/* Floating Orbs for Depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-fynd/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse" />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
