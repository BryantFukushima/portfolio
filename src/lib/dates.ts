// `as const` keeps each name as its exact text and makes the list read-only.
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

// "2023-06" → "Jun 2023". Reads the string directly instead of using Date, so time zones can't
// shift the month. The content schema guarantees the YYYY-MM format.
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
