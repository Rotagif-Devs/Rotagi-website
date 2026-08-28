import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Some posts/events were pasted from Word/Docs/AI drafts using real non-breaking
// spaces (U+00A0 / &nbsp;) instead of regular ones, leaving prose with no valid
// line-wrap points - the browser then hard-breaks mid-word to avoid overflowing.
// Normalizing them to regular spaces restores normal word wrapping.
export function normalizeRichTextHtml(html: string) {
  const NBSP = String.fromCharCode(0x00a0);
  return html.split(NBSP).join(" ").replace(/&nbsp;/gi, " ");
}
