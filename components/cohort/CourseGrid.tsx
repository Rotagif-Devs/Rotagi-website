"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Brain, PenTool, Layout, Video, Code, Briefcase, CheckSquare, Headset, Search, Star, DollarSign, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@/components/ui/Button";

const COURSES = [
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence Skills Training",
    description: "Learn how to use AI tools to work faster and solve real problems.",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
    btnColor: "bg-purple-600 hover:bg-purple-700 text-white border-transparent",
    image: "/cohort-images/artificial-intelligence.jpg",
    available: false,
  },
  {
    id: "canva-training",
    title: "Canva Training",
    description: "Learn how to design eye catching graphics and marketing materials using simple tools.",
    icon: PenTool,
    color: "bg-pink-50 text-pink-600",
    btnColor: "bg-pink-600 hover:bg-pink-700 text-white border-transparent",
    image: "/cohort-images/canva-training.jpg",
    available: false,
  },
  {
    id: "product-design",
    title: "Product Design (UI/UX)",
    description: "Learn how to design user friendly digital products, create wireframes, and build clean app and website interfaces.",
    icon: Layout,
    color: "bg-teal-50 text-teal-600",
    btnColor: "bg-teal-600 hover:bg-teal-700 text-white border-transparent",
    image: "/cohort-images/uiux.jpg",
    available: true,
  },
  {
    id: "ai-video-creation",
    title: "AI Video Creation",
    description: "Learn how to create professional AI powered videos using modern tools and creative workflows.",
    icon: Video,
    color: "bg-indigo-50 text-indigo-600",
    btnColor: "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent",
    image: "/cohort-images/ai-video-creation.jpg",
    available: true,
  },
  {
    id: "vibe-coding",
    title: "VIBE Coding",
    description: "Learn how to develop websites using modern AI and no code tools.",
    icon: Code,
    color: "bg-blue-50 text-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    image: "/cohort-images/vibe-coding.jpg",
    available: true,
  },
  {
    id: "product-management",
    title: "Product Management",
    description: "Learn how to manage products from idea to launch using practical tools.",
    icon: Briefcase,
    color: "bg-orange-50 text-orange-600",
    btnColor: "bg-orange-600 hover:bg-orange-700 text-white border-transparent",
    image: "/cohort-images/product-management.jpg",
    available: false,
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Learn how to plan and deliver projects using effective methods.",
    icon: CheckSquare,
    color: "bg-green-50 text-green-600",
    btnColor: "bg-green-600 hover:bg-green-700 text-white border-transparent",
    image: "/cohort-images/project-management.jpg",
    available: false,
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance",
    description: "Learn the tools and skills to support businesses remotely.",
    icon: Headset,
    color: "bg-pink-50 text-pink-600",
    btnColor: "bg-pink-600 hover:bg-pink-700 text-white border-transparent",
    image: "/cohort-images/virtual-assistance.jpg",
    available: false,
  },
  {
    id: "content-marketing-seo",
    title: "Content Marketing & SEO",
    description: "Learn how to create content that attracts, ranks, and converts.",
    icon: Search,
    color: "bg-yellow-50 text-yellow-600",
    btnColor: "bg-yellow-600 hover:bg-yellow-700 text-white border-transparent",
    image: "/cohort-images/content-marketing.jpg",
    available: false,
  },
  {
    id: "lead-with-confidence",
    title: "Lead with Confidence",
    description: "Learn how to lead with confidence, make clear decisions, and motivate others.",
    icon: Star,
    color: "bg-purple-50 text-purple-600",
    btnColor: "bg-purple-600 hover:bg-purple-700 text-white border-transparent",
    image: "/cohort-images/lead-with-confidence.jpg",
    available: false,
  },
  {
    id: "price-for-profit",
    title: "Price for Profit",
    description: "Learn how to price your products for profit using practical business strategies.",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
    btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent",
    image: "/cohort-images/price-for-profit.jpg",
    available: false,
  },
  {
    id: "social-media-management",
    title: "Social Media Management/Marketing",
    description: "Learn how to create content, manage pages, grow audiences, and promote brands online.",
    icon: Share2,
    color: "bg-sky-50 text-sky-600",
    btnColor: "bg-sky-600 hover:bg-sky-700 text-white border-transparent",
    image: "/cohort-images/social-media.jpg",
    available: false,
  }
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
    <section id="courses" className="py-20 px-5 md:px-10 max-w-[1260px] mx-auto w-full font-dm-sans bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-cal-sans text-gray-900 mb-6">
          Explore Our Courses
        </h2>
        <p className="text-lg text-gray-600">
          Choose a course below and apply for your place in the next cohort.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {COURSES.map((course) => {
          const IconComponent = course.icon;
          return (
            <div 
              key={course.id}
              className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <span className={`absolute right-3 top-5 inline-flex items-center justify-center rounded-tl-xl rounded-br-xl bg-opacity-90 font-bold text-[12px] px-4 py-1 z-10 ${course.available ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>
                  {course.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="p-8 flex flex-col flex-grow items-start">
                <h3 className="text-2xl text-gray-900 mb-3 font-cal-sans">{course.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>
                {course.available ? (
                  <a
                    href="https://forms.office.com/pages/responsepage.aspx?id=RVNyegZvkUS5ZdDKnKhkcKG0LwzxGBFOpKARi6tkYdhUN0lFU0w0V1o1UVkyQjRCRTdYNFY0M0dQTCQlQCN0PWcu&origin=lprLink&route=shorturl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center block py-3.5 rounded-xl font-semibold transition-all duration-300 border shadow-md hover:shadow-lg hover:-translate-y-0.5 ${course.btnColor}`}
                  >
                    Apply Now
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full text-center block py-3.5 rounded-xl font-semibold transition-all duration-300 border bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="lg:hidden relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".course-prev",
            nextEl: ".course-next",
          }}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 24 },
          }}
          spaceBetween={16}
          className="pb-12 px-1"
        >
          {COURSES.map((course) => {
            const IconComponent = course.icon;
            return (
              <SwiperSlide key={course.id} className="h-auto">
                <div className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <span className={`absolute right-3 top-5 inline-flex items-center justify-center rounded-tl-xl rounded-br-xl bg-opacity-90 font-bold text-[12px] px-4 py-1 z-10 ${course.available ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>
                      {course.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow items-start">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 font-cal-sans">{course.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-8 flex-grow leading-relaxed">
                      {course.description}
                    </p>
                    {course.available ? (
                      <a
                        href="https://forms.office.com/pages/responsepage.aspx?id=RVNyegZvkUS5ZdDKnKhkcKG0LwzxGBFOpKARi6tkYdhUN0lFU0w0V1o1UVkyQjRCRTdYNFY0M0dQTCQlQCN0PWcu&origin=lprLink&route=shorturl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-center block py-3.5 rounded-xl font-semibold transition-all duration-300 border shadow-md hover:shadow-lg hover:-translate-y-0.5 ${course.btnColor}`}
                      >
                        Apply Now
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full text-center block py-3.5 rounded-xl font-semibold transition-all duration-300 border bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        
        {/* Navigation Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="course-prev flex h-14 w-14 items-center justify-center border-2 border-gray-200 rounded-full bg-white transition hover:bg-pink-50 hover:border-pink-200 text-gray-600 hover:text-pink-600"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            className="course-next flex h-14 w-14 items-center justify-center border-2 border-gray-200 rounded-full bg-white transition hover:bg-pink-50 hover:border-pink-200 text-gray-600 hover:text-pink-600"
            aria-label="Next slide"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
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
                
                <h3 className="text-2xl font-semibold font-cal-sans text-gray-900 mb-3">
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
