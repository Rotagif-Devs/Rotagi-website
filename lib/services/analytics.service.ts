import { apiFetch } from "../api";

export type EntityType = "blog_post" | "event" | "page";

export type PageViewPayload = {
  entityType: EntityType;
  entityId?: string;
  path: string;
};

const VISITOR_ID_KEY = "rv_visitor_id";

function getOrGenerateVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export async function trackPageView(payload: PageViewPayload): Promise<void> {
  const visitorId = getOrGenerateVisitorId();
  
  try {
    await apiFetch("/analytics/pageviews", {
      method: "POST",
      body: {
        ...payload,
        visitorId,
      },
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
}
