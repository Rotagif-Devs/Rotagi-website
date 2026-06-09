"use client";

import { useForm } from "react-hook-form";
import { UploadCloud, Plus } from "lucide-react";
import { useState } from "react";

type FormData = {
  experience: string;
  cv: FileList;
};

export default function VolunteerForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [fileName, setFileName] = useState<string>("");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const cvFile = watch("cv");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setValue("cv", e.target.files as FileList);
    }
  };

  return (
    <div id="apply" className="w-full flex justify-center bg-white scroll-mt-24">
      <div className="w-full max-w-3xl rounded-2xl py-20">
        {/* Header */}
        
        <h3 className="text-center text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950">
          Apply to Volunteer
        </h3>
        <div className="flex items-center w-full justify-center my-2">
        <p className="text-center text-[0.9rem] font-medium justify-content item-center text-gray-500 w-[70%]">
          Complete the form below and our team will be in touch within 14 days
          to discuss how you can get involved.
        </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-[#fff6fb] p-10">
          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Years of Experience
            </label>
            <select
              {...register("experience")}
              className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
            >
              <option value="0">0 Years</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3+">3+ Years</option>
            </select>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              CV Upload
            </label>

            <label className="w-full flex flex-col items-center justify-center border-none rounded-lg p-8 cursor-pointer bg-white hover:bg-pink-50 transition">
              <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />

              <p className="text-sm text-gray-500 text-center">
                {fileName
                  ? fileName
                  : "Browse and choose the file you want to upload from your computer"}
              </p>

              <div className="mt-3 bg-pink-500 text-white p-2 rounded-full">
                <Plus size={18} />
              </div>

              <input
                type="file"
                className="hidden"
                {...register("cv")}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#D62D88] text-white py-3 rounded-xl font-semibold transition"
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}