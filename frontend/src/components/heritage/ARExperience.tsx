"use client";

import { useEffect, useState } from "react";
import { Camera, Smartphone, QrCode, ScanLine } from "lucide-react";
import "@google/model-viewer/dist/model-viewer.min.js";

interface ARExperienceProps {
  siteName: string;
  modelUrl?: string | null;
}

export default function ARExperience({ siteName, modelUrl }: ARExperienceProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  return (
    <div className="rounded-3xl border border-gold/15 bg-gradient-to-br from-brown to-brown/90 p-8 text-ivory shadow-card md:p-12">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-bright">
          <Camera className="h-3.5 w-3.5" /> AR Experience
        </span>
        <h3 className="font-display text-2xl font-semibold md:text-3xl">
          Bring history into your world.
        </h3>
        <p className="mt-3 max-w-md text-sm text-ivory/70">
          Point your phone camera at any flat surface to place {siteName} in
          the room around you, at real-world scale.
        </p>

        {isMobile === true && modelUrl && (
          <div className="mt-8 flex w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-gold/25 bg-ivory/5 p-6">
            {/* @ts-ignore - custom web component */}
            <model-viewer
              src={modelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              style={{ width: "100%", height: "60px", backgroundColor: "transparent" }}
            >
              <button
                slot="ar-button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-brown shadow-gold transition-transform hover:scale-105"
              >
                <Camera className="h-4 w-4" /> Launch AR Camera
              </button>
            {/* @ts-ignore */}
            </model-viewer>
          </div>
        )}

        {isMobile === false && (
          <div className="mt-8 w-full max-w-sm rounded-2xl border border-gold/25 bg-ivory/5 p-6">
            <QrCode className="mx-auto h-24 w-24 text-gold-bright" strokeWidth={1} />
            <p className="mt-4 text-sm font-medium">
              Open AR on your mobile device
            </p>
            <p className="mt-1 text-xs text-ivory/60">
              AR requires a smartphone camera and floor sensors. Open this
              website on your mobile phone to view {siteName} in your
              physical space.
            </p>
          </div>
        )}

        {!modelUrl && isMobile !== null && (
          <div className="mt-8 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200">
            No 3D model path provided for {siteName}.
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 border-t border-ivory/10 pt-8 md:grid-cols-4">
        <FlowStep icon={<Smartphone />} label="Select monument" />
        <FlowStep icon={<Camera />} label="Grant camera access" />
        <FlowStep icon={<ScanLine />} label="Scan the ground" />
        <FlowStep icon={<Camera />} label="Place & explore in AR" />
      </div>
    </div>
  );
}

function FlowStep({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-gold-bright">
        {icon}
      </div>
      <p className="text-xs text-ivory/60">{label}</p>
    </div>
  );
}