"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/fynd-logo.svg.png" 
              alt="Fynd"
              width={168}
              height={70}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="sm"
            aria-label="Try Fynd free"
            onClick={() => {
              const heroSection = document.getElementById("hero");
              heroSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Try Free
          </Button>
        </div>
      </div>
    </nav>
  );
};
