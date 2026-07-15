"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Code, PenTool, Globe, Database, TrendingUp, Layout } from "lucide-react";
import Button from "@/components/ui/Button";

const COURSES = [
  {
    id: "vibe-code",
    title: "Vibe Code",
    description: "Learn programming fundamentals and advanced topics in a fun, interactive way. Master Python, JavaScript, and more.",
    icon: Code,
    color: "bg-blue-50 text-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    image: "/wh.jpg",
  },
  {
    id: "graphics-design",
    title: "Graphics Design",
    description: "Master industry-standard tools like Adobe Creative Cloud. Learn layout, typography, and visual communication.",
    icon: PenTool,
    color: "bg-pink-50 text-pink-600",
    btnColor: "bg-pink-600 hover:bg-pink-700 text-white border-transparent",
    image: "/wh.jpg",
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Build responsive, modern websites using HTML, CSS, React, and Next.js. Become a full-stack developer.",
    icon: Globe,
    color: "bg-green-50 text-green-600",
    btnColor: "bg-green-600 hover:bg-green-700 text-white border-transparent",
    image: "/wh.jpg",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Unlock insights from complex datasets using Excel, SQL, and Python. Learn to make data-driven decisions.",
    icon: Database,
    color: "bg-purple-50 text-purple-600",
    btnColor: "bg-purple-600 hover:bg-purple-700 text-white border-transparent",
    image: "/wh.jpg",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Grow brands online using SEO, social media strategies, and targeted advertising campaigns.",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600",
    btnColor: "bg-orange-600 hover:bg-orange-700 text-white border-transparent",
    image: "/wh.jpg",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design intuitive user experiences and beautiful interfaces. Master Figma and user research methodologies.",
    icon: Layout,
    color: "bg-teal-50 text-teal-600",
    btnColor: "bg-teal-600 hover:bg-teal-700 text-white border-transparent",
    image: "/wh.jpg",
  },
];

export default function CourseGrid() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleEnrollClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const selectedCourseData = COURSES.find(c => c.id === selectedCourse);

  return (
    <section className="py-20 px-5 md:px-10 max-w-[1260px] mx-auto w-full font-dm-sans bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-cal-sans text-gray-900 mb-6">
          Explore Our Courses
        </h2>
        <p className="text-lg text-gray-600">
          Join our intensive tech cohorts to jumpstart your career. Select a course below to enroll.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => {
          const IconComponent = course.icon;
          return (
            <div 
              key={course.id}
              className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-8 flex flex-col flex-grow items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${course.color} transition-transform group-hover:-translate-y-1`}>
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cal-sans">{course.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>
                <button
                  onClick={() => handleEnrollClick(course.id)}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 border shadow-md hover:shadow-lg hover:-translate-y-0.5 ${course.btnColor}`}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Closed Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-20 h-20 bg-gray-50 border-8 border-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6 relative">
                  <Lock size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold font-cal-sans text-gray-900 mb-3">
                  Registration Closed
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We are sorry, but registration for <strong className="text-gray-900">{selectedCourseData?.title}</strong> is currently closed. Please check back later or join our waitlist to be notified when the next cohort opens!
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <Button
                    variant="primary"
                    onClick={closeModal}
                    className="w-full justify-center py-4 text-base"
                  >
                    Got it, thanks
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
