interface WelcomeSectionProps {
  fullName?: string;
}
export default function WelcomeSection({
  fullName = "",
}: WelcomeSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-[2rem] font-bold text-[#202437] md:text-[2.2rem]">
        Welcome, {fullName}
      </h2>
      <p className="mt-3  text-[1rem] leading-7 text-[#2E2E2E] md:text-[1.05rem]">
        Begin your learning journey and discover different learning paths.
      </p>
    </section>
  );
}