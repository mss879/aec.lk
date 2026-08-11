"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Compass, Laptop, Brain, Calculator, HardHat, 
  Stethoscope, ShieldCheck, Flame, Utensils, CheckCircle2, ChevronRight, HelpCircle, GraduationCap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const popularCourses = [
  { name: "Information Technology & Cyber Security", desc: "Covers cloud infrastructure, network protocols, digital defense, and software engineering. Highly sought after by modern Australian employers.", icon: <Laptop className="w-6 h-6" /> },
  { name: "Data Analytics & Artificial Intelligence", desc: "Focuses on big data modeling, machine learning, intelligence networks, and data visualization. High-paying post-study careers.", icon: <Brain className="w-6 h-6" /> },
  { name: "Accounting & Professional Year Pathways", desc: "Strategic financial audits, taxation structures, and specialized professional training pathways to maximize migration points.", icon: <Calculator className="w-6 h-6" /> },
  { name: "Engineering & Construction Management", desc: "Green grids, civil structures, advanced mechanics, and built-environment project management. Strong regional demand.", icon: <HardHat className="w-6 h-6" /> },
  { name: "Nursing & Healthcare Programs", desc: "Clinical practice, global public health frameworks, allied health, and elder care. Extremely high PR viability and job security.", icon: <Stethoscope className="w-6 h-6" /> },
  { name: "Early Childhood Education", desc: "Early learning, child development psychology, and classroom leadership. High demand under current skilled regional visa guidelines.", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Hospitality, Culinary & Tourism", desc: "Elite guest operations, international culinary masteries, and premium tourism logistics. A massive growth sector.", icon: <Utensils className="w-6 h-6" /> }
];

export default function CourseFinder() {
  // Wizard State
  const [step, setStep] = useState(1);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetWizard = () => {
    setStep(1);
    setSelectedDiscipline("");
    setSelectedBudget("");
    setSelectedIntake("");
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <PageHero 
        title="AEC Course Finder" 
        subtitle="Match with courses aligned to academic strengths, budgets, and long-term career outcomes."
        breadcrumb="Study in Australia / Course Finder"
        bgImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Intro & popular courses Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Strategic Alignments</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1] mb-6">
              Find the Right Course in Australia
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg">
              Choosing the right course is critical to your future career success and permanent residency pathways. Our counseling team matches you based on global industry demand, your academic strengths, budget targets, and intake timings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularCourses.map((course, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none z-0 group-hover:bg-blue-50/40 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-[#124b8d] group-hover:text-white transition-colors duration-300">
                    {course.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#11181C] mb-3">{course.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Wizard Section (Wow Factor Feature!) */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Interactive Tools</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl font-medium text-[#11181C] tracking-tight">
              Interactive Course Matcher
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              Select your parameters below to get instant recommended pathways in Australia.
            </p>
          </div>

          {/* Wizard Card Container */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 lg:p-12 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div 
                    key={stepNum} 
                    className={`w-8 h-2 rounded-full transition-all duration-300 ${
                      step === stepNum 
                        ? "bg-[#124b8d] w-12" 
                        : step > stepNum 
                          ? "bg-[#124b8d]/50" 
                          : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step {step} of 4</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1"
                >
                  <h3 className="text-2xl font-bold text-[#11181C]">What is your primary area of interest?</h3>
                  <p className="text-slate-500 text-sm">Select the field that matches your background or career ambitions.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["IT & Cyber Security", "Data Science & AI", "Engineering & Tech", "Nursing & Healthcare", "Education & Early Childhood", "Business & Finance"].map((discipline) => (
                      <button
                        key={discipline}
                        onClick={() => setSelectedDiscipline(discipline)}
                        className={`text-left p-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${
                          selectedDiscipline === discipline 
                            ? "bg-[#124b8d] text-white border-[#124b8d] shadow-md scale-[1.01]" 
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-450 hover:bg-slate-100/50"
                        }`}
                      >
                        {discipline}
                        {selectedDiscipline === discipline && <CheckCircle2 className="w-5 h-5 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1"
                >
                  <h3 className="text-2xl font-bold text-[#11181C]">What is your planned annual tuition budget?</h3>
                  <p className="text-slate-500 text-sm">Select a range so we can align with public vs private options or colleges.</p>
                  
                  <div className="grid grid-cols-1 gap-4 max-w-lg">
                    {[
                      { range: "AUD 15,000 to 25,000", label: "Budget Pathways (Colleges, TAFE, Regional Unis)" },
                      { range: "AUD 25,000 to 35,000", label: "Standard Tuition (Mid-Range & Regional Universities)" },
                      { range: "AUD 35,000 to 45,000+", label: "Premium Options (Top Go8 & Research Universities)" }
                    ].map((budget) => (
                      <button
                        key={budget.range}
                        onClick={() => setSelectedBudget(budget.range)}
                        className={`text-left p-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${
                          selectedBudget === budget.range 
                            ? "bg-[#124b8d] text-white border-[#124b8d] shadow-md scale-[1.01]" 
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-450 hover:bg-slate-100/50"
                        }`}
                      >
                        <div>
                          <div className="font-bold">{budget.range}</div>
                          <div className={`text-xs mt-1 ${selectedBudget === budget.range ? "text-slate-200" : "text-slate-500"}`}>{budget.label}</div>
                        </div>
                        {selectedBudget === budget.range && <CheckCircle2 className="w-5 h-5 shrink-0 ml-4" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1"
                >
                  <h3 className="text-2xl font-bold text-[#11181C]">When are you planning to start?</h3>
                  <p className="text-slate-500 text-sm">Australian semesters generally start in Semester 1 (Feb/March) or Semester 2 (July).</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Immediate Intake (Next 3-6 Months)", "Semester 1 (Feb/March next year)", "Semester 2 (July next year)", "Unsure / Flexible"].map((intake) => (
                      <button
                        key={intake}
                        onClick={() => setSelectedIntake(intake)}
                        className={`text-left p-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${
                          selectedIntake === intake 
                            ? "bg-[#124b8d] text-white border-[#124b8d] shadow-md scale-[1.01]" 
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-450 hover:bg-slate-100/50"
                        }`}
                      >
                        {intake}
                        {selectedIntake === intake && <CheckCircle2 className="w-5 h-5 shrink-0 ml-4" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 flex-1 flex flex-col justify-center items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-[#124b8d] border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-[#124b8d] animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#11181C]">Matching Complete!</h3>
                  <p className="text-slate-500 max-w-md text-sm">
                    Based on your target in <span className="font-bold text-slate-850">{selectedDiscipline}</span>, a budget range of <span className="font-bold text-slate-850">{selectedBudget}</span>, and intake in <span className="font-bold text-slate-850">{selectedIntake}</span>, we have mapped matching institutional options.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl max-w-xl text-left space-y-3 shadow-inner">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#124b8d]">✨ Recommended Pathways:</div>
                    <ul className="text-xs text-slate-650 space-y-2 leading-relaxed">
                      <li>• <strong>Direct Bachelors / Masters Degree</strong> at regional providers (includes scholarship potential up to 30%).</li>
                      <li>• <strong>Diploma-to-Degree Pathways</strong> via college partners (saves tuition fees and secures 2nd-year transition).</li>
                      <li>• Eligible for up to <strong>3-year Graduate Work Rights (Subclass 485)</strong> based on selected area.</li>
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
                    <Link href="/contact">
                      <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                        Request Full Institution List
                      </Button>
                    </Link>
                    <button onClick={resetWizard} className="text-xs font-bold text-slate-400 hover:text-slate-600 underline">
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons inside the Card */}
            {step < 4 && (
              <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-8">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className="text-sm font-bold text-slate-400 hover:text-slate-650 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  &larr; Back
                </button>
                
                <Button
                  disabled={
                    (step === 1 && !selectedDiscipline) || 
                    (step === 2 && !selectedBudget) || 
                    (step === 3 && !selectedIntake)
                  }
                  onClick={() => setStep(step + 1)}
                  className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold px-6 py-2 shadow-[2px_2px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 border border-slate-900 transition-all"
                >
                  Next Step &rarr;
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How Our Course Finder Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
              <span className="text-xs font-bold text-[#124b8d] tracking-widest uppercase">Process Flow</span>
              <div className="w-8 h-[1px] bg-[#124b8d]"></div>
            </div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#11181C] leading-[1.1]">
              How Our Course Finder Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Elegant connecting line */}
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-slate-100 rounded-full hidden md:block z-0" />

            {[
              { stepNum: "01", title: "Counseling", desc: "One-on-one discovery sessions to align on academic goals and career objectives." },
              { stepNum: "02", title: "Assessment", desc: "Thorough review of academic transcripts, GTE history, and English scores." },
              { stepNum: "03", title: "Comparison", desc: "Side-by-side contrast of fees, durations, intakes, and employment rates." },
              { stepNum: "04", title: "Planning", desc: "Intake scheduling to match regional visas and university progression pathways." },
              { stepNum: "05", title: "Application", desc: "End-to-end documentation coordination and application submission." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#124b8d] text-[#124b8d] font-bold flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {step.stepNum}
                </div>
                <h3 className="font-bold text-lg text-[#11181C] group-hover:text-[#124b8d] transition-colors">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Add a gorgeous realistic collage/image here to represent the course choices */}
          <div className="mt-20 relative rounded-[2rem] overflow-hidden h-[300px] w-full max-w-3xl mx-auto border border-slate-200 shadow-md group">
            <Image 
              src="/course_finder.png" 
              alt="Courses selection Australia" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-lg font-bold tracking-tight">
              Access 15,000+ Courses across Australian TAFEs and G8 Universities
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300">
                Request Personal Course Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
