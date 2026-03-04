"use client";

import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  Heart,
  Globe,
  Mountain,
  Camera,
  Coffee,
  Umbrella,
  Waves,
} from "lucide-react";

// 24 icons scattered deliberately across the viewport
// x/y are percentages — fixed position keeps them ambient while scrolling
const ICONS = [
  { Icon: Plane,     x:  4,  y:  6,  size: 18, delay: 0.0,  dur: 14 },
  { Icon: MapPin,    x: 91,  y: 10,  size: 14, delay: 1.2,  dur: 16 },
  { Icon: Compass,   x: 15,  y: 32,  size: 22, delay: 0.5,  dur: 12 },
  { Icon: Calendar,  x: 82,  y: 38,  size: 16, delay: 2.0,  dur: 15 },
  { Icon: Sparkles,  x: 48,  y: 14,  size: 12, delay: 0.3,  dur: 11 },
  { Icon: Globe,     x: 94,  y: 62,  size: 20, delay: 1.7,  dur: 17 },
  { Icon: Camera,    x:  6,  y: 58,  size: 16, delay: 0.9,  dur: 13 },
  { Icon: Mountain,  x: 33,  y: 72,  size: 22, delay: 2.5,  dur: 14 },
  { Icon: Heart,     x: 68,  y: 80,  size: 14, delay: 0.6,  dur: 12 },
  { Icon: Coffee,    x: 56,  y: 26,  size: 14, delay: 1.9,  dur: 16 },
  { Icon: Waves,     x: 20,  y: 88,  size: 18, delay: 2.2,  dur: 13 },
  { Icon: Plane,     x: 76,  y: 20,  size: 12, delay: 3.1,  dur: 18 },
  { Icon: Umbrella,  x: 50,  y: 92,  size: 16, delay: 0.8,  dur: 14 },
  { Icon: MapPin,    x: 10,  y: 76,  size: 14, delay: 1.4,  dur: 12 },
  { Icon: Sparkles,  x: 87,  y: 52,  size: 12, delay: 2.9,  dur: 15 },
  { Icon: Compass,   x: 28,  y: 46,  size: 16, delay: 1.0,  dur: 13 },
  { Icon: Globe,     x: 65,  y: 63,  size: 18, delay: 0.4,  dur: 16 },
  { Icon: Mountain,  x: 42,  y: 54,  size: 14, delay: 3.3,  dur: 14 },
  { Icon: Calendar,  x: 96,  y: 84,  size: 20, delay: 2.0,  dur: 12 },
  { Icon: Camera,    x: 60,  y: 43,  size: 12, delay: 2.7,  dur: 17 },
  { Icon: Plane,     x: 23,  y: 18,  size: 14, delay: 0.7,  dur: 15 },
  { Icon: Coffee,    x: 79,  y: 76,  size: 16, delay: 1.5,  dur: 13 },
  { Icon: Waves,     x:  2,  y: 42,  size: 12, delay: 2.4,  dur: 16 },
  { Icon: Heart,     x: 71,  y: 96,  size: 14, delay: 3.6,  dur: 14 },
];

export const GlobalFloatingIcons = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* V1 is live — floats around the screen like the other icons */}
      <motion.div
        className="absolute"
        style={{ left: "38%", top: "6%" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.21, 0.18, 0.20, 0.19],
          y: [0, -14, 8, -10, 0],
          x: [0, 8, -6, 4, 0],
          scale: [0.6, 1, 1, 1, 1],
        }}
        transition={{
          opacity: { delay: 1.0, duration: 2, times: [0, 0.2, 0.5, 0.8, 1] },
          scale:   { delay: 1.0, duration: 1.5, ease: "easeOut" },
          y: { delay: 2.5, duration: 13, repeat: Infinity, ease: "easeInOut" },
          x: { delay: 2.5, duration: 15.6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold tracking-wide whitespace-nowrap">
          <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 inline-block" />
          V1 is live
        </span>
      </motion.div>
      {ICONS.map(({ Icon, x, y, size, delay, dur }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.21, 0.18, 0.20, 0.19],
            y: [0, -14, 8, -10, 0],
            x: [0, 8, -6, 4, 0],
            rotate: [0, 6, -4, 2, 0],
            scale: [0.6, 1, 1, 1, 1],
          }}
          transition={{
            opacity: { delay, duration: 2, times: [0, 0.2, 0.5, 0.8, 1] },
            scale:   { delay, duration: 1.5, ease: "easeOut" },
            y: {
              delay: delay + 1.5,
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              delay: delay + 1.5,
              duration: dur * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              delay: delay + 1.5,
              duration: dur * 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Icon
            size={size}
            strokeWidth={1.5}
            className="text-emerald-600"
            style={{ opacity: 1 }}
          />
        </motion.div>
      ))}
    </div>
  );
};
