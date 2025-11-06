"use client";

import { useEffect, useState } from "react";

export function useTimezoneClock() {
  const [globalTime, setGlobalTime] = useState(() => {
    const now = new Date();
    return now.getUTCHours() + now.getUTCMinutes() / 60;
  });

  const [isRunning, setIsRunning] = useState(true); // new

  useEffect(() => {
    if (!isRunning) return; // skip ticking when paused
    const interval = setInterval(() => {
      const now = new Date();
      setGlobalTime(now.getUTCHours() + now.getUTCMinutes() / 60);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return [globalTime, setGlobalTime, isRunning, setIsRunning] as const;
}
