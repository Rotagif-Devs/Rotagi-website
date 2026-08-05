import { apiFetch } from "../api";
import { ApiResponse } from "./auth.service";

/**
 * Cohort portal service.
 *
 * Learner endpoints live under `/api/cohort/*` and are gated by a shared-PIN
 * "cohort access token" (separate from the admin JWT). We keep that token in
 * sessionStorage so it dies with the tab, and pass it explicitly to apiFetch so
 * it is never confused with the admin `accessToken` in localStorage.
 *
 * Admin endpoints live under `/api/admin/cohort/*` and use the normal admin JWT,
 * which apiFetch attaches automatically from localStorage.
 */

const COHORT_TOKEN_KEY = "cohort_token";

export const getCohortToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(COHORT_TOKEN_KEY);
};

export const setCohortToken = (token: string) => {
  sessionStorage.setItem(COHORT_TOKEN_KEY, token);
  // Kept for backward-compat with the existing gate check.
  sessionStorage.setItem("cohort_auth", "true");
};

export const clearCohortToken = () => {
  sessionStorage.removeItem(COHORT_TOKEN_KEY);
  sessionStorage.removeItem("cohort_auth");
};

export type CohortSettings = {
  materialsLink: string;
  missedClassesLink: string;
  certificatesLink: string;
};

export type CohortAnnouncement = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type AttendanceRecord = {
  date: string;
  status: "present" | "absent";
};

export type AttendanceSummary = {
  email: string;
  totalPresent: number;
  totalAbsent: number;
  records: AttendanceRecord[];
};

export const cohortService = {
  // --- Learner ---

  /** Validate the shared access PIN. Stores + returns the cohort access token. */
  validateAccessPin: async (pin: string): Promise<string> => {
    const res = await apiFetch<{ success: boolean; token?: string; message?: string }>(
      "/api/cohort/access",
      { method: "POST", body: { pin }, accessToken: null as unknown as string },
    );
    if (!res.token) {
      throw new Error(res.message || "Invalid Access PIN");
    }
    setCohortToken(res.token);
    return res.token;
  },

  /** Fetch the Google Drive links for the learner dashboard buttons. */
  getSettings: async (): Promise<CohortSettings> => {
    const res = await apiFetch<ApiResponse<CohortSettings>>("/api/cohort/settings", {
      accessToken: getCohortToken() ?? undefined,
      timeout: 15000,
    });
    return (
      res.data ?? { materialsLink: "", missedClassesLink: "", certificatesLink: "" }
    );
  },

  /** Fetch announcements (learner uses the cohort token). */
  getAnnouncements: async (limit?: number): Promise<CohortAnnouncement[]> => {
    const query = limit ? `?limit=${limit}` : "";
    const res = await apiFetch<ApiResponse<CohortAnnouncement[]>>(
      `/api/cohort/announcements${query}`,
      { accessToken: getCohortToken() ?? undefined, timeout: 15000 },
    );
    return res.data ?? [];
  },

  /**
   * Look up a learner's attendance by email.
   * Returns null when the admin hasn't uploaded records for that email (404).
   */
  getAttendanceRecord: async (email: string): Promise<AttendanceSummary | null> => {
    try {
      const res = await apiFetch<ApiResponse<AttendanceSummary>>(
        `/api/cohort/attendance/record?email=${encodeURIComponent(email)}`,
        { accessToken: getCohortToken() ?? undefined, timeout: 15000 },
      );
      return res.data ?? null;
    } catch (err: any) {
      // The backend returns 404 with a "have not been uploaded" message when no
      // records exist for the email — treat that as "no records yet", not an error.
      if (typeof err?.message === "string" && /not been uploaded|not found/i.test(err.message)) {
        return null;
      }
      throw err;
    }
  },

  // --- Admin (uses admin JWT from localStorage automatically) ---

  updateSettings: async (payload: {
    accessPin: string;
    materialsLink: string;
    missedClassesLink: string;
    certificatesLink: string;
  }): Promise<void> => {
    await apiFetch("/api/admin/cohort/settings", { method: "PUT", body: payload });
  },

  /** Announcements are readable by an admin JWT too via the same list endpoint. */
  getAnnouncementsAdmin: async (limit?: number): Promise<CohortAnnouncement[]> => {
    const query = limit ? `?limit=${limit}` : "";
    const res = await apiFetch<ApiResponse<CohortAnnouncement[]>>(
      `/api/cohort/announcements${query}`,
    );
    return res.data ?? [];
  },

  createAnnouncement: async (payload: {
    title: string;
    content: string;
  }): Promise<CohortAnnouncement> => {
    const res = await apiFetch<ApiResponse<CohortAnnouncement>>(
      "/api/admin/cohort/announcements",
      { method: "POST", body: payload },
    );
    return res.data!;
  },

  uploadAttendance: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<{ success: boolean; message?: string }>(
      "/api/admin/cohort/attendance/upload",
      { method: "POST", body: formData },
    );
    return res.message || "Attendance records processed and updated.";
  },
};
