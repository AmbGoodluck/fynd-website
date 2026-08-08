"use client";

import { useEffect, useState } from "react";
import { Apple, Share, PlusSquare, Check, Smartphone } from "lucide-react";

const PWA_URL = "https://app.fyndplaces.com";
// Swap for the real App Store link once the listing is live. Until then the
// button explains the status rather than sending people to a 404.
const APP_STORE_URL = "";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

/** Fire-and-forget. Analytics must never delay or block an install. */
function track(source: string, action: "view" | "pwa" | "appstore") {
  try {
    const body = JSON.stringify({ source, action });
    // sendBeacon survives the page being navigated away from, which is exactly
    // what happens the moment someone taps through to the app.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/install-event", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/install-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* never surface an analytics failure to someone trying to install */
  }
}

export function InstallClient() {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [source, setSource] = useState("direct");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    const src = new URLSearchParams(window.location.search).get("src") ?? "direct";
    const clean = src.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 48) || "direct";
    setSource(clean);
    track(clean, "view");
  }, []);

  const openPwa = () => {
    track(source, "pwa");
    window.location.href = PWA_URL;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PWA_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked - the URL is printed on the page anyway */
    }
  };

  return (
    <main className="min-h-screen bg-canvas px-5 py-16">
      <div className="mx-auto w-full max-w-lg">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fynd">
            Early access
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Get Fynd on your phone
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Places worth going near campus, and what other students at your
            school actually recommend. Free, no ads.
          </p>
        </header>

        {/* Primary: install the web app. Works today, on every phone. */}
        <section className="mt-10 rounded-2xl border border-hairline bg-surface-raised p-6">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-fynd" aria-hidden />
            <h2 className="font-serif text-xl text-ink">Install the web app</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            The full app, straight from your browser. Nothing to download.
          </p>

          {platform === "ios" && (
            <ol className="mt-5 space-y-3 text-sm text-ink">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">1</span>
                <span>
                  Open <strong>app.fyndplaces.com</strong> in <strong>Safari</strong>.
                  Chrome on iPhone can&apos;t install it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">2</span>
                <span className="flex flex-wrap items-center gap-1">
                  Tap <Share className="inline h-4 w-4" aria-label="the Share button" /> <strong>Share</strong> at the bottom
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">3</span>
                <span className="flex flex-wrap items-center gap-1">
                  Choose <PlusSquare className="inline h-4 w-4" aria-hidden /> <strong>Add to Home Screen</strong>
                </span>
              </li>
            </ol>
          )}

          {platform === "android" && (
            <ol className="mt-5 space-y-3 text-sm text-ink">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">1</span>
                <span>Open <strong>app.fyndplaces.com</strong> in Chrome.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">2</span>
                <span>Tap the <strong>⋮</strong> menu, top right.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fynd text-xs font-bold text-white">3</span>
                <span>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</span>
              </li>
            </ol>
          )}

          {platform === "desktop" && (
            <p className="mt-5 rounded-xl bg-surface p-4 text-sm text-ink-muted">
              Open this page on your phone to install it. Scan the QR code on the
              poster, or send yourself the link below.
            </p>
          )}

          <button
            onClick={openPwa}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-fynd px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-fynd-dark"
          >
            Open Fynd
          </button>

          <button
            onClick={copyLink}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-hairline px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            {copied ? (<><Check className="h-4 w-4" aria-hidden /> Link copied</>) : "Copy link"}
          </button>
        </section>

        {/* Secondary: the App Store, once it exists. */}
        <section className="mt-5 rounded-2xl border border-hairline bg-surface p-6">
          <div className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-ink" aria-hidden />
            <h2 className="font-serif text-xl text-ink">iPhone app</h2>
          </div>
          {APP_STORE_URL ? (
            <>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The native app, with notifications.
              </p>
              <a
                href={APP_STORE_URL}
                onClick={() => track(source, "appstore")}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-ink px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Download on the App Store
              </a>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Coming to the App Store shortly. The web app above is the same
              Fynd, and anything you post now will still be there.
            </p>
          )}
        </section>

        <p className="mt-8 text-center text-xs leading-relaxed text-ink-muted">
          Students: verify with your school email to unlock your campus wall,
          events and insider tips. Everyone else can use place discovery without
          verifying.
        </p>
      </div>
    </main>
  );
}
