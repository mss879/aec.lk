"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, Award, ShieldCheck, CheckCircle2, 
  Sparkles, Compass, HelpCircle, Users, Lightbulb, ChevronRight
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

const values = [
  {
    title: "Integrity",
    desc: "We provide honest, realistic, and highly transparent advice based strictly on each student's individual qualifications and true circumstances.",
    icon: <ShieldCheck className="w-6 h-6 text-[#124b8d]" />
  },
  {
    title: "Excellence",
    desc: "Our qualified educational counselors maintain absolute professional standards in student counseling, university admissions, and migration coaching.",
    icon: <Award className="w-6 h-6 text-[#e31b23]" />
  },
  {
    title: "Comprehensive Support",
    desc: "We support students end-to-end, going beyond simple visa approval to handle airline ticketing, local airport reception, homestays, and career pathways.",
    icon: <Sparkles className="w-6 h-6 text-[#124b8d]" />
  },
  {
    title: "Student-Centric Approach",
    desc: "Every student receives personalized attention, customized career pathways, and options optimized specifically to match their personal goals and budget.",
    icon: <Users className="w-6 h-6 text-[#e31b23]" />
  },
  {
    title: "Compliance",
    desc: "We operate with a meticulous focus on ethical practice, accurate documentation, and absolute alignment with AQF standards and the ESOS Act.",
    icon: <CheckCircle2 className="w-6 h-6 text-[#124b8d]" />
  }
];

export default function MissionValues() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="Our Mission & Values" 
        subtitle="The five core principles that drive honest, expert international education guidance."
        breadcrumb="About Us / Mission & Values"
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Mission Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full z-0 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" /> Driving Vision
          </div>
          
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] max-w-3xl mx-auto leading-tight">
            Empowering Dreams, Shaping Fulfilling Careers
          </h2>
          
          <div className="bg-white border border-slate-100 p-8 lg:p-12 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-bl-full pointer-events-none" />
            <p className="text-xl md:text-2xl text-[#124b8d] font-medium italic leading-relaxed">
              &ldquo;To provide honest, expert guidance and comprehensive support services that enable students to achieve their educational dreams in Australia, New Zealand, and worldwide destinations, and successfully transition into fulfilling careers.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-3">
              Core Principles
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
              Our Five Core Values
            </h2>
            <p className="text-lg text-slate-500">
              We stand for absolute compliance, student success, and ethical practices.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                    {val.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3 group-hover:text-[#124b8d] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {val.desc}
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-8 border-t border-slate-100 pt-4 relative z-10">
                  0{idx + 1} / AEC Value
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-white overflow-hidden relative border-t border-slate-100">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Experience Vetted Ethical Counseling</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Ready to chart your academic future with absolute integrity? Reach out to our consultants today for a comprehensive, free session.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center justify-center gap-2 group border border-transparent">
                <span>Book a FREE Consultation</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
