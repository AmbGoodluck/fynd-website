"use client";

import { useState } from "react";
import { X, Download, Star, Zap } from "lucide-react";
import Link from "next/link";

interface PricingPopupProps {
  open: boolean;
  onClose: () => void;
}

export function PricingPopup({ open, onClose }: PricingPopupProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Fynd Pricing"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header band */}
          <div className="relative bg-gradient-to-br from-fynd via-fynd to-fynd-dark px-8 pt-8 pb-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Free badge */}
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/30">
                <Zap size={11} className="fill-white" />
                Pricing
              </span>
            </div>

            <h2 className="text-white text-3xl font-bold text-center leading-tight mb-2">
              Fynd is&nbsp;
              <span className="underline decoration-white/60 underline-offset-4">
                Free.
              </span>
            </h2>
            <p className="text-white/80 text-center text-sm leading-relaxed">
              Download and use Fynd as much as you want — no subscription,
              no hidden fees, no catching.
            </p>

            {/* Decorative curve */}
            <div className="absolute bottom-0 left-0 right-0 h-6">
              <div className="w-full h-6 bg-white rounded-t-[24px]" />
            </div>
          </div>

          {/* Perks */}
          <div className="px-8 pt-5 pb-2">
            <ul className="space-y-3">
              {[
                { icon: <Star size={14} className="text-fynd" />, text: "Unlimited AI travel suggestions" },
                { icon: <Download size={14} className="text-fynd" />, text: "Download & use instantly — no sign-up" },
                { icon: <Zap size={14} className="text-fynd" />, text: "Full access to all V1 features" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="px-8 pt-5 pb-7 space-y-2.5">
            <Link
              href="/#hero"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-fynd hover:bg-fynd-dark active:scale-[.98] text-white font-semibold text-sm py-3.5 rounded-2xl transition-all shadow-lg shadow-green-300/40"
            >
              <Download size={15} />
              Get Fynd — It&apos;s Free
            </Link>

            <div className="flex gap-2">
              <a
                href="#"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-950 hover:bg-gray-800 active:scale-[.98] text-white text-xs font-medium py-2.5 rounded-xl transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="#"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-950 hover:bg-gray-800 active:scale-[.98] text-white text-xs font-medium py-2.5 rounded-xl transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.5-7.21-2.64-2.64L3.18 23.76zM.54 1.18C.2 1.53 0 2.07 0 2.77v18.46c0 .7.2 1.24.55 1.59l.08.08 10.34-10.34v-.24L.62 1.1l-.08.08zM20.2 10.37l-2.85-1.64-2.96 2.96 2.96 2.96 2.86-1.65c.82-.47.82-1.24-.01-1.63zM4.17.24l12.5 7.21-2.64 2.64L3.18.24C3.53.07 3.87.07 4.17.24z" />
                </svg>
                Google Play
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full text-[11px] text-gray-400 hover:text-gray-500 transition pt-0.5"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
