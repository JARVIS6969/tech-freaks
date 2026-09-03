"use client";

import { MapPin, Navigation } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";

export default function LocationMap({
  name,
  latitude,
  longitude,
  city,
  state,
}: {
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
}) {
  const embedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/15 bg-brown shadow-card">
      
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video w-full"
      >
        <iframe
          title={`Map of ${name}`}
          src={embedSrc}
          className="h-full w-full border-0 pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-brown/0 opacity-0 transition-opacity group-hover:bg-brown/20 group-hover:opacity-100">
          <span className="rounded-full bg-ivory/90 px-4 py-2 text-xs font-semibold text-brown">
            Open in Google Maps
          </span>
        </div>
      </a>

      <div className="flex items-center justify-between gap-4 border-t border-ivory/10 bg-brown/95 p-4">
        <div className="flex items-center gap-2 text-ivory/80 text-sm">
          <MapPin className="h-4 w-4 text-gold" />
          <span>
            {city && state ? `${city}, ${state}` : `${latitude}, ${longitude}`}
          </span>
        </div>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
          <GoldButton className="flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5" /> Get Directions
          </GoldButton>
        </a>
      </div>
    </div>
  );
}
