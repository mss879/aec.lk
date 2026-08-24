export const INTEREST_OPTIONS = [
  "Study in Australia",
  "Study Worldwide",
  "PR Pathway Planning",
  "Partner & Family Visas",
  "Australian Schools Sector",
  "University Exploration Tours",
  "IELTS & PTE Test Prep",
  "Other",
] as const;

export type InterestOption = (typeof INTEREST_OPTIONS)[number];
