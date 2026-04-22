import Image from "next/image";
import { Heart, Users, Award, Clock } from 'lucide-react';
import Button from "../ui/Button";


const features = [
  {
    title: "Give Back",
    description: "Share your journey and help others avoid common pitfalls",
    icon: <Heart className="w-6 h-6 text-[#D81B7E]" fill="currentColor" />,
  },
  {
    title: "Build Connections",
    description: "Expand your network and learn from mentees",
    icon: <Users className="w-6 h-6 text-[#D81B7E]" fill="currentColor" />,
  },
  {
    title: "Develop Skills",
    description: "Enhance your leadership and communication abilities",
    icon: <Award className="w-6 h-6 text-[#D81B7E]" fill="currentColor" />,
  },
  {
    title: "Flexible Schedule",
    description: "Commit as much time as works for you",
    icon: <Clock className="w-6 h-6 text-[#D81B7E]" fill="currentColor" />,
  },
];

const page = () => {
  return (
    <div>
        <div className="mt-10 font-sans">
  
  <section className="relative lg:mx-4 min-h-[400px] md:min-h-[500px] lg:rounded-2xl overflow-hidden">
   <Image
           src="/mentor.jpg"
           alt="Empowering African girls to lead in the digital world"
           fill
           priority
           sizes="(max-width: 768px) 100vw, 1400px"
           className="object-cover"
         />
    <div className="absolute inset-0 bg-[#41122B]/70 mix-blend-multiply"></div>
    
    <div className="relative z-10 flex lg:mt-40 h-full flex-col items-center justify-center px-4 text-center text-white">
      <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
        Become a Mentor
      </h1>
      <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed">
        Share your knowledge, experience, and passion for technology with the next generation of 
        African women in tech. Make a lasting impact through mentorship.
      </p>
      <Button className="rounded-full">
        Apply to Mentor
      </Button>
    </div>
  </section>

  <section className="py-20 px-4 text-center">
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-4xl font-bold text-gray-900">
        Why Mentorship Matters
      </h2>
      <p className="text-xl leading-relaxed text-gray-600">
        Mentors play a crucial role in building confidence, providing guidance, and 
        opening doors for aspiring tech professionals.
      </p>
    </div>
  </section>

</div>
<section className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
            
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 transition-transform hover:scale-110 duration-300">
                {feature.icon}
              </div>
              
         
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default page