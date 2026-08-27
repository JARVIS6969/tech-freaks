"use client";

import { useState } from "react";
import Image from "next/image";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DroneView({
  droneImageUrl,
}: {
  droneImageUrl: string | null;
}) {
  const [mode, setMode] = useState<"drone" | "historical">("drone");

  const image =
    droneImageUrl ??
    "/images/placeholder-heritage.jpg";

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2">
        <ToggleButton
          active={mode === "drone"}
          onClick={() => setMode("drone")}
        >
          Satellite / Drone View
        </ToggleButton>
        <ToggleButton
          active={mode === "historical"}
          onClick={() => setMode("historical")}
        >
          Historical Layout
        </ToggleButton>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-3xl border border-gold/15 shadow-card">
        <Image src={image} alt="Aerial view" fill className="object-cover" />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            mode === "historical"
              ? "bg-gold-dark/40 mix-blend-multiply"
              : "bg-transparent"
          )}
        />

        {/* Sample location markers */}
        {["Main Structure", "Stepwell", "Outer Wall"].map((label, i) => (
          <div
            key={label}
            className="absolute flex items-center gap-1.5 rounded-full bg-ivory/90 px-2.5 py-1 text-[11px] font-medium text-brown shadow-card"
            style={{ left: `${25 + i * 22}%`, top: `${30 + (i % 2) * 30}%` }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {label}
          </div>
        ))}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-brown/80 px-3 py-1 text-xs font-medium text-ivory">
          <Plane className="h-3.5 w-3.5" /> Aerial capture
        </div>
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
        active
          ? "border-gold bg-gold text-ivory"
          : "border-gold/30 text-brown/60 hover:border-gold hover:text-gold"
      )}
    >
      {children}
    </button>
  );
}
