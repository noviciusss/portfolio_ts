"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";

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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Samarth_Pratap_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <button
            onClick={handleDownload}
            className="nb-btn nb-btn-primary flex items-center gap-2 px-5 py-3 shadow-[4px_4px_0_0_var(--border)] border-[3px] border-border hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--border)]"
          >
            <FiDownload className="h-4 w-4 text-foreground" />
            <span className="font-sans text-xs uppercase tracking-wider font-extrabold text-foreground">
              RESUME
            </span>
          </button>

          {/* Simple Clean Tooltip */}
          {isHovered && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-foreground text-background font-mono text-[9px] uppercase tracking-wider border-2 border-border shadow-[3px_3px_0_0_var(--accent)] whitespace-nowrap font-bold">
              AI/ML Engineer & RAG Specialist
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
