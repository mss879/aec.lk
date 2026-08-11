"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface TimelineItem {
  title: string;
  description: string;
  timeframe?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l-2 border-slate-200/80 ml-8 md:ml-12 my-8">
      {items.map((item, index) => {
        const brandColor = "#124b8d";
        const badgeStyle = "bg-blue-50/80 text-[#124b8d] border-blue-100/50";

        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring", 
              stiffness: 70, 
              damping: 14, 
              delay: index * 0.15 
            }}
            className="mb-10 ml-8 relative group"
          >
            {/* Timeline step indicator */}
            <span 
              className="absolute -left-[51px] flex items-center justify-center w-9 h-9 rounded-full text-white font-extrabold shadow-md ring-4 ring-white group-hover:scale-110 transition-transform duration-300 select-none z-10"
              style={{ backgroundColor: brandColor }}
            >
              <span className="text-sm font-black">{index + 1}</span>
            </span>

            {/* Content card */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:border-[#124b8d]/30 hover:-translate-y-1 transition-all duration-300 relative cursor-default">
              
              <h3 className="flex items-center text-lg md:text-xl font-extrabold text-slate-900 mb-2 group-hover:text-[#124b8d] transition-colors">
                {item.title}
              </h3>
              
              {item.timeframe && (
                <span className={`inline-flex items-center px-3 py-1 border text-xs font-bold rounded-full mb-3 shadow-sm ${badgeStyle}`}>
                  ⏱️ {item.timeframe}
                </span>
              )}
              
              <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
