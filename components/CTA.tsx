import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-linear-to-br from-pink-100 via-purple-50 to-pink-100 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
          Join Us in Empowering the Next Generation
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto">
          Whether through donations, mentorship, or partnerships — your support creates lasting change.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="primary" size="lg">
            Donate Now
          </Button>
          <Button variant="outline" size="lg">
            Explore Programs →
          </Button>
        </div>
      </div>
    </section>
  );
}