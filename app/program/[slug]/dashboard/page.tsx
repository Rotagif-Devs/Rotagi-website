"use client";

import WelcomeSection from "@/components/dashboard/Welcome";
import LearningSection from "@/components/dashboard/LearningSection";
import { useDashboardAuth } from "@/hooks/useDashboard";
import Searchbar from "@/components/dashboard/Searchbar";

export default function DashboardPage() {
  const { userInfo } = useDashboardAuth();
  
  return (
    <div className="space-y-6 py-4">
      <WelcomeSection fullName={userInfo?.fullName || ""} />
       <div className="md:hidden">
        <Searchbar />
      </div>
      <LearningSection />
    </div>
  );
}
