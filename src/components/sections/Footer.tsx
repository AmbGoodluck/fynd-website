"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

// Inline SVG social icons (no extra dependencies needed)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.16 8.16 0 004.77 1.52V7.07a4.85 4.85 0 01-1-.38z" />
  </svg>
);

// TODO: replace # with real social profile URLs
const socialLinks = [
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4" aria-label="Fynd home">
              <Image
                src="/fynd-logo.svg.png"
                alt="Fynd"
                width={120}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI-powered travel discovery for curious explorers and locals.
              Find your next great spot — free, on any device.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li>
                <Link href="/features" className="hover:text-green-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-green-400 transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-green-400 transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a
                  href="https://app.fyndplaces.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Web app
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter row */}
        <div className="border-t border-gray-800 pt-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-semibold text-sm mb-1">Join curious explorers</p>
              <p className="text-gray-400 text-sm">
                Trip inspiration, hidden gems, and Fynd updates — straight to your inbox.
              </p>
            </div>
            {/* TODO: wire up to email subscription service (e.g. Mailchimp, Resend) */}
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-60 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="p-2.5 bg-green-600 hover:bg-green-500 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Subscribe"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
          <p>&copy; 2026 Fynd. All rights reserved.</p>
          <p>Built for the curious. Made for exploration.</p>
        </div>
      </div>
    </footer>
  );
};
