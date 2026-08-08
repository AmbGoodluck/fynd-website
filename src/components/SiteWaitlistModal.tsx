"use client";

import { useEffect, useState } from "react";
import { TesterSignupModal } from "@/components/TesterSignupModal";

const STORAGE_KEY = "fynd-waitlist-modal-seen";

export const SiteWaitlistModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenModal = window.localStorage.getItem(STORAGE_KEY);
    if (hasSeenModal) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      window.localStorage.setItem(STORAGE_KEY, "true");
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return <TesterSignupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};
