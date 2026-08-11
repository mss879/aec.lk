"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  bgImage?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function PageHero({ title, subtitle, breadcrumb, bgImage = "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2940&auto=format&fit=crop" }: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[40vh] md:min-h-[45vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-12 border-b border-slate-100">
      {/* Decorative Grid Background matching homepage hero */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-4"
        >
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{breadcrumb}</span>
          </motion.div>
          <motion.h1 
            variants={fadeIn}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              variants={fadeIn}
              className="text-base md:text-lg font-medium text-slate-500 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
