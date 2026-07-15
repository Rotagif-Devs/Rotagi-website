import ProgramsHero from "@/components/programs/ProgramsHero";
import PTA from "@/components/globalComp/PTA";
import CourseGrid from "@/components/cohort/CourseGrid";

export const metadata = {
  title: "Tech Cohorts | ROTAGIF",
  description: "Join our intensive tech cohorts and master Vibe Code, Graphics Design, Web Development, and more.",
};

export default function CohortPage() {
  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-32 font-dm-sans overflow-x-hidden">
      {/* Hero Section */}
      <ProgramsHero
        title="TECH COHORTS"
        description="Jumpstart your tech career. Master in-demand skills alongside passionate peers in our intensive, hands-on learning cohorts."
      />

      {/* Courses Grid with Closed Modal */}
      <CourseGrid />

      {/* Global Call to Action */}
      <div className="bg-white border-t border-gray-100 mt-20">
        <PTA />
      </div>
    </main>
  );
}
