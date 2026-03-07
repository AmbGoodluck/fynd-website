"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

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
          <Link href="/" className="flex items-center">
            <Image
              src="/fynd-logo.svg.png"
              alt="Fynd"
              width={168}
              height={70}
              className="h-9 sm:h-11 md:h-13 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links + CTA */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-fynd hover:text-fynd-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" aria-label="Try Fynd free">
                Try for Free
              </Button>
            </a>
            <Button
              variant="secondary"
              size="sm"
              className="ml-2"
              onClick={() => setDownloadOpen(true)}
            >
              Download Fynd v1.0
            </Button>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" aria-label="Try Fynd free">
                Try for Free
              </Button>
            </a>
            <Button
              variant="secondary"
              size="sm"
              className="ml-1"
              onClick={() => setDownloadOpen(true)}
            >
              Download
            </Button>
            <button
              aria-label="Toggle menu"
              className="text-fynd p-1"
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

      {/* Download Modal Placeholder - will implement next */}
      {downloadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDownloadOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setDownloadOpen(false)} aria-label="Close">×</button>
            <h2 className="text-xl font-bold mb-2 text-center">Download Fynd v1.0</h2>
            <p className="text-gray-600 mb-6 text-center">You are about to download Fynd v1.0. Please choose your device type.</p>
            <div className="flex flex-col gap-3">
              <a href="/downloads/fynd-android-v1.apk" download className="w-full">
                <Button variant="primary" size="md" className="w-full">Android</Button>
              </a>
              <a href="/downloads/fynd-ios-v1.ipa" download className="w-full">
                <Button variant="primary" size="md" className="w-full">iOS</Button>
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-fynd hover:text-fynd-dark transition-colors"
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
