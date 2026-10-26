"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiDownload } from "react-icons/fi";
import { siteConfig } from "@/lib/site-config";

export default function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            aria-label="View résumé PDF"
            className="nb-btn nb-btn-primary flex items-center gap-2 px-5 py-3 shadow-[4px_4px_0_0_var(--border)] border-[3px] border-border hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--border)]"
          >
            <FiDownload className="h-4 w-4 text-foreground" />
            <span className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
              RESUME
            </span>
            </a>

          {/* Simple Clean Tooltip */}
          {isHovered && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-foreground text-background font-mono text-[9px] uppercase tracking-wider border-2 border-border shadow-[3px_3px_0_0_var(--accent)] whitespace-nowrap font-bold">
              AI Engineer · LLM Agents · RAG
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
