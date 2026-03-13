import { Metadata } from "next";
import Partner from "@/components/Partner/Partner";

export const metadata: Metadata = {
  title: "Partner with Us - ROTAGIF",
  description:
    "Join us in empowering young African girls and women with AI literacy, digital confidence, and leadership skills.",
};

export default function PartnerPage() {
  return <Partner />;
}
