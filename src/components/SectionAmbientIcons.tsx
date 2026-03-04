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
import type { LucideIcon } from "lucide-react";

// Positions hug the edges so they never sit behind readable text
const POSITIONS = [
  { x: 1,  y: 8  },
  { x: 91, y: 6  },
  { x: 0,  y: 48 },
  { x: 93, y: 52 },
  { x: 3,  y: 82 },
  { x: 89, y: 78 },
];

const VARIANTS: Record<string, { Icon: LucideIcon; size: number; delay: number; dur: number }[]> = {
  problems: [
    { Icon: Compass,   size: 32, delay: 0.0, dur: 13 },
    { Icon: Plane,     size: 26, delay: 0.6, dur: 15 },
    { Icon: Heart,     size: 22, delay: 1.1, dur: 11 },
    { Icon: Mountain,  size: 28, delay: 0.3, dur: 14 },
    { Icon: MapPin,    size: 24, delay: 1.4, dur: 12 },
    { Icon: Sparkles,  size: 20, delay: 0.8, dur: 16 },
  ],
  howitworks: [
    { Icon: Globe,     size: 30, delay: 0.2, dur: 14 },
    { Icon: Sparkles,  size: 24, delay: 0.7, dur: 12 },
    { Icon: Camera,    size: 28, delay: 0.0, dur: 15 },
    { Icon: MapPin,    size: 22, delay: 1.2, dur: 13 },
    { Icon: Compass,   size: 26, delay: 0.5, dur: 16 },
    { Icon: Plane,     size: 20, delay: 1.6, dur: 11 },
  ],
  productpreview: [
    { Icon: Waves,     size: 28, delay: 0.3, dur: 13 },
    { Icon: Coffee,    size: 22, delay: 0.9, dur: 15 },
    { Icon: Umbrella,  size: 26, delay: 0.1, dur: 14 },
    { Icon: Calendar,  size: 24, delay: 1.3, dur: 12 },
    { Icon: Globe,     size: 20, delay: 0.6, dur: 16 },
    { Icon: Heart,     size: 28, delay: 1.7, dur: 11 },
  ],
  features: [
    { Icon: Mountain,  size: 30, delay: 0.4, dur: 14 },
    { Icon: Plane,     size: 24, delay: 0.0, dur: 12 },
    { Icon: Sparkles,  size: 26, delay: 1.0, dur: 15 },
    { Icon: Compass,   size: 22, delay: 0.7, dur: 13 },
    { Icon: Waves,     size: 28, delay: 1.5, dur: 16 },
    { Icon: Camera,    size: 20, delay: 0.3, dur: 11 },
  ],
};

interface Props {
  variant: keyof typeof VARIANTS;
}

export const SectionAmbientIcons = ({ variant }: Props) => {
  const icons = VARIANTS[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {icons.map(({ Icon, size, delay, dur }, i) => {
        const pos = POSITIONS[i];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{
              opacity: [0, 0.23, 0.19, 0.22, 0.20],
              scale: 1,
            }}
            viewport={{ once: false, amount: 0 }}
            animate={{
              y: [0, -(12 + i * 2), 8, -10, 0],
              x: [0, 6, -5, 3, 0],
              rotate: [0, 5, -3, 2, 0],
            }}
            transition={{
              opacity:  { delay, duration: 1.8, times: [0, 0.2, 0.5, 0.8, 1] },
              scale:    { delay, duration: 1.2, ease: "easeOut" },
              y:        { delay: delay + 1.2, duration: dur, repeat: Infinity, ease: "easeInOut" },
              x:        { delay: delay + 1.2, duration: dur * 1.3, repeat: Infinity, ease: "easeInOut" },
              rotate:   { delay: delay + 1.2, duration: dur * 0.85, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon
              size={size}
              strokeWidth={1.3}
              className="text-emerald-500"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
