"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Design / Animation: Pulsing CSS Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-[4px] border-slate-50 shadow-[0_0_40px_rgba(18,75,141,0.1)] mb-10"
            >
               {/* Pure CSS Typographic Logo */}
               <div className="relative z-10 flex items-baseline">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter text-[#124b8d]">AEC</span>
                 <span className="text-4xl md:text-5xl font-black text-[#e31b23]">.</span>
               </div>
               
               {/* Blue Pulse */}
               <motion.div 
                 animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                 className="absolute inset-0 rounded-full border-[3px] border-[#124b8d] -z-10"
               />
               
               {/* Red Pulse */}
               <motion.div 
                 animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                 className="absolute inset-0 rounded-full border-[3px] border-[#e31b23] -z-10"
               />
            </motion.div>

            {/* Typing "WELCOME" text */}
            <div className="flex items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: "linear", delay: 0.4 }}
                className="overflow-hidden whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-black tracking-widest uppercase text-slate-800"
              >
                Welcome
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-1 md:w-1.5 h-[1.2em] bg-[#e31b23] ml-1 md:ml-2 mt-0.5"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
