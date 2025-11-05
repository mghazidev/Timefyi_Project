"use client";

import { useEffect, useState } from "react";

export function useTimezoneClock() {
  const [globalTime, setGlobalTime] = useState(() => {
    const now = new Date();
    return now.getUTCHours() + now.getUTCMinutes() / 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setGlobalTime(now.getUTCHours() + now.getUTCMinutes() / 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return [globalTime, setGlobalTime] as const;
}
