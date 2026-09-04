"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Compass } from "lucide-react";


function Dome({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}
export default function DroneView({
  droneImageUrl,
}: {
  droneImageUrl: string | null;
}) {
  const panoImage = droneImageUrl ?? "/images/placeholder-heritage.jpg";

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-[#1C1613] px-3 py-1 text-xs font-medium text-[#FDFBF7]">
          <Compass className="h-3.5 w-3.5 text-[#D4AF37]" /> Interactive 360° Panoramic View
        </div>
        <span className="text-xs text-[#5C4D44]">Click and drag to look around</span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[#D4AF37]/30 shadow-xl bg-[#1a1a1a]">
        <Canvas camera={{ position: [0, 0, 0.1] }}>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            rotateSpeed={-0.5} 
          />
          <Suspense fallback={null}>
            <Dome imageUrl={panoImage} />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-xs px-4 py-1.5 rounded-full font-sans tracking-wide pointer-events-none">
          Drag to explore • Scroll to zoom
        </div>
      </div>
    </div>
  );
}