"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plane } from "lucide-react";

export function FyndPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show again if already dismissed this session
    const already = sessionStorage.getItem("fynd-popup-dismissed");
    if (already) return;

    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("fynd-popup-dismissed", "1");
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible && !dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          dismissed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`fixed z-50 bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full transition-all duration-300 ${
          dismissed
            ? "opacity-0 translate-y-8 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Discover Fynd"
      >
        <div className="bg-white md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">
          {/* Green hero strip */}
          <div className="bg-gradient-to-br from-fynd to-fynd-dark px-6 pt-5 pb-6 relative">
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Logo — centered, floating on green strip */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
                <Image
                  src="/fynd-logo.svg.png"
                  alt="Fynd logo"
                  width={360}
                  height={150}
                  className="h-[120px] w-auto object-contain"
                />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-white text-xl font-bold leading-tight mb-1 text-center">
              Find Your Next Trip in 2 Minutes.
            </h2>
            <p className="text-white/80 text-xs leading-relaxed text-center">
              AI travel planning. No login, no fees — instant personalised itineraries.
            </p>
          </div>

          {/* CTA area */}
          <div className="px-5 py-4 space-y-2">
            <Link
              href="/#hero"
              onClick={dismiss}
              className="flex items-center justify-center gap-2 w-full bg-fynd hover:bg-fynd-dark text-white font-semibold text-sm py-3 rounded-2xl transition-colors shadow-md shadow-green-200"
            >
              <Plane size={15} />
              Try Fynd Free — No Sign Up
            </Link>

            <div className="flex gap-2">
              <a
                href="#"
                onClick={dismiss}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 hover:border-fynd text-gray-700 hover:text-fynd text-xs font-medium py-2.5 rounded-xl transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
              <a
                href="#"
                onClick={dismiss}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 hover:border-fynd text-gray-700 hover:text-fynd text-xs font-medium py-2.5 rounded-xl transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.5-7.21-2.64-2.64L3.18 23.76zM.54 1.18C.2 1.53 0 2.07 0 2.77v18.46c0 .7.2 1.24.55 1.59l.08.08 10.34-10.34v-.24L.62 1.1l-.08.08zM20.2 10.37l-2.85-1.64-2.96 2.96 2.96 2.96 2.86-1.65c.82-.47.82-1.24-.01-1.63zM4.17.24l12.5 7.21-2.64 2.64L3.18.24C3.53.07 3.87.07 4.17.24z"/>
                </svg>
                Google Play
              </a>
            </div>

            <button
              onClick={dismiss}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition py-0.5"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
