export type HistoricalPeriod =
  | "Ancient"
  | "Medieval"
  | "Colonial"
  | string;

export type HeritageType =
  | "Cave"
  | "Palace"
  | "Monument"
  | "Fort"
  | string;

export interface HeritageSite {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
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
  gallery_images: string[];
  video_url: string | null;
  model_3d_url: string | null;
  ar_model_url: string | null;
  vr_tour_url: string | null;
  drone_view_url: string | null;
  historical_reconstruction_url: string | null;
  audio_url: string | null;
  is_unesco: boolean;
  created_at: string;
}
