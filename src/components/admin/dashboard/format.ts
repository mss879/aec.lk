/** Formatting helpers shared by the dashboard previews. */

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

/** Lead values are `numeric(12,2)` with a currency column defaulting to AUD. */
export function formatAud(value: number) {
  return audFormatter.format(value);
}

/** Fallback avatar text when a testimonial has no photo. */
export function initialsOf(name: string) {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return letters.toUpperCase() || "?";
}

/** "Ada Lovelace" from a first/last pair that may be missing the last name. */
export function fullName(first: string, last: string | null) {
  return last ? `${first} ${last}` : first;
}
