import Link from "next/link";
import { MapPin, Box, Video, Sparkles, ArrowUpRight } from "lucide-react";
import { HeritageSite } from "@/types/heritage";
import Badge from "@/components/ui/Badge";

export default function HeritageCard({ site }: { site: HeritageSite }) {
  return (
    <Link
      href={`/explore/${site.slug}`}
      className="group block overflow-hidden rounded-3xl border border-gold/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brown/5">
        {site.video_url ? (
          <video
            src={site.video_url}
            poster={site.main_image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={site.main_image}
            alt={site.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge>
            <Sparkles className="h-3 w-3" /> AR
          </Badge>
          <Badge>
            <Box className="h-3 w-3" /> 3D
          </Badge>
          <Badge>
            <Video className="h-3 w-3" /> VR
          </Badge>
        </div>
        {site.is_unesco && (
          <span className="absolute right-3 top-3 rounded-full bg-brown/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">
            UNESCO
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-brown">
            {site.name}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-brown/60">
          <MapPin className="h-3 w-3" /> {site.city}, {site.state} ·{" "}
          {site.historical_period}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-brown/70">
          {site.short_description}
        </p>
        <span className="mt-4 inline-block text-sm font-semibold text-gold group-hover:underline">
          Explore →
        </span>
      </div>
    </Link>
  );
}
