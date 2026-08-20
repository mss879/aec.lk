"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A decorative background video that does not download until it is near the
 * viewport.
 *
 * `preload="none"` is not enough on its own: browsers ignore it when `autoPlay`
 * is set, so these clips were pulling ~550KB on mobile for two cards well below
 * the fold. Holding the `src` back until an IntersectionObserver fires is the
 * only reliable way to defer it.
 *
 * The poster is a plain <img> underneath, so the card is never empty — and if
 * JS never runs, or the visitor has data saver on, the poster is what they see.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Respect the visitor's motion preference: a looping background clip is
    // exactly the kind of thing "reduce motion" is asking us not to play.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No observer support: load on the next tick rather than synchronously in
    // the effect body, which would cost an extra render pass. Read through a
    // local first — an `in` check on `window` narrows its type to never.
    const supportsObserver = typeof IntersectionObserver !== "undefined";
    if (!supportsObserver) {
      const timer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // Start fetching just before it scrolls in, so it is playing by the time
      // it is actually looked at.
      { rootMargin: "300px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- a plain poster
          frame that must paint with zero JS and never be re-fetched through
          the image optimiser. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />

      {shouldLoad && (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
        />
      )}
    </div>
  );
}
