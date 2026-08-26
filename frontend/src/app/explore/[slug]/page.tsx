import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Landmark } from "lucide-react";
import { fetchHeritageSiteBySlug } from "@/lib/supabase/queries";
import { getObjectsForSite } from "@/lib/data/heritageObjects";
import { heritageSites } from "@/lib/data/heritageSites";
import GoldButton from "@/components/ui/GoldButton";
import Badge from "@/components/ui/Badge";
import HeritageDetailTabs from "@/components/heritage/HeritageDetailTabs";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const site = await fetchHeritageSiteBySlug(params.slug);
  return { title: site ? `${site.name} — HeritageLens` : "HeritageLens" };
}

export default async function HeritageDetailPage({ params }: PageProps) {
  const site = await fetchHeritageSiteBySlug(params.slug);
  if (!site) notFound();

  const objects = getObjectsForSite(site.id);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image src={site.main_image} alt={site.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-10 md:px-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge className="border-ivory/30 bg-ivory/10 text-ivory">
              {site.heritage_type}
            </Badge>
            {site.is_unesco && (
              <Badge className="border-ivory/30 bg-ivory/10 text-ivory">
                UNESCO World Heritage
              </Badge>
            )}
          </div>
          <h1 className="font-display text-3xl font-semibold text-ivory md:text-5xl">
            {site.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ivory/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold-bright" /> {site.city}, {site.state}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold-bright" /> {site.construction_date}
            </span>
            <span className="flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-gold-bright" /> {site.historical_period}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-brown">
                Historical Significance
              </h2>
              <p className="mt-3 leading-relaxed text-brown/70">{site.description}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-brown">
                Cultural Significance
              </h2>
              <p className="mt-3 leading-relaxed text-brown/70">
                {site.cultural_significance}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-brown">
                Architecture
              </h2>
              <p className="mt-3 leading-relaxed text-brown/70">
                {site.architectural_details}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-brown">
                Interesting Facts
              </h2>
              <ul className="mt-3 space-y-2">
                {site.historical_facts.map((fact, i) => (
                  <li key={i} className="flex gap-3 text-brown/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Sticky action panel */}
          <aside className="h-fit space-y-3 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                Experience This Site
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <GoldButton href={`#experience-3d`} size="sm" className="w-full">
                  View in 3D
                </GoldButton>
                <GoldButton href={`#experience-ar`} variant="outline" size="sm" className="w-full">
                  Experience in AR
                </GoldButton>
                <GoldButton href={`#experience-vr`} variant="outline" size="sm" className="w-full">
                  Take VR Tour
                </GoldButton>
                <GoldButton href={`#experience-drone`} variant="outline" size="sm" className="w-full">
                  View Drone Tour
                </GoldButton>
                <GoldButton href={`/ai-guide?site=${site.slug}`} variant="ghost" size="sm" className="w-full">
                  Ask AI Guide
                </GoldButton>
              </div>
            </div>
            <Link
              href="/explore"
              className="block text-center text-sm text-brown/50 hover:text-gold"
            >
              ← Back to all sites
            </Link>
          </aside>
        </div>

        {/* Tabbed experiences */}
        <div className="mt-16">
          <HeritageDetailTabs site={site} objects={objects} />
        </div>
      </div>
    </div>
  );
}
