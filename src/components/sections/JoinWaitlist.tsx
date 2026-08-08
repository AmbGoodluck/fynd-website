"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export const JoinWaitlist = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "homepage" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mono-tag text-ink-muted mb-5">Coming to iOS &amp; Android</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink mb-5">
          Fynd is on the web today. <em>The app is next.</em>
        </h2>
        <p className="text-ink-muted text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Join the waitlist and we&apos;ll email you the moment Fynd launches on your phone.
        </p>

        {status === "success" ? (
          <div className="glass inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-ink font-semibold">
            <Check className="w-5 h-5 text-fynd" />
            You&apos;re on the list - we&apos;ll be in touch.
          </div>
        ) : (
          <form onSubmit={submit} className="max-w-md mx-auto">
            <div className="glass rounded-full pl-6 pr-2 py-2 flex items-center gap-2 shadow-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                disabled={status === "loading"}
                className="flex-1 bg-transparent text-ink text-base placeholder:text-ink-muted/70 outline-none min-w-0 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                aria-label="Join the waitlist"
                className="flex-shrink-0 w-11 h-11 rounded-full bg-fynd text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {status === "error" && <p className="mt-3 text-sm text-fynd-dark">{error}</p>}
            <p className="mt-4 text-xs text-ink-muted/70">No spam - just one email when we launch.</p>
          </form>
        )}
      </motion.div>
    </section>
  );
};
