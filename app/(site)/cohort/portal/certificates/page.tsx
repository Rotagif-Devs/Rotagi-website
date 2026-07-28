"use client";

import { FileText, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function CertificatesPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", track: "" });
  const [loading, setLoading] = useState(false);
  const [certificateReady, setCertificateReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate fetching certificate
    setTimeout(() => {
      setLoading(false);
      setCertificateReady(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-cal-sans text-gray-900">Certificates & Achievements</h2>
              <p className="text-gray-500">Provide your basic information to retrieve your earned certificates.</p>
            </div>
          </div>

          {!certificateReady ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary bg-gray-50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary bg-gray-50"
                  placeholder="Enter your registered email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cohort Track</label>
                <select 
                  required
                  value={formData.track}
                  onChange={(e) => setFormData({...formData, track: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary bg-gray-50"
                >
                  <option value="">Select your track...</option>
                  <option value="data-analysis">Data Analysis</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="product-management">Product Management</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="web-development">Web Development</option>
                </select>
              </div>

              <Button type="submit" variant="primary" disabled={loading} className="w-full py-4 rounded-xl flex justify-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Retrieve Certificate"}
              </Button>
            </form>
          ) : (
            <div className="max-w-xl mx-auto text-center pt-8">
              <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-cal-sans text-gray-900 mb-2">Certificate Found!</h3>
              <p className="text-gray-500 mb-8">
                Congratulations, {formData.fullName}! Your certificate for the {formData.track.replace("-", " ")} track is ready.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button variant="secondary" onClick={() => setCertificateReady(false)}>
                  Search Again
                </Button>
                <Button variant="primary" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
