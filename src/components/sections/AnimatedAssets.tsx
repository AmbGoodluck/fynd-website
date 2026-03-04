"use client";

import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  Globe,
} from "lucide-react";

// Hero-specific prominent icons (larger, higher opacity than global ambient ones)
const HERO_ICONS = [
  { Icon: Plane,    delay: 0.0, size: 52, x: 8,  y: 18 },
  { Icon: MapPin,   delay: 0.3, size: 44, x: 85, y: 14 },
  { Icon: Compass,  delay: 0.6, size: 48, x: 78, y: 68 },
  { Icon: Calendar, delay: 0.9, size: 40, x: 12, y: 70 },
  { Icon: Sparkles, delay: 1.2, size: 36, x: 48, y: 82 },
  { Icon: Globe,    delay: 1.5, size: 44, x: 92, y: 40 },
];

export const AnimatedAssets = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Clean white background — matches the rest of the page */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle green dot-grid for texture without color */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #22c55e 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Hero-specific floating icons — more prominent than global ambient */}
      {HERO_ICONS.map(({ Icon, delay, size, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.28, 0.23, 0.26, 0.25],
            y: [0, -24, 12, -16, 0],
            x: [0, 14, -10, 6, 0],
            rotate: [0, 8, -5, 3, 0],
            scale: [0.5, 1, 1, 1, 1],
          }}
          transition={{
            opacity: { delay, duration: 2, times: [0, 0.2, 0.5, 0.8, 1] },
            scale:   { delay, duration: 1.4, ease: "easeOut" },
            y:      { delay: delay + 1.4, duration: 9 + i, repeat: Infinity, ease: "easeInOut" },
            x:      { delay: delay + 1.4, duration: 11 + i * 0.8, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: delay + 1.4, duration: 8 + i * 0.6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon
            size={size}
            strokeWidth={1.2}
            className="text-emerald-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.2)]"
          />
        </motion.div>
      ))}


    </div>
  );
};
