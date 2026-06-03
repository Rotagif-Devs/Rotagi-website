
// import { useState } from "react";
// import { CheckCircle } from "lucide-react";
// import Button from "@/components/ui/Button";

// const Apply = () => {
//      const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     role: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate submission
//     await new Promise((r) => setTimeout(r, 1200));
//     setLoading(false);
//     setSubmitted(true);
//   };

//   return (
//      <section id="apply" className="py-20 px-6 bg-white">
//         <div className="max-w-2xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 text-center mb-3">
//             Apply to Volunteer
//           </h2>
//           <p className="text-gray-500 text-sm text-center mb-10">
//             Fill in the form below and a member of our team will be in touch.
//           </p>

//           {submitted ? (
//             <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
//               <CheckCircle size={48} className="text-green-500" />
//               <h3 className="text-xl font-bold text-gray-900">
//                 Application Received!
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Thank you for wanting to volunteer with ROTAGI. We will review your application and be in touch shortly.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   required
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your@email.com"
//                   className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Volunteer Role
//                 </label>
//                 {/* <select
//                   required
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-pink-300 focus:bg-white outline-none rounded-xl transition-all text-sm text-gray-700"
//                 >
//                   <option value="">Select a role</option>
//                   {ROLES.map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select> */}
//               </div>
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-[#D81B7E] hover:bg-pink-700 text-white rounded-full py-4 text-base font-bold shadow-lg shadow-pink-200 transition-all disabled:opacity-50"
//               >
//                 {loading ? "Submitting..." : "Submit Application"}
//               </Button>
//             </form>
//           )}
//         </div>
//       </section>
//   )
// }

// export default Apply
