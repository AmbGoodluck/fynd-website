"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Bell, Zap, Map } from "lucide-react";

const STORAGE_KEY = "fynd-newsletter-dismissed";
const EMAILS_KEY  = "fynd-newsletter-emails";

export function NewsletterPopup() {
  const [visible, setVisible]   = useState(false);
  const [closing, setClosing]   = useState(false);
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 7000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setClosing(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const existing: string[] = JSON.parse(localStorage.getItem(EMAILS_KEY) || "[]");
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem(EMAILS_KEY, JSON.stringify(existing));
      }
    } catch {}
    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch {}
    }
    setStatus("success");
    setTimeout(dismiss, 2800);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop — light, not dark */}
      <div
        className={`fixed inset-0 z-50 bg-white/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`fixed z-50 bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full transition-all duration-300 ${closing ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Join the Fynd newsletter"
      >
        <div className="bg-white md:rounded-3xl rounded-t-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* ── Top accent bar ── */}
          <div className="h-1 w-full bg-gradient-to-r from-fynd-light via-fynd to-fynd-dark" />

          {/* ── Header ── */}
          <div className="relative px-7 pt-6 pb-5 bg-gradient-to-br from-slate-50 to-green-50">
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Icon cluster */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <Map size={15} className="text-fynd" />
              </span>
              <span className="w-12 h-12 rounded-2xl bg-fynd flex items-center justify-center shadow-md shadow-green-200">
                <Bell size={20} className="text-white" />
              </span>
              <span className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <Zap size={15} className="text-fynd" />
              </span>
            </div>

            {/* Label */}
            <p className="text-xs font-semibold text-fynd uppercase tracking-widest text-center mb-1">
              Fynd Newsletter
            </p>
            <h2 className="text-gray-900 text-xl font-bold text-center leading-snug mb-2">
              Stay ahead of every adventure.
            </h2>
            <p className="text-gray-400 text-[12.5px] text-center leading-relaxed">
              Version updates, new AI features, travel drops and destination guides — straight to your inbox.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="mx-7 border-t border-gray-100" />

          {/* ── Perks row ── */}
          <div className="px-7 pt-4 pb-1 flex flex-wrap justify-center gap-2">
            {[
              { icon: <Sparkles size={10} />, label: "Version updates" },
              { icon: <Bell size={10} />,     label: "New features" },
              { icon: <Map size={10} />,      label: "Travel drops" },
            ].map(p => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1 text-[10.5px] font-medium text-fynd-dark bg-green-50 border border-green-100 rounded-full px-3 py-1"
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>

          {/* ── Form ── */}
          <div className="px-7 pt-4 pb-6">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <span className="text-2xl">🎉</span>
                <p className="text-gray-900 font-semibold text-sm">You&apos;re in!</p>
                <p className="text-gray-400 text-[12px] text-center">
                  We&apos;ll send you the good stuff — no spam, ever.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-fynd/30 focus:border-fynd transition placeholder-gray-300"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-3 bg-fynd hover:bg-fynd-dark active:scale-[.97] text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60 whitespace-nowrap"
                  >
                    {status === "loading" ? "..." : "Join"}
                  </button>
                </div>
                <p className="text-[10.5px] text-gray-300 text-center">
                  Free forever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
