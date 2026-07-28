"use client";

import { Calendar as CalendarIcon, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

// Dummy attendance data for demonstration
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// Randomly generate some present/absent days
const dummyAttendance = Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;
  if (day > new Date().getDate()) return null; // Future days
  return Math.random() > 0.3 ? "present" : "absent";
});

export default function AttendancePage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // reset form
      setFormData({...formData, fullName: "", email: ""});
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/cohort/portal" className="text-secondary hover:underline font-medium text-sm mb-8 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Mark Attendance Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-cal-sans text-gray-900">Mark Attendance</h2>
                <p className="text-gray-500 text-sm">Sign in for today's session</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary bg-gray-50 text-gray-600"
                />
              </div>

              {submitted && (
                <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 text-sm font-medium">
                  <Check className="w-5 h-5" />
                  Attendance marked successfully!
                </div>
              )}

              <Button type="submit" variant="primary" disabled={loading} className="w-full py-4 rounded-xl flex justify-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Attendance"}
              </Button>
            </form>
          </div>

          {/* Attendance Calendar */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-cal-sans text-gray-900 mb-2">Your Progress Tracker</h2>
            <p className="text-gray-500 text-sm mb-8">View your attendance record for this month.</p>

            <div className="mb-4 text-center font-bold text-gray-700 uppercase tracking-widest text-sm">
              {new Date().toLocaleString('default', { month: 'long' })} {currentYear}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-xs font-bold text-gray-400 py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Offset for first day of month */}
              {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 sm:h-12 rounded-xl"></div>
              ))}
              
              {dummyAttendance.map((status, index) => {
                const day = index + 1;
                const isToday = day === new Date().getDate();
                
                let bgColor = "bg-gray-50 border-gray-100 text-gray-500";
                if (status === "present") bgColor = "bg-green-100 border-green-200 text-green-700";
                if (status === "absent") bgColor = "bg-red-100 border-red-200 text-red-700";

                return (
                  <div 
                    key={day} 
                    className={`h-10 sm:h-12 rounded-xl border flex items-center justify-center text-sm font-medium transition-all ${bgColor} ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    title={status ? `Day ${day}: ${status}` : `Day ${day}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div> Present
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div> Absent
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-primary"></div> Today
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
