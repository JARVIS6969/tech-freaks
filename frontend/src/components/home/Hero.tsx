import Image from "next/image";
import GoldButton from "@/components/ui/GoldButton";
import Badge from "@/components/ui/Badge";
import { Sparkles, Box, Video } from "lucide-react";

export default function Hero() {
  return (
    <section className="heritage-pattern relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-dark">
            <Sparkles className="h-3.5 w-3.5" /> Immersive Heritage Technology
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-brown md:text-6xl">
            Experience 
            <br />
            <span className="gold-text-gradient">Like Never Before.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-brown/70 md:text-lg">
            Discover India&apos;s cultural heritage through AR, VR, 3D
            exploration and immersive storytelling.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GoldButton href="/explore" size="lg">
              Explore Heritage
            </GoldButton>
            <GoldButton href="/explore#ar" variant="outline" size="lg">
              <Sparkles className="h-4 w-4" /> Start AR Experience
            </GoldButton>
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=1400&auto=format&fit=crop"
              alt="Modhera Sun Temple carved stone architecture"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/40 via-transparent to-transparent" />
          </div>

          {/* Floating UI badges */}
          <div className="absolute -left-4 top-8 hidden animate-fade-up rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex md:items-center md:gap-2 [animation-delay:400ms]">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">AR Ready</span>
          </div>

          <div className="absolute -right-4 top-1/3 hidden animate-fade-up items-center gap-2 rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex [animation-delay:550ms]">
            <Box className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">3D Available</span>
          </div>

          <div className="absolute -bottom-4 left-10 hidden animate-fade-up items-center gap-2 rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex [animation-delay:700ms]">
            <Video className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">360° Tour</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 pb-14 md:justify-start md:px-8">
        <Badge>AR Experience</Badge>
        <Badge>3D Models</Badge>
        <Badge>VR / 360° Tours</Badge>
        <Badge>Drone Views</Badge>
        <Badge>AI Heritage Guide</Badge>
      </div>
    </section>
  );
}
