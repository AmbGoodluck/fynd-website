"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Features", href: "/features" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.svg"
              alt="Fynd"
              width={40}
              height={40}
              className="h-8 sm:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" aria-label="Open web app">
                Open web app
              </Button>
            </a>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" aria-label="Open web app">
                Open web app
              </Button>
            </a>
            <button
              aria-label="Toggle menu"
              className="text-ink p-1"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-hairline px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
