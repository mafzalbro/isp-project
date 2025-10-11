export function formatDate(dateString: string) {
  // 2025-10-31T15:00:00Z

  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function formatPromiseDate(date: string): string {
  const promiseDate = new Date(date);
  const options = { day: "2-digit", month: "short" };
  return promiseDate.toLocaleDateString("en-GB", options as any); // Formats as "10 Oct"
}
