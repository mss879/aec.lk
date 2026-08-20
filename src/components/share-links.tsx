"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { siteUrl } from "@/lib/site";

/**
 * Share row for an article, news item or success story.
 *
 * The URL is built from `path` rather than read from `window.location`, so the
 * markup is identical on the server and the client and the links are correct in
 * the HTML before any JavaScript runs.
 */

const iconClass = "w-4 h-4";

function FacebookGlyph() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l7.5 9.5L4.5 20" />
      <path d="M20 4l-7.5 9.5L19.5 20" />
      <path d="M4 4h4l12 16h-4z" />
    </svg>
  );
}

function WhatsappGlyph() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

const buttonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-900 bg-white text-slate-900 shadow-[3px_3px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#124b8d] hover:text-white hover:shadow-[2px_2px_0px_rgba(15,23,42,1)]";

export function ShareLinks({
  path,
  title,
  label = "Share this",
}: {
  /** Site-relative path, e.g. `/blog/my-post`. */
  path: string;
  title: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const url = `${siteUrl}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      name: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookGlyph,
    },
    {
      name: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XGlyph,
    },
    {
      name: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedinGlyph,
    },
    {
      name: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      Icon: WhatsappGlyph,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused (insecure context, denied permission).
      // The share buttons still work, so there is nothing useful to say here.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400">
        <Share2 className="h-3.5 w-3.5" />
        {label}
      </span>

      <div className="flex flex-wrap gap-2">
        {targets.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className={buttonClass}
          >
            <Icon />
          </a>
        ))}

        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Link copied" : "Copy link"}
          className={buttonClass}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Announced to screen readers without moving anything on screen. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
