"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-300"
          >
            <button
              className={cn(
                "w-full flex items-center justify-between p-5 text-left transition-all duration-300 font-bold text-slate-800 hover:text-[#124b8d] cursor-pointer",
                isOpen && "bg-[#FAF8F5] text-[#124b8d]"
              )}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base tracking-tight">{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-100 bg-white">
                    <div className="pt-4">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

