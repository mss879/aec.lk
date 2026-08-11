"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, Landmark, Percent, GraduationCap, CheckCircle2, 
  HelpCircle, BookOpen, ShieldCheck, Flame, Compass, ChevronRight
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

const scholarshipTypes = [
  { title: "Academic Merit Scholarships", desc: "Awarded to high-achieving international students based on outstanding academic transcripts (previous A/Levels, diplomas, or degrees). Typically offers 15% to 30% tuition fee reductions.", icon: <Award className="w-6 h-6 text-[#124b8d]" /> },
  { title: "Partial Tuition Fee Waivers", desc: "Institution-specific grants designed to support international student diversity. Offers direct, automatic fee reductions upon successful application assessment.", icon: <Percent className="w-6 h-6 text-[#e31b23]" /> },
  { title: "Course-Specific Scholarships", desc: "Targeted support for specific high-demand fields of study such as Engineering, IT, Nursing, or Renewable Energy. Varies by faculty and academic intakes.", icon: <GraduationCap className="w-6 h-6 text-[#124b8d]" /> },
  { title: "Institutional & Partner Scholarships", desc: "Grants provided through exclusive partnerships with colleges, pathway providers, or professional year pathways. AEC matches you to secure maximum discounts.", icon: <Landmark className="w-6 h-6 text-[#e31b23]" /> }
];

export default function Scholarships() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Scholarships for International Students in Australia" 
        subtitle="Studying in Australia can be more affordable than you think. Many universities and colleges offer scholarships and tuition fee reductions for international students."
        breadcrumb="Study in Australia / Scholarships"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Scholarship Types Section */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Financial Assistance</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
              Types of Scholarships Available
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg">
              Many Australian universities and colleges offer scholarships, tuition fee reductions, and course-specific support to help international students manage their education investment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left list of cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {scholarshipTypes.map((sch, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-205 p-6 rounded-[2rem] flex flex-col justify-between hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-blue-50/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-[#124b8d] group-hover:text-white transition-colors duration-300">
                      {sch.icon}
                    </div>
                    <h3 className="font-bold text-lg text-[#11181C] mb-3">{sch.title}</h3>
                    <p className="text-slate-505 text-sm leading-relaxed">{sch.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side illustration card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#124b8d]/5 rounded-bl-full pointer-events-none" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#124b8d] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-6">Affordable Future</span>
                <h3 className="text-2xl font-semibold text-[#11181C] mb-4">Minimize Your Living & Education Cost</h3>
                <p className="text-slate-505 text-sm leading-relaxed mb-6">
                  Up to 30% academic tuition fee discounts are automatically applied for high-achieving applicants. Plan early to match application deadlines.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-56 w-full border border-slate-100 mt-6 shadow-inner">
                <Image 
                  src="/scholarships_hero.png" 
                  alt="AEC Scholarship support" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEC Scholarship Support Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase border border-blue-200 bg-blue-50/50 px-3 py-1 rounded-full">Expert Guidance</span>
              </div>
              <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Our Scholarship Support
              </h2>
              <p className="text-slate-505 text-lg leading-relaxed">
                We analyze your profile to identify the maximum possible tuition reductions, and coordinate the complete documentation process.
              </p>

              {/* Photo representation of counselors */}
              <div className="relative rounded-[2rem] overflow-hidden h-72 w-full border border-slate-200 shadow-sm mt-6 group">
                <Image 
                  src="/scholarship_advising.png" 
                  alt="Counselor support" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Professional Review</div>
                  <div className="text-sm font-semibold">98% High Success Ratio</div>
                </div>
              </div>
            </div>

            {/* Right Steps Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Scholarship eligibility assessment", desc: "Detailed review of academic scores, prior qualifications, and country quotas to align with available grants." },
                { title: "Identification of maximum fee reductions", desc: "Research and map the highest available fee reductions across multiple institutions." },
                { title: "Application assistance and documentation support", desc: "Draft and structure statements of purpose (SOPs), CVs, and references to present an elite academic profile." },
                { title: "Guidance on deadlines and conditions", desc: "Detailed brief on academic GPA maintenance rules, deadlines, and renewal criteria." }
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[#124b8d] border border-slate-200 flex items-center justify-center mb-4 font-mono text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Eligibility assessment Callout Section */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 lg:p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none" />
            
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#124b8d] flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Award className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl font-semibold tracking-tight text-[#11181C]">
              Check Your Scholarship Eligibility
            </h2>
            <p className="text-slate-505 max-w-2xl mx-auto text-base">
              Secure your complete fee assessment today. Fill out our simple counseling booking form, and our MARA & PIER certified teams will calculate your exact scholarship potential in Australia.
            </p>

            <div className="relative rounded-[2rem] overflow-hidden h-[300px] w-full max-w-2xl mx-auto border border-slate-200 shadow-md">
              <Image 
                src="/scholarship_check.png" 
                alt="Scholarships check" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="pt-8 flex justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                  Check My Eligibility - FREE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
