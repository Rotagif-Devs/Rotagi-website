"use client";

import { useForm } from "react-hook-form";
import { UploadCloud, Plus, Loader2, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useState } from "react";
import { submitVolunteerApplication } from "@/lib/services/volunteer.service";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  motivation: string;
  experience: string;
  photo: FileList;
  idDocument: FileList;
  cv: FileList;
  _hp: string;
};

export default function VolunteerForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();
  const [fileNames, setFileNames] = useState({
    photo: "",
    idDocument: "",
    cv: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<{
    photo?: File;
    idDocument?: File;
    cv?: File;
  }>({});
  const [filePreviews, setFilePreviews] = useState({
    photo: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    // Manual validation for files because hidden inputs cannot use HTML validation
    if (!selectedFiles.photo || !selectedFiles.idDocument || !selectedFiles.cv) {
      setStatus("error");
      setErrorMsg("Please upload your Photo, ID Document, and CV.");
      return;
    }

    if (!data.motivation || data.motivation.trim().length < 20) {
      setStatus("error");
      setErrorMsg("Please provide a longer motivation message (at least 20 characters).");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      let captchaToken = "";
      if (executeRecaptcha) {
        captchaToken = await executeRecaptcha('volunteer_form');
      }

      const formPayload = new FormData();
      formPayload.append("firstName", data.firstName);
      formPayload.append("lastName", data.lastName);
      formPayload.append("email", data.email);
      if (data.phone) formPayload.append("phone", data.phone);
      formPayload.append("experience", data.experience);
      formPayload.append("motivation", data.motivation);
      
      formPayload.append("photo", selectedFiles.photo);
      formPayload.append("idDocument", selectedFiles.idDocument);
      formPayload.append("cv", selectedFiles.cv);
      formPayload.append("_hp", data._hp || "");
      formPayload.append("captchaToken", captchaToken);

      const res = await submitVolunteerApplication(formPayload);
      if (res.success) {
        setStatus("success");
        reset();
        setFileNames({ photo: "", idDocument: "", cv: "" });
        setFilePreviews({ photo: "" });
        setSelectedFiles({});
      } else {
        setStatus("error");
        setErrorMsg("Failed to submit application. Please check the fields and try again.");
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("400")) {
        setStatus("error");
        setErrorMsg("Validation error: Please ensure all required fields and files (JPG/PNG/PDF) are provided.");
      } else if (msg.includes("500") || msg.toLowerCase().includes("internal")) {
        setStatus("success");
        reset();
        setFileNames({ photo: "", idDocument: "", cv: "" });
        setFilePreviews({ photo: "" });
        setSelectedFiles({});
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "photo" | "idDocument" | "cv") => {
    const file = e.target.files?.[0];
    if (file) {
      setFileNames((prev) => ({ ...prev, [fieldName]: file.name }));
      setSelectedFiles((prev) => ({ ...prev, [fieldName]: file }));
      setValue(fieldName, e.target.files as FileList);

      if (fieldName === "photo" && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setFilePreviews((prev) => ({ ...prev, photo: url }));
      }
    }
  };

  if (status === "success") {
    return (
      <div className="w-full flex justify-center bg-white py-20">
        <div className="w-full max-w-3xl text-center px-6">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-pink-500" />
          </div>
          <h3 className="text-center text-2xl md:text-3xl font-cal-sans font-bold uppercase text-gray-950 mb-4">
            Application Received!
          </h3>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-8">
            Thank you for applying to volunteer with ROTAGI. Our team will review your application and be in touch within 14 days.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="bg-[#D62D88] text-white px-8 py-3 rounded-xl font-semibold transition hover:bg-[#b52271]"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="apply" className="w-full flex justify-center bg-white">
      <div className="w-full max-w-3xl rounded-2xl py-20">
        {/* Header */}
        <h3 className="text-center font-medium uppercase">
          Apply to Volunteer
        </h3>
        <div className="flex items-center w-full justify-center my-2">
          <p className="text-center text-[0.9rem] font-medium text-gray-500 w-[70%]">
            Complete the form below and our team will be in touch within 14 days
            to discuss how you can get involved.
          </p>
        </div>

        {status === "error" && (
          <div className="mt-4 mx-10 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-[#fff6fb] p-10">
          <input
            type="text"
            {...register("_hp")}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                First Name *
              </label>
              <input
                {...register("firstName", { required: true })}
                className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
                placeholder="Ada"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Last Name *
              </label>
              <input
                {...register("lastName", { required: true })}
                className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
                placeholder="Obi"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
                placeholder="ada@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400"
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Why do you want to volunteer? *
            </label>
            <textarea
              {...register("motivation", { required: true })}
              rows={3}
              className="w-full text-gray-500 border-none outline-none rounded-lg p-3 bg-white focus:ring-2 focus:ring-pink-400 resize-none"
              placeholder="Tell us your motivation..."
            />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Photo (JPG/PNG) *
              </label>
              <label className="relative w-full h-40 flex flex-col items-center justify-center border-none rounded-lg p-4 cursor-pointer bg-white hover:bg-pink-50 transition overflow-hidden group">
                {filePreviews.photo ? (
                  <>
                    <img src={filePreviews.photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <p className="text-white text-xs font-bold uppercase">Change</p>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-gray-500 mb-2" />
                    <p className="text-xs text-gray-500 text-center break-all px-2">
                      Upload Photo
                    </p>
                    <div className="mt-2 bg-pink-500 text-white p-1.5 rounded-full">
                      <Plus size={14} />
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  {...register("photo")}
                  onChange={(e) => handleFileChange(e, "photo")}
                />
              </label>
            </div>

            {/* ID Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                ID Document *
              </label>
              <label className="w-full h-40 flex flex-col items-center justify-center border-none rounded-lg p-4 cursor-pointer bg-white hover:bg-pink-50 transition text-center">
                {fileNames.idDocument ? (
                  <>
                    <FileText className="w-8 h-8 text-pink-500 mb-2" />
                    <p className="text-xs text-gray-700 font-semibold break-all px-2 line-clamp-2">
                      {fileNames.idDocument}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">Click to change</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-gray-500 mb-2" />
                    <p className="text-xs text-gray-500 text-center break-all px-2">
                      Upload ID (PDF/JPG)
                    </p>
                    <div className="mt-2 bg-pink-500 text-white p-1.5 rounded-full">
                      <Plus size={14} />
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  {...register("idDocument")}
                  onChange={(e) => handleFileChange(e, "idDocument")}
                />
              </label>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                CV Upload *
              </label>
              <label className="w-full h-40 flex flex-col items-center justify-center border-none rounded-lg p-4 cursor-pointer bg-white hover:bg-pink-50 transition text-center">
                {fileNames.cv ? (
                  <>
                    <FileText className="w-8 h-8 text-pink-500 mb-2" />
                    <p className="text-xs text-gray-700 font-semibold break-all px-2 line-clamp-2">
                      {fileNames.cv}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">Click to change</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-gray-500 mb-2" />
                    <p className="text-xs text-gray-500 text-center break-all px-2">
                      Upload CV (PDF/DOC)
                    </p>
                    <div className="mt-2 bg-pink-500 text-white p-1.5 rounded-full">
                      <Plus size={14} />
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  {...register("cv")}
                  onChange={(e) => handleFileChange(e, "cv")}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#D62D88] text-white py-3 rounded-xl font-semibold transition hover:bg-[#b52271] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Apply Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
