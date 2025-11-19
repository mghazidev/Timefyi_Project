import { DateTime } from "luxon";

export function formatTimezoneObject(
  city: string,
  country: string,
  zone: string
) {
  const now = DateTime.now().setZone(zone);
  const offsetMinutes = now.offset;
  const offsetHours = offsetMinutes / 60;

  const gmtSign = offsetHours >= 0 ? "+" : "-";
  const gmtName = "GMT";

  const gmtOffset = now.toFormat("HH:mm");
  const narrowOffset = offsetHours.toString();

  const name = now.offsetNameLong;
  const abbreviatedName = now.offsetNameShort;
  const unabbreviatedName = name;

  return {
    id: `${zone}=x=${city}`,
    standardName: zone,
    gmtName,
    gmtSign,
    gmtOffset,
    city,
    country,
    name,
    title: `${abbreviatedName} ${name} — ${city}`,
    abbreviatedName,
    narrowOffset,
    unabbreviatedName,
  };
}
