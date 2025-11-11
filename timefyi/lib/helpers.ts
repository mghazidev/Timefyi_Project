export default function getLocalDateString(date: Date = new Date()): string {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
  return localISOTime;
}
