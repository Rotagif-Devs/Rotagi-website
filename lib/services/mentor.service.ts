import { apiFetch } from "../api";
import { ApiResponse } from "./auth.service";

export type MentorApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  yearsExperience: number;
  expertise: string;
  motivation: string;
  cv: File;
};

export async function submitMentorApplication(payload: MentorApplicationPayload): Promise<ApiResponse> {
  const formData = new FormData();
  
  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("location", payload.location);
  formData.append("linkedInUrl", payload.linkedInUrl);
  formData.append("yearsExperience", payload.yearsExperience.toString());
  formData.append("expertise", payload.expertise);
  formData.append("motivation", payload.motivation);
  formData.append("cv", payload.cv);

  return apiFetch<ApiResponse>("/mentors/applications", {
    method: "POST",
    body: formData,
  });
}
