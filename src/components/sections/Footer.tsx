"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold text-fynd mb-4">Fynd</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover your next trip in 2 minutes with AI-powered travel
              suggestions.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-fynd transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fynd transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fynd transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-fynd transition">
                  About
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-fynd transition">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-fynd transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-fynd transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-fynd transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fynd transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Newsletter */}
          <div className="mb-8 max-w-md">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-fynd"
                aria-label="Email for updates"
              />
              <button
                className="p-2 bg-fynd rounded-lg hover:bg-fynd-dark transition"
                aria-label="Subscribe"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm pt-6 border-t border-gray-800">
            <p>&copy; 2025 Fynd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-fynd transition">
                Twitter
              </a>
              <a href="#" className="hover:text-fynd transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-fynd transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
