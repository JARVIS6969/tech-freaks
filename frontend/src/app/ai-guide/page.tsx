import SectionHeading from "@/components/ui/SectionHeading";
import AIChatPage from "@/components/ai/AIChatPage";
import { fetchAllHeritageSites } from "@/lib/supabase/queries";

export const metadata = {
  title: "AI Heritage Guide — HeritageLens",
};

export default async function AIGuidePage({
  searchParams,
}: {
  searchParams: { site?: string };
}) {
  const sites = await fetchAllHeritageSites();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <SectionHeading
        eyebrow="AI Heritage Guide"
        title="Ask the Heritage Guide"
        subtitle={'"What makes this monument special?" — get grounded answers sourced from each site\u2019s verified history.'}
      />
      <div className="mt-10">
        <AIChatPage sites={sites} initialSiteSlug={searchParams.site} />
      </div>
    </div>
  );
}
