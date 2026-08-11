"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, Clock, Landmark, Stethoscope, Briefcase, 
  Laptop, Video, Utensils, BookOpen, CheckCircle2, Search, SlidersHorizontal, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const categoryA = [
  { area: "Health", icon: <Stethoscope className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Clinical Research Essentials, Public Health Short Course, Healthcare Leadership", providers: "University of Melbourne, University of Sydney, Monash University", duration: "4 to 12 weeks" },
  { area: "Business & Management", icon: <Briefcase className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Project Management Fundamentals, Business Analytics Foundations", providers: "AIM, RMIT University", duration: "2 to 8 weeks" },
  { area: "IT, Data, and Cyber", icon: <Laptop className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Cyber Security Essentials, Data Analytics, Python Programming, Cloud Computing", providers: "RMIT, DeakinCo, Monash, Curtin", duration: "4 to 10 weeks" },
  { area: "Creative, Design, & Media", icon: <Video className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Filmmaking Intensive, Animation and Motion Graphics", providers: "Academy of Film Theatre and Television, SAE Institute", duration: "4 to 10 weeks" },
  { area: "Hospitality & Culinary", icon: <Utensils className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Barista Skills, Food Safety Supervisor, Culinary Skill Sets", providers: "William Angliss Institute, TAFE NSW, TAFE SA", duration: "1 to 8 weeks" },
  { area: "English & Academic Skills", icon: <BookOpen className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "IELTS Intensive, Academic Writing, English for Professionals", providers: "Browns, UTS, ELSIS", duration: "4 to 10 weeks" }
];

const categoryB = [
  { area: "Nursing & Health", icon: <Stethoscope className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Diploma of Nursing, Graduate Certificate in Nursing", providers: "IHNA, Chisholm, CQUniversity", duration: "6 to 24 months" },
  { area: "Business & Management", icon: <Briefcase className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Diploma of Leadership and Management", providers: "Chisholm, Victoria University", duration: "6 to 12 months" },
  { area: "IT and Data", icon: <Laptop className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Certificate IV in Information Technology", providers: "TAFE NSW, Box Hill Institute", duration: "Around 6 months" },
  { area: "Creative, Design, & Media", icon: <Video className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "Bachelor of Film and Media, Bachelor of Design", providers: "SAE, Torrens, RMIT, Swinburne", duration: "Around 3 years" },
  { area: "English & Pathway Programs", icon: <BookOpen className="w-4 h-4 text-[#124b8d]" />, bg: "bg-blue-50/50 border border-blue-100 text-[#124b8d]", programs: "General English, EAP, Foundation Studies", providers: "Browns, ELSIS, UTS College, CELUSA, Deakin College, Monash College", duration: "10 weeks to 12 months" }
];

export default function ShortCourses() {
  const [activeTab, setActiveTab] = useState("A");

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Short & Specialized Courses" 
        subtitle="Intensive bootcamps and CRICOS-accredited specialized pathways in Australia."
        breadcrumb="Study in Australia / Short Courses"
        bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro section */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">Targeted Upskilling</span>
              </div>
              <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Expand Your Professional Skills
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Whether you want an intensive short-term course under 3 months to specialize, or a CRICOS-registered academic pathway above 3 months to secure a degree, we offer tailored options from leading providers.
              </p>
            </div>

            {/* Right side illustration */}
            <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden h-64 w-full border border-slate-200 shadow-md group">
              <Image 
                src="/short_courses_hero.png" 
                alt="AEC Short Courses" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-base font-bold tracking-tight">
                Enhance your credentials in record time
              </div>
            </div>
          </div>

          {/* Interactive Switch Tabs */}
          <div className="flex justify-center mb-12 relative z-10">
            <div className="bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-full flex gap-1 shadow-inner relative z-10 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("A")}
                className="px-6 py-3 rounded-full font-bold text-xs transition-all relative group outline-none"
              >
                {/* Sliding Background Indicator */}
                {activeTab === "A" && (
                  <motion.div
                    layoutId="activeShortCoursesTab"
                    className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.25)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeTab === "A" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}>
                  {activeTab === "A" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                  )}
                  Category A: Under 3 Months
                </span>
              </button>
              <button
                onClick={() => setActiveTab("B")}
                className="px-6 py-3 rounded-full font-bold text-xs transition-all relative group outline-none"
              >
                {/* Sliding Background Indicator */}
                {activeTab === "B" && (
                  <motion.div
                    layoutId="activeShortCoursesTab"
                    className="absolute inset-0 bg-[#124b8d] shadow-[0_4px_12px_rgba(18,75,141,0.25)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${
                  activeTab === "B" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}>
                  {activeTab === "B" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                  )}
                  Category B: Above 3 Months (CRICOS)
                </span>
              </button>
            </div>
          </div>

          {/* Table displaying active Category */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-500 border-collapse">
                <thead className="bg-slate-50 text-slate-800 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5">Study Area</th>
                    <th className="px-8 py-5">Example Programs</th>
                    <th className="px-8 py-5">Accredited Providers</th>
                    <th className="px-8 py-5">Typical Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  <AnimatePresence mode="wait">
                    {(activeTab === "A" ? categoryA : categoryB).map((row, idx) => (
                      <motion.tr 
                        key={row.area + idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="px-8 py-6 font-bold text-slate-900 shrink-0">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${row.bg}`}>
                            {row.icon}
                            {row.area}
                          </span>
                        </td>
                        <td className="px-8 py-6 font-bold text-[#11181C] max-w-sm leading-relaxed">
                          {row.programs}
                        </td>
                        <td className="px-8 py-6 text-slate-500 text-sm max-w-sm leading-relaxed font-semibold">
                          {row.providers}
                        </td>
                        <td className="px-8 py-6 font-semibold shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-655 text-xs rounded-full border border-slate-200">
                            <Clock className="w-3.5 h-3.5 text-[#124b8d]" /> {row.duration}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Subpage CTA Callout */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
        
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#11181C]">Unsure Which Short Course Fits You?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Many short courses can be integrated as entry requirements or path progressions for complete degree admissions. Consult with our team to align your career goals.
          </p>

          <div className="relative rounded-[2rem] overflow-hidden h-[300px] w-full max-w-3xl mx-auto border border-slate-200 shadow-lg group mt-8">
            <Image 
              src="/short_courses_consult.png" 
              alt="Short Course Consultation" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Get Personalized Course Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
