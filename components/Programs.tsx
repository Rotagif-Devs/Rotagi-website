import { ArrowRightIcon } from "lucide-react";

const programs = [
  { age: "Ages 10-12", name: "She Ignite", desc: "Building foundational AI awareness and digital literacy for young girls through interactive learning and hands-on projects.", img: "/img-1.png" },
  { age: "Ages 13-15", name: "She Blossom", desc: "Developing deeper technical skills and critical thinking through AI applications, coding basics, and problem-solving.", img: "/img-2.png" },
  { age: "Ages 16-18", name: "She Blaze", desc: "Advanced AI learning, leadership development, and career preparation for young women ready to lead in technology.", img: "/img-3.png" },
  { age: "Ages 18-40", name: "She Ascend", desc: "Professional AI skills training, entrepreneurship support, and career advancement for African women in tech.", img: "/img-4.png" },
];

export default function Programs() {
  return (
    <section className="bg-[var(--color-primary)] flex justify-center py-20">
      <div 
        className="relative bg-[var(--color-secondary)] rounded-[19px] px-4 pt-[55px] pb-[55px] w-full mx-4 flex flex-col items-center"
        style={{ minHeight: '862px' }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-[var(--font-cal-sans)] text-[46px] leading-[100%] tracking-normal text-white mb-6 mx-auto font-bold">
            Our Programs
          </h2>
          <p className="font-[var(--font-dm-sans)] font-normal text-[18px] leading-[35px] tracking-[-0.01em] text-white max-w-[590px] mx-auto">
            Age-appropriate learning pathways designed to build skills, confidence, and leadership at every stage.
          </p>
        </div>

        <div 
          className="bg-[var(--color-text-brown)] rounded-[14px] mx-auto flex justify-between items-stretch w-full"
          style={{
            maxWidth: '95%',
            minHeight: '555px',
            paddingTop: '19px',
            paddingRight: '27px',
            paddingBottom: '31px',
            paddingLeft: '27px',
          }}
        >
          {programs.map((prog, i) => (
            <div
              key={i}
              className={`group relative bg-transparent flex flex-col flex-1 ${i !== programs.length - 1 ? 'lg:border-r lg:border-white/20 lg:pr-8' : ''} ${i !== 0 ? 'lg:pl-8' : ''}`}
            >
              <div className="h-64 overflow-hidden relative rounded-2xl mb-6">
                <img 
                  src={prog.img} 
                  alt={prog.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4">
                  <span 
                    className="inline-block px-3 py-1 bg-[var(--color-accent0)] text-[var(--color-text-brown)] text-xs font-bold"
                    style={{
                      width: '95px',
                      height: '24px',
                      borderTopLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {prog.age}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow text-center items-center">
                <h3 
                  className="text-white mb-3 font-[var(--font-cal-sans)] capitalize"
                  style={{
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '22px',
                    letterSpacing: '-0.2px'
                  }}
                >
                  {prog.name}
                </h3>
                <p 
                  className="text-white/80 mb-4 font-[var(--font-dm-sans)]"
                  style={{
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '25px',
                    letterSpacing: '-0.2px',
                    textAlign: 'center'
                  }}
                >
                  {prog.desc}
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="text-white hover:text-pink-200 transition inline-flex items-center font-inter gap-2"
                    style={{
                      fontWeight: 600,
                      fontSize: '18px',
                      lineHeight: '100%',
                      letterSpacing: '-0.2px'
                    }}
                  >
                    Learn More 
                    <ArrowRightIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}