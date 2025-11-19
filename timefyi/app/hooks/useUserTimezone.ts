"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export function useUserTimezone() {
  const [userTimezone, setUserTimezone] = useState<any>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lux = DateTime.now().setZone(tz);

    const [country, cityRaw] = tz.split("/");
    const city = cityRaw?.replace("_", " ") || "Unknown";
    const countryName = country || "Unknown";

    const offset = lux.offset / 60;
    const offsetHours = Math.floor(offset);
    const offsetMinutes = Math.abs((offset % 1) * 60);
    const gmtSign = offset >= 0 ? "+" : "-";

    const gmtOffset = `${String(Math.abs(offsetHours)).padStart(
      2,
      "0"
    )}:${String(offsetMinutes).padStart(2, "0")}`;

    const narrowOffset = `${gmtSign}${Math.abs(offset)}`;

    const abbreviatedName = `GMT${gmtSign}${Math.abs(offsetHours)}`;
    const name = `${countryName} Standard Time`;
    const title = `GMT${gmtSign}${gmtOffset} ${name} — ${city}`;

    setUserTimezone({
      id: `${tz}-${Date.now()}`,
      city,
      country: countryName,
      standardName: tz,
      name,
      title,
      offset,
      narrowOffset,
      abbreviatedName,
      gmtName: "GMT",
      gmtSign,
      gmtOffset,
      unabbreviatedName: name,
    });
  }, []);

  return userTimezone;
}
