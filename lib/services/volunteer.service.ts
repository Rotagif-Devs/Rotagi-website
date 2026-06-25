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
  formData: FormData
): Promise<VolunteerResponse> {
  return apiFetch<VolunteerResponse>("/volunteer", {
    method: "POST",
    body: formData,
    credentials: "omit",
  });
}
