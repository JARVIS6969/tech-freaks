"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { HeritageSite } from "@/types/heritage";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = ["All", "Temple", "Fort", "Cave", "Stupa", "Palace"];

/**
 * Interactive Heritage Map.
 *
 * PRODUCTION NOTE: this renders sites as proportionally-positioned markers
 * over an India outline placeholder. Swap in Mapbox GL JS or Leaflet with
 * real lat/lng projection (see each site's `latitude`/`longitude` fields)
 * once NEXT_PUBLIC_MAP_TOKEN is configured — see .env.example.
 */
export default function HeritageMap({ sites }: { sites: HeritageSite[] }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [active, setActive] = useState<HeritageSite | null>(null);

  const filtered = sites.filter(
    (s) => typeFilter === "All" || s.heritage_type === typeFilter
  );

  // Rough normalized positions for demo purposes (India bounding box approx.)
  const project = (lat: number, lng: number) => {
    const top = ((37 - lat) / (37 - 6)) * 100;
    const left = ((lng - 68) / (97 - 68)) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
              typeFilter === t
                ? "border-gold bg-gold text-ivory"
                : "border-gold/25 text-brown/60 hover:border-gold hover:text-gold"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold/15 bg-cream/50 shadow-card sm:aspect-video">
          <div className="heritage-pattern absolute inset-0" />
          {filtered.map((site) => {
            const pos = project(site.latitude, site.longitude);
            return (
              <button
                key={site.id}
                style={pos}
                onClick={() => setActive(site)}
                className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center transition-transform hover:scale-110"
                aria-label={`View ${site.name} on map`}
              >
                <MapPin
                  className={cn(
                    "h-7 w-7 drop-shadow-md",
                    active?.id === site.id ? "text-gold-dark" : "text-gold"
                  )}
                  fill="currentColor"
                />
              </button>
            );
          })}
        </div>

        {/* Selected site preview */}
        <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card">
          {active ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {active.heritage_type} · {active.historical_period}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-brown">
                {active.name}
              </h3>
              <p className="mt-1 text-xs text-brown/50">
                {active.city}, {active.state}
              </p>
              <p className="mt-3 text-sm text-brown/70">
                {active.short_description}
              </p>
              <Link
                href={`/explore/${active.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                View full details →
              </Link>
            </>
          ) : (
            <p className="text-sm text-brown/50">
              Select a gold marker on the map to preview a heritage site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
