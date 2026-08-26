"use client";

import { useState } from "react";
import { Volume2, VolumeX, Maximize, MapPin } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";

const DEFAULT_HOTSPOTS = [
  "Temple Entrance",
  "Main Shrine",
  "Sculpture Gallery",
  "Ancient Stepwell",
];

/**
 * 360°/VR tour viewport.
 *
 * PRODUCTION NOTE: swap the placeholder panorama below for an A-Frame
 * <a-scene> with an <a-sky src="panorama.jpg"> for true drag-to-look-around
 * 360° viewing, e.g.:
 *
 *   <a-scene embedded>
 *     <a-sky src={vrTourUrl} rotation="0 -130 0"></a-sky>
 *     <a-camera> ... </a-camera>
 *   </a-scene>
 */
export default function VRTour({
  vrTourUrl,
  hotspots = DEFAULT_HOTSPOTS,
}: {
  vrTourUrl: string | null;
  hotspots?: string[];
}) {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

  if (!entered) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-gold/15 bg-cream/60 p-12 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          360° Virtual Tour
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-brown">
          Step inside the monument
        </h3>
        <p className="mt-2 max-w-md text-sm text-brown/60">
          Drag to look around, zoom into details, and jump between hotspots
          with narrated context at each stop.
        </p>
        <GoldButton onClick={() => setEntered(true)} className="mt-6">
          Enter Virtual Tour
        </GoldButton>
        {!vrTourUrl && (
          <p className="mt-4 text-[11px] uppercase tracking-wider text-brown/40">
            Demo placeholder — no 360° panorama attached yet
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/15 bg-brown shadow-card">
      <div className="relative flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_center,_#5a4326,_#2c2011)] text-ivory/40">
        <p className="max-w-xs text-center text-sm">
          360° panorama viewport — drag to look around
          {vrTourUrl ? "" : " (demo placeholder)"}
        </p>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
            aria-label={muted ? "Unmute narration" : "Mute narration"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
            aria-label="Fullscreen"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hotspot navigation */}
      <div className="flex flex-wrap gap-2 border-t border-ivory/10 bg-brown/95 p-4">
        {hotspots.map((h) => (
          <button
            key={h}
            onClick={() => setActiveHotspot(h)}
            className={
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
              (activeHotspot === h
                ? "border-gold bg-gold text-brown"
                : "border-ivory/20 text-ivory/70 hover:border-gold hover:text-gold-bright")
            }
          >
            <MapPin className="h-3 w-3" /> {h}
          </button>
        ))}
      </div>
    </div>
  );
}
