"use client";
import React, { useRef, useState } from "react";
import PictureModeIcon from "@/components/icons/PictureModeIcon";
import EditableIcon from "@/components/icons/EditableIcon";
import FullscreenIcon from "@/components/icons/FullscreenIcon";
import SmallScreenIcon from "../icons/SmallScreenIcon";

export default function PomodoroRightLayout() {
  const rightSideRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await rightSideRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={rightSideRef}
      className="flex flex-col p-3 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300"
    >
      <div className="flex gap-2 justify-end text-zinc-500">
        <PictureModeIcon size={16} className="hover:text-zinc-200" />
        <EditableIcon size={16} className="hover:text-zinc-200" />
        <button
          onClick={handleToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="hover:text-zinc-200 transition-colors"
        >
          {isFullscreen ? (
            <SmallScreenIcon size={16} />
          ) : (
            <FullscreenIcon size={16} />
          )}
        </button>
      </div>

      <div className="flex-1 mt-4 text-zinc-300"></div>
    </div>
  );
}
