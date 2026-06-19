import { apiFetch } from "../api";

export type VolunteerPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience?: string;
  skills?: string;
  motivation?: string;
};

export type VolunteerResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function submitVolunteerApplication(
  payload: VolunteerPayload
): Promise<VolunteerResponse> {
  // Map volunteer fields into the contact endpoint since there is no
  // dedicated /volunteer backend route yet.
  const contactPayload = {
    fullName: `${payload.firstName} ${payload.lastName}`.trim(),
    email: payload.email,
    subject: "Volunteer Application",
    message: [
      `Phone: ${payload.phone || "N/A"}`,
      `Experience: ${payload.experience || "N/A"}`,
      `Skills: ${payload.skills || "N/A"}`,
      `Motivation: ${payload.motivation || "N/A"}`,
    ].join("\n"),
  };

  return apiFetch<VolunteerResponse>("/contact", {
    method: "POST",
    body: contactPayload,
    credentials: "omit",
  });
}
