import { apiFetch, API_BASE_URL } from "../api";
import { getAccessToken } from "../token.service";
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

export type CertificateRecord = {
  email: string;
  fullName: string;
  /** A `data:image/png;base64,...` data URL — the composited certificate, rendered on demand. */
  certificateImage: string;
  /** A `data:application/pdf;base64,...` data URL of the same certificate, for learners who want a PDF. */
  certificatePdf: string;
};

export type CertificateTemplateConfig = {
  imageUrl: string;
  nameX: number;
  nameY: number;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
};

export type CertificateTemplateStatus = {
  template: CertificateTemplateConfig | null;
  certificatesEnabled: boolean;
  eligibleLearnerCount: number;
};

export type AttendanceWindowStatus = {
  open: boolean;
  date: string | null;
};

export type AttendanceWindowAdminStatus = AttendanceWindowStatus & {
  tickedCount: number;
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
    });
    return res.data ?? { materialsLink: "", missedClassesLink: "" };
  },

  /** Fetch announcements (learner uses the cohort token). */
  getAnnouncements: async (limit?: number): Promise<CohortAnnouncement[]> => {
    const query = limit ? `?limit=${limit}` : "";
    const res = await apiFetch<ApiResponse<CohortAnnouncement[]>>(
      `/api/cohort/announcements${query}`,
      { accessToken: getCohortToken() ?? undefined },
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
        { accessToken: getCohortToken() ?? undefined },
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

  /**
   * Look up + render a learner's certificate by name and email.
   * Returns null when there's no matching eligible learner (404) — a wrong
   * name/email combo and an email that was never uploaded look identical here
   * on purpose. Other errors (e.g. certificates not yet turned on, no
   * template configured) are thrown so the UI can show a real explanation.
   */
  getCertificateRecord: async (email: string, fullName: string): Promise<CertificateRecord | null> => {
    try {
      const res = await apiFetch<ApiResponse<CertificateRecord>>(
        `/api/cohort/certificate/record?email=${encodeURIComponent(email)}&fullName=${encodeURIComponent(fullName)}`,
        { accessToken: getCohortToken() ?? undefined },
      );
      return res.data ?? null;
    } catch (err: any) {
      if (typeof err?.message === "string" && /no certificate found/i.test(err.message)) {
        return null;
      }
      throw err;
    }
  },

  /** Whether today's self-tick attendance window is currently open. */
  getAttendanceWindow: async (): Promise<AttendanceWindowStatus> => {
    const res = await apiFetch<ApiResponse<AttendanceWindowStatus>>("/api/cohort/attendance/window", {
      accessToken: getCohortToken() ?? undefined,
    });
    return res.data ?? { open: false, date: null };
  },

  /** Marks the learner present for today. Throws (with a real message) if the window isn't open. */
  markAttendance: async (email: string): Promise<{ date: string }> => {
    const res = await apiFetch<ApiResponse<{ date: string }>>("/api/cohort/attendance/mark", {
      method: "POST",
      body: { email },
      accessToken: getCohortToken() ?? undefined,
    });
    return res.data!;
  },

  // --- Admin (uses admin JWT from localStorage automatically) ---

  updateSettings: async (payload: {
    accessPin: string;
    materialsLink: string;
    missedClassesLink: string;
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

  getAttendanceWindowStatus: async (): Promise<AttendanceWindowAdminStatus> => {
    const res = await apiFetch<ApiResponse<AttendanceWindowAdminStatus>>("/api/admin/cohort/attendance/window");
    return res.data ?? { open: false, date: null, tickedCount: 0 };
  },

  toggleAttendanceWindow: async (open: boolean): Promise<void> => {
    await apiFetch("/api/admin/cohort/attendance/window", { method: "PUT", body: { open } });
  },

  /** Downloads the full attendance workbook (one sheet per date) straight to the browser. */
  exportAttendance: async (): Promise<void> => {
    const token = getAccessToken();
    const res = await fetch(`${API_BASE_URL}/api/admin/cohort/attendance/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Failed to export attendance (${res.status})`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cohort-attendance.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },

  uploadCertificates: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<{ success: boolean; message?: string }>(
      "/api/admin/cohort/certificates/upload",
      { method: "POST", body: formData },
    );
    return res.message || "Certificate records processed and updated.";
  },

  getCertificateTemplate: async (): Promise<CertificateTemplateStatus> => {
    const res = await apiFetch<ApiResponse<CertificateTemplateStatus>>(
      "/api/admin/cohort/certificates/template",
    );
    return res.data ?? { template: null, certificatesEnabled: false, eligibleLearnerCount: 0 };
  },

  /** `file` is null when only repositioning/restyling an already-saved template. */
  saveCertificateTemplate: async (payload: {
    file: File | null;
    nameX: number;
    nameY: number;
    fontSize: number;
    fontColor: string;
    fontFamily: string;
  }): Promise<CertificateTemplateConfig> => {
    const formData = new FormData();
    if (payload.file) formData.append("file", payload.file);
    formData.append("nameX", String(payload.nameX));
    formData.append("nameY", String(payload.nameY));
    formData.append("fontSize", String(payload.fontSize));
    formData.append("fontColor", payload.fontColor);
    formData.append("fontFamily", payload.fontFamily);

    const res = await apiFetch<ApiResponse<CertificateTemplateConfig>>(
      "/api/admin/cohort/certificates/template",
      { method: "POST", body: formData },
    );
    return res.data!;
  },

  /** Also turns certificates off for learners — a dangling "ON" with no template would just 404. */
  deleteCertificateTemplate: async (): Promise<void> => {
    await apiFetch("/api/admin/cohort/certificates/template", { method: "DELETE" });
  },

  toggleCertificates: async (enabled: boolean): Promise<void> => {
    await apiFetch("/api/admin/cohort/certificates/toggle", {
      method: "PUT",
      body: { enabled },
    });
  },
};
