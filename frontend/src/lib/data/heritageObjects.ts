import { HeritageObject } from "@/types/heritage";

/**
 * Sub-elements of a heritage site (pillars, shrines, entrances) used by the
 * 3D viewer's clickable hotspots. Mirrors the `heritage_objects` table.
 */
export const heritageObjects: HeritageObject[] = [
  {
    id: "o1",
    heritage_site_id: "1",
    name: "Main Shrine (Garbhagriha)",
    description:
      "The inner sanctum aligned so the equinox sunrise illuminates the sanctum floor directly.",
    historical_significance:
      "Astronomically aligned architecture reflecting Solanki-era solar worship.",
    image_url: null,
    model_3d_url: null,
    ar_model_url: null,
    position: { x: 0, y: 1.2, z: 0 },
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "o2",
    heritage_site_id: "1",
    name: "Sabha Mandapa Pillars",
    description:
      "108 carved pillars, each bearing a unique motif — from deities to floral medallions.",
    historical_significance:
      "Demonstrates the individualized artisanal approach of Solanki sculptors.",
    image_url: null,
    model_3d_url: null,
    ar_model_url: null,
    position: { x: -1.4, y: 0.6, z: 0.8 },
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "o3",
    heritage_site_id: "1",
    name: "Surya Kund Stepwell",
    description:
      "A stepped tank lined with 108 miniature shrines, used for ritual bathing.",
    historical_significance:
      "One of the earliest and most elaborate stepwells surviving in Gujarat.",
    image_url: null,
    model_3d_url: null,
    ar_model_url: null,
    position: { x: 1.6, y: -0.4, z: -0.6 },
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "o4",
    heritage_site_id: "1",
    name: "Ornamental Entrance (Torana)",
    description:
      "The carved archway marking the ceremonial entrance to the temple complex.",
    historical_significance:
      "A classic Solanki torana form later echoed across western Indian temple architecture.",
    image_url: null,
    model_3d_url: null,
    ar_model_url: null,
    position: { x: 0, y: 0.9, z: -1.8 },
    created_at: "2026-01-01T00:00:00Z",
  },
];

export function getObjectsForSite(siteId: string): HeritageObject[] {
  return heritageObjects.filter((o) => o.heritage_site_id === siteId);
}
