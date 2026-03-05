"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Apple, SmartphoneIcon } from "lucide-react";
import { saveTesterSignup, DeviceType } from "@/lib/firestoreService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TesterSignupModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState<DeviceType | "">("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !device) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await saveTesterSignup(email, device as DeviceType);
      setStatus("success");
      setEmail("");
      setDevice("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-500 mb-6">
                    We&apos;ll reach out as soon as the app is ready for testers. Get hyped.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-xl transition"
                  >
                    Sounds good!
                  </button>
                </div>
              ) : (
                /* ── Form state ── */
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#22c55e] uppercase tracking-widest mb-2">
                      Early Access
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      Be first to try Fynd
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      Android &amp; iOS launching soon. Drop your email and we&apos;ll notify you the moment it&apos;s ready.
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition text-sm"
                      />
                    </div>

                    {/* Device */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which device are you using?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { value: "ios", label: "iOS", icon: <Apple className="w-4 h-4" /> },
                            { value: "android", label: "Android", icon: <Smartphone className="w-4 h-4" /> },
                            { value: "both", label: "Both", icon: <SmartphoneIcon className="w-4 h-4" /> },
                          ] as { value: DeviceType; label: string; icon: React.ReactNode }[]
                        ).map(({ value, label, icon }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setDevice(value)}
                            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 text-sm font-medium transition ${
                              device === value
                                ? "border-[#22c55e] bg-green-50 text-[#16a34a]"
                                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                            }`}
                          >
                            {icon}
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <p className="text-red-500 text-sm">{errorMsg}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!email || !device || status === "loading"}
                      className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm"
                    >
                      {status === "loading" ? "Signing up..." : "Sign me up as a tester"}
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
