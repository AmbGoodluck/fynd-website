"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TesterSignupModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage-modal" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMsg("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                /* ── Success state ── */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#f97316]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-500 mb-6">
                    We&apos;ll email you when Fynd is ready to download.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-xl transition"
                  >
                    Sounds good!
                  </button>
                </div>
              ) : (
                /* ── Form state ── */
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#f97316] uppercase tracking-widest mb-2">
                      Early access
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      Be first to download Fynd
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      Join the waitlist and we&apos;ll let you know as soon as the app is ready.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition text-sm"
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <p className="text-red-500 text-sm">{errorMsg}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!email || status === "loading"}
                      className="w-full py-3.5 bg-[#f97316] hover:bg-[#ea580c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm inline-flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? "Joining..." : "Join the waitlist"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
