"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MapPin, Star } from "lucide-react";

export function FyndPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
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
