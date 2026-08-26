import { HeritageSite } from "@/types/heritage";
import { heritageSites, getHeritageSiteBySlug } from "@/lib/data/heritageSites";

/**
 * Data-access layer for heritage sites.
 *
 * Every function first tries Supabase. If Supabase env vars are not
 * configured (e.g. running the hackathon demo with zero setup), it falls
 * back to the local sample dataset in `src/lib/data/heritageSites.ts`.
 * This lets the entire UI be demoed instantly, then upgraded to a real
 * database by just adding the .env.local values — no component changes.
 */

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function fetchAllHeritageSites(): Promise<HeritageSite[]> {
  if (!isSupabaseConfigured) return heritageSites;

  try {
    const { getSupabaseServerClient } = await import("./server");
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("heritage_sites")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) return heritageSites;
    return data as HeritageSite[];
  } catch {
    return heritageSites;
  }
}

export async function fetchHeritageSiteBySlug(
  slug: string
): Promise<HeritageSite | undefined> {
  if (!isSupabaseConfigured) return getHeritageSiteBySlug(slug);

  try {
    const { getSupabaseServerClient } = await import("./server");
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("heritage_sites")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return getHeritageSiteBySlug(slug);
    return data as HeritageSite;
  } catch {
    return getHeritageSiteBySlug(slug);
  }
}

export async function logExploration(params: {
  userId: string | null;
  heritageSiteId: string;
  experienceType: "AR" | "VR" | "3D" | "Drone" | "Article";
}) {
  if (!isSupabaseConfigured || !params.userId) return;

  try {
    const { getSupabaseServerClient } = await import("./server");
    const supabase = getSupabaseServerClient();
    await supabase.from("user_explorations").insert({
      user_id: params.userId,
      heritage_site_id: params.heritageSiteId,
      experience_type: params.experienceType,
    });
  } catch {
    // Non-critical — exploration logging should never break the UX.
  }
}
