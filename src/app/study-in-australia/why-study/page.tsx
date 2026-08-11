"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Landmark, GraduationCap, Clock, Briefcase, 
  ShieldCheck, Heart, Sparkles, CheckCircle2, ChevronRight, Compass,
  Cpu, Coins, Wrench, HeartPulse, BookOpen, Palette, Lock, Utensils, Brain, Truck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const disciplines = [
  { 
    name: "IT, Computing, Data Science & AI", 
    desc: "Software, machine learning, deep learning, algorithms.",
    icon: Cpu,
    color: "blue"
  },
  { 
    name: "Business, Management, Finance & Fintech", 
    desc: "Investments, corporate leadership, finance systems.",
    icon: Coins,
    color: "red"
  },
  { 
    name: "Engineering, Construction & Renewable Energy", 
    desc: "Sustainable design, structural systems, green grids.",
    icon: Wrench,
    color: "blue"
  },
  { 
    name: "Health, Nursing, Allied Health & Public Health", 
    desc: "Clinical excellence, nursing paths, global health.",
    icon: HeartPulse,
    color: "red"
  },
  { 
    name: "Education, Early Childhood & TESOL", 
    desc: "Teaching credentials, preschool setups, language instruction.",
    icon: BookOpen,
    color: "blue"
  },
  { 
    name: "Digital Marketing, Media & Creative Design", 
    desc: "Content design, SEO optimization, interactive media.",
    icon: Palette,
    color: "red"
  },
  { 
    name: "Cyber Security, Networking & Cloud Technologies", 
    desc: "Info security, server grids, cloud architectures.",
    icon: Lock,
    color: "blue"
  },
  { 
    name: "Hospitality, Tourism, Culinary Arts & Trades", 
    desc: "Premium culinary skills, hospitality setups, trades.",
    icon: Utensils,
    color: "red"
  },
  { 
    name: "Psychology, Counselling & Social Sciences", 
    desc: "Behavioral health, family counseling, community systems.",
    icon: Brain,
    color: "blue"
  },
  { 
    name: "Logistics, Supply Chain & Project Management", 
    desc: "Global trade routes, operations, scrum systems.",
    icon: Truck,
    color: "red"
  }
];

export default function WhyStudyInAustralia() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      {/* Header PageHero */}
      <PageHero 
        title="Why Study in Australia?" 
        subtitle="Discover why Australia combines academic quality, safety, and lifestyle."
        breadcrumb="Study in Australia / Why Study"
        bgImage="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Core Reasons Section */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Premium Destinations</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
              World-Class Higher Education
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg">
              Australia attracts over half a million international students each year for excellent reasons.
            </p>
          </div>

          {/* Premium Custom Bento Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto"
          >
            {/* 1. Education System (Large 7 Cols) */}
            <motion.div 
              variants={fadeIn} 
              className="md:col-span-7 bg-white rounded-[32px] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row gap-8 justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none z-0" />
              
              <div className="flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#11181C] mb-4 leading-tight">World-Class Education System</h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                    Australian universities and colleges are globally recognized and regulated under strict quality frameworks (TEQSA and ASQA). Students receive qualifications that are highly valued and respected by employers and elite institutions around the world.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">TEQSA Regulated</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">AQF Compliance</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">ESOS Protected</span>
                </div>
              </div>

              {/* Graphic/Image side */}
              <div className="w-full md:w-5/12 h-48 md:h-auto relative rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner z-10">
                <Image 
                  src="/why_mara.png" 
                  alt="MARA Registered" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[10px] font-bold tracking-widest uppercase text-center bg-black/30 backdrop-blur-md py-1.5 px-2 rounded-lg border border-white/10">
                  Global Standard Education
                </div>
              </div>
            </motion.div>

            {/* 2. Work While Study (Small 5 Cols) */}
            <motion.div 
              variants={fadeIn} 
              className="md:col-span-5 bg-white rounded-[32px] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e31b23]/5 rounded-bl-full pointer-events-none" />
              <div className="space-y-6 flex-1 flex flex-col">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] border border-red-100 flex items-center justify-center mb-6">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#11181C] mb-4 leading-tight">Work While You Study</h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                    International students can work part-time during their studies, subject to current student visa conditions. This helps support living expenses while building local professional skills. 
                  </p>
                </div>
                
                <div className="p-4 bg-red-50/50 text-red-950 rounded-2xl border border-red-100 text-xs font-semibold leading-relaxed mb-6 mt-auto">
                  💡 Spouses and eligible partners may also receive work rights depending on the student&apos;s course level.
                </div>
              </div>

              {/* Overflow bottom image */}
              <div className="relative rounded-2xl overflow-hidden h-40 w-full mt-4 border border-slate-100">
                <Image 
                  src="/why_work_study.png" 
                  alt="Work While Study" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </motion.div>

            {/* 3. Post-Study & PR (Small 5 Cols) */}
            <motion.div 
              variants={fadeIn} 
              className="md:col-span-5 bg-white rounded-[32px] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#124b8d]/5 rounded-bl-full pointer-events-none" />
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#11181C] mb-4 leading-tight">Post-Study Work & PR Opportunities</h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                    Australia offers excellent post-study work options and skilled migration pathways for eligible graduates. AEC helps students strategically choose courses that align with academic goals, career outcomes, and long-term migration planning.
                  </p>
                </div>
                <div className="mb-6">
                  <Link href="/pr-pathways" className="inline-flex items-center text-sm font-bold text-[#124b8d] hover:text-[#0e3d72] transition-colors">
                    Explore PR Pathways <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Overflow bottom image */}
              <div className="relative rounded-2xl overflow-hidden h-40 w-full border border-slate-100">
                <Image 
                  src="/why_pr_pathways.png" 
                  alt="Post Study Pathways" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </motion.div>

            {/* 4. Safe & Student-Friendly (Large 7 Cols) */}
            <motion.div 
              variants={fadeIn} 
              className="md:col-span-7 bg-white rounded-[32px] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row gap-8 justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e31b23]/5 rounded-bl-full pointer-events-none z-0" />
              
              <div className="flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e31b23] border border-red-100 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#11181C] mb-4 leading-tight">Safe, Multicultural & Student-Friendly</h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                    Australia is globally renowned for its exceptional safety ratings, welcoming multicultural communities, high-quality public healthcare, and well-designed modern student hubs. It provides dedicated support services to safeguard the welfare of international students.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                    <Heart className="w-3 h-3 text-[#e31b23]" /> Global Top 10 Livability
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                    <Sparkles className="w-3 h-3 text-[#e31b23]" /> Dedicated Welfare Support
                  </span>
                </div>
              </div>

              {/* Graphic/Image side */}
              <div className="w-full md:w-5/12 h-48 md:h-auto relative rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner z-10">
                <Image 
                  src="/why_departure.png" 
                  alt="Student Welfare" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[10px] font-bold tracking-widest uppercase text-center bg-black/30 backdrop-blur-md py-1.5 px-2 rounded-lg border border-white/10">
                  Multicultural & Safe
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Academic Choices Directory Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">Course Selection</span>
              </div>
              <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Wide Course & Career Choices
              </h2>
              <p className="text-slate-500 text-lg">
                Choose from thousands of accredited programs across major professional disciplines in Australia.
              </p>
            </div>
            <Link href="/study-in-australia/course-finder" className="pt-4 lg:pt-0">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Launch AEC Course Finder
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {disciplines.map((discipline, idx) => {
              const Icon = discipline.icon;
              const isBlue = discipline.color === "blue";
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between hover:shadow-2xl hover:border-slate-350 hover:-translate-y-1.5 transition-all duration-500 shadow-sm relative overflow-hidden group"
                >
                  {/* Decorative corner slide indicator */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-slate-100 transition-colors z-0" />
                  
                  {/* Bottom brand border highlight */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[4px] ${isBlue ? "bg-[#124b8d]" : "bg-[#e31b23]"} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-slate-200 flex items-center justify-center mb-6 text-[#124b8d] group-hover:text-white ${isBlue ? "group-hover:bg-[#124b8d]" : "group-hover:bg-[#e31b23]"} group-hover:rotate-[12deg] transition-all duration-500`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-3 group-hover:text-[#124b8d] transition-colors duration-300 leading-snug">{discipline.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{discipline.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Booking Panel */}
      <section className="py-20 bg-[#FAF8F5] relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#11181C]">Ready to Start Your Australian Journey?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Get personalized institution choices, academic assessment, and step-by-step guidance from our PIER-qualified counselors.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Book a Free Counseling Session
              </Button>
            </Link>
            <Link href="/study-in-australia/universities-colleges">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Explore Partner Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
