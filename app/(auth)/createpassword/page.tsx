import CreatePassword from "@/components/createpassword/CreatePassword";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePassword />
    </Suspense>
  );
}