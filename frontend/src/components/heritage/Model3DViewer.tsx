"use client";

import { useState, Suspense } from "react";
import { RotateCw, ZoomIn, ZoomOut, Move, Maximize, Info } from "lucide-react";
import { HeritageObject } from "@/types/heritage";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface Model3DViewerProps {
  modelUrl: string | null;
  objects: HeritageObject[];
  siteName: string;
}

export default function Model3DViewer({
  modelUrl,
  objects,
  siteName,
}: Model3DViewerProps) {
  const [selected, setSelected] = useState<HeritageObject | null>(
    objects[0] ?? null
  );
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Viewport */}
      {/* Viewport */}
      <div className="relative h-[550px] w-full overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-br from-cream to-ivory shadow-card">
        {!modelUrl && (
          <div className="absolute left-4 top-4 rounded-full bg-brown/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ivory z-10">
            Demo Placeholder — no .glb model attached
          </div>
        )}

        <div className="h-full w-full absolute inset-0">
          {modelUrl ? (
            <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 5, 2]} intensity={1} />
                <Stage environment="city" intensity={0.5}>
                  <Model url={modelUrl} />
                </Stage>
                {/* <OrbitControls enablePan enableZoom enableRotate autoRotate /> */}
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={false} />
              </Suspense>
            </Canvas>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${rotation}deg) scale(${zoom})` }}
            >
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-gold/40 text-center text-xs text-brown/40 md:h-56 md:w-56">
                3D model of
                <br />
                {siteName}
              </div>
            </div>
          )}
        </div>

        {/* Hotspot markers */}
        {objects.map((obj, i) => (
          <button
            key={obj.id}
            onClick={() => setSelected(obj)}
            style={{
              left: `${30 + i * 15}%`,
              top: `${25 + (i % 2) * 35}%`,
            }}
            className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-ivory shadow-gold ring-4 ring-ivory/60 transition-transform hover:scale-110 z-10"
            aria-label={`Show info about ${obj.name}`}
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        ))}

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ivory/90 px-3 py-2 shadow-card backdrop-blur z-10">
          <IconButton onClick={() => setRotation((r) => r - 45)} label="Rotate left">
            <RotateCw className="h-4 w-4 -scale-x-100" />
          </IconButton>
          <IconButton onClick={() => setRotation((r) => r + 45)} label="Rotate right">
            <RotateCw className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={() => setZoom((z) => Math.min(2, z + 0.2))} label="Zoom in">
            <ZoomIn className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))} label="Zoom out">
            <ZoomOut className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={() => { setZoom(1); setRotation(0); }} label="Reset view">
            <Move className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={() => {}} label="Fullscreen">
            <Maximize className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      {/* Info panel */}
      <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Explore the Architecture
        </p>
        {selected ? (
          <>
            <h3 className="mt-3 font-display text-xl font-semibold text-brown">
              {selected.name}
            </h3>
            <p className="mt-3 text-sm text-brown/70">{selected.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Why it matters
            </p>
            <p className="mt-1 text-sm text-brown/70">
              {selected.historical_significance}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-brown/50">
            Click a marker on the model to learn about that element.
          </p>
        )}

        <div className="mt-6 space-y-2">
          {objects.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setSelected(obj)}
              className={
                "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors " +
                (selected?.id === obj.id
                  ? "bg-cream text-gold-dark"
                  : "text-brown/60 hover:bg-cream/60")
              }
            >
              {obj.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-brown/70 transition-colors hover:bg-cream hover:text-gold"
    >
      {children}
    </button>
  );
}