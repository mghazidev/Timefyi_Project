"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export function useUserTimezone() {
  const [userTimezone, setUserTimezone] = useState<{
    id: string;
    name: string;
    offset: number;
  } | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = DateTime.now().setZone(tz).offset / 60; // minutes → hours
    const city = tz.split("/")[1]?.replace("_", " ") || "Unknown";
    const country = tz.split("/")[0] || "Unknown";

    setUserTimezone({
      id: `${tz}-${Date.now()}`,
      name: `${city}, ${country}`,
      offset,
    });
  }, []);

  return userTimezone;
}
