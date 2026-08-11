"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  GraduationCap, BookOpen, Landmark, Clock, Award, 
  MapPin, ChevronRight, Compass, ShieldCheck, ArrowUpRight, HelpCircle, Calendar, Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StudyInAustralia() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      {/* Premium Photorealistic Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 border-b border-slate-200">
        {/* Decorative Grid Background matching homepage */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Background Image with soft light overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/australia_hero.png" 
            alt="Australia Premium Campus" 
            fill 
            className="object-cover opacity-15 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200"
              >
                <Compass className="w-4 h-4 text-[#124b8d]" /> Primary Destination Portal
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-tight text-slate-900 leading-[1.05]"
              >
                Study in Australia
                <span className="block text-[#124b8d] mt-2">World-Class Education</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed"
              >
                Australia offers globally recognized qualifications, high-quality institutions, part-time work opportunities, and strong post-study career pathways. Plan your complete journey today with Sri Lanka&apos;s trusted educational consultants.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full px-6 py-3 font-bold transition-transform shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900">
                    Check Your Eligibility - FREE
                  </Button>
                </Link>
                <Link href="/study-in-australia/course-finder">
                  <Button size="lg" variant="outline" className="border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-bold transition-all duration-300 rounded-full px-6 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                    Explore Courses in Australia
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Metrics Grid Column (Aesthetic floating layout) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white border-2 border-slate-900 rounded-3xl p-6 relative z-10 flex flex-col justify-between shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-black text-[#124b8d]">43</div>
                <div className="text-slate-800 text-[10px] font-black uppercase tracking-wider mt-4">Top-Tier Universities</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white border-2 border-slate-900 rounded-3xl p-6 relative z-10 flex flex-col justify-between mt-6 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-black text-slate-900">98%</div>
                <div className="text-slate-800 text-[10px] font-black uppercase tracking-wider mt-4">Visa Success Rate</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white border-2 border-slate-900 rounded-3xl p-6 relative z-10 flex flex-col justify-between shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-black text-slate-900">15k+</div>
                <div className="text-slate-800 text-[10px] font-black uppercase tracking-wider mt-4">Available Courses</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white border-2 border-slate-900 rounded-3xl p-6 relative z-10 flex flex-col justify-between mt-6 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-black text-[#124b8d]">PR</div>
                <div className="text-slate-800 text-[10px] font-black uppercase tracking-wider mt-4">Pathway Planning</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Subpage Directory (Wow Factor Navigation Hub) */}
      <section className="py-24 bg-[#FAF8F5] border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Explore Our Portal</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
              Everything You Need to Know
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg">
              Dive deep into specific details regarding courses, universities, scholarships, and tours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Why Study Bento Item */}
            <Link href="/study-in-australia/why-study" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/why_landscape.png" alt="Why Australia" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#124b8d] border border-slate-200 flex items-center justify-center mb-6">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Why Study in Australia?</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Explore the world-class academic environment, multicultural safety standards, and global career opportunities.</p>
              </div>
              
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d] mt-4">
                Explore Benefits <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Course Finder Bento Item */}
            <Link href="/study-in-australia/course-finder" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/why_card1.png" alt="Course Finder" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Course Finder</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Match with thousands of programs across IT, Cyber, Nursing, Business, Engineering, and Early Childhood.</p>
              </div>
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d] mt-4">
                Find Your Course <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Short Courses Bento Item */}
            <Link href="/study-in-australia/short-courses" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/why_card2.png" alt="Short Courses" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] border border-red-100 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Short & Specialized Courses</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Browse intensive short programs (under 3 months) or CRICOS programs for swift skill enhancements.</p>
              </div>
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#e31b23] mt-4">
                View Short Courses <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Scholarships Bento Item */}
            <Link href="/study-in-australia/scholarships" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/why_card3.png" alt="Scholarships" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Scholarships & Reductions</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Determine your eligibility for partial waivers, academic merit aids, and regional grants.</p>
              </div>
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d] mt-4">
                Check Scholarships <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Universities List Bento Item */}
            <Link href="/study-in-australia/universities-colleges" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/dest_australia.png" alt="Universities" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] border border-red-100 flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Universities & Colleges</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Review our massive partner network containing top public universities, colleges, and TAFEs.</p>
              </div>
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#e31b23] mt-4">
                Browse Institutions <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* FAQs Bento Item */}
            <Link href="/study-in-australia/faqs" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image src="/why_settlement.png" alt="FAQs" fill className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">Frequently Asked Questions</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">Have questions about working rights, cost of living, or dependent setups? Find quick answers.</p>
              </div>
              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-wider text-[#124b8d] mt-4">
                View Answers <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* University Placement Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                End-to-End Solutions
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-tight text-slate-900 leading-tight">
                Our University Placement Services
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                We handle the complex administration so you can focus on preparing for your global academic career.
              </p>
              
              {/* Graphic container with female consultant */}
              <div className="relative rounded-[2rem] overflow-hidden h-72 w-full border border-slate-200 shadow-sm mt-6 group">
                <Image 
                  src="/female_consultant.png" 
                  alt="AEC Placement Support" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Personalized Counseling</div>
                    <div className="text-sm font-semibold">PIER Certified Experts</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" variant="default" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900">
                    Find My Best University Options
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Placement Cards list */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Institution Selection", desc: "Select universities and courses aligned entirely with your academic profile and budget constraints." },
                { title: "Pathway Assistance", desc: "Identify diploma-to-degree or foundation courses if you do not meet direct entry criteria." },
                { title: "Multi-Application Coordination", desc: "Submit simultaneous applications to multiple institutions to expand opportunities and improve admission rates." },
                { title: "Financial & Location Modeling", desc: "Analyze tuition fees, scholarships, living indices, intakes, and career opportunities dynamically." },
                { title: "Accredited Counseling", desc: "Focus strictly on accredited institutions that protect your visa status and long-term residency plans." }
              ].map((service, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[#124b8d] flex items-center justify-center mb-4 font-mono text-xs font-bold border border-slate-250">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University Exploration Tours Callout Section */}
      <section className="py-24 bg-[#FAF8F5] overflow-hidden relative border-t border-slate-200">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 px-4 mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mx-auto">
            Campus Exploration
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">University Exploration Tours</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Experience real Australian university campus life, explore cities, examine accommodations, join hands-on STEM workshops, and consult with student teams BEFORE making a major investment.
          </p>
          
          <div className="relative rounded-[2rem] overflow-hidden h-[300px] w-full max-w-3xl mx-auto border border-slate-250 shadow-lg group">
            <Image 
              src="/university_tours.png" 
              alt="University Exploration Tours" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors" />
          </div>

          <div className="pt-8 flex justify-center gap-4">
            <Link href="/university-tours">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Register Interest for the Next Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
