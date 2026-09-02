export interface SiteFacts {
  name: string;
  description: string;
  architectural_details: string;
  cultural_significance: string;
  historical_facts: string[];
  construction_date: string;
  is_unesco: boolean;
}

export interface SiteTopic {
  id: string;
  label: string;
  match: (site: SiteFacts, blob: string) => boolean;
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

function textBlob(site: SiteFacts): string {
  return [
    site.description,
    site.architectural_details,
    site.cultural_significance,
    ...(site.historical_facts || []),
  ].join(" ").toLowerCase();
}

export const SITE_TOPICS: SiteTopic[] = [
  { id: "sculpture", label: "its sculptures and carvings", match: (_s, blob) => SCULPTURE_KEYWORDS.some((k) => blob.includes(k)) },
  { id: "origin", label: "why it was built", match: () => true },
  { id: "unesco", label: "why it's a UNESCO site", match: (s) => s.is_unesco },
  { id: "builder", label: "who built it", match: (_s, blob) => BUILDER_KEYWORDS.some((k) => blob.includes(k)) },
  { id: "event", label: "key events in its history", match: (_s, blob) => EVENT_KEYWORDS.some((k) => blob.includes(k)) },
  { id: "architecture", label: "its architecture", match: (s) => !!s.architectural_details },
  { id: "age", label: "how old it is", match: (s) => !!s.construction_date },
  { id: "significance", label: "why it matters today", match: (s) => !!s.cultural_significance },
];

export function getSuggestedTopics(site: SiteFacts, count = 3): SiteTopic[] {
  const blob = textBlob(site);
  return SITE_TOPICS.filter((t) => t.match(site, blob)).slice(0, count);
}

export function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
