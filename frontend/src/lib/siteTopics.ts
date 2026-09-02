import { HeritageSite } from "@/types/heritage";

export interface SiteTopic {
  id: string;
  label: string;
  question: (site: HeritageSite) => string;
  match: (site: HeritageSite, blob: string) => boolean;
}

const SCULPTURE_KEYWORDS = [
  "sculpture", "sculptures", "carve", "carved", "carving", "carvings",
  "statue", "mural", "murals", "relief", "idol",
];
const BUILDER_KEYWORDS = [
  "built by", "commissioned", "architect", "designed by", "king", "sultan",
  "emperor", "peshwa", "general", "governor", "founded",
];
const EVENT_KEYWORDS = [
  "fire", "destroyed", "renamed", "battle", "war", "raid", "confront",
  "movement", "independence", "confinement",
];

function textBlob(site: HeritageSite): string {
  return [
    site.description,
    site.architectural_details,
    site.cultural_significance,
    ...(site.historical_facts || []),
  ].join(" ").toLowerCase();
}

/** Ordered by priority. Keep in sync with backend/src/utils/siteTopics.ts. */
export const SITE_TOPICS: SiteTopic[] = [
  {
    id: "sculpture",
    label: "its sculptures and carvings",
    question: () => `What do the sculptures and carvings here represent?`,
    match: (_site, blob) => SCULPTURE_KEYWORDS.some((k) => blob.includes(k)),
  },
  {
    id: "origin",
    label: "why it was built",
    question: (site) => `Why was ${site.name} built?`,
    match: () => true,
  },
  {
    id: "unesco",
    label: "why it's a UNESCO site",
    question: (site) => `Why is ${site.name} a UNESCO World Heritage Site?`,
    match: (site) => site.is_unesco,
  },
  {
    id: "builder",
    label: "who built it",
    question: () => `Who built it, and why?`,
    match: (_site, blob) => BUILDER_KEYWORDS.some((k) => blob.includes(k)),
  },
  {
    id: "event",
    label: "key events in its history",
    question: (site) => `What major events happened at ${site.name}?`,
    match: (_site, blob) => EVENT_KEYWORDS.some((k) => blob.includes(k)),
  },
  {
    id: "architecture",
    label: "its architecture",
    question: () => `What makes its architecture distinctive?`,
    match: (site) => !!site.architectural_details,
  },
  {
    id: "age",
    label: "how old it is",
    question: (site) => `How old is ${site.name}?`,
    match: (site) => !!site.construction_date,
  },
  {
    id: "significance",
    label: "why it matters today",
    question: (site) => `Why does ${site.name} matter today?`,
    match: (site) => !!site.cultural_significance,
  },
];

export function getSuggestedTopics(site: HeritageSite, count = 3): SiteTopic[] {
  const blob = textBlob(site);
  return SITE_TOPICS.filter((t) => t.match(site, blob)).slice(0, count);
}
