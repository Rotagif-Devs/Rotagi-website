export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** ~200 words/minute, based on the post's plain-text content length. */
export function estimateReadMinutes(content: string): number {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
