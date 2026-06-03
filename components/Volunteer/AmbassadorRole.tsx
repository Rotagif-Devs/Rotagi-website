import { ambs } from "@/lib/ambassador";

const AmbassadorRoles = () => {
  return (
    <section className=" px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#D62D88] text-sm font-medium mb-3 text-center justify-center">
       Join the ROTAGI Ambassador Program
        </p>
        <h3 className="text-center font-medium uppercase text-black mb-12">
          How You Can Contribute
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ambs.map((role) => (
            <div
              key={role.title}
              className="overflow-hidden rounded-2xl bg-white"
            >
              <div className="bg-[#D62D88] px-6 py-4">
                <h3 className="text-white font-medium !text-2xl">
                  {role.title}
                </h3>
              </div>

              <div className="p-6 min-h-[180px] flex flex-col">
                <p className="text-gray-600 leading-relaxed text-base">
                  {role.description}
                </p>

                <span className="mt-auto pt-4 text-[#D62D88] italic text-sm">
                  {role.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbassadorRoles;