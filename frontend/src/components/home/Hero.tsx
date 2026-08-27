import GoldButton from "@/components/ui/GoldButton";
import Badge from "@/components/ui/Badge";
import { Sparkles, Box, Video as VideoIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="heritage-pattern relative overflow-hidden">
      <div className="relative flex min-h-[600px] flex-col md:min-h-[720px] md:flex-row">
        {/* Copy — left half */}
        <div className="relative z-10 flex flex-1 items-center px-5 py-16 md:px-8 md:py-24 lg:pl-12">
          <div className="animate-fade-up max-w-xl">
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
        </div>

        {/* Visual — right half, full-bleed edge to edge */}
        <div className="relative w-full md:w-1/2">
          <div className="relative h-64 w-full overflow-hidden md:absolute md:inset-0 md:h-full">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/heritage-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
            {/* Subtle overlay so floating badges stay readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown/30 via-transparent to-transparent" />
          </div>

          {/* Floating UI badges */}
          <div className="absolute left-4 top-6 hidden animate-fade-up rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex md:items-center md:gap-2 [animation-delay:400ms]">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">AR Ready</span>
          </div>

          <div className="absolute right-4 top-1/3 hidden animate-fade-up items-center gap-2 rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex [animation-delay:550ms]">
            <Box className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">3D Available</span>
          </div>

          <div className="absolute bottom-6 left-10 hidden animate-fade-up items-center gap-2 rounded-2xl border border-gold/20 bg-ivory/90 px-4 py-3 shadow-gold backdrop-blur md:flex [animation-delay:700ms]">
            <VideoIcon className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-brown">360° Tour</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 pb-14 pt-8 md:justify-start md:px-8">
        <Badge>AR Experience</Badge>
        <Badge>3D Models</Badge>
        <Badge>VR / 360° Tours</Badge>
        <Badge>Drone Views</Badge>
        <Badge>AI Heritage Guide</Badge>
      </div>
    </section>
  );
}