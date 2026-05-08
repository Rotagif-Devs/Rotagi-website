// components/SheEmpowerJourney.tsx

const audience = [
  {
    title: "Ages 10–18",
    subtitle: "Young Innovators",
    items: [
      "Exploring Artificial Intelligence and Technology",
      "Building Confidence & Leadership",
      "Discovering Creativity And Life Skills",
    ],
  },
  {
    title: "Ages 18–40",
    subtitle: "Emerging & Professional Women",
    items: [
      "Students Looking For Career Motivation",
      "Women Transitioning Into Tech",
      "Entrepreneurs And Changemakers",
    ],
  },
];

const expectations = [
  {
    title: "Inspiring Speakers",
    desc: "Hear from African women leaders, innovators, and changemakers sharing their journeys.",
    bg: "bg-[#FFD6E7]",
  },
  {
    title: "Hands On Workshops",
    desc: "Practical sessions on AI, digital literacy, and life skills.",
    bg: "bg-[#E5E1FF]",
  },
  {
    title: "Scholarship Announcements",
    desc: "Opportunities and resources designed to support growth.",
    bg: "bg-[#DDEBFF]",
  },
  {
    title: "Games & Challenges",
    desc: "Interactive activities that encourage teamwork and creativity.",
    bg: "bg-[#DDF8DF]",
  },
  {
    title: "Food & Wellness",
    desc: "Nutritious meals, wellness activities, and moments to connect authentically.",
    bg: "bg-[#FFF1CC]",
  },
  {
    title: "Recognition & Celebration",
    desc: "Celebrating participation, growth, and the brilliance of every African girl.",
    bg: "bg-[#F9D7E8]",
  },
];

const values = [
  {
    title: "Inclusive",
    desc: "Welcoming girls of all backgrounds, abilities, and communities.",
  },
  {
    title: "Accessible",
    desc: "Designed to be barrier-free, with scholarships, support, and safe spaces.",
  },
  {
    title: "Community Driven",
    desc: "Built with local changemakers, mentors, and meaningful partnerships.",
  },
  {
    title: "Not For Profit",
    desc: "Every resource goes back into empowering more African girls and creating lasting impact.",
  },
];

export default function SheEmpowerJourney() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-28">
        {/* SECTION 1 */}
        <div className="text-center">
          <p className=" font-medium text-[#D62D88]">Who This Is For</p>

          <h3 className="mt-3 font-medium uppercase text-black ">
            Everyone On The Journey
          </h3>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {audience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#D62D88] p-8 text-left text-white"
              >
                <p className="font-medium">{item.title}</p>

                <h5 className="mt-2 font-medium">{item.subtitle}</h5>

                <ul className="mt-3 space-y-3">
                  {item.items.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm leading-6 text-white/90"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="pt-15">
          <div className="text-center">
            <p className="font-medium text-[#D62D88]">What To Expect</p>

            <h2 className="mx-auto mt-3 max-w-3xl font-medium uppercase leading-tight text-black">
              A Full Day Of Learning Inspiration And Celebration
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {expectations.map((item) => (
              <div key={item.title} className={`rounded-2xl p-6 ${item.bg}`}>
                <h5 className=" font-medium text-black">{item.title}</h5>

                <p className="mt-1 text-sm leading-7 text-gray-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 */}
        <div className=" pt-15">
          <div className="text-center">
            <p className="text-sm font-medium text-[#D62D88]">
              What Makes SHE Empower Different
            </p>

            <h2 className="mt-3 text-3xl font-bold uppercase text-black md:text-5xl">
              Built On Values That Matter
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {values.map((item) => (
              <div key={item.title} className="flex items-start gap-5">
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D62D88] text-white">
                  ✦
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-medium text-black">{item.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
