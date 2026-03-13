import PartnerInquiry from "@/components/Partner/PartnerInquiry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership Inquiry - ROTAGIF",
  description:
    "Submit a partnership inquiry to ROTAGIF and join us in empowering young African girls.",
};

export default function InquiryPage() {
  return <PartnerInquiry />;
}
