import { apiFetch } from "../api";

export type PartnershipInterestPayload = {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  interestAreas?: string[];
  message?: string;
};

export type PartnershipInterestResponse = {
  success: boolean;
  message?: string;
  data?: {
    message: string;
    interestId: string;
  };
};

export async function submitPartnershipInterest(
  payload: PartnershipInterestPayload
): Promise<PartnershipInterestResponse> {
  return apiFetch<PartnershipInterestResponse>("/partnerships/interest", {
    method: "POST",
    body: payload,
  });
}
