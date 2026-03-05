"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedAssets } from "./AnimatedAssets";
import { TesterSignupModal } from "@/components/TesterSignupModal";

export const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Assets Background */}
      <AnimatedAssets />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <motion.h1
          className="hero-title text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Your Next Trip in 2 Minutes
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-fynd mb-6 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Personalized AI suggestions. No login. 100% free.
        </motion.p>

        {/* Coming soon line */}
        <motion.p
          className="text-base md:text-lg text-gray-500 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Android &amp; iOS apps coming soon — sign up to be the first to use.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            size="lg"
            variant="primary"
            aria-label="Sign up to be an early tester"
            onClick={() => setModalOpen(true)}
          >
            Sign up to be a tester
          </Button>
        </motion.div>
      </div>

      {/* Tester signup popup */}
      <TesterSignupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};
