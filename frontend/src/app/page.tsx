import Hero from "@/components/home/Hero";
import FeaturedHeritage from "@/components/home/FeaturedHeritage";
import Timeline from "@/components/home/Timeline";
import BeforeAfterSlider from "@/components/heritage/BeforeAfterSlider";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldButton from "@/components/ui/GoldButton";
import { fetchAllHeritageSites } from "@/lib/supabase/queries";

export default async function HomePage() {
  const sites = await fetchAllHeritageSites();

  return (
    <>
      <Hero />

      <FeaturedHeritage sites={sites.slice(0, 6)} />

      {/* Historical Reconstruction preview */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="From Then to Now"
          title="Historical Reconstruction ←→ Present Day"
          subtitle="Drag the slider to compare a rendered historical reconstruction with the monument's present-day condition."
        />
        <div className="mt-12">
          <BeforeAfterSlider
            beforeImage="/images/placeholder-heritage.jpg"
            afterImage="/images/placeholder-heritage.jpg"
          />
        </div>
      </section>

      <Timeline sites={sites} />

      {/* Closing CTA */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
        <h2 className="font-display text-3xl font-semibold text-brown md:text-4xl">
          We don&apos;t just preserve history.
          <br />
          <span className="gold-text-gradient">We make people experience it.</span>
        </h2>
        <div className="mt-8 flex justify-center gap-4">
          <GoldButton href="/explore" size="lg">
            Start Exploring
          </GoldButton>
          <GoldButton href="/ai-guide" variant="outline" size="lg">
            Ask the Heritage Guide
          </GoldButton>
        </div>
      </section>
    </>
  );
}
