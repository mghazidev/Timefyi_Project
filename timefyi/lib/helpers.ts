export default function getLocalDateString(date: Date = new Date()): string {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
  return localISOTime;
}

export function normalizeTimezone(tz: any) {
  return {
    id: tz.id || `${tz.standardName}-${Date.now()}`,
    title: tz.title || `${tz.abbreviatedName} ${tz.name} — ${tz.city}`,
    name: tz.name || tz.city || "Unknown",
    city: tz.city || "",
    country: tz.country || "",
    standardName: tz.standardName || tz.id || "",
    abbreviatedName: tz.abbreviatedName || "",
    gmtName: tz.gmtName || "GMT",
    gmtSign: tz.gmtSign || "+",
    gmtOffset: tz.gmtOffset || "00:00",
    narrowOffset: tz.narrowOffset || "+0",
    offset: typeof tz.offset === "number" ? tz.offset : Number(tz.narrowOffset),
  };
}
