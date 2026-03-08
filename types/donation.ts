export type DonationData = {
  email: string;
  fullName: string;
  phone: string;
  message?: string;
  amount: string;
  cardNumber?: string;
  cardholderName?: string;
  CVV?: string;
  expiryDate?: string;
};

export type CardInputs = {
  cardNumber: string;
  cardholderName: string;
  CVV: string;
  expiryDate: string;
};

export type DonationDetailsInputs = Omit<
  DonationData,
  "cardNumber" | "cardholderName" | "CVV" | "expiryDate"
>;