"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { 
  Users, Heart, Baby, ShieldCheck, ArrowUpRight, 
  HelpCircle, Compass, CheckSquare, BookOpen, Briefcase, Landmark, ChevronRight
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const portalCards = [
  {
    name: "Bring Your Partner & Family",
    href: "/partner-family-visas/bring-family",
    icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    bg: "bg-slate-50/50 dark:bg-slate-900/10",
    border: "border-slate-200 dark:border-slate-700",
    desc: "Detailed strategies to include your spouse or de facto partner and dependent children initially or later as subsequent entrants."
  },
  {
    name: "Partner's Work Rights",
    href: "/partner-family-visas/work-rights",
    icon: <Briefcase className="w-6 h-6 text-[#e31b23] dark:text-[#e31b23]" />,
    bg: "bg-red-50/50 dark:bg-red-950/10",
    border: "border-red-100 dark:border-red-950/30",
    desc: "Understand dependent work hours based on your course levels (Bachelor, Masters, PhD) and post-study work visa rights."
  },
  {
    name: "Benefits for Children",
    href: "/partner-family-visas/children-benefits",
    icon: <Baby className="w-6 h-6 text-[#124b8d] dark:text-blue-400" />,
    bg: "bg-blue-50/50 dark:bg-blue-900/10",
    border: "border-blue-100 dark:border-blue-900/30",
    desc: "Access premium public and private school enrollment systems, tuition matrices, and nurturing early learning settings in Australia."
  }
];

const faqs = [
  { 
    title: "My partner does not speak English. Can they still come?", 
    content: "Yes. Dependent partners on student visas typically do not have a mandatory English language test requirement, depending on your primary course level and current immigration department regulations." 
  },
  { 
    title: "We are not married. Can my partner accompany me?", 
    content: "Yes, de facto partners may qualify if you can provide solid proof of a genuine and continuing relationship for at least 12 months, or if your relationship is registered in an eligible Australian state or territory." 
  },
  { 
    title: "Can my parents visit while I study?", 
    content: "Yes. Your parents can apply for a Subclass 600 Visitor Visa to visit you in Australia. While they cannot be included as student dependents, we assist with visitor visa document preparation." 
  },
  { 
    title: "Can my partner study in Australia too?", 
    content: "Yes, dependent partners can enroll in short courses under 3 months. For longer academic programs, they must apply for their own primary Student Visa (Subclass 500)." 
  },
  { 
    title: "How much does it cost to add a partner?", 
    content: "Costs include government visa application charges, overseas student health cover (OSHC) family upgrades, medical panel checks, and police clearance logs. Contact us for a detailed breakdown." 
  }
];

export default function PartnerFamilyVisas() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      {/* Premium Photorealistic Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 border-b border-slate-200">
        {/* Decorative Grid Background matching homepage */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Background Image with soft light overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2940&auto=format&fit=crop')" }}
        />

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 text-left space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-slate-200"
              >
                <Compass className="w-4 h-4 animate-spin-slow" /> Dependent Integration Portal
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight text-slate-900 leading-[1.1]"
              >
                Bring Your Partner & Family
                <span className="block text-[#124b8d] mt-2">To Australia Together</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed"
              >
                Your education journey doesn&apos;t have to mean separating from your loved ones. AEC provides certified MARA visa counseling and documentation strategies to bring your spouse and children to Australia safely.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                    <span>Get Family Visa Advice</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/partner-family-visas/bring-family">
                  <Button size="lg" className="bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto border border-slate-200 inline-flex items-center gap-2 group">
                    <span>Check Eligibility</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Directory (Wow Factor Navigation Hub) */}
      <section className="py-24 bg-[#FAF8F5] border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Explore Subpages
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Your Complete Family Roadmap
            </h2>
            <p className="text-lg text-slate-500">
              Select one of our specialized guides to learn about visas, work rights, and schooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {portalCards.map((card, idx) => (
              <Link 
                key={idx}
                href={card.href}
                className="group block border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.bg}`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3 group-hover:text-[#124b8d] transition-colors leading-tight">
                    {card.name}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#124b8d] pt-4 border-t border-slate-100 mt-4">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three Major Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Unrivaled Benefits
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Three Major Benefits of Family Visas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-[#FAF8F5] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem]">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                  <Heart className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-bold text-xl text-[#11181C]">1. Stay Together</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Avoid long and stressful periods of physical separation while you build your educational future overseas. Live and support each other daily in modern cities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FAF8F5] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem]">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#e31b23] flex items-center justify-center border border-red-100">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-[#11181C]">2. Your Partner Can Work</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Accompanying spouses are legally permitted to work part-time or even full-time (unlimited hours for Masters/PhD spouses), helping manage living costs and build career profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FAF8F5] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem]">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#124b8d] flex items-center justify-center border border-blue-100">
                  <Baby className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-[#11181C]">3. Children&apos;s Education</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dependent school-age children gain access to Australia&apos;s elite, safe public and private schooling frameworks, preparing them seamlessly for global university life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Relationship Requirements Dashboard */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Strict Visa Criteria
              </span>
              <h2 className="text-4xl md:text-[2.5rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
                Requirements to Include a Partner
              </h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Meeting visa regulations requires thorough, structured documentation.
              </p>
              <div className="pt-4">
                <Link href="/partner-family-visas/bring-family">
                  <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                    <span>Check Relationship Criteria</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Relationship Evidence</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Proof of marriage or registered de facto relationships, shared finances, joint leases, stat decs, and timelines.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31b23] flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Financial Capacity</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Ability to show living and travel funds for yourself and each family dependent via savings, sponsors, or active education loans.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#124b8d] flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-lg text-[#11181C] tracking-tight">Health & Character</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Satisfactory Department of Home Affairs medical checks, Overseas Student Health Cover, and valid police clearance registries.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 justify-center items-center text-center p-8 bg-blue-50/20">
                <h4 className="font-bold text-base text-[#11181C] mb-1">Calculate Your Potential</h4>
                <p className="text-slate-500 text-sm font-medium mb-4">Determine the complete family budget mapping.</p>
                <Link href="/contact">
                  <Button size="sm" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_4px_12px_rgba(18,75,141,0.2)] hover:shadow-[0_6px_20px_rgba(18,75,141,0.35)] hover:-translate-y-0.5 transition-all duration-300">Calculate Plan</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-200" id="faqs">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              FAQ Help
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#11181C] leading-[1.1] mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion items={faqs} />
          
          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[0_10px_25px_rgba(18,75,141,0.25)] hover:shadow-[0_15px_30px_rgba(18,75,141,0.4)] hover:-translate-y-0.5 transition-all duration-300 px-8 py-6 h-auto inline-flex items-center gap-2 group">
                <span>Still Have Questions? Ask Our Counselors</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
