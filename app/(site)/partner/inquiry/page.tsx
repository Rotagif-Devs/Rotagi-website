import PartnerInquiry from "@/components/Partner/PartnerInquiry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership Inquiry - ROTAGI",
  description:
    "Submit a partnership inquiry to ROTAGI and join us in empowering young African girls.",
};

export default function InquiryPage() {
  return <PartnerInquiry />;
}
