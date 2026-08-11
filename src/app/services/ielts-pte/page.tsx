"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Headphones, Book, MessageSquare, CheckCircle2, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const courseOptions = [
  { title: "Intensive Crash Course", duration: "4 Weeks", desc: "Best for students who need quick results and plan to sit for exams immediately. Fast-paced, high-focus exam strategy drills.", label: "Urgent Results" },
  { title: "Standard Course", duration: "8 to 12 Weeks", desc: "Best for students starting from lower English foundations. Builds solid grammatical structures, extensive vocabulary, and exam familiarity.", label: "Foundation Builder" },
  { title: "Weekend Batch", duration: "Flexible Saturday & Sunday", desc: "Best for busy working professionals and school-age children seeking to learn without disrupting their weekday routines.", label: "Working Professionals" },
  { title: "One-on-One Coaching", duration: "Custom Scheduling", desc: "Best for high-achieving students targeting superior band scores (7.5+ or PTE 79+). Complete, personalized focus on your weak elements.", label: "Elite Band Targets" }
];

const moduleCoverage = [
  { title: "Listening", desc: "Master note-taking systems, predictive question methods, diverse accents, and exam time management.", icon: <Headphones className="w-5 h-5 text-[#124b8d]" /> },
  { title: "Reading", desc: "Audit skimming and scanning speed, focus on keyword indicators, and master structured question strategies.", icon: <Book className="w-5 h-5 text-[#e31b23]" /> },
  { title: "Writing", desc: "Analyze graphic descriptions, master academic essays, and build complex grammar, vocabulary, and coherence.", icon: <BookOpen className="w-5 h-5 text-[#124b8d]" /> },
  { title: "Speaking", desc: "Refine natural fluency, absolute pronunciation clarity, responsive interview strategies, and vocabulary confidence.", icon: <MessageSquare className="w-5 h-5 text-[#e31b23]" /> }
];

export default function IeltsPte() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="IELTS & PTE Preparation" 
        subtitle="Achieve your required English scorecard with confidence through expert coaching partners."
        breadcrumb="Services / IELTS & PTE"
        bgImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                English Competence
              </span>
              <h2 className="font-heading text-3xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Achieve Your Required English Score with Confidence
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Most Australian and global universities require specific IELTS Academic or PTE Academic band scores for admissions and student visa processing. AEC connects you to elite preparation partners to secure your targets.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
                  <CheckCircle2 className="w-5 h-5 text-[#e31b23] shrink-0" />
                  <span className="text-sm font-bold text-[#11181C]">Weekly Mock Exams</span>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
                  <CheckCircle2 className="w-5 h-5 text-[#e31b23] shrink-0" />
                  <span className="text-sm font-bold text-[#11181C]">1-on-1 Speaking Audits</span>
                </div>
              </div>
            </div>

            {/* Right List Panel */}
            <div className="lg:col-span-5 space-y-4">
              {[
                "Experienced & certified native-equivalent trainers",
                "Small interactive class sizes for personalized support",
                "Comprehensive study materials and exam booklets",
                "Detailed writing feedback & custom correction reports",
                "In-house test registration assistance & center booking"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start bg-white border border-slate-100 p-4 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#124b8d] shrink-0 mr-3 mt-0.5" />
                  <span className="text-sm text-slate-600 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Tiers Options */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Flexible Course Batches & Options
            </h2>
            <p className="text-slate-500 mt-2">Select a structure matching your current schedule and target timeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {courseOptions.map((tier, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="space-y-4">
                  <span className="text-sm font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100/50 px-2.5 py-1 rounded-md w-fit block">
                    {tier.label}
                  </span>
                  <h3 className="font-bold text-lg text-[#11181C] leading-tight pt-2">{tier.title}</h3>
                  <div className="font-bold text-sm text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg w-fit">{tier.duration}</div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module coverage dashboard */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
              Complete Exam Module Coverage
            </h2>
            <p className="text-slate-500 mt-2">Master all 4 bands assessed under Department and University criteria.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {moduleCoverage.map((mod, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-6 rounded-3xl space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                  {mod.icon}
                </div>
                <h3 className="font-bold text-lg text-[#11181C]">{mod.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Callout */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Your Exam Preparation</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Register today to enroll in the next upcoming IELTS or PTE preparation batch and book your mock exam seat.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Enroll in the Next Batch</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

