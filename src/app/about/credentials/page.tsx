"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, ShieldCheck, CheckSquare, BookOpen, 
  MapPin, Clock, ArrowUpRight, Compass, Landmark, Scale, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const credentials = [
  {
    title: "PIER Qualified Agent Counseling",
    desc: "AEC counselors hold official Professional International Education Resources (PIER) certifications. They possess deep expertise in Australian education structures, enrollment cycles, and ethical counseling rules.",
    badge: "PIER Qualified",
    icon: <Award className="w-6 h-6 text-[#124b8d]" />
  },
  {
    title: "MARA Registered Migration Support",
    desc: "Through our long-standing sister alliance with Australian Migration Services (AMS), our students receive access to registered migration professionals who handle Student, Dependent, Graduate, and Skilled migration visas.",
    badge: "MARA Registered",
    icon: <Scale className="w-6 h-6 text-[#e31b23]" />
  },
  {
    title: "ESOS Act Compliance Safeguards",
    desc: "We strictly align all university placements with the Education Services for Overseas Students (ESOS) Act, ensuring international students enjoy strict consumer protection, course standards, and tuition safety.",
    badge: "ESOS Compliant",
    icon: <ShieldCheck className="w-6 h-6 text-[#124b8d]" />
  },
  {
    title: "AQF Standards Knowledge",
    desc: "Our pathway counseling is built completely around the Australian Qualifications Framework (AQF) guidelines. We ensure students select programs with globally valued credit transfers and legitimate pathways.",
    badge: "AQF Aligned",
    icon: <BookOpen className="w-6 h-6 text-[#e31b23]" />
  }
];

export default function Credentials() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Professional Credentials" 
        subtitle="Vetted official credentials safeguarding your study and migration pathways."
        breadcrumb="About Us / Credentials"
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
                Vetted Pedigree
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] leading-tight">
                Your Future is Safe with Certified Specialists
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Overseas education represents a major personal and financial investment. At AEC, we eliminate the guesswork and protect your student status. Every recommendation is backed by official PIER international certifications, MARA legal migration oversight, and absolute adherence to Australian consumer protection laws.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <div className="flex items-center"><CheckSquare className="w-4 h-4 mr-2 text-[#124b8d]" /> ESOS Act Compliant</div>
                <div className="flex items-center"><CheckSquare className="w-4 h-4 mr-2 text-[#124b8d]" /> PIER Certified</div>
                <div className="flex items-center"><CheckSquare className="w-4 h-4 mr-2 text-[#124b8d]" /> AMS MARA Alliance</div>
              </div>
            </div>

            {/* Right Graphic column */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[320px]">
              <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
              <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] group hover:rotate-0 transition-transform duration-500 z-10">
                <img src="/compliance_certified.png" alt="Compliance Certified" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Credentials */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Official Certifications
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
              Professional Safeguards
            </h2>
            <p className="text-lg text-slate-500">
              The credentials that set AEC apart as Sri Lanka&apos;s most reliable educational agency.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {credentials.map((cred, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-bl-full pointer-events-none" />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                      {cred.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      {cred.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C]">{cred.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{cred.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Multinational Holdings highlights */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.03)] text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/20 blur-3xl pointer-events-none" />
            <h3 className="font-bold text-2xl md:text-3xl text-[#11181C] relative z-10">Part of Multinational Holdings</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto relative z-10">
              AEC stands on strong financial foundations, operating as a core division of Multinational Holdings, a diversified group with a 20+ year legacy in Melbourne, Australia. Our physical, fully staffed office branches in Colombo, Dubai, Melbourne, and Adelaide provide continuous, long-term support for your complete global transition.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 relative z-10">
              <div className="flex items-center text-sm font-semibold text-slate-600"><MapPin className="w-4 h-4 mr-1 text-[#124b8d]" /> Melbourne</div>
              <div className="flex items-center text-sm font-semibold text-slate-600"><MapPin className="w-4 h-4 mr-1 text-[#124b8d]" /> Colombo</div>
              <div className="flex items-center text-sm font-semibold text-slate-600"><MapPin className="w-4 h-4 mr-1 text-[#124b8d]" /> Adelaide</div>
              <div className="flex items-center text-sm font-semibold text-slate-600"><MapPin className="w-4 h-4 mr-1 text-[#124b8d]" /> Dubai</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Team */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Vetted Academic Advice</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Protect your visa status and study investments. Talk to a PIER-qualified counselor now.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Talk to Our Team</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
