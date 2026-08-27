// Mirrors the `heritage_sites` table in Supabase (see supabase/schema.sql)
export interface HeritageSite {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  historical_period: HistoricalPeriod;
  construction_date: string;
  heritage_type: HeritageType;
  cultural_significance: string;
  architectural_details: string;
  historical_facts: string[];
  main_image: string;
  video_url: string | null;
  gallery_images: string[];
  model_3d_url: string | null;
  ar_model_url: string | null;
  vr_tour_url: string | null;
  drone_view_url: string | null;
  historical_reconstruction_url: string | null;
  audio_url: string | null;
  is_unesco: boolean;
  created_at: string;
}

// Mirrors the `heritage_objects` table — sub-elements of a site
// (pillars, sculptures, entrances, etc.) used by the 3D hotspot viewer.
export interface HeritageObject {
  id: string;
  heritage_site_id: string;
  name: string;
  description: string;
  historical_significance: string;
  image_url: string | null;
  model_3d_url: string | null;
  ar_model_url: string | null;
  position?: { x: number; y: number; z: number };
  created_at: string;
}

export type HistoricalPeriod = "Ancient" | "Medieval" | "Colonial" | "Modern";

export type HeritageType =
  | "Temple"
  | "Fort"
  | "Cave"
  | "Stupa"
  | "Palace"
  | "Stepwell";

// Mirrors `user_explorations.experience_type`
export type ExperienceType = "AR" | "VR" | "3D" | "Drone" | "Article";

export interface AIQuestion {
  id: string;
  user_id: string | null;
  heritage_site_id: string;
  question: string;
  answer: string;
  created_at: string;
}
