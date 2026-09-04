"use client";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function PlayOnClickVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-card bg-black aspect-video">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        loop
        controls={started}
        className="w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>

      {!started && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="h-7 w-7 text-gold fill-gold ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
