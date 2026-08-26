import { HeritageSite } from "@/types/heritage";
import HeritageCard from "@/components/heritage/HeritageCard";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldButton from "@/components/ui/GoldButton";

export default function FeaturedHeritage({ sites }: { sites: HeritageSite[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHeading
        eyebrow="Featured Sites"
        title="Discover India's Heritage"
        subtitle="Explore remarkable places, stories and architecture from across centuries."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <HeritageCard key={site.id} site={site} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <GoldButton href="/explore" variant="outline" size="lg">
          View All Heritage Sites
        </GoldButton>
      </div>
    </section>
  );
}
