"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Overlay plumbing shared by the "add lead" modal, the lead drawer and the
 * stage manager: escape to close, a scroll lock while open, and a labelled
 * dialog role.
 */
function useOverlayBehaviour(open: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);
}

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
    />
  );
}

export function OverlayHeader({
  title,
  description,
  onClose,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
      <div className="min-w-0">
        <h2 className="truncate text-base font-black tracking-tight text-slate-900">
          {title}
        </h2>
        {description && (
          <div className="mt-0.5 text-xs text-slate-500">{description}</div>
        )}
        {children}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="-mr-1 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  labelledBy,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  useOverlayBehaviour(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <Backdrop onClose={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "relative my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-xl",
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({
  open,
  onClose,
  labelledBy,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  useOverlayBehaviour(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <Backdrop onClose={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
            className={cn(
              "relative flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl",
              className
            )}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
