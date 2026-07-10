"use client";

import { useEffect } from "react";

/**
 * Continuously auto-scrolls a horizontal container, ping-ponging between the
 * start and end (no jump-cut). Pauses on hover, touch, or manual wheel/drag
 * input, resuming automatically a moment after the visitor lets go.
 *
 * Tracks position in a local float accumulator rather than reading it back
 * from `el.scrollLeft` each frame — the DOM property rounds to an integer,
 * which silently drops sub-pixel-per-frame increments (at ~120Hz and
 * ~26px/s, each frame only advances ~0.2px) and the loop never moves.
 */
export function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const PIXELS_PER_SECOND = 26;
    let direction: 1 | -1 = 1;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    let last = performance.now();
    let position = el.scrollLeft;
    let rafId: number;

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          position += (direction * PIXELS_PER_SECOND * dt) / 1000;
          if (position >= maxScroll) {
            position = maxScroll;
            direction = -1;
          } else if (position <= 0) {
            position = 0;
            direction = 1;
          }
          el.scrollLeft = position;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const scheduleResume = (delayMs: number) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        // A manual drag/wheel may have moved the real scrollLeft — resync
        // the accumulator so auto-scroll continues from where the visitor left it.
        position = el.scrollLeft;
        paused = false;
      }, delayMs);
    };

    const onEnter = () => pause();
    const onLeave = () => scheduleResume(400);
    const onTouchStart = () => pause();
    const onTouchEnd = () => scheduleResume(1500);
    const onWheel = () => scheduleResume(1500);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [ref, enabled]);
}
