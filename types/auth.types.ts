// types/auth.types.ts
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  birthDate: string;
  programId: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  commsOptIn: boolean;
}