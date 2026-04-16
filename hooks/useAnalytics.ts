"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPageView, EntityType } from "@/lib/services/analytics.service";

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    // Determine entity type based on path
    let entityType: EntityType = "page";
    let entityId: string | undefined = undefined;

    if (pathname.startsWith("/blog/")) {
      entityType = "blog_post";
      entityId = pathname.split("/").pop();
    } else if (pathname.startsWith("/events/")) {
      entityType = "event";
      entityId = pathname.split("/").pop();
    }

    trackPageView({
      entityType,
      entityId,
      path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    });
  }, [pathname, searchParams]);
}
