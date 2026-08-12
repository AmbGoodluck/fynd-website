"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const CATEGORIES = [
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
  { value: "account", label: "Account help" },
  { value: "report", label: "Report content or a user" },
  { value: "other", label: "General feedback" },
];

type Status = "idle" | "loading" | "success" | "error";

export const SupportForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("bug");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          category,
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCategory("bug");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-hairline bg-surface-raised p-8 text-center">
        <div className="w-14 h-14 bg-fynd/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-fynd" />
        </div>
        <h3 className="text-xl text-ink mb-2">Message received</h3>
        <p className="text-ink-muted text-sm mb-6">
          Thanks for reaching out - we&apos;ll get back to you at your email
          within 1-2 business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-fynd hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-hairline bg-surface-raised p-6 sm:p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="support-name" className="block text-sm font-medium text-ink mb-1.5">
            Name <span className="text-ink-muted font-normal">(optional)</span>
          </label>
          <input
            id="support-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl border border-hairline bg-canvas text-ink placeholder-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-fynd focus:border-transparent transition text-sm"
          />
        </div>
        <div>
          <label htmlFor="support-email" className="block text-sm font-medium text-ink mb-1.5">
            Email
          </label>
          <input
            id="support-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-hairline bg-canvas text-ink placeholder-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-fynd focus:border-transparent transition text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="support-category" className="block text-sm font-medium text-ink mb-1.5">
          Category
        </label>
        <select
          id="support-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-hairline bg-canvas text-ink focus:outline-none focus:ring-2 focus:ring-fynd focus:border-transparent transition text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="support-message" className="block text-sm font-medium text-ink mb-1.5">
          Message
        </label>
        <textarea
          id="support-message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's going on..."
          className="w-full px-4 py-3 rounded-xl border border-hairline bg-canvas text-ink placeholder-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-fynd focus:border-transparent transition text-sm resize-none"
        />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={!email || message.trim().length < 10 || status === "loading"}
        className="w-full py-3.5 bg-fynd hover:bg-fynd-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm inline-flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
};
