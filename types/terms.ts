export type TermsSection = {
  id: string;
  title: string;
  content: string[];
  list?: string[];
  last?: string[];
  contactInfo?: {
    organisation: string;
    generalEnquiries: string;
    safeguarding: string;
    partnerships: string;
    phone: string;
  };
};