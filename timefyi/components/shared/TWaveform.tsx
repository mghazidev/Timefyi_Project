// "use client";
// import React from "react";
// import { useState, useRef, useEffect } from "react";
// import { Code2 } from "lucide-react";

// export default function AudioWaveform() {
//   const [currentTime, setCurrentTime] = useState(6);
//   const [isDragging, setIsDragging] = useState(false);
//   const duration = 24;
//   const totalBars = 60;

//   const timelineRef = useRef<HTMLDivElement | null>(null);

//   const barHeights = React.useMemo(() => {
//     return Array.from({ length: totalBars }, (_, i) => {
//       const isMajor = i % 5 === 0;
//       const baseHeight = isMajor ? 16 : 10;
//       const randomVariation = ((i * 37) % 4) - 2; // deterministic "randomness"
//       return baseHeight + randomVariation;
//     });
//   }, [totalBars]);

//   // ✅ Compute waveform with stable heights
//   const waveformBars = barHeights.map((height, i) => {
//     const position = (i / totalBars) * duration;
//     const isNearPlayhead = Math.abs(position - currentTime) < 0.5;
//     const isMajor = i % 5 === 0;
//     const isPassed = position < currentTime;
//     return { height, isPassed, isNearPlayhead, isMajor };
//   });

//   const majorTimeMarkers = [
//     { value: "00", position: 0 },
//     { value: "06", position: 25 },
//     { value: "12", position: 50 },
//     { value: "18", position: 75 },
//     { value: "24", position: 100 },
//   ];

//   const playheadPosition = (currentTime / duration) * 100;

//   // Convert X position to time
//   const clientXToTime = (clientX: number) => {
//     const el = timelineRef.current;
//     if (!el) return 0;
//     const rect = el.getBoundingClientRect();
//     const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
//     const percent = x / rect.width;
//     return percent * duration;
//   };

//   // Mouse drag handlers
//   useEffect(() => {
//     const onMouseMove = (e: MouseEvent) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       const newTime = clientXToTime(e.clientX);
//       setCurrentTime(newTime);
//     };

//     const onMouseUp = () => {
//       if (!isDragging) return;
//       setIsDragging(false);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };
//   }, [isDragging]);

//   // Touch drag handlers
//   useEffect(() => {
//     const onTouchMove = (e: TouchEvent) => {
//       if (!isDragging) return;
//       const touch = e.touches[0];
//       if (!touch) return;
//       const newTime = clientXToTime(touch.clientX);
//       setCurrentTime(newTime);
//     };

//     const onTouchEnd = () => {
//       if (!isDragging) return;
//       setIsDragging(false);
//     };

//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//     window.addEventListener("touchend", onTouchEnd);
//     window.addEventListener("touchcancel", onTouchEnd);
//     return () => {
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//       window.removeEventListener("touchcancel", onTouchEnd);
//     };
//   }, [isDragging]);

//   // Start drag from playhead
//   const startDragFromPlayhead = (e: any) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const onTimelinePointerDown = (e: any) => {
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const newTime = clientXToTime(clientX);
//     setCurrentTime(newTime);
//     setIsDragging(true);
//   };

//   const onTimelinePointerUp = () => setIsDragging(false);

//   return (
//     <div className="w-full max-w-[303px] mx-auto">
//       <div>
//         {/* Timeline */}
//         <div
//           className="relative h-12"
//           ref={timelineRef}
//           onMouseDown={onTimelinePointerDown}
//           onTouchStart={onTimelinePointerDown}
//           onMouseUp={onTimelinePointerUp}
//           onTouchEnd={onTimelinePointerUp}
//         >
//           {/* Bars */}
//           <div className="absolute inset-0 flex items-end justify-between px-[1px]">
//             {waveformBars.map((bar, i) => (
//               <div
//                 key={i}
//                 className={`rounded-sm transition-all duration-150 ${
//                   bar.isPassed
//                     ? bar.isNearPlayhead
//                       ? "bg-white"
//                       : "bg-zinc-400"
//                     : "bg-zinc-700"
//                 }`}
//                 style={{
//                   height: `${bar.height}px`,
//                   width: bar.isMajor ? "3px" : "2px",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Playhead */}
//           <div
//             className="absolute top-8 bottom-0 flex items-center justify-center z-20"
//             style={{
//               left: `${playheadPosition}%`,
//               transform: "translateX(-50%)",
//               pointerEvents: "none",
//             }}
//           >
//             <div
//               onMouseDown={startDragFromPlayhead}
//               onTouchStart={(e) => {
//                 e.preventDefault();
//                 setIsDragging(true);
//               }}
//               className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-zinc-900 cursor-grab ${
//                 isDragging ? "cursor-grabbing" : ""
//               }`}
//               style={{
//                 pointerEvents: "auto",
//                 transition: isDragging ? "none" : undefined,
//                 userSelect: "none",
//                 touchAction: "none",
//               }}
//             >
//               <Code2 className="w-4 h-4 text-black" />
//             </div>
//           </div>

//           {isDragging && (
//             <div
//               className="fixed inset-0 z-30"
//               onMouseDown={(e) => e.preventDefault()}
//               onTouchStart={(e) => e.preventDefault()}
//             />
//           )}
//         </div>

//         {/* Time markers */}
//         <div className="relative h-6">
//           {majorTimeMarkers.map((marker) => (
//             <div
//               key={marker.value}
//               className="absolute top-3"
//               style={{ left: `${marker.position}%` }}
//             >
//               <span className="text-xs text-zinc-500 font-mono -translate-x-1/2 absolute left-0">
//                 {marker.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// components/shared/TWaveform.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";

type Props = {
  value?: number; // hours between 0 and 24
  onChange?: (hours: number) => void;
  duration?: number; // optional, default 24
  totalBars?: number; // optional, default 60
};

export default function AudioWaveform({
  value,
  onChange,
  duration = 24,
  totalBars = 60,
}: Props) {
  const [currentTime, setCurrentTime] = useState<number>(value ?? 0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // keep internal state in sync when parent updates value
  useEffect(() => {
    if (typeof value === "number" && !isDragging) {
      setCurrentTime(value);
    }
  }, [value, isDragging]);

  const barHeights = React.useMemo(() => {
    return Array.from({ length: totalBars }, (_, i) => {
      const isMajor = i % 5 === 0;
      const baseHeight = isMajor ? 16 : 10;
      const randomVariation = ((i * 37) % 4) - 2;
      return baseHeight + randomVariation;
    });
  }, [totalBars]);

  const waveformBars = barHeights.map((height, i) => {
    const position = (i / totalBars) * duration;
    const isNearPlayhead = Math.abs(position - currentTime) < 0.5;
    const isMajor = i % 5 === 0;
    const isPassed = position < currentTime;
    return { height, isPassed, isNearPlayhead, isMajor };
  });

  const playheadPosition = (currentTime / duration) * 100;

  const clientXToTime = (clientX: number) => {
    const el = timelineRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;
    return percent * duration;
  };

  // pointer handlers (mouse + touch)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const newTime = clientXToTime(e.clientX);
      setCurrentTime(newTime);
      if (onChange) onChange(newTime);
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      if (!touch) return;
      const newTime = clientXToTime(touch.clientX);
      setCurrentTime(newTime);
      if (onChange) onChange(newTime);
    };
    const onTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
    };
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isDragging]);

  // start dragging from playhead
  const startDragFromPlayhead = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTimelinePointerDown = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newTime = clientXToTime(clientX);
    setCurrentTime(newTime);
    if (onChange) onChange(newTime);
    setIsDragging(true);
  };

  const onTimelinePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-[303px] mx-auto select-none">
      <div>
        <div
          className="relative h-12"
          ref={timelineRef}
          onMouseDown={onTimelinePointerDown}
          onTouchStart={onTimelinePointerDown}
          onMouseUp={onTimelinePointerUp}
          onTouchEnd={onTimelinePointerUp}
        >
          <div className="absolute inset-0 flex items-end justify-between px-[1px]">
            {waveformBars.map((bar, i) => (
              <div
                key={i}
                className={`rounded-sm transition-all duration-150 ${
                  bar.isPassed
                    ? bar.isNearPlayhead
                      ? "bg-white"
                      : "bg-zinc-400"
                    : "bg-zinc-700"
                }`}
                style={{
                  height: `${bar.height}px`,
                  width: bar.isMajor ? "3px" : "2px",
                }}
              />
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-8 bottom-0 flex items-center justify-center z-20"
            style={{
              left: `${playheadPosition}%`,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <div
              onMouseDown={startDragFromPlayhead}
              onTouchStart={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-zinc-900 cursor-grab ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              style={{
                pointerEvents: "auto",
                transition: isDragging ? "none" : undefined,
                userSelect: "none",
                touchAction: "none",
              }}
            >
              <Code2 className="w-4 h-4 text-black" />
            </div>
          </div>

          {isDragging && (
            <div
              className="fixed inset-0 z-30"
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
            />
          )}
        </div>

        {/* Time markers */}
        <div className="relative h-6">
          {[
            { value: "00", position: 0 },
            { value: "06", position: 25 },
            { value: "12", position: 50 },
            { value: "18", position: 75 },
            { value: "24", position: 100 },
          ].map((marker) => (
            <div
              key={marker.value}
              className="absolute top-3"
              style={{ left: `${marker.position}%` }}
            >
              <span className="text-xs text-zinc-500 font-mono -translate-x-1/2 absolute left-0">
                {marker.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
