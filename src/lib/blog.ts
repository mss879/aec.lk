/**
 * Blog helpers shared by the back office and the public pages.
 *
 * Everything here is pure — no database, no network, no `server-only` — so the
 * same functions can run in the editor (a Client Component deriving a slug as
 * you type) and on the server (an action normalising what was submitted).
 */

// --- Categories -----------------------------------------------------------

/**
 * A short, curated list for an Australian education consultancy. The database
 * column is free text, so the editor may type something else; this list only
 * drives the picker and keeps the common cases spelled consistently.
 */
export const BLOG_CATEGORIES = [
  "Study in Australia",
  "Visas & PR",
  "Scholarships",
  "Student Life",
  "Application Tips",
  "Test Preparation",
  "News",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

// --- Slugs ----------------------------------------------------------------

// Built from escapes rather than literals so the source stays plain ASCII:
// U+0300-U+036F are the combining diacritics NFKD leaves behind.
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");
const APOSTROPHES = new RegExp("['\\u2018\\u2019]", "g");

/** Long enough for a descriptive title, short enough to stay readable. */
const MAX_SLUG_LENGTH = 80;

/**
 * Turns a title into a URL-safe slug: lowercase, accents stripped, every run of
 * non-alphanumerics collapsed to a single hyphen, trimmed, and capped in length
 * at a word boundary.
 *
 *   slugify("Étudier en Australie: 5 étapes!")  →  "etudier-en-australie-5-etapes"
 */
export function slugify(value: string): string {
  const base = value
    .normalize("NFKD")
    // Combining diacritics left behind by NFKD: "é" becomes "e" + U+0301.
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    // Apostrophes join rather than split: "don't" gives "dont", not "don-t".
    .replace(APOSTROPHES, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (base.length <= MAX_SLUG_LENGTH) return base;

  const clipped = base.slice(0, MAX_SLUG_LENGTH);
  const lastHyphen = clipped.lastIndexOf("-");
  const trimmed = lastHyphen > 0 ? clipped.slice(0, lastHyphen) : clipped;

  return trimmed.replace(/-+$/, "");
}

// --- Tags -----------------------------------------------------------------

const MAX_TAGS = 20;

/** Comma-separated input → a clean, de-duplicated `text[]` for Postgres. */
export function parseTags(input: string | null | undefined): string[] {
  if (!input) return [];

  const seen = new Set<string>();
  const tags: string[] = [];

  for (const raw of input.split(",")) {
    const tag = raw.trim().replace(/\s+/g, " ");
    if (!tag) continue;

    const key = tag.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    tags.push(tag);

    if (tags.length === MAX_TAGS) break;
  }

  return tags;
}

/** `text[]` → the comma-separated string the editor field expects. */
export function formatTags(tags: readonly string[] | null | undefined): string {
  return (tags ?? []).join(", ");
}

// --- Content -------------------------------------------------------------
//
// SUPPORTED SYNTAX (there is no markdown library in this project, and none may
// be added — this parser is the whole story):
//
//   ## Heading            → a level-2 heading (`# ` is accepted and treated the
//                           same way — the post title is the page's only h1)
//   ### Sub-heading       → a level-3 heading (`####` and deeper clamp to this)
//   - Item                → bullet list; consecutive `- ` lines form one list
//                           (`* ` is accepted as an alias)
//   1. Item               → numbered list; consecutive `1. ` lines form one
//                           list (`1) ` is accepted as an alias). The numbers
//                           you type are ignored — the list renders in order.
//   > Quotation           → blockquote; consecutive `> ` lines form one quote
//   Anything else         → a paragraph. Blank lines separate paragraphs; a
//                           single newline inside a paragraph is a soft wrap
//                           and is joined with a space.
//
// A plain line directly beneath a list item or a quote continues it, so long
// items can be wrapped in the editor.
//
// There is deliberately NO inline formatting (no bold, italics, links or raw
// HTML): the parser returns structured blocks of plain text for React to
// render as elements, so nothing is ever fed to `dangerouslySetInnerHTML`.

export type ContentBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "quote"; text: string };

/** The same rules, phrased for the author. Shown under the editor textarea. */
export const CONTENT_SYNTAX_HINT: readonly string[] = [
  "## Heading  ·  ### Sub-heading",
  "- Bullet list item",
  "1. Numbered list item",
  "> Quotation",
  "Blank line between paragraphs. No bold, italics, links or HTML.",
];

// Any run of 1-6 hashes is a heading, clamped to two levels: the post title is
// already the page's only h1, and anything below h3 is noise in an article.
const HEADING = /^(#{1,6})\s+(.+)$/;
const BULLET = /^[-*]\s+(.+)$/;
const ORDERED = /^\d{1,3}[.)]\s+(.+)$/;
const QUOTE = /^>\s?(.*)$/;

/**
 * Parses post content into blocks. Deterministic and total: any input produces
 * a valid block list, and text that matches nothing becomes a paragraph.
 */
export function renderPostContent(
  content: string | null | undefined
): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  if (!content) return blocks;

  let paragraph: string[] = [];
  let quote: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushQuote() {
    if (quote.length) {
      blocks.push({ kind: "quote", text: quote.join(" ") });
      quote = [];
    }
  }

  function flushList() {
    const current = list;
    if (current && current.items.length) {
      blocks.push({
        kind: "list",
        ordered: current.ordered,
        items: current.items,
      });
    }
    list = null;
  }

  function flushAll() {
    flushParagraph();
    flushQuote();
    flushList();
  }

  function pushItem(ordered: boolean, text: string) {
    flushParagraph();
    flushQuote();

    let target = list;
    if (!target || target.ordered !== ordered) {
      flushList();
      target = { ordered, items: [] };
      list = target;
    }
    target.items.push(text);
  }

  /**
   * A plain line directly under a list item or a quote continues it. This lives
   * in its own function because narrowing `list` only works where TypeScript
   * can see the assignments — inside the loop it still believes it is null.
   */
  function continueOpenBlock(line: string): boolean {
    if (list && list.items.length) {
      list.items[list.items.length - 1] += ` ${line}`;
      return true;
    }
    if (quote.length) {
      quote.push(line);
      return true;
    }
    return false;
  }

  for (const rawLine of content.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();

    if (line === "") {
      flushAll();
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      flushAll();
      blocks.push({
        kind: "heading",
        level: heading[1].length >= 3 ? 3 : 2,
        text: heading[2].trim(),
      });
      continue;
    }

    const quoted = QUOTE.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      const text = quoted[1].trim();
      if (text) quote.push(text);
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) {
      pushItem(false, bullet[1].trim());
      continue;
    }

    const ordered = ORDERED.exec(line);
    if (ordered) {
      pushItem(true, ordered[1].trim());
      continue;
    }

    // Plain prose. Wrapped list items and quotes keep their block; anything
    // else starts or extends a paragraph.
    if (continueOpenBlock(line)) continue;

    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

// --- Display --------------------------------------------------------------

/** `reading_minutes` is stamped by a database trigger and may be null. */
export function formatReadingTime(minutes: number | null | undefined): string {
  if (!minutes || minutes < 1) return "1 min read";
  return `${minutes} min read`;
}

/** Long-form date for the public pages: "10 August 2026". */
export function formatPostDate(value: string | null | undefined): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
