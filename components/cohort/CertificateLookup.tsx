"use client";

import { useState } from "react";
import { FileText, User, Search, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { cohortService } from "@/lib/services/cohort.service";

/**
 * Name + email based certificate lookup (GET /api/cohort/certificate/record).
 * The certificate itself is generated on the fly by compositing the learner's
 * name onto the admin's template — there's no shared Drive folder to browse,
 * so a learner can only ever get their own certificate.
 */
export default function CertificateLookup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // "Notice" covers expected, non-error states surfaced as thrown errors by the
  // service layer (certificates not turned on yet, no template configured) —
  // distinct from a real failure (network error, 500), which stays an "error".
  const [isNotice, setIsNotice] = useState(false);
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [certificatePdf, setCertificatePdf] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<"image" | "pdf">("image");
  const [notFound, setNotFound] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const reset = () => {
    setCertificateImage(null);
    setCertificatePdf(null);
    setDownloadFormat("image");
    setNotFound(false);
    setError("");
    setIsNotice(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    reset();
    setLoading(true);
    setSearchedName(fullName);

    try {
      const data = await cohortService.getCertificateRecord(email.trim(), fullName.trim());
      if (data) {
        setCertificateImage(data.certificateImage);
        setCertificatePdf(data.certificatePdf);
      } else {
        setNotFound(true);
      }
    } catch (err: any) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setError(msg);
      setIsNotice(/not been released|not been configured/i.test(msg));
    } finally {
      setLoading(false);
    }
  };

  const hasSearched = certificateImage !== null || notFound || !!error;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto text-center py-4">
      <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-cal-sans text-gray-900 mb-2">Your Certificate</h2>
      <p className="text-gray-500 mb-8">Enter your full name and registered email to access your certificate.</p>

      {!hasSearched ? (
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Full name as registered"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="e.g. yourname@example.com"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" className="py-4 px-8 rounded-xl" disabled={loading}>
            {loading ? "Checking…" : "Find Certificate"}
          </Button>
        </form>
      ) : error ? (
        <div
          className={`border rounded-2xl p-8 animate-in zoom-in-95 ${
            isNotice ? "bg-blue-50 border-blue-200" : "bg-red-50 border-red-200"
          }`}
        >
          <h3 className={`text-xl font-bold mb-2 ${isNotice ? "text-blue-800" : "text-red-800"}`}>
            {isNotice ? "Notice!!!" : "Something went wrong"}
          </h3>
          <p className={`mb-6 ${isNotice ? "text-blue-700" : "text-red-700"}`}>{error}</p>
          <button
            onClick={reset}
            className={`text-sm font-bold hover:underline ${isNotice ? "text-blue-800" : "text-red-800"}`}
          >
            {isNotice ? "Got it" : "Try again"}
          </button>
        </div>
      ) : notFound ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 animate-in zoom-in-95">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Certificate Not Available</h3>
          <p className="text-yellow-700 mb-6">
            We couldn&apos;t find a certificate for <strong className="font-semibold">{searchedName}</strong> with that
            email. Double-check both match what the admin registered, or check back later.
          </p>
          <button onClick={reset} className="text-sm font-bold text-yellow-800 hover:underline">
            Try again
          </button>
        </div>
      ) : certificateImage ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 animate-in zoom-in-95">
          <p className="text-green-700 mb-6">
            Certificate found for <strong className="font-semibold">{searchedName}</strong>.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- data: URL, next/image can't optimize this */}
          <img
            src={certificateImage}
            alt={`Certificate for ${searchedName}`}
            className="w-full rounded-lg border border-green-100 shadow-sm mb-6"
          />
          <div className="inline-flex items-center gap-1 bg-white border border-green-200 rounded-full p-1 mb-4">
            {(["image", "pdf"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setDownloadFormat(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  downloadFormat === f ? "bg-green-600 text-white" : "text-green-700 hover:bg-green-50"
                }`}
              >
                {f === "image" ? "Image" : "PDF"}
              </button>
            ))}
          </div>
          <div>
            <a
              href={downloadFormat === "pdf" ? certificatePdf! : certificateImage}
              download={`${searchedName.replace(/\s+/g, "_")}_certificate.${downloadFormat === "pdf" ? "pdf" : "png"}`}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-green-600/30 transition-transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" /> Download {downloadFormat === "pdf" ? "PDF" : "Image"}
            </a>
          </div>
          <div className="mt-6">
            <button onClick={reset} className="text-sm font-bold text-primary hover:underline">
              Check another
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
