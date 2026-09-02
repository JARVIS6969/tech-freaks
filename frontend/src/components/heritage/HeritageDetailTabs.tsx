"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Camera, Video, Plane, GitCompareArrows } from "lucide-react";
import { HeritageSite, HeritageObject } from "@/types/heritage";
import VRTour from "./VRTour";
import DroneView from "./DroneView";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { cn } from "@/lib/utils";

const Model3DViewer = dynamic(() => import("./Model3DViewer"), { ssr: false });
const ARExperience = dynamic(() => import("./ARExperience"), { ssr: false });

type Tab = "3d" | "ar" | "vr" | "drone" | "reconstruction";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "3d", label: "3D View", icon: <Box className="h-4 w-4" /> },
  { id: "ar", label: "AR Experience", icon: <Camera className="h-4 w-4" /> },
  { id: "vr", label: "VR Tour", icon: <Video className="h-4 w-4" /> },
  { id: "drone", label: "Drone Tour", icon: <Plane className="h-4 w-4" /> },
  {
    id: "reconstruction",
    label: "Then vs Now",
    icon: <GitCompareArrows className="h-4 w-4" />,
  },
];

export default function HeritageDetailTabs({
  site,
  objects,
}: {
  site: HeritageSite;
  objects: HeritageObject[];
}) {
  const [active, setActive] = useState<Tab>("3d");

  return (
    <div id="experience" className="scroll-mt-24">
      <div className="flex flex-wrap justify-center gap-2 border-b border-gold/15 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`experience-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-gold bg-gold text-ivory shadow-gold"
                : "border-gold/20 text-brown/60 hover:border-gold hover:text-gold"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {active === "3d" && (
          <Model3DViewer
            modelUrl={site.model_3d_url}
            objects={objects}
            siteName={site.name}
          />
        )}
        {active === "ar" && <ARExperience siteName={site.name} modelUrl={site.model_3d_url} />}
        {active === "vr" && <VRTour vrTourUrl={site.vr_tour_url} />}
        {active === "drone" && <DroneView droneImageUrl={site.drone_view_url} />}
        {active === "reconstruction" && (
          <BeforeAfterSlider
            beforeImage={
              site.historical_reconstruction_url ?? site.gallery_images[0] ?? site.main_image
            }
            afterImage={site.main_image}
          />
        )}
      </div>
    </div>
  );
}
